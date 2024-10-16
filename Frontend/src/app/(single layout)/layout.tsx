import Header from "@/components/head/header";
import Sidebar from "@/components/sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full bg-white flex">
      <Sidebar/>
       <div className="w-full">
        {children}
      </div>
    </div>
  );
}
