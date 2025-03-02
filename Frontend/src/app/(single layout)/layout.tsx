import Header from "@/components/head/header";
import Sidebar from "@/components/sidebar";
import Sidebar_Alt from "@/components/sidebar_alt";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full bg-white flex">
      <Sidebar_Alt/>
       <div className="w-full">
        {children}
      </div>
    </div>
  );
}
