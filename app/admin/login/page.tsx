"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Bienvenido administrador");
      router.push("/admin");
    } catch (error: any) {
      toast.error("Credenciales incorrectas");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rosa to-rosa-pastel flex items-center justify-center p-4">

      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fadeIn border border-rosa-pastel">
        <h1 className="text-3xl font-bold text-center mb-6 text-rosa-fuerte">
          Panel Administrativo
        </h1>

        <form onSubmit={loginAdmin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              required
              className="w-full p-3 border border-rosa-pastel rounded-xl mt-1 focus:ring-2 focus:ring-rosa-fuerte outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              required
              className="w-full p-3 border border-rosa-pastel rounded-xl mt-1 focus:ring-2 focus:ring-rosa-fuerte outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full btn-principal py-3 rounded-xl font-semibold transition shadow-md"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-rosa-fuerte font-medium cursor-pointer hover:underline">
          ¿Olvidaste tu contraseña?
        </p>

        <p className="text-center mt-2 text-sm text-gray-500">
          Solo el administrador puede gestionar cuentas.
        </p>
      </div>
    </div>
  );
}