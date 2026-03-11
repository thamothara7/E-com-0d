"use client"

import { useState } from "react"
import { Trash2, Loader2 } from "lucide-react"
import { deleteProduct } from "@/app/actions/product"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function DeleteProductButton({ id }: { id: number }) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return

    setIsPending(true)
    try {
      const result = await deleteProduct({ id })
      if (result.success) {
        toast.success("Product deleted")
        router.refresh()
      } else {
        toast.error(result.error || "Failed to delete product")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50"
      title="Delete Product"
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  )
}
