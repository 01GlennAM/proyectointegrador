import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx"; // <-- 1. Importa la página de Inicio
import Productos from "./pages/Productos.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { DemoAuthProvider } from "./context/DemoAuthContext.jsx";
import Carrito from "./pages/Carrito.jsx";
import Acceso from "./pages/Acceso.jsx";
import ResumenCompra from "./pages/ResumenCompra.jsx";
import Graficos from "./components/Graficos/Graficos.jsx";

export default function AppRoutes() {
  return (
    <ThemeProvider>
      <CartProvider>
        <DemoAuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              {/* 2. La ruta raíz (/) ahora apunta a Home (la portada) */}
              <Route path="/" element={<Home />} />
              
              {/* 3. La ruta /productos mantiene el catálogo completo con filtros */}
              <Route path="/productos" element={<Productos />} />
              
              <Route path="/productos/:id" element={<ProductoDetalle />} />
              <Route path="/analisis" element={<Graficos />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/acceso" element={<Acceso />} />
              <Route path="/resumen" element={<ResumenCompra />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </DemoAuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}