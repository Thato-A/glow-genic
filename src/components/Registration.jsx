import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Register({ onClose }) {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    email.includes("@") &&
    password.trim() !== "";

  const submit = () => {
    if (!isValid) return;
    register(name, email, password);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-md flex items-center justify-center p-6"
    >
      {/* MODAL BOX */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md relative"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-semibold text-teal-700 mb-8 text-center">
          Create Account
        </h2>

        {/* NAME FIELD */}
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-teal-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL FIELD */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-teal-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD FIELD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-xl focus:ring-2 focus:ring-teal-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* SUBMIT BUTTON */}
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
          Register
        </button>
      </motion.div>
    </motion.div>
  );
}
