import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useDemoAuth } from "../context/DemoAuthContext.jsx";
import ProductImage from "../components/ProductImage/ProductImage.jsx";
import { formatearPrecio } from "../utils/formatters.js";
import usePageTitle from "../hooks/usePageTitle.js";
import "./ResumenCompra.css";

export default function ResumenCompra() {
  usePageTitle("Resumen de compra");
  const { user } = useDemoAuth();
  const { items, total, itemCount } = useCart();

  if (!user) {
    return <Navigate to="/acceso" replace state={{ returnTo: "/resumen" }} />;
  }
  if (items.length === 0) {
    return <Navigate to="/carrito" replace />;
  }

  return (
    <section className="checkout-page">
      <header className="commerce-heading">
        <p className="commerce-eyebrow">Último paso</p>
        <h1>Resumen de compra</h1>
      </header>

      <div className="checkout-card">
        <p className="checkout-account">
          Sesión de demostración: <strong>{user.email}</strong>
        </p>
        <div className="checkout-lines">
          {items.map(({ product, quantity, subtotal }) => (
            <article className="checkout-line" key={product.id}>
              <ProductImage
                className="checkout-image"
                imagen={product.imagen}
                alt={product.nombre}
              />
              <div>
                <h2>{product.nombre}</h2>
                <p>{quantity} × {formatearPrecio(product.precio)}</p>
              </div>
              <strong>{formatearPrecio(subtotal)}</strong>
            </article>
          ))}
        </div>
        <div className="checkout-total">
          <span>Total ({itemCount} {itemCount === 1 ? "producto" : "productos"})</span>
          <strong>{formatearPrecio(total)}</strong>
        </div>
        <p className="checkout-disclaimer">
          Resumen únicamente informativo: no se procesa ningún pago ni se crea un pedido real.
        </p>
        <div className="checkout-actions">
          <Link className="checkout-back" to="/carrito">Regresar al carrito</Link>
          <Link className="commerce-button" to="/productos">Seguir comprando</Link>
        </div>
      </div>
    </section>
  );
}
