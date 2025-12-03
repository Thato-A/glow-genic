import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Login from "./Login";
import Register from "./Registration";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Header({ onOpenCart }) {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <p className="text-2xl font-bold text-teal-700 cursor-pointer">
            Glow Genic
          </p>

          {/* CART ICON */}
          <div className="relative cursor-pointer" onClick={onOpenCart}>
            <FiShoppingCart size={26} />
            {count > 0 && (
              <span className="absolute -top-1 -right-2 bg-teal-600 text-white text-xs rounded-full px-2 py-0.5">
                {count}
              </span>
            )}
          </div>

          <div className="flex gap-4 items-center">
            {!user && (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-5 py-2 rounded-full border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition"
                >
                  Login
                </button>

                <button
                  onClick={() => setShowRegister(true)}
                  className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
                >
                  Sign Up
                </button>
              </>
            )}

            {user && (
              <div className="flex items-center gap-4">
                <span className="text-teal-700 font-medium">
                  Hi, {user.name}
                </span>

                <button
                  onClick={logout}
                  className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </>
  );
}
