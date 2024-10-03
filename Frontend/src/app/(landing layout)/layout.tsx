import Home_Header from "@/components/head/head_home";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen">
      <Home_Header/>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
