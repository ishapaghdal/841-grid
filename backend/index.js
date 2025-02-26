const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const app = express();

// Initialize Razorpay with your key_id and key_secret
const razorpay = new Razorpay({
  key_id: "rzp_test_IlcVgSlMSz2lcS",
  key_secret: "UCkpGzQR6SvuVd8jx0bLj8kh",
});

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.post("/payment", async (req, res) => {
  try {
    const options = {
      amount: 10000, // amount in smallest currency unit (paise for INR)
      currency: "INR",
      receipt: "order_receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Verify payment after successful transaction
app.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Verify the payment signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", razorpay.key_secret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
