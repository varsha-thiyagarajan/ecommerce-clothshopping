import { useState, useEffect } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
  });

  // Fetch existing products client-side
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": "admin123" },
      body: JSON.stringify({ ...form, price: Number(form.price), inventory: Number(form.inventory) }),
    });

    if (res.ok) {
      alert("✅ Product added successfully!");
      setForm({ name: "", slug: "", description: "", price: "", category: "", inventory: "" });

      // Refresh product list
      const data = await fetch("/api/products").then((r) => r.json());
      setProducts(data);
    } else {
      alert("❌ Failed to add product.");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>🛠 Admin Panel</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}
      >
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="slug" placeholder="Slug (e.g., blue-tshirt)" value={form.slug} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input type="number" name="inventory" placeholder="Inventory" value={form.inventory} onChange={handleChange} required />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>

      <h3>📦 Current Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — ₹{p.price} ({p.inventory} in stock)
          </li>
        ))}
      </ul>
    </div>
  );
}
