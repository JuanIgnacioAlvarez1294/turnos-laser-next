export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[70vh] w-full flex flex-col bg-white">
      {children}
    </div>
  );
}