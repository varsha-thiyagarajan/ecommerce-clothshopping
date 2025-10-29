const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(process.cwd(), 'data', 'products.json');

function readProducts() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

function writeProducts(products) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), 'utf8');
}

function findBySlug(slug) {
  const products = readProducts();
  return products.find(p => p.slug === slug);
}

function findById(id) {
  const products = readProducts();
  return products.find(p => p.id === id);
}

module.exports = { readProducts, writeProducts, findBySlug, findById };
