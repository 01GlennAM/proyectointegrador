/** Formatea un número como precio en pesos colombianos, ej: $220.000 COP */
export function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CO") + " COP";
}