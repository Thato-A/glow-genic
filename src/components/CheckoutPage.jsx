import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function CheckoutPage({ onClose }) {
  const { cart } = useCart();
  const { user } = useAuth();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal >= 70 ? 0 : 7.99;
  const total = subtotal + tax + shipping;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handlePlaceOrder = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Order Placed Successfully!");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-white z-[9999] overflow-y-auto pt-24 px-6 pb-20">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 text-gray-500 hover:text-gray-700 text-3xl"
      >
        ×
      </button>

      <h1 className="text-3xl font-bold text-teal-700 mb-10 text-center">
        Checkout
      </h1>

      {/* TWO COLUMN LAYOUT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE — SHIPPING FORM */}
        <div className="space-y-6 bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Shipping Information
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="border p-3 rounded-lg w-full"
            />

            {!user && (
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="border p-3 rounded-lg w-full"
              />
            )}

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="border p-3 rounded-lg w-full"
            />

            <input
              type="text"
              placeholder="Street Address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="border p-3 rounded-lg w-full"
            />

            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="border p-3 rounded-lg w-full"
              />

              <input
                type="text"
                placeholder="State"
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                className="border p-3 rounded-lg w-full"
              />

              <input
                type="text"
                placeholder="ZIP"
                value={form.zip}
                onChange={(e) => updateField("zip", e.target.value)}
                className="border p-3 rounded-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY + PAYMENT */}
        <div className="space-y-6 bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          {subtotal < 70 && (
            <p className="text-sm text-teal-700 mb-4 font-medium">
              Spend ${(70 - subtotal).toFixed(2)} more to get{" "}
              <span className="font-bold">FREE Shipping</span>!
            </p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-gray-700 mb-2"
            >
              <p>
                {item.name} × {item.quantity}
              </p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <hr />

          <div className="flex justify-between text-gray-700">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-gray-700">
            <p>Tax</p>
            <p>${tax.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-gray-700 mb-6">
            <p>Shipping</p>
            <p className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600 font-semibold">FREE</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </p>
          </div>

          <div className="flex justify-between text-gray-900 font-bold text-lg mb-6">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>

          {/* PAYMENT METHODS */}
          <h2 className="text-xl font-semibold text-gray-800">
            Payment Options
          </h2>

          {/* APPLE PAY */}
          <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2">
            <img src="/applepay-dark.png" className="h-6" />
            Apple Pay
          </button>

          {/* GOOGLE PAY */}
          <button className="w-full py-3 bg-white border rounded-lg font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2">
            <img src="/googlepay.png" className="h-6" />
            Google Pay
          </button>

          {/* VENMO */}
          <button className="w-full py-3 bg-[#3D95CE] text-white rounded-lg font-medium hover:bg-[#2f78a7] transition flex items-center justify-center gap-2">
            <img src="/venmo-blue.png" className="h-6" />
            Pay with Venmo
          </button>

          <div className="flex items-center gap-3 my-4">
            <hr className="flex-1 border-gray-300" />
            <p className="text-gray-500 text-sm">OR</p>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* CREDIT CARD FORM */}
          <h2 className="text-xl font-semibold text-gray-800">Card Details</h2>

          <input
            type="text"
            maxLength={19}
            placeholder="Card Number"
            value={form.cardNumber}
            onChange={(e) => updateField("cardNumber", e.target.value)}
            className="border p-3 rounded-lg w-full mt-3"
          />

          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={(e) => updateField("expiry", e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="CVV"
              maxLength={4}
              value={form.cvv}
              onChange={(e) => updateField("cvv", e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* SMART BUTTON — LOGGED IN / GUEST */}
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition
        ${loading ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"}`}
          >
            {loading ? "Processing..." : user ? "Pay Now" : "Checkout as Guest"}
          </button>
        </div>
      </div>
    </div>
  );
}
