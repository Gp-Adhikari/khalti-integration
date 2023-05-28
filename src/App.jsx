import { useState } from "react";

const App = () => {
  const [purchaseOrder, setPurchaseOrder] = useState("Tier 1");
  const [amount, setAmount] = useState("1000");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/payment/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            return_url: "http://localhost:8000/payment-callback",
            website_url: "https://example.com",
            amount: parseInt(amount) * 100,
            purchase_order_id: purchaseOrder,
          }),
        }
      );

      const data = await response.json();
      const { payment_url } = data;
      window.location.href = payment_url;
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={purchaseOrder}
        onChange={(e) => setPurchaseOrder(e.target.value)}
        placeholder="Purchase Order ID"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />

      <button type="submit">Pay with Khalti</button>
    </form>
  );
};

export default App;
