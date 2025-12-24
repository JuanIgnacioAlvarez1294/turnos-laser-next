import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);