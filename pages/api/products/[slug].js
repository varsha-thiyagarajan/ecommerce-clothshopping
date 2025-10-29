// /pages/api/products/[slug].js
import { products } from "./index";

export default function handler(req, res) {
  const { slug } = req.query;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
}
