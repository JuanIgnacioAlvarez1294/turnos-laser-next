export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* Quitamos el bg-gradient pesado y dejamos que el flex-grow del hijo trabaje */
    <div className="min-h-[70vh] w-full flex flex-col bg-white">
      {children}
    </div>
  );
}