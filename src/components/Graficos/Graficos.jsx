import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { obtenerDatosGraficos } from "../../services/graficosService";
import usePageTitle from "../../hooks/usePageTitle";
import "./Graficos.css";

const COLORES = ["#087f8c", "#e76f51", "#f4a261", "#6a994e", "#577590", "#bc4749"];
const formatoNumero = new Intl.NumberFormat("es-CO");
const formatoMoneda = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function ChartPanel({ titulo, resumen, children, vacio }) {
  return (
    <section className="graficos-panel">
      <div className="graficos-panel-heading">
        <h2>{titulo}</h2>
        <p>{resumen}</p>
      </div>
      {vacio ? <p className="graficos-empty">No hay datos disponibles.</p> : children}
    </section>
  );
}

function formatoFecha(fecha) {
  const valor = new Date(`${fecha}T00:00:00`);
  return Number.isNaN(valor.getTime())
    ? fecha
    : valor.toLocaleDateString("es-CO", { day: "2-digit", month: "short" });
}

export default function Graficos() {
  usePageTitle("Análisis");
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let vigente = true;

    obtenerDatosGraficos()
      .then((resultado) => {
        if (vigente) setDatos(resultado);
      })
      .catch((fallo) => {
        if (vigente) {
          setError(fallo.response?.data?.detail || fallo.message || "No se pudo conectar con el servicio de análisis.");
        }
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [revision]);

  const productos = useMemo(
    () => [...(datos?.productos ?? [])]
      .sort((a, b) => b.total_vendido - a.total_vendido)
      .slice(0, 8),
    [datos],
  );
  const clientes = useMemo(
    () => [...(datos?.clientes ?? [])]
      .sort((a, b) => b.total_gastado - a.total_gastado)
      .slice(0, 8),
    [datos],
  );
  const ventasDiarias = useMemo(
    () => [...(datos?.ventasDiarias ?? [])]
      .sort((a, b) => a.fecha_solo.localeCompare(b.fecha_solo)),
    [datos],
  );

  return (
    <section className="graficos-page">
      <header className="graficos-header">
        <div>
          <p className="graficos-eyebrow">RESUMEN DEL NEGOCIO</p>
          <h1>Análisis</h1>
          <p className="graficos-intro">Productos, clientes y ventas en un solo lugar.</p>
        </div>
        <button
          className="graficos-refresh"
          type="button"
          onClick={() => {
            setCargando(true);
            setError("");
            setRevision((actual) => actual + 1);
          }}
          disabled={cargando}
        >
          {cargando ? "Actualizando..." : "Actualizar datos"}
        </button>
      </header>

      {error && (
        <p className="graficos-error" role="alert">
          No se pudieron cargar los datos: {error}
        </p>
      )}

      {cargando && !datos ? (
        <p className="graficos-status" role="status">Cargando análisis...</p>
      ) : datos && (
        <div className="graficos-grid" aria-busy={cargando}>
          <ChartPanel
            titulo="Productos por categoría"
            resumen="Cantidad de productos en cada categoría"
            vacio={!datos.categorias.length}
          >
            <div className="graficos-chart graficos-chart-pie">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={datos.categorias}
                    dataKey="total_productos"
                    nameKey="categoriaNombre"
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={104}
                    paddingAngle={3}
                  >
                    {datos.categorias.map((categoria, index) => (
                      <Cell key={categoria.categoriaNombre} fill={COLORES[index % COLORES.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(valor) => [formatoNumero.format(valor), "Productos"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="graficos-legend">
              {datos.categorias.map((categoria, index) => (
                <li key={categoria.categoriaNombre}>
                  <span style={{ backgroundColor: COLORES[index % COLORES.length] }} />
                  {categoria.categoriaNombre}
                  <strong>{formatoNumero.format(categoria.total_productos)}</strong>
                </li>
              ))}
            </ul>
          </ChartPanel>

          <ChartPanel
            titulo="Productos más vendidos"
            resumen="Unidades vendidas por producto"
            vacio={!productos.length}
          >
            <div className="graficos-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productos} layout="vertical" margin={{ top: 8, right: 16, bottom: 8, left: 12 }}>
                  <CartesianGrid stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fill: "var(--text-soft)", fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="nombreProducto"
                    width={125}
                    tick={{ fill: "var(--text-soft)", fontSize: 11 }}
                  />
                  <Tooltip formatter={(valor) => [formatoNumero.format(valor), "Unidades"]} />
                  <Bar dataKey="total_vendido" fill="#e76f51" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartPanel>

          <ChartPanel
            titulo="Clientes frecuentes"
            resumen="Clientes con mayor valor de compra"
            vacio={!clientes.length}
          >
            <div className="graficos-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientes} layout="vertical" margin={{ top: 8, right: 20, bottom: 8, left: 12 }}>
                  <CartesianGrid stroke="var(--border)" horizontal={false} />
                  <XAxis
                    type="number"
                    tickFormatter={(valor) => `$${formatoNumero.format(valor)}`}
                    tick={{ fill: "var(--text-soft)", fontSize: 11 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="clienteNombre"
                    width={105}
                    tick={{ fill: "var(--text-soft)", fontSize: 11 }}
                  />
                  <Tooltip formatter={(valor) => [formatoMoneda.format(valor), "Total gastado"]} />
                  <Bar dataKey="total_gastado" fill="#087f8c" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartPanel>

          <ChartPanel
            titulo="Ventas por día"
            resumen="Valor total vendido en cada fecha"
            vacio={!ventasDiarias.length}
          >
            <div className="graficos-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ventasDiarias} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="fecha_solo"
                    tickFormatter={formatoFecha}
                    tick={{ fill: "var(--text-soft)", fontSize: 11 }}
                  />
                  <YAxis
                    tickFormatter={(valor) => `$${formatoNumero.format(valor)}`}
                    tick={{ fill: "var(--text-soft)", fontSize: 11 }}
                    width={76}
                  />
                  <Tooltip
                    labelFormatter={formatoFecha}
                    formatter={(valor) => [formatoMoneda.format(valor), "Ventas"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="total_vendido"
                    stroke="#6a994e"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#6a994e" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartPanel>
        </div>
      )}
    </section>
  );
}