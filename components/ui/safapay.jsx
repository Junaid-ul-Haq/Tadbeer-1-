"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSafepayCheckout } from "@/services/safepayApi"; // ✅ API call

export default function SafepayButton() {
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState(3000);
  const [currency, setCurrency] = useState("PKR");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // ✅ Handle Safepay redirect response
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const status = query.get("status"); // e.g. ?status=success or ?status=failed

    if (status === "success") {
      alert("✅ Payment successful! Redirecting to dashboard...");
      router.push("/dashboard");
    } else if (status === "failed") {
      alert("❌ Error in payment. Please try again.");
      // Reopen Safepay checkout if failed
      handlePayment();
    }
  }, []);

  // ✅ Payment handler
  const handlePayment = async () => {
    setError("");

    // Input validation
    if (!cardType || !cardNumber || !expiryDate || !cvv) {
      setError("Please fill all required fields");
      return;
    }
    const cleanCardNumber = cardNumber.replace(/\s/g, "");
    if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      setError("Please enter a valid card number (13–19 digits)");
      return;
    }
    if (cvv.length !== 3) {
      setError("CVV must be exactly 3 digits");
      return;
    }
    if (expiryDate.length !== 4) {
      setError("Expiry must be 4 digits (MMYY)");
      return;
    }

    // ✅ Call backend Safepay API
    setIsLoading(true);
    try {
      const response = await createSafepayCheckout(amount, currency);

      if (response && response.checkoutUrl) {
        // Append success/fail redirect URLs for Safepay callback
        const successUrl = `${window.location.origin}/safepay?status=success`;
        const failUrl = `${window.location.origin}/safepay?status=failed`;
        const redirectUrl = `${response.checkoutUrl}?redirect_url=${encodeURIComponent(
          successUrl
        )}&cancel_url=${encodeURIComponent(failUrl)}`;

        window.location.href = redirectUrl;
      } else {
        throw new Error("Payment session could not be created");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError(err.message || "Error creating payment session");
    } finally {
      setIsLoading(false);
    }
  };

  // Format card number and expiry
  const formatCardNumber = (v) => {
    v = v.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
    return parts.join(" ");
  };

  const formatExpiryDate = (v) => v.replace(/\D/g, "").slice(0, 4);

  // ✅ UI Rendering
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black py-10 px-4 font-sans">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-teal-400 overflow-hidden transform transition-all hover:scale-[1.01]">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-teal-600 text-white text-center py-6 px-5 border-b border-teal-400">
          <h1 className="text-3xl font-bold mb-1 tracking-tight">Safepay Checkout</h1>
          <p className="text-sm opacity-90">
            Secure, seamless and modern online payments
          </p>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start gap-2 shadow-sm">
              <span>⚠️</span>
              <span>
                <strong>Error:</strong> {error}
              </span>
            </div>
          )}

          <div className="space-y-5">
            {/* Card Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Card Type *</label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="">Select Card Type</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="UnionPay">UnionPay</option>
                <option value="American Express">American Express</option>
              </select>
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Card Number *</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={23}
                className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Expiry Date (MMYY) *</label>
                <input
                  type="text"
                  placeholder="MMYY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength={4}
                  className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">CVV *</label>
                <input
                  type="password"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  maxLength={3}
                  className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Amount ({currency}) *
              </label>
              <input
                type="text"
                value={`${amount} ${currency}`}
                readOnly
                className="w-full border border-gray-300 text-black bg-gray-100 rounded-lg px-3 py-2 focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-white text-lg tracking-wide transition shadow-md ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-900 to-teal-600 hover:opacity-90"
              }`}
            >
              {isLoading ? "⏳ Processing..." : "💳 Pay Now"}
            </button>

            <p className="text-sm text-gray-600 text-center mt-2">
              🔒 Your payment is secure and encrypted
            </p>
          </div>
        </div>

        {/* Sandbox Info */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-t border-teal-400 px-6 py-4">
          <p className="text-gray-700 font-semibold text-sm mb-2">🧪 Sandbox Test Cards</p>
          <ul className="text-xs text-gray-600 space-y-1 font-mono">
            <li><strong>Visa:</strong> 4111 1111 1111 1111</li>
            <li><strong>MasterCard:</strong> 5555 5555 5555 4444</li>
            <li><strong>Expiry:</strong> Any future date (MMYY)</li>
            <li><strong>CVV:</strong> Any 3 digits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
