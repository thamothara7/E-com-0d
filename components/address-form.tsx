"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { saveAddress } from "@/app/actions/address"
import { MapPin, Phone, Home, Building, Map, Hash, Globe, User, CheckCircle2, Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { StoreProvider } from "@/lib/store"
import { CartSidebar } from "@/components/cart-sidebar"

interface AddressFormProps {
  existing?: {
    name: string; phone: string; street: string
    city: string; state: string; postalCode: string; country: string
  } | null
}

function AddressForm({ existing }: AddressFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const formFields = [
    { name: "name", label: "Full Name", placeholder: "Thamothara Natarajan", icon: User, type: "text" },
    { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210", icon: Phone, type: "tel" },
    { name: "street", label: "Street Address", placeholder: "123, Anna Salai", icon: Home, type: "text" },
    { name: "city", label: "City", placeholder: "Chennai", icon: Building, type: "text" },
    { name: "state", label: "State", placeholder: "Tamil Nadu", icon: Map, type: "text" },
    { name: "postalCode", label: "Postal Code", placeholder: "600001", icon: Hash, type: "text" },
    { name: "country", label: "Country", placeholder: "India", icon: Globe, type: "text" },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const formData = new FormData(formRef.current!)
    startTransition(async () => {
      try {
        await saveAddress(formData)
        setSuccess(true)
        setTimeout(() => router.push("/profile"), 1500)
      } catch (err: any) {
        setError(err.message || "Something went wrong. Please try again.")
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        {formFields.map(({ name, label, placeholder, icon: Icon, type }) => (
          <div key={name} className={name === "street" ? "sm:col-span-2" : ""}>
            <label htmlFor={name} className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" /> {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              defaultValue={existing?.[name as keyof typeof existing] ?? ""}
              required
              className="w-full h-11 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">{error}</p>
      )}

      {success ? (
        <div className="flex items-center justify-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">Address saved! Sending you back to your profile…</span>
        </div>
      ) : (
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold shadow-md shadow-orange-500/20 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><MapPin className="w-4 h-4" /> Save Address</>}
        </button>
      )}
    </form>
  )
}

export { AddressForm }
