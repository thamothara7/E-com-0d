"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { createProduct, updateProduct } from "@/app/actions/product"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Loader2, Upload } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  originalPrice: z.coerce.number().optional().nullable(),
  categoryId: z.coerce.number().min(1, "Category is required"),
  description: z.string().optional().nullable(),
  ingredients: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  stockQuantity: z.coerce.number().min(0, "Stock cannot be negative"),
  isHidden: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

export function ProductForm({ categories, initialData }: { categories: any[], initialData?: any }) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [imageBase64, setImageBase64] = useState<string>(initialData?.image || "")
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "")

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || 0,
      originalPrice: initialData?.originalPrice || null,
      categoryId: initialData?.categoryId || 0,
      description: initialData?.description || "",
      ingredients: initialData?.ingredients || "",
      weight: initialData?.weight || "",
      stockQuantity: initialData?.stockQuantity || 100,
      isHidden: initialData?.isHidden || false,
    }
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setImageBase64(reader.result as string)
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data: FormValues) => {
    if (!imageBase64) {
      toast.error("Product image is required")
      return
    }

    setIsPending(true)
    try {
      const payload = {
        ...data,
        image: imageBase64,
        description: data.description || undefined,
        ingredients: data.ingredients || undefined,
        weight: data.weight || undefined,
        originalPrice: data.originalPrice || undefined
      }

      const result = initialData 
        ? await updateProduct({ ...payload, id: initialData.id })
        : await createProduct(payload)

      if (result.success) {
        toast.success(initialData ? "Product updated" : "Product created")
        router.push("/admin/products")
        router.refresh()
      } else {
        toast.error(result.error || "Failed to save product")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      
      {/* Image Upload Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Image</label>
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 overflow-hidden relative group">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
               <Upload className="w-8 h-8 text-gray-400 group-hover:text-gray-500 transition-colors" />
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p className="font-medium text-gray-900 dark:text-gray-100">Upload a high-quality product image.</p>
            <p className="mt-1">Recommended: Square format (1:1), max 2MB.</p>
            <p className="mt-1">Click the dashed box to select a file.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
          <input 
            {...register("name")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Signature Garam Masala"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <select 
            {...register("categoryId")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select a category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price (₹)</label>
          <input 
            type="number" step="0.01"
            {...register("price")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500"
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>

        {/* Original Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Original Price (₹) - Optional</label>
          <input 
            type="number" step="0.01"
            {...register("originalPrice")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500"
            placeholder="For calculating discounts"
          />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock Quantity</label>
          <input 
            type="number"
            {...register("stockQuantity")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500"
          />
          {errors.stockQuantity && <p className="text-sm text-red-500">{errors.stockQuantity.message}</p>}
        </div>
        
        {/* Weight */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Weight Setup</label>
          <input 
            {...register("weight")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. 100g or 300g (3x100g)"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea 
          {...register("description")}
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Ingredients</label>
        <textarea 
          {...register("ingredients")}
          rows={2}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
        <input 
          type="checkbox" 
          id="isHidden"
          {...register("isHidden")}
          className="w-5 h-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
        />
        <label htmlFor="isHidden" className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Hide from public store
        </label>
        <span className="text-xs text-gray-500 ml-2">Check this to temporarily hide the product from customers.</span>
      </div>

      <div className="pt-4 flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
          className="rounded-xl px-6"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isPending}
          className="rounded-xl px-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white"
        >
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? "Save Changes" : "Create Product"}
        </Button>
      </div>

    </form>
  )
}
