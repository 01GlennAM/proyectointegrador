import { Link } from "react-router-dom";
import "./Footer.css";

// Íconos SVG propios (sin librerías) para las redes sociales.
const REDES = [
  {
    nombre: "Instagram",
    clase: "instagram",
    url: "https://instagram.com",
    icono: (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    nombre: "Facebook",
    clase: "facebook",
    url: "https://facebook.com",
    icono: (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M13.5 21v-7.5h2.6l.4-3.1h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.9v3.1h2.6V21h3z" />
      </svg>
    ),
  },
  {
    nombre: "X",
    clase: "x",
    url: "https://x.com",
    icono: (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
      </svg>
    ),
  },
  {
    nombre: "TikTok",
    clase: "tiktok",
    url: "https://tiktok.com",
    icono: (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 5 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.3-1.6z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <p className="footer-logo">Tienda <span>Creativa</span></p>
          <p className="footer-desc">Moda urbana: tenis, hoodies y accesorios.</p>
        </div>

        <nav className="footer-links" aria-label="Enlaces del pie de página">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/analisis">Análisis</Link>
          <Link to="/carrito">Carrito</Link>
        </nav>

        <div className="social-icons">
          {REDES.map((red) => (
            <a
              key={red.nombre}
              className={`social-${red.clase}`}
              href={red.url}
              target="_blank"
              rel="noreferrer"
              aria-label={red.nombre}
              title={red.nombre}
            >
              {red.icono}
            </a>
          ))}
        </div>
      </div>

      <p className="footer-bottom">© 2026 Tienda Creativa · Proyecto académico</p>
    </footer>
  );
}
