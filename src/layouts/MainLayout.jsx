import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import WhatsAppButton from "../components/WhatsAppButton";



export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="main-layout-content">
        <Outlet />
        <WhatsAppButton />
      </main>
      <Footer />
    </>
  );
}