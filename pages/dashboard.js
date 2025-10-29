export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  // Calculate some stats
  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.inventory < 5).length;

  return {
    props: {
      products,
      totalProducts,
      lowStock,
    },
  };
}

export default function Dashboard({ products, totalProducts, lowStock }) {
  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", textAlign: "center" }}>
      <h1>📊 Inventory Dashboard</h1>
      <p>Total Products: <strong>{totalProducts}</strong></p>
      <p>Low Stock Items: <strong>{lowStock}</strong></p>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Category</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Inventory</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{p.name}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{p.category}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>₹{p.price}</td>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  color: p.inventory < 5 ? "red" : "black",
                  fontWeight: p.inventory < 5 ? "bold" : "normal",
                }}
              >
                {p.inventory}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
