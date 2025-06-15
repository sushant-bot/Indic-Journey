"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Shield, Lock, CheckCircle } from "lucide-react"

export function PaymentGateway() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert("Payment successful!")
    }, 3000)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold font-poppins flex items-center">
            <Shield className="mr-3 h-6 w-6" />
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Payment Method</Label>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className="h-16 flex flex-col items-center justify-center"
              >
                <CreditCard className="h-6 w-6 mb-1" />
                <span className="text-sm">Card</span>
              </Button>
              <Button
                variant={paymentMethod === "upi" ? "default" : "outline"}
                onClick={() => setPaymentMethod("upi")}
                className="h-16 flex flex-col items-center justify-center"
              >
                <span className="text-lg mb-1">📱</span>
                <span className="text-sm">UPI</span>
              </Button>
              <Button
                variant={paymentMethod === "netbanking" ? "default" : "outline"}
                onClick={() => setPaymentMethod("netbanking")}
                className="h-16 flex flex-col items-center justify-center"
              >
                <span className="text-lg mb-1">🏦</span>
                <span className="text-sm">Net Banking</span>
              </Button>
            </div>
          </div>

          {/* Card Payment Form */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" className="mt-2" />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input id="cardName" placeholder="John Doe" className="mt-2" />
              </div>
            </div>
          )}

          {/* UPI Payment */}
          {paymentMethod === "upi" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <Input id="upiId" placeholder="yourname@paytm" className="mt-2" />
              </div>
            </div>
          )}

          {/* Net Banking */}
          {paymentMethod === "netbanking" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="bank">Select Bank</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sbi">State Bank of India</SelectItem>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="axis">Axis Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Security Features */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-green-700">
              <Lock className="h-5 w-5" />
              <span className="font-semibold">Your payment is secured with 256-bit SSL encryption</span>
            </div>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg font-semibold"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Pay ₹25,000
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
