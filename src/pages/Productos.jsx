import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { obtenerProductos } from "../services/productosService";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import usePageTitle from "../hooks/usePageTitle";
import "./Productos.css";

const CATEGORIAS = ["todas", "Tenis", "Gorras", "Camisetas", "Hoodies", "Accesorios"];

/**
 * Reemplaza productos.html + productos.js. Filtros, búsqueda y
 * orden ahora viven en searchParams (?categoria=, ?buscar=) en
 * vez de leerse una sola vez al cargar la página, así que quedan
 * sincronizados con la URL igual que el comportamiento original
 * de "venir con un filtro preseleccionado".
 */
export default function Productos() {
  usePageTitle("Productos");
  const [searchParams, setSearchParams] = useSearchParams();
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const categoriaActiva = searchParams.get("categoria") || "todas";
  const textoBusqueda = searchParams.get("buscar") || "";
  const orden = searchParams.get("orden") || "relevancia";

  useEffect(() => {
    let activo = true;
    obtenerProductos().then((productos) => {
      if (activo) {
        setTodosLosProductos(productos);
        setCargando(false);
      }
    });
    return () => {
      activo = false;
    };
  }, []);

  const productosFiltrados = useMemo(() => {
    let resultado = todosLosProductos.filter((p) => {
      const coincideCategoria = categoriaActiva === "todas" || p.categoria === categoriaActiva;
      const coincideTexto = p.nombre.toLowerCase().includes(textoBusqueda.trim().toLowerCase());
      return coincideCategoria && coincideTexto;
    });

    if (orden === "precio-asc") resultado = [...resultado].sort((a, b) => a.precio - b.precio);
    if (orden === "precio-desc") resultado = [...resultado].sort((a, b) => b.precio - a.precio);

    return resultado;
  }, [todosLosProductos, categoriaActiva, textoBusqueda, orden]);

  function actualizarParam(clave, valor) {
    const nuevos = new URLSearchParams(searchParams);
    if (valor) {
      nuevos.set(clave, valor);
    } else {
      nuevos.delete(clave);
    }
    setSearchParams(nuevos);
  }

  return (
    <>
      <div className="filtros-bar">
        <div className="filtros-categorias">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              className={`btn-filtro ${categoriaActiva === cat ? "active" : ""}`}
              onClick={() => actualizarParam("categoria", cat === "todas" ? null : cat)}
            >
              {cat === "todas" ? "Todas" : cat}
            </button>
          ))}
        </div>


        <select value={orden} onChange={(e) => actualizarParam("orden", e.target.value)}>
          <option value="relevancia">Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
        </select>
      </div>

      {cargando ? <p className="page-message" role="status">Cargando productos...</p> : (
        <ProductGrid
          productos={productosFiltrados}
          emptyMessage="No hay productos que coincidan con tu búsqueda."
        />
      )}
    </>
  );
}