import Sidebar_Alt from '@/components/sidebar/sidebar_alt';
import { ToastContainer } from 'react-toastify';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full bg-white flex">
      <Sidebar_Alt />
      <div className="w-full h-screen overflow-y-scroll scrollbar-hide">
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeButton
          rtl={false}
        />
      </div>
    </div>
  );
}
