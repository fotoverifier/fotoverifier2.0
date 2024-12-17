import Home_Header from "@/components/head/head_home";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen">
      <Home_Header/>
      <div className="w-full h-[91.5%]">
        {children}
      </div>
    </div>
  );
}
