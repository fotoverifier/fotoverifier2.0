import Sidebar from "@/components/sidebar";
import Banner from "@/components/banner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <div className="w-full">
        <Banner />
        {children}
      </div>
    </div>
  );
}
