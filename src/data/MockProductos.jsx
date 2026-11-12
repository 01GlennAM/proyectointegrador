/*
export const mockProductos = [
  // ---------- TENIS ----------
  {
    id: 1,
    nombre: "Tenis Urban Runner",
    categoria: "Tenis",
    precio: 220000,
    imagen: "/images/productos/tenis-urban-runner.jpg",
    descripcion: "Tenis urbanos livianos, ideales para uso diario. Suela de goma antideslizante y malla transpirable.",
    tallas: ["38", "39", "40", "41", "42"],
    colores: ["Negro", "Blanco"],
    stock: 14
  },
  {
    id: 2,
    nombre: "Tenis Street Flow",
    categoria: "Tenis",
    precio: 265000,
    imagen: "/images/productos/tenis-street-flow.jpg",
    descripcion: "Diseño retro deportivo con amortiguación reforzada, pensado para largas caminatas por la ciudad.",
    tallas: ["37", "38", "39", "40", "41"],
    colores: ["Blanco", "Gris"],
    stock: 8
  },
  {
    id: 3,
    nombre: "Tenis Court Classic",
    categoria: "Tenis",
    precio: 189000,
    imagen: "/images/productos/tenis-court-classic.jpg",
    descripcion: "Estilo clásico de cancha, cuero sintético resistente y agarre sólido en cualquier superficie.",
    tallas: ["39", "40", "41", "42", "43"],
    colores: ["Blanco", "Azul"],
    stock: 20
  },
  {
    id: 4,
    nombre: "Tenis Trail Grip",
    categoria: "Tenis",
    precio: 245000,
    imagen: "/images/productos/tenis-trail-grip.jpg",
    descripcion: "Suela con mayor tracción, pensados para terrenos irregulares sin perder comodidad urbana.",
    tallas: ["40", "41", "42", "43", "44"],
    colores: ["Negro", "Verde"],
    stock: 0
  },

  // ---------- GORRAS ----------
  {
    id: 5,
    nombre: "Gorra Snapback Classic",
    categoria: "Gorras",
    precio: 65000,
    imagen: "/images/productos/gorra-snapback-classic.jpg",
    descripcion: "Gorra snapback ajustable con bordado frontal y visera plana.",
    tallas: ["Única"],
    colores: ["Negro", "Blanco", "Rojo"],
    stock: 30
  },
  {
    id: 6,
    nombre: "Gorra Curva Old School",
    categoria: "Gorras",
    precio: 58000,
    imagen: "/images/productos/gorra-curva-old-school.jpg",
    descripcion: "Visera curva estilo old school, algodón suave y cierre trasero de correa.",
    tallas: ["Única"],
    colores: ["Azul", "Negro"],
    stock: 18
  },
  {
    id: 7,
    nombre: "Gorra Trucker Mesh",
    categoria: "Gorras",
    precio: 62000,
    imagen: "/images/productos/gorra-trucker-mesh.jpg",
    descripcion: "Panel trasero de malla para mayor ventilación, ideal para clima cálido.",
    tallas: ["Única"],
    colores: ["Gris", "Naranja"],
    stock: 12
  },

  // ---------- CAMISETAS ----------
  {
    id: 8,
    nombre: "Camiseta Oversize Basic",
    categoria: "Camisetas",
    precio: 79000,
    imagen: "/images/productos/camiseta-oversize-basic.jpg",
    descripcion: "Camiseta oversize 100% algodón, corte relajado y caída moderna.",
    tallas: ["S", "M", "L", "XL"],
    colores: ["Blanco", "Negro", "Beige"],
    stock: 25
  },
  {
    id: 9,
    nombre: "Camiseta Estampada Street",
    categoria: "Camisetas",
    precio: 89000,
    imagen: "/images/productos/camiseta-estampada-street.jpg",
    descripcion: "Estampado gráfico frontal, tela premium que no destiñe con los lavados.",
    tallas: ["S", "M", "L", "XL", "XXL"],
    colores: ["Negro", "Vinotinto"],
    stock: 16
  },
  {
    id: 10,
    nombre: "Camiseta Deportiva Dry-Fit",
    categoria: "Camisetas",
    precio: 95000,
    imagen: "/images/productos/camiseta-dry-fit.jpg",
    descripcion: "Tejido tecnológico que absorbe el sudor, ideal para entrenar o para el día a día.",
    tallas: ["S", "M", "L", "XL"],
    colores: ["Gris", "Azul"],
    stock: 22
  },

  // ---------- HOODIES ----------
  {
    id: 11,
    nombre: "Hoodie Essential",
    categoria: "Hoodies",
    precio: 149000,
    imagen: "/images/productos/hoodie-essential.jpg",
    descripcion: "Hoodie de algodón perchado, bolsillo canguro y capota ajustable con cordón.",
    tallas: ["S", "M", "L", "XL"],
    colores: ["Negro", "Gris", "Vino"],
    stock: 10
  },
  {
    id: 12,
    nombre: "Hoodie Oversize Heavy",
    categoria: "Hoodies",
    precio: 175000,
    imagen: "/images/productos/hoodie-oversize-heavy.jpg",
    descripcion: "Tela pesada premium, corte oversize y terminaciones reforzadas en puños.",
    tallas: ["M", "L", "XL", "XXL"],
    colores: ["Negro", "Beige"],
    stock: 6
  },
  {
    id: 13,
    nombre: "Hoodie Zip Urban",
    categoria: "Hoodies",
    precio: 168000,
    imagen: "/images/productos/hoodie-zip-urban.jpg",
    descripcion: "Con cierre frontal completo, ideal para combinar como chaqueta ligera.",
    tallas: ["S", "M", "L", "XL"],
    colores: ["Gris", "Azul marino"],
    stock: 0
  },

  // ---------- ACCESORIOS ----------
  {
    id: 14,
    nombre: "Reloj Minimal Steel",
    categoria: "Accesorios",
    precio: 135000,
    imagen: "/images/productos/reloj-minimal-steel.jpg",
    descripcion: "Caja en acero inoxidable, correa cómoda y resistencia al agua básica.",
    tallas: ["Única"],
    colores: ["Plateado", "Dorado"],
    stock: 9
  },
  {
    id: 15,
    nombre: "Bolso Urban Pack",
    categoria: "Accesorios",
    precio: 72000,
    imagen: "/images/productos/bolso-urban-pack.jpg",
    descripcion: "Compartimentos organizados, correa ajustable y tela resistente al agua.",
    tallas: ["Única"],
    colores: ["Negro", "Camuflado"],
    stock: 15
  },  
  {
    id: 16,
    nombre: "Medias Pack x3",
    categoria: "Accesorios",
    precio: 39000,
    imagen: "/images/productos/medias-pack-x3.jpg",
    descripcion: "Pack de 3 pares de medias altas, algodón elastizado y refuerzo en talón.",
    tallas: ["Única"],
    colores: ["Surtido"],
    stock: 40
  }
];
*/