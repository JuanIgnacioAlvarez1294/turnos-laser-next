import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50 p-6">{children}</div>;
}