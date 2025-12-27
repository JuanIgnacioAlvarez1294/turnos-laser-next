"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
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
    } catch {
      toast.error("Credenciales incorrectas");
    }
    setLoading(false);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center w-full bg-white px-0 sm:px-4 py-6">
      
      <div className="
        w-[90%] sm:max-w-[400px] 
        bg-white 
        border-none sm:border sm:border-rosa-pastel 
        shadow-none sm:shadow-xl 
        rounded-none sm:rounded-3xl 
        p-4 sm:p-10
      ">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-rosa-fuerte mb-8">
          Panel Administrativo
        </h1>

        <form onSubmit={loginAdmin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-1">
              Correo
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-rosa-pastel rounded-2xl focus:ring-2 focus:ring-rosa-fuerte outline-none transition-all text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-rosa-pastel rounded-2xl focus:ring-2 focus:ring-rosa-fuerte outline-none transition-all text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rosa-fuerte text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-rosa-fuerte/20 active:scale-[0.98] transition-all"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-rosa-fuerte font-medium hover:underline cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Acceso administrativo restringido
          </p>
        </div>
      </div>
    </div>
  );
}