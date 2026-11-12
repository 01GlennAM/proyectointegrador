import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({ productos, emptyMessage }) {
  if (productos.length === 0) {
    return <p className="estado-vacio">{emptyMessage}</p>;
  }

  return (
    <div className="products-grid">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}