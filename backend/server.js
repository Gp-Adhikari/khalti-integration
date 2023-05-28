const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/payment/initiate", async (req, res) => {
  try {
    const { return_url, website_url, amount, purchase_order_id } = req.body;

    const liveSecretKey = "**Secret Key**"; // -- Used to contain secret key but removed to push on github -- //

    const response = await axios.post(
      "https://khalti.com/api/v2/epayment/initiate/",
      {
        return_url,
        website_url,
        amount,
        purchase_order_id,
      },
      {
        headers: {
          Authorization: `Key ${liveSecretKey}`,
        },
      }
    );

    console.log(response);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "Payment Failed",
      error: err.message,
    });
  }
});

app.get("/payment-callback", (req, res) => {
  // Extract callback parameters from req.query
  const {
    pidx,
    transaction_id,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
  } = req.query;

  // Handle payment confirmation and further processing

  res.send("Payment callback received");
});

app.listen(8000, () => {
  console.log("Server listening on http://localhost:8000/");
});
