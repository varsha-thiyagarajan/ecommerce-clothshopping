// /pages/index.js
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* ✅ Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "15px",
          background: "#f5f5f5",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>Home</Link>
        <Link href="/products" style={{ textDecoration: "none" }}>Products</Link>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>Dashboard</Link>
        <Link href='/admin' style={{ textDecoration: "none" }}>Admin</Link>
      </nav>

      {/* ✅ Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <h1>🛒 Welcome to ClothShopping</h1>
        <p
          style={{
            fontSize: "18px",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Discover the latest trends and shop your favorite styles!
        </p>

        {/* ✅ Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Link href="/products">
            <button
              style={{
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              View Products
            </button>
          </Link>

          <Link href="/cart">
            <button
              style={{
                backgroundColor: "#2ecc71",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              View Cart
            </button>
          </Link>
        </div>

        {/* ✅ Footer */}
        <footer style={{ marginTop: "80px", color: "#888" }}>
          <p>© 2025 ClothShopping. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
