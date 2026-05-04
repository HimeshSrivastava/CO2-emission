"use client";

import Script from "next/script";
import { useState } from "react";

export default function PaymentButton() {
const [amount, setAmount] = useState<number | "">("");

const handlePayment = async () => {
  console.log("Sending amount:", amount);

  if (!amount || Number(amount) <= 0) {
    alert("Invalid amount");
    return;
  }

  const res = await fetch("http://localhost:4000/api/payment/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ amount: Number(amount) }),
  });

  if (!res.ok) {
    console.log("Backend failed");
    return;
  }

  const order = await res.json();
  console.log("Order from backend:", order);

  // 🔥 Razorpay check
  if (!(window as any).Razorpay) {
    alert("Razorpay not loaded");
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount: order.amount,
    currency: order.currency,
    order_id: order.id,

    handler: async function (response: any) {
      console.log("Payment success:", response);
    },

    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open(); // 🔥 MOST IMPORTANT LINE
};
  return (
    <>
      <Script
      src="https://checkout.razorpay.com/v1/checkout.js"
      strategy="lazyOnload"
      />
   <input
  type="number"
  placeholder="Enter amount"
  value={amount} 
  onChange = {(e) =>
    setAmount(e.target.value === "" ? "" : Number(e.target.value))
  }
/>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded-full text-lg"
      >
        Pay
      </button>
    </>
  );
}