import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  function handleBuscar(e) {
    if (e.key === "Enter") {
      const search = e.currentTarget.value.trim();
      navigate(search ? `/productos?buscar=${encodeURIComponent(search)}` : "/productos");
    }
  }

  return (
    <header className="site-header">
      <nav className="topbar" aria-label="Navegación principal">
        <Link className="logo-text" to="/" aria-label="Tienda Creativa, ir al inicio">
          Tienda <span className="logo-accent">Creativa</span>
        </Link>
        <div className="topbar-search">
          <input
            type="text"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            onKeyDown={handleBuscar}
          />
        </div>
        <div className="nav-actions">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/productos" className="nav-link">Productos</Link>
          <Link to="/analisis" className="nav-link">Análisis</Link>
          <Link to="/carrito" className="nav-link cart-nav-link">
            Carrito{itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`}
            aria-pressed={theme === "dark"}
            title={`Tema ${theme === "light" ? "oscuro" : "claro"}`}
          >
            <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}