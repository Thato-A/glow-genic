import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Hero from "./Hero";
import SkinFlow from "./SkinFlow";
import Testimonials from "./Testimonials";
import SkinDiary from "./SkinDiary";
import Login from "./Login";
import Contact from "./Contact";
import Footer from "./Footer";
import ShoppingCart from "./ShoppingCart";
import CheckoutPage from "./CheckoutPage.jsx";

export default function App() {
  const { user } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckoutPage, setShowCheckoutPage] = useState(false);

  return (
    <>
      <Header onOpenCart={() => setShowCart(true)} />
      <Hero />
      <SkinFlow />
      <SkinDiary onLogin={() => setShowLogin(true)} />
      <Testimonials />
      <Contact />
      <Footer />

      {/* LOGIN MODAL */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}

      {/* SHOPPING CART */}
      {showCart && (
        <ShoppingCart
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckoutPage(true);
          }}
        />
      )}

      {/* FINAL CHECKOUT PAGE */}
      {showCheckoutPage && (
        <CheckoutPage onClose={() => setShowCheckoutPage(false)} />
      )}
    </>
  );
}
