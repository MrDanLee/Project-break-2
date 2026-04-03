const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const Product = require("../models/Product");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("SSR Product Routes", () => {
  describe("GET /products", () => {
    it("debería devolver HTML con status 200", async () => {
      const res = await request(app).get("/products");
      expect(res.status).toBe(200);
      expect(res.text).toContain("Productos");
    });

    it("debería filtrar por categoría", async () => {
      const res = await request(app).get("/products?category=Camisetas");
      expect(res.status).toBe(200);
      expect(res.text).toContain("Productos");
    });
  });

  describe("GET /products/:productId", () => {
    it("debería devolver el detalle de un producto", async () => {
      const product = await Product.findOne();
      if (!product) return;
      const res = await request(app).get(`/products/${product._id}`);
      expect(res.status).toBe(200);
      expect(res.text).toContain(product.name);
    });

    it("debería devolver 404 para un id inexistente", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/products/${fakeId}`);
      expect(res.status).toBe(404);
    });
  });
});

describe("API Product Routes", () => {
  let testProduct;

  // Crear producto de test directamente en la DB
  beforeAll(async () => {
    testProduct = await Product.create({
      name: "Producto Test",
      description: "Descripción de test",
      price: 9.99,
      image: "https://via.placeholder.com/400",
      category: "Camisetas",
      size: "M",
    });
  });

  // Limpiar producto de test
  afterAll(async () => {
    await Product.findByIdAndDelete(testProduct._id).catch(() => {});
  });

  describe("GET /api/products", () => {
    it("debería devolver un array de productos en JSON", async () => {
      const res = await request(app).get("/api/products");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("debería filtrar por categoría", async () => {
      const res = await request(app).get("/api/products?category=Camisetas");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      res.body.forEach((product) => {
        expect(product.category).toBe("Camisetas");
      });
    });
  });

  describe("GET /api/products/:productId", () => {
    it("debería devolver un producto por id", async () => {
      const res = await request(app).get(`/api/products/${testProduct._id}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Producto Test");
    });

    it("debería devolver 404 para id inexistente", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/products/${fakeId}`);
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/products/:productId", () => {
    it("debería actualizar un producto", async () => {
      const res = await request(app)
        .put(`/api/products/${testProduct._id}`)
        .send({ name: "Producto Actualizado", price: 15.99 });
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Producto Actualizado");
      expect(res.body.price).toBe(15.99);
    });

    it("debería devolver 404 para id inexistente", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/products/${fakeId}`)
        .send({ name: "No existe" });
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/products/:productId", () => {
    it("debería eliminar un producto", async () => {
      const res = await request(app).delete(
        `/api/products/${testProduct._id}`
      );
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Producto eliminado");
    });

    it("debería devolver 404 para id ya eliminado", async () => {
      const res = await request(app).delete(
        `/api/products/${testProduct._id}`
      );
      expect(res.status).toBe(404);
    });
  });
});
