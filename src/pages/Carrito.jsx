import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useDemoAuth } from "../context/DemoAuthContext.jsx";
import ProductImage from "../components/ProductImage/ProductImage.jsx";
import { formatearPrecio } from "../utils/formatters.js";
import usePageTitle from "../hooks/usePageTitle.js";
import "./Carrito.css";

export default function Carrito() {
  usePageTitle("Carrito");
  const { items, total, itemCount, updateQuantity, removeFromCart } = useCart();
  const { user } = useDemoAuth();
  const navigate = useNavigate();

  function handleCheckout() {
    navigate(user ? "/resumen" : "/acceso", {
      state: user ? undefined : { returnTo: "/resumen" },
    });
  }

  return (
    <section className="cart-page">
      <header className="commerce-heading">
        <p className="commerce-eyebrow">Tu selección</p>
        <h1>Carrito de compras</h1>
      </header>

      {items.length === 0 ? (
        <div className="commerce-empty">
          <p>Tu carrito está vacío.</p>
          <Link className="commerce-button" to="/productos">Seguir comprando</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items" aria-label="Productos en el carrito">
            {items.map(({ product, quantity, subtotal }) => (
              <article className="cart-item" key={product.id}>
                <ProductImage
                  className="cart-item-image"
                  imagen={product.imagen}
                  alt={product.nombre}
                />
                <div className="cart-item-details">
                  <h2>{product.nombre}</h2>
                  <p>Precio unitario: {formatearPrecio(product.precio)}</p>
                  <p>Subtotal: <strong>{formatearPrecio(subtotal)}</strong></p>
                  <div className="cart-quantity">
                    <span>Cantidad</span>
                    <button
                      type="button"
                      aria-label={`Disminuir cantidad de ${product.nombre}`}
                      disabled={quantity <= 1}
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      −
                    </button>
                    <span aria-live="polite">{quantity}</span>
                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${product.nombre}`}
                      disabled={quantity >= product.stock}
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-remove"
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Resumen</h2>
            <p>{itemCount} {itemCount === 1 ? "producto" : "productos"}</p>
            <p className="cart-total">Total <strong>{formatearPrecio(total)}</strong></p>
            <button className="commerce-button" type="button" onClick={handleCheckout}>
              Pagar / Finalizar compra
            </button>
            <Link className="commerce-secondary-link" to="/productos">Seguir comprando</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
