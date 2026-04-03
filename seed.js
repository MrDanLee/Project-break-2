require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  // --- CAMISETAS ---
  {
    name: "Camiseta Básica Blanca",
    description: "Camiseta de algodón 100%, corte regular y tacto suave.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Camisetas",
    size: "M",
    price: 19.99,
  },
  {
    name: "Camiseta Negra Premium",
    description: "Camiseta de algodón orgánico con acabado premium.",
    image: "https://images.unsplash.com/photo-1503341504253-dff4855ab497?w=400",
    category: "Camisetas",
    size: "L",
    price: 24.99,
  },
  {
    name: "Camiseta Oversize Gris",
    description: "Camiseta oversize de corte holgado, ideal para looks urbanos.",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400",
    category: "Camisetas",
    size: "XL",
    price: 27.99,
  },
  {
    name: "Camiseta Estampada Vintage",
    description: "Camiseta con estampado retro, tejido ligero y transpirable.",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400",
    category: "Camisetas",
    size: "S",
    price: 22.99,
  },

  // --- PANTALONES ---
  {
    name: "Pantalón Vaquero Slim",
    description: "Vaquero slim fit con elastano para mayor comodidad.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    category: "Pantalones",
    size: "M",
    price: 49.99,
  },
  {
    name: "Pantalón Chino Beige",
    description: "Pantalón chino de algodón, perfecto para el día a día.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
    category: "Pantalones",
    size: "L",
    price: 39.99,
  },
  {
    name: "Pantalón Cargo Verde",
    description: "Pantalón cargo con bolsillos laterales, estilo streetwear.",
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=400",
    category: "Pantalones",
    size: "M",
    price: 44.99,
  },
  {
    name: "Pantalón Jogger Negro",
    description: "Jogger de algodón con puños elásticos, cómodo y versátil.",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400",
    category: "Pantalones",
    size: "S",
    price: 34.99,
  },

  // --- ZAPATOS ---
  {
    name: "Zapatillas Urbanas Blancas",
    description: "Zapatillas minimalistas de piel sintética, suela de goma.",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400",
    category: "Zapatos",
    size: "L",
    price: 59.99,
  },
  {
    name: "Botas Chelsea Negras",
    description: "Botas chelsea de piel con elástico lateral.",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400",
    category: "Zapatos",
    size: "M",
    price: 79.99,
  },
  {
    name: "Deportivas Running",
    description: "Zapatillas ligeras con amortiguación para correr.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "Zapatos",
    size: "L",
    price: 69.99,
  },
  {
    name: "Mocasines Clásicos",
    description: "Mocasines de ante, ideales para looks smart casual.",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400",
    category: "Zapatos",
    size: "M",
    price: 54.99,
  },

  // --- ACCESORIOS ---
  {
    name: "Gorra Deportiva Negra",
    description: "Gorra ajustable con visera curva, algodón 100%.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400",
    category: "Accesorios",
    size: "M",
    price: 14.99,
  },
  {
    name: "Bufanda de Lana",
    description: "Bufanda suave de lana merino, perfecta para el frío.",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400",
    category: "Accesorios",
    size: "M",
    price: 22.99,
  },
  {
    name: "Mochila Urbana",
    description: "Mochila resistente al agua con compartimento para portátil.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    category: "Accesorios",
    size: "M",
    price: 45.99,
  },
  {
    name: "Cinturón de Cuero",
    description: "Cinturón de cuero genuino con hebilla metálica.",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400",
    category: "Accesorios",
    size: "M",
    price: 29.99,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    await Product.deleteMany({});
    console.log("Productos anteriores eliminados");

    await Product.insertMany(products);
    console.log(`${products.length} productos insertados correctamente`);

    await mongoose.disconnect();
    console.log("Seed completado");
  } catch (error) {
    console.error("Error en seed:", error);
    process.exit(1);
  }
};

seedDB();
