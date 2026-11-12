import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "tienda-creativa-cart";
const CartContext = createContext(null);

function readCart() {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (!savedCart) return [];

  let entries;
  try {
    entries = JSON.parse(savedCart);
  } catch (error) {
    console.warn("No se pudo leer el carrito guardado; se iniciará uno vacío.", error);
    return [];
  }

  if (!Array.isArray(entries)) {
    console.warn("El carrito guardado no tiene un formato válido; se iniciará uno vacío.");
    return [];
  }

  const cart = new Map();
  for (const entry of entries) {
    const product = entry?.product;
    if (
      !product ||
      product.id !== entry.productId ||
      typeof product.precio !== "number" ||
      !Number.isInteger(entry.quantity) ||
      entry.quantity < 1 ||
      product.stock < 1
    ) {
      console.warn("Se omitió un producto no válido del carrito guardado.");
      continue;
    }

    const quantity = Math.min(
      product.stock,
      (cart.get(product.id)?.quantity || 0) + entry.quantity,
    );
    cart.set(product.id, { productId: product.id, quantity, product });
  }

  return [...cart.values()];
}

// Copia solo los datos que el carrito necesita del producto que llega del API.
function snapshot(producto) {
  return {
    id: producto.id,
    nombre: producto.nombre,
    precio: Number(producto.precio),
    imagen: producto.imagen,
    stock: producto.stock,
    categoria: producto.categoria,
  };
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const items = useMemo(
    () =>
      cart.map(({ product, quantity }) => ({
        product,
        quantity,
        subtotal: product.precio * quantity,
      })),
    [cart],
  );
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Recibe el producto completo (tal como llega del API), no solo su id.
  function addToCart(producto, quantity = 1) {
    if (!producto?.id) return "El producto seleccionado no existe en el catálogo.";
    const product = snapshot(producto);
    const productId = product.id;
    if (!Number.isInteger(quantity) || quantity < 1) {
      return "La cantidad debe ser un número entero positivo.";
    }
    if (product.stock < 1) return "Este producto está agotado.";

    const currentQuantity = cart.find((item) => item.productId === productId)?.quantity || 0;
    if (currentQuantity + quantity > product.stock) {
      return `Solo hay ${product.stock} unidades disponibles de este producto.`;
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.productId === productId);
      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...currentCart, { productId, quantity, product }];
    });
    return null;
  }

  function updateQuantity(productId, quantity) {
    const product = cart.find((item) => item.productId === productId)?.product;
    if (!product) throw new Error("El producto seleccionado no está en el carrito.");
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) {
      throw new Error("La cantidad debe ser un entero positivo dentro del inventario disponible.");
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.productId !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  const value = {
    items,
    total,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider.");
  }
  return context;
}
