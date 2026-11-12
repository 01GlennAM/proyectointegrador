import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { formatearPrecio } from "../../utils/formatters";
import ProductImage from "../ProductImage/ProductImage.jsx";

export default function ProductCard({ producto }) {
  const sinStock = producto.stock === 0;
  const [mensaje, setMensaje] = useState("");
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link className="product-card-link" to={`/productos/${producto.id}`}>
        <div className="product-imagen">
          <ProductImage imagen={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="product-main">
          <span className="product-categoria">{producto.categoria}</span>
          <h3>{producto.nombre}</h3>
          <p className="product-precio">{formatearPrecio(producto.precio)}</p>
          {sinStock && <span className="badge-agotado">Agotado</span>}
        </div>
      </Link>
      <div className="product-main">
        <button
          className="add-to-cart-button"
          type="button"
          disabled={sinStock}
          onClick={() => setMensaje(addToCart(producto) || `${producto.nombre} agregado al carrito.`)}
        >
          {sinStock ? "Agotado" : "Agregar al carrito"}
        </button>
        {mensaje && <p className="cart-feedback" role="status">{mensaje}</p>}
      </div>
    </article>
  );
}