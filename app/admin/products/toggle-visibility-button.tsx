"use client"

import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toggleProductVisibility } from "@/app/actions/product"
import { toast } from "sonner"

export function ToggleVisibilityButton({ id, isHidden }: { id: number; isHidden: boolean }) {
  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(isHidden)

  const handleToggle = async () => {
    setLoading(true)
    try {
      const result = await toggleProductVisibility({ id })
      if (result.success) {
        setHidden(!hidden)
        toast.success(hidden ? "Product is now visible" : "Product hidden from store")
      } else {
        toast.error(result.error || "Failed to update visibility")
      }
    } catch {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-lg transition-colors ${
        hidden
          ? "text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30"
          : "text-green-600 hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/50"
      }`}
      title={hidden ? "Show product" : "Hide product"}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : hidden ? (
        <EyeOff className="w-4 h-4" />
      ) : (
        <Eye className="w-4 h-4" />
      )}
    </button>
  )
}
