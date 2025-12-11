export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-rosa-fondo p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-rosa-pastel">
        {children}
      </div>
    </div>
  );
}
