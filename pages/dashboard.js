// /pages/dashboard.js
export async function getServerSideProps() {
  try {
    // ✅ Fetch product data dynamically (SSR)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`);
    const products = await res.json();

    // ✅ Calculate stats
    const totalProducts = products.length;
    const lowStock = products.filter(p => p.inventory < 5).length;
    const totalInventory = products.reduce((sum, p) => sum + p.inventory, 0);

    return {
      props: { products, totalProducts, lowStock, totalInventory },
    };
  } catch (error) {
    console.error("Error fetching products for dashboard:", error);
    return { props: { products: [], totalProducts: 0, lowStock: 0, totalInventory: 0 } };
  }
}

export default function Dashboard({ products, totalProducts, lowStock, totalInventory }) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>📊 Inventory Dashboard</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "20px" }}>
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", width: "200px" }}>
          <h3>Total Products</h3>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>{totalProducts}</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", width: "200px" }}>
          <h3>Low Stock</h3>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}>{lowStock}</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", width: "200px" }}>
          <h3>Total Inventory</h3>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>{totalInventory}</p>
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>🧾 Product List</h2>
      <table style={{ width: "80%", margin: "20px auto", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Category</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Price</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Inventory</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{p.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{p.category}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>₹{p.price}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{p.inventory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
