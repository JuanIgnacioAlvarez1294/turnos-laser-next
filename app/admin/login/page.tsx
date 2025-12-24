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
  <div className="
    min-h-screen
    bg-gradient-to-br from-rosa to-rosa-pastel
    flex items-center justify-center
    px-4
  ">
    <div className="
      w-full
      sm:max-w-md
      bg-white/90
      backdrop-blur-md
      shadow-2xl
      border border-rosa-pastel

      /* MOBILE */
      p-6
      rounded-xl

      /* DESKTOP */
      sm:p-10
      sm:rounded-2xl
      animate-fadeIn
    ">
      <h1 className="
        text-3xl
        font-bold
        text-center
        mb-6
        text-rosa-fuerte
      ">
        Panel Administrativo
      </h1>

      <form onSubmit={loginAdmin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Correo
          </label>
          <input
            type="email"
            required
            className="
              w-full
              p-4
              text-base
              border border-rosa-pastel
              rounded-xl
              mt-1
              focus:ring-2 focus:ring-rosa-fuerte
              outline-none
            "
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
            className="
              w-full
              p-4
              text-base
              border border-rosa-pastel
              rounded-xl
              mt-1
              focus:ring-2 focus:ring-rosa-fuerte
              outline-none
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            btn-principal
            py-4
            rounded-xl
            font-semibold
            shadow-md
          "
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-rosa-fuerte hover:underline cursor-pointer">
        ¿Olvidaste tu contraseña?
      </p>

      <p className="text-center mt-2 text-xs text-gray-500">
        Solo el administrador puede gestionar cuentas.
      </p>
    </div>
  </div>
);
}