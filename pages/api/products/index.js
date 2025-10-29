export const products = [
  {
    id: "c1",
    name: "Classic White T-Shirt",
    slug: "classic-white-tshirt",
    description: "Soft cotton tee perfect for casual wear.",
    price: 499,
    category: "men",
    inventory: 30,
    image: "/images/white-tshirt.jpg",
    lastUpdated: "2025-10-27T10:00:00.000Z",
  },
  {
    id: "c2",
    name: "Denim Jeans",
    slug: "denim-jeans",
    description: "Comfort fit blue denim jeans.",
    price: 999,
    category: "women",
    inventory: 15,
    image: "/images/denim-jeans.jpg",
    lastUpdated: "2025-10-27T10:00:00.000Z",
  },
  {
    id: "c3",
    name: "Hooded Sweatshirt",
    slug: "hooded-sweatshirt",
    description: "Cozy hoodie for everyday comfort.",
    price: 799,
    category: "unisex",
    inventory: 20,
    image: "/images/hoodie.jpg",
    lastUpdated: "2025-10-27T10:00:00.000Z",
  },
   {
    "id": "aabecf46-b3c4-4d24-82d5-58d1bc82ac2b",
    "name": "TAZO",
    "slug": "T-shirt green",
    "description": "Men solid Neck cotton T-Shirt",
    "price": 288,
    "category": "Men",
    "inventory": 12,
    "lastUpdated": "2025-10-27T17:00:03.782Z"
  }
];


import { readProducts, writeProducts } from "@/utils/products";
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = readProducts();
      console.log("✅ Sending products:", products);
      res.status(200).json(products);
    } catch (error) {
      console.error("❌ Error reading products:", error);
      res.status(500).json({ message: "Error reading products" });
    }
  } 
  
  else if (req.method === "POST") {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== "admin123") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    try {
      const newProduct = {
        id: uuidv4(),
        ...req.body,
        lastUpdated: new Date().toISOString(),
      };

      const products = readProducts();
      products.push(newProduct);
      writeProducts(products);

      res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
      console.error("❌ Error writing products:", error);
      res.status(500).json({ message: "Error saving product" });
    }
  } 
  
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
