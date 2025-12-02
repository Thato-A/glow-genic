import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register({ onClose }) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    register(email, password);
    onClose();
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="bg-white/90 shadow-xl p-10 rounded-3xl max-w-md w-full">
        <h2 className="text-3xl font-semibold text-teal-700 mb-8">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-xl"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-xl"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700"
        >
          Register
        </button>

        <button onClick={onClose} className="mt-4 text-gray-500 underline">
          Cancel
        </button>
      </div>
    </section>
  );
}
