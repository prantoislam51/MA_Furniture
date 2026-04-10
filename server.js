const express = require("express");
const path = require("path");
const categories = require("./data/categories");
const productsSeed = require("./data/products");

const app = express();
const PORT = process.env.PORT || 3000;

let products = [...productsSeed];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

function getCategoryMap() {
  return categories.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});
}

function getCategoryCounts() {
  return categories.map((cat) => ({
    ...cat,
    productCount: products.filter((p) => p.categoryId === cat.id).length
  }));
}

function filterProducts(query) {
  const q = (query.q || "").trim().toLowerCase();
  const cat = (query.cat || "").trim();
  const min = Number(query.min || 0);
  const max = Number(query.max || Number.MAX_SAFE_INTEGER);
  const sort = query.sort || "featured";

  let filtered = products.filter((p) => {
    const matchesQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q));
    const matchesCategory = !cat || p.categoryId === cat;
    const matchesMin = p.price >= min;
    const matchesMax = p.price <= max;
    return matchesQ && matchesCategory && matchesMin && matchesMax;
  });

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "newest") filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  if (sort === "top") filtered.sort((a, b) => Number(b.isTopSelling) - Number(a.isTopSelling));
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sort === "featured") filtered.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));

  return filtered;
}

app.use((req, res, next) => {
  res.locals.allCategories = getCategoryCounts();
  res.locals.categories = categories;
  res.locals.products = products;
  res.locals.currentPath = req.path;
  next();
});

app.get("/", (req, res) => {
  const categoryMap = getCategoryMap();
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 12);
  const topSellingProducts = products.filter((p) => p.isTopSelling).slice(0, 20);
  const heroSlides = products.filter((p) => p.isFeatured).slice(0, 5);

  const categorySections = categories.map((cat) => ({
    ...cat,
    products: products
      .filter((p) => p.categoryId === cat.id)
      .slice(0, 7)
      .map((p) => ({ ...p, category: categoryMap[p.categoryId] }))
  }));

  res.render("index", {
    pageTitle: "MA Furniture | Noir Wood Luxury",
    heroSlides: heroSlides.map((p) => ({ ...p, category: categoryMap[p.categoryId] })),
    featuredProducts: featuredProducts.map((p) => ({ ...p, category: categoryMap[p.categoryId] })),
    topSellingProducts: topSellingProducts.map((p) => ({ ...p, category: categoryMap[p.categoryId] })),
    categorySections
  });
});

app.get("/category/:id", (req, res) => {
  const category = categories.find((c) => c.id === req.params.id);
  if (!category) return res.status(404).render("search", { pageTitle: "Not Found", results: [], query: {}, category: null });

  const filtered = filterProducts({ ...req.query, cat: req.params.id });
  const categoryMap = getCategoryMap();
  res.render("category", {
    pageTitle: `${category.name} | MA Furniture`,
    category,
    query: req.query,
    results: filtered.map((p) => ({ ...p, category: categoryMap[p.categoryId] }))
  });
});

app.get("/search", (req, res) => {
  const filtered = filterProducts(req.query);
  const categoryMap = getCategoryMap();

  res.render("search", {
    pageTitle: "Search | MA Furniture",
    query: req.query,
    results: filtered.map((p) => ({ ...p, category: categoryMap[p.categoryId] }))
  });
});

app.get("/admin", (req, res) => {
  res.render("admin", {
    pageTitle: "Admin | MA Furniture"
  });
});

app.post("/api/product", (req, res) => {
  const incoming = req.body;
  if (!incoming.id || !incoming.name || !incoming.nameEn || !incoming.categoryId || !incoming.price) {
    return res.status(400).json({ ok: false, message: "Required fields missing" });
  }

  if (products.find((p) => p.id === incoming.id)) {
    return res.status(409).json({ ok: false, message: "Product ID already exists" });
  }

  const product = {
    ...incoming,
    price: Number(incoming.price),
    originalPrice: Number(incoming.originalPrice || incoming.price),
    images: Array.isArray(incoming.images) ? incoming.images : [incoming.image].filter(Boolean),
    inStock: Boolean(incoming.inStock),
    isFeatured: Boolean(incoming.isFeatured),
    isTopSelling: Boolean(incoming.isTopSelling),
    isNew: Boolean(incoming.isNew),
    rating: Number(incoming.rating || 4.5),
    reviewCount: Number(incoming.reviewCount || 0),
    tags: Array.isArray(incoming.tags) ? incoming.tags : []
  };

  products.unshift(product);
  return res.json({ ok: true, product, products });
});

app.put("/api/product/:id", (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ ok: false, message: "Product not found" });

  const prev = products[idx];
  const next = {
    ...prev,
    ...req.body,
    price: Number(req.body.price ?? prev.price),
    originalPrice: Number(req.body.originalPrice ?? prev.originalPrice),
    rating: Number(req.body.rating ?? prev.rating),
    reviewCount: Number(req.body.reviewCount ?? prev.reviewCount)
  };

  products[idx] = next;
  return res.json({ ok: true, product: next, products });
});

app.delete("/api/product/:id", (req, res) => {
  const before = products.length;
  products = products.filter((p) => p.id !== req.params.id);
  if (products.length === before) return res.status(404).json({ ok: false, message: "Product not found" });
  return res.json({ ok: true, products });
});

app.listen(PORT, () => {
  console.log(`Noir Wood Luxury shop running at http://localhost:${PORT}`);
});
