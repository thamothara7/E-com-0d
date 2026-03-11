"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useStore } from "@/lib/store"
import { createRazorpayOrder } from "@/app/actions/razorpay"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, Loader2, Lock } from "lucide-react"

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const { cartItems, cartTotal, clearCart } = useStore()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"IDLE" | "SUCCESS" | "FAILED">("IDLE")
  const [errorMessage, setErrorMessage] = useState("")

  const subtotal = cartTotal
  const shippingThreshold = 500
  const shippingFee = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 50
  const totalAmount = subtotal + shippingFee
  
  // Load Razorpay Script Dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleCheckout = async () => {
    if (!session?.user) {
      setErrorMessage("Please sign in to complete your checkout.")
      return
    }

    if (subtotal < 1) {
      setErrorMessage("Your cart is empty.")
      return
    }

    setIsProcessing(true)
    setErrorMessage("")

    try {
      const isScriptLoaded = await loadRazorpayScript()
      if (!isScriptLoaded) {
        throw new Error("Razorpay SDK failed to load. Are you online?")
      }

      // 1. Create order on backend (which rate-limits, validates prices from DB, and calculates real shipping)
      const cartItemsForBackend = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
      
      const response = await createRazorpayOrder({ items: cartItemsForBackend })
      
      if (!response.data || response.error) {
         throw new Error(response.error || "Failed to initialize checkout")
      }

      const orderData = response.data

      // Mock Sandbox Interception
      if (orderData.isSandbox) {
        setIsProcessing(false) 
        
        // Directly hit the verify endpoint with mock data
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_sandbox_${Math.random().toString(36).substring(7)}`,
            razorpay_signature: "sandbox_signature",
            db_order_id: orderData.dbOrderId,
            isSandbox: true
          }),
        })

        const verifyData = await verifyRes.json()
        if (verifyData.success) {
          setPaymentStatus("SUCCESS")
          clearCart()
        } else {
          setPaymentStatus("FAILED")
          setErrorMessage(verifyData.error || "Verification failed.")
        }
        return; // Exit out, don't open real widget
      }

      // 2. Initialize REAL Razorpay Client Widget
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Masala Co",
        description: "Premium Spices Order",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                db_order_id: orderData.dbOrderId
              }),
            })

            const verifyData = await verifyRes.json()
            if (verifyData.success) {
              setPaymentStatus("SUCCESS")
              clearCart()
            } else {
              setPaymentStatus("FAILED")
              setErrorMessage("Payment verification failed.")
            }
          } catch (err) {
            setPaymentStatus("FAILED")
            setErrorMessage("An error occurred during verification.")
          }
        },
        prefill: {
          name: session.user.name,
          email: session.user.email,
        },
        theme: {
          color: "#4F46E5", // Indigo-600 to match standard primary
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      
      paymentObject.on("payment.failed", function (response: any) {
        setIsProcessing(false)
        setPaymentStatus("FAILED")
        setErrorMessage(response.error.description || "The payment failed.")
      })

      paymentObject.open()
      
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.")
      setIsProcessing(false)
    }
  }

  // --- RENDERING STATES ---

  if (status === "loading") return null

  if (paymentStatus === "SUCCESS") {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 font-sans flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-2xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 rounded-3xl overflow-hidden text-center p-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-8">Thank you for your order. Your spices are being prepared.</p>
          <Button className="w-full rounded-xl" onClick={() => window.location.href = "/orders"}>
            View My Orders
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 font-sans">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row gap-8">
        
        {/* Left Col: Cart Items */}
        <div className="flex-1 space-y-6">
          <div className="mb-4">
             <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">Checkout</h1>
             <p className="text-gray-500">Review your cart before secure payment.</p>
          </div>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 rounded-3xl overflow-hidden">
             <CardHeader className="border-b border-gray-100 dark:border-gray-800/50">
               <CardTitle>Order Summary</CardTitle>
             </CardHeader>
             <CardContent className="p-0">
               {cartItems.length === 0 ? (
                 <div className="p-8 text-center text-gray-500">Your cart is empty.</div>
               ) : (
                 <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                   {cartItems.map((item) => (
                     <li key={item.id} className="p-6 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                     </li>
                   ))}
                 </ul>
               )}
             </CardContent>
          </Card>
        </div>

        {/* Right Col: Payment Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <Card className="border-0 shadow-xl bg-gray-900 text-white rounded-3xl overflow-hidden sticky top-24">
            <CardHeader className="pb-4">
               <CardTitle className="text-xl">Payment Details</CardTitle>
               <CardDescription className="text-gray-400">Secured via Razorpay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
              </div>
              <Separator className="bg-gray-700 my-4" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-900/50 border border-red-800 text-red-200 text-sm rounded-xl flex items-start gap-2 mt-4">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                onClick={handleCheckout} 
                disabled={isProcessing || cartItems.length === 0}
                className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-6 rounded-xl text-lg Group transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5 text-gray-500 group-hover:text-gray-900 transition-colors" />
                    Pay ₹{totalAmount.toLocaleString()}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

      </main>
    </div>
  )
}
