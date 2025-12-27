import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login({ onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid =
    email.trim() !== "" && password.trim() !== "" && email.includes("@");

  const submit = async () => {
    if (!isValid) return;
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-md flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-semibold text-teal-700 mb-8 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-teal-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-xl focus:ring-2 focus:ring-teal-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={!isValid}
          className={`w-full py-3 rounded-full text-white transition 
            ${
              isValid
                ? "bg-teal-600 hover:bg-teal-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          Login
        </button>
      </motion.div>
    </motion.div>
  );
}
