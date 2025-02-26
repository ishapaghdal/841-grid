const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OxtidSDwlSbyHjRmqT14uNOJllqzyxhiQr0w9TjPSZZBaLzdNh1SWnqGxVVIicllR4yV2tpaCoSGqlyvLgy5Vuk00X6thHfPj"
);
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.post("/payment", async (req, res) => {

    console.log("Inside payment");
    
  const product = await stripe.products.create({
    name: "Contributor",
  });
  if (product) {
    var price = await stripe.prices.create({
      product: product.id,
      unit_amount: 100 * 100,
      currency: "usd",
    });
  }

  if (price.id) {
    var session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: `${price.id}`,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/",
      cancel_url: "http://localhost:5173/",
      customer_email: "isha@gmail.com",
    });
  }

//   console.log(res.json(session));
  

  res.json(session);
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
