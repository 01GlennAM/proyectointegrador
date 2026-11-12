import axios from "axios";

const clienteGraficos = axios.create({
  baseURL: import.meta.env.DEV
    ? "/"
    : import.meta.env.VITE_API_BASE_URL_PY || "http://127.0.0.1:8000/",
  timeout: 12000,
});

const normalizarFilas = (datos) => {
  if (Array.isArray(datos)) return datos;
  return datos == null ? [] : [datos];
};

export async function obtenerDatosGraficos() {
  const [categorias, productos, clientes, ventasDiarias] = await Promise.all([
    clienteGraficos.get("/api/graficos/headless/productos-por-categoria"),
    clienteGraficos.get("/api/graficos/headless/productos-mas-vendidos"),
    clienteGraficos.get("/api/graficos/headless/clientes-frecuentes"),
    clienteGraficos.get("/api/graficos/headless/ventas-por-dia"),
  ]);

  return {
    categorias: normalizarFilas(categorias.data),
    productos: normalizarFilas(productos.data),
    clientes: normalizarFilas(clientes.data),
    ventasDiarias: normalizarFilas(ventasDiarias.data),
  };
}