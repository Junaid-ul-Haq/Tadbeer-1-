// frontend/services/safepayApi.js
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

/**
 * Create Safepay checkout session
 * @param {number} amount - Payment amount
 * @param {string} currency - Currency code (e.g., "PKR")
 */
export const createSafepayCheckout = async (amount = 3000, currency = "PKR") => {
  try {
    const res = await fetch(`${BASE_URL}/api/safepay/create-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create Safepay checkout session");
    }

    return data;
  } catch (err) {
    console.error("Safepay API Error:", err.message);
    throw err;
  }
};
