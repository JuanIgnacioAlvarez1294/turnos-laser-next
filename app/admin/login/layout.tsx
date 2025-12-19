export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rosa to-rosa-pastel flex items-center justify-center">
      {children}
    </div>
  );
}
