// "use client";

// import Script from "next/script";

// export default function PaymentButton({ userId, amount }: any) {

//   const handlePayment = async () => {
//     if (!(window as any).Razorpay) {
//       alert("Razorpay not loaded");
//       return;
//     }

//     const res = await fetch("http://localhost:4000/api/payment/create-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ amount }),
//     });

//     const order = await res.json();

//     const rzp = new (window as any).Razorpay({
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//       amount: order.amount,
//       order_id: order.id,
//       handler: async (response: any) => {
//         await fetch("http://localhost:4000/api/payment/verify", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             ...response,
//             userId,
//             amount,
//           }),
//         });

//         alert("Payment Successful 🎉");
//       },
//     });

//     rzp.open();
//   };

//   return (
//     <>
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" />

//       <button
//         onClick={handlePayment}
//         className="bg-green-600 text-white px-6 py-3 rounded-full"
//       >
//         Pay ₹{amount}
//       </button>
//     </>
//   );
// }

"use client";

import Script from "next/script";

export default function PaymentButton({ amount }: { amount: number }) {
  const handlePayment = async () => {
    const res = await fetch("http://localhost:4000/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();

    if (!(window as any).Razorpay) {
      alert("Razorpay not loaded");
      return;
    }

    const rzp = new (window as any).Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: order.amount,
      order_id: order.id,

      handler: function (response: any) {
        console.log("Payment Success:", response);
        alert("Payment Successful 🎉");
      },
    });

    rzp.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded-full text-lg"
      >
        Pay ₹{amount}
      </button>
    </>
  );
}