import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProductoPorId } from "../services/productosService";
import { formatearPrecio } from "../utils/formatters";
import { useCart } from "../context/CartContext.jsx";
import ProductImage from "../components/ProductImage/ProductImage.jsx";
import Loader from "../components/Loader/Loader";
import usePageTitle from "../hooks/usePageTitle";
import "./ProductoDetalle.css";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [resultado, setResultado] = useState({ id: null, producto: null, cargando: true });
  const [mensajeCarrito, setMensajeCarrito] = useState("");
  const { addToCart } = useCart();
  const { producto, cargando } = resultado;

  usePageTitle(producto?.nombre || "Detalle del producto");

  useEffect(() => {
    let activo = true;
    obtenerProductoPorId(id).then((data) => {
      if (activo) {
        setResultado({ id, producto: data, cargando: false });
      }
    });
    return () => {
      activo = false;
    };
  }, [id]);

  if (resultado.id !== id || cargando) {
    return <Loader />;
  }

  if (!producto) {
    return (
      <section className="detail-content">
        <p className="page-message">Producto no encontrado.</p>
        <Link className="text-link" to="/productos">Volver al catálogo</Link>
      </section>
    );
  }

  const sinStock = producto.stock === 0;

  return (
    <section className="detail-content">
      <div className="detail-imagen-wrap">
        <ProductImage imagen={producto.imagen} alt={producto.nombre} />
      </div>

      <div className="detail-info">
        <span className="product-categoria">{producto.categoria}</span>
        <h2>{producto.nombre}</h2>
        <span className="product-precio">{formatearPrecio(producto.precio)}</span>
        <p className="detail-desc">{producto.descripcion}</p>
        <p className="detail-option"><strong>Tallas:</strong> {producto.tallas.join(", ")}</p>
        <p className="detail-option"><strong>Colores:</strong> {producto.colores.join(", ")}</p>
        <p className={`stock-msg ${sinStock ? "agotado" : "disponible"}`}>
          {sinStock ? "Producto agotado" : `${producto.stock} disponibles`}
        </p>
        <button
          className="add-to-cart-button detail-add-button"
          type="button"
          disabled={sinStock}
          onClick={() => setMensajeCarrito(
            addToCart(producto) || `${producto.nombre} agregado al carrito.`,
          )}
        >
          {sinStock ? "Agotado" : "Agregar al carrito"}
        </button>
        {mensajeCarrito && <p className="cart-feedback" role="status">{mensajeCarrito}</p>}
        <Link className="text-link" to="/productos">Volver al catálogo</Link>
      </div>
    </section>
  );
}