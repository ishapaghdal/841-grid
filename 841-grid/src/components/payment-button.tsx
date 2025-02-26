export function PaymentButton() {
  const handlePayment = async () => {
    try {
      // First, create an order on the server
      const response = await fetch("http://localhost:3000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const order = await response.json();

      // Load Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: "rzp_test_IlcVgSlMSz2lcS", // Replace with your Razorpay key_id
          amount: order.amount,
          currency: order.currency,
          name: "841 Grid Project",
          description: "Grid Cell Contribution",
          order_id: order.id,
          handler: async function (response: any) {
            try {
              // Verify the payment on the server
              const verifyResponse = await fetch(
                "http://localhost:3000/verify-payment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                }
              );

              const result = await verifyResponse.json();
              if (result.success) {
                alert("Payment successful!");
                // Handle successful payment (e.g., update UI, redirect, etc.)
              }
            } catch (error) {
              console.error("Payment verification failed:", error);
              alert("Payment verification failed");
            }
          },
          prefill: {
            name: "", // Can be populated with user data if available
            email: "",
            contact: "",
          },
          theme: {
            color: "#9333EA", // Matches your purple gradient
          },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      };

      script.onerror = () => {
        alert("Failed to load Razorpay checkout. Please try again.");
      };
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-16">
      <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
        <div className="text-center">
          <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-4">
            Support the Journey
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Help me reach my $1,000,000 goal by contributing to a cell
          </p>
          <button
            onClick={handlePayment}
            className="
              bg-gradient-to-r from-purple-600 to-orange-500
              text-white
              font-semibold
              py-3 px-8
              rounded-xl
              shadow-lg
              transform transition-all duration-300
              hover:scale-105
              hover:shadow-xl
              active:scale-95
            "
          >
            Make a Contribution
          </button>
        </div>
      </div>
    </div>
  );
}
