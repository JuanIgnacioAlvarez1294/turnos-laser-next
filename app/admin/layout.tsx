// app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full bg-white">
       {children}
    </div>
  );
}