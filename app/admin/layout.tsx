// app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    /* Quitamos min-h-screen y el fondo rosa para que el Footer suba */
    <div className="flex flex-col w-full bg-white">
       {children}
    </div>
  );
}