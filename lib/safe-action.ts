import { z } from "zod"
import { auth } from "@/auth"
import { rateLimit } from "./rate-limit"

export type ActionState<TInput, TOutput> = {
  fieldErrors?: z.inferFlattenedErrors<z.ZodType<TInput>>["fieldErrors"]
  error?: string | null
  data?: TOutput
  success?: boolean
}

export const createSafeAction = <TInput, TOutput>(
  schema: z.ZodType<TInput>,
  handler: (validatedData: TInput, userId: string) => Promise<TOutput>,
  options: { enforceRateLimit?: boolean; rateLimitKey?: string } = {}
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    // 1. Authenticate user
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Unauthorized", success: false }
    }
    const userId = session.user.id

    // 2. Rate Limiting (Optional but recommended)
    if (options.enforceRateLimit) {
      const identifier = options.rateLimitKey
        ? `ratelimit:${options.rateLimitKey}:${userId}`
        : `ratelimit:global:${userId}`
        
      const { success } = await rateLimit.limit(identifier)
      if (!success) {
        return { error: "Too many requests. Please try again later.", success: false }
      }
    }

    // 3. Validate Input Data
    const validationResult = schema.safeParse(data)
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten().fieldErrors,
        error: "Invalid fields",
        success: false,
      }
    }

    // 4. Execute Action (Concurrency inside handler via transactions if needed)
    try {
      const result = await handler(validationResult.data, userId)
      return { data: result, success: true }
    } catch (error) {
      console.error("Action error:", error)
      return { error: "Internal Server Error", success: false }
    }
  }
}
