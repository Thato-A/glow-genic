import { useState } from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Login from "./Login";
import Register from "./Registration";

export default function Header({ onOpenCart }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openLogin = () => {
    setMobileOpen(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setMobileOpen(false);
    setShowRegister(true);
  };

  const doLogout = () => {
    setMobileOpen(false);
    logout();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <p className="text-2xl font-bold text-teal-700 cursor-pointer">
            Glow Genic
          </p>

          {/* Right side: Cart + Auth */}
          <div className="flex items-center gap-4">
            {/* CART ICON */}
            <div className="relative cursor-pointer" onClick={onOpenCart}>
              <FiShoppingCart size={26} />
              {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-teal-600 text-white text-xs rounded-full px-2 py-0.5">
                  {count}
                </span>
              )}
            </div>

            {/* Desktop auth buttons (>=601px) */}
            <div className="hidden min-[601px]:flex gap-4 items-center">
              {!user ? (
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
              ) : (
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

            {/* Mobile hamburger (<601px) */}
            <button
              className="min-[601px]:hidden p-2 rounded-lg hover:bg-teal-50 transition"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="min-[601px]:hidden px-6 pb-4">
            <div className="bg-white rounded-2xl shadow-md border border-teal-50 p-4">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={openLogin}
                    className="w-full px-5 py-2 rounded-full border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition"
                  >
                    Login
                  </button>

                  <button
                    onClick={openRegister}
                    className="w-full px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <span className="text-teal-700 font-medium">
                    Hi, {user.name}
                  </span>
                  <button
                    onClick={doLogout}
                    className="w-full px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </>
  );
}
