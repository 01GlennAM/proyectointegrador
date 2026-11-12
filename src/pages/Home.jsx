import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../services/productosService";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import usePageTitle from "../hooks/usePageTitle";
import "./Home.css";

const CATEGORIAS = [
  { 
    nombre: "Tenis", 
    imagen: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", 
    desc: "Calzado urbano y de alto rendimiento" 
  },
  { 
    nombre: "Gorras", 
    imagen: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop", 
    desc: "Estilo y protección para la calle" 
  },
  { 
    nombre: "Camisetas", 
    imagen: "https://images.unsplash.com/photo-1773525912586-fbc51bbe0fdf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", 
    desc: "Diseños exclusivos y minimalistas" 
  },
  { 
    nombre: "Hoodies", 
    imagen: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop", 
    desc: "Comodidad y abrigo con actitud" 
  },
  { 
    nombre: "Accesorios", 
    imagen: "https://images.unsplash.com/photo-1770331168808-18b4ec8643f7?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", 
    desc: "Complementos para tu día a día" 
  }
];

export default function Home() {
  usePageTitle("Inicio");
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    obtenerProductos().then((productos) => {
      if (activo) {
        setDestacados(productos.slice(0, 4));
        setCargando(false);
      }
    });
    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="home-container">
      {/* HERO BANNER */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-badge">Nueva Colección 2026</span>
          <h1>Estilo urbano, <br /><span>sin límites.</span></h1>
          <p>
            Eleva tu estilo con nuestra selección exclusiva de sneakers, hoodies y accesorios diseñados para la calle.
          </p>
          <div className="hero-actions">
            <Link to="/productos" className="btn-primary-hero">
              Ver Catálogo
            </Link>
            <Link to="/productos?categoria=Tenis" className="btn-secondary-hero">
              Explorar Tenis
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE CATEGORÍAS CON FOTOS REALES */}
      <section className="home-section">
        <div className="section-header-center">
          <h2>Explora por Categoría</h2>
          <p>Encuentra exactamente lo que define tu estilo</p>
        </div>
        
        <div className="category-grid-home">
          {CATEGORIAS.map((cat) => (
            <Link 
              key={cat.nombre} 
              className="category-card-img" 
              to={`/productos?categoria=${cat.nombre}`}
            >
              <div className="cat-bg-image" style={{ backgroundImage: `url(${cat.imagen})` }}></div>
              <div className="cat-overlay"></div>
              <div className="cat-info-content">
                <h3>{cat.nombre}</h3>
                <p>{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BANNER PROMOCIONAL */}
      <section className="promo-banner">
        <div className="promo-text">
          <h3>Envío gratis en compras superiores a $200.000 COP</h3>
          <p>Renueva tu armario con las tendencias de temporada.</p>
        </div>
        <Link to="/productos" className="promo-btn">Comprar Ahora</Link>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="home-section">
        <div className="section-header-center">
          <h2>Los Más Vendidos</h2>
          <p>Nuestros lanzamientos favoritos del mes</p>
        </div>

        {cargando ? (
          <p className="page-message" role="status">Cargando destacados...</p>
        ) : (
          <ProductGrid productos={destacados} emptyMessage="No hay productos disponibles." />
        )}

        <div className="center-action">
          <Link to="/productos" className="btn-ver-todos">
            Ver todos los productos →
          </Link>
        </div>
      </section>
    </div>
  );
}