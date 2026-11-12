import apiClient from './apiClient';

const normalizarProducto = (producto) => ({
  ...producto,
  imagen: producto.imagen ?? producto.imagenUrl ?? '',
  categoria: typeof producto.categoria === 'object'
    ? producto.categoria?.nombre ?? ''
    : producto.categoria ?? '',
});

// Obtener la lista de productos desde Spring Boot (GET /api/productos)
export const obtenerProductos = async (categoria) => {
  // Si envían categoría, la pasamos como parámetro de consulta (?categoria=...)
  const url = categoria ? `/api/productos?categoria=${encodeURIComponent(categoria)}` : '/api/productos';
  const response = await apiClient.get(url);
  return response.data.map(normalizarProducto);
};

// Crear un producto nuevo (POST /api/productos)
export const crearProducto = async (producto) => {
  const response = await apiClient.post('/api/productos', producto);
  return response.data;
};

// Obtener un producto por su ID (GET /api/productos/{id})
export const obtenerProductoPorId = async (id) => {
  const response = await apiClient.get(`/api/productos/${id}`);
  return normalizarProducto(response.data);
};