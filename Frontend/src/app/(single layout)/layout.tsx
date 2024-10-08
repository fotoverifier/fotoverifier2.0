import Header from "@/components/head/header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full bg-white">
      <Header />
      {children}
    </div>
  );
}
