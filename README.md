🛍️ MeetSphere – E-Commerce Web App

Author: Varsha
Date: October 27, 2025

📘 Overview

MeetSphere is a small e-commerce-style web application built with Next.js.
It demonstrates multiple rendering strategies (SSG, ISR, SSR, and CSR) and includes both frontend and backend API routes.

🚀 Features

🏠 Home Page – Static Site Generation (SSG)

🛒 Product Detail Page – Incremental Static Regeneration (ISR)

📊 Inventory Dashboard – Server-Side Rendering (SSR)

⚙️ Admin Panel – Client-Side Rendering (CSR)

🔌 API Routes for product management

💾 JSON file used as mock database

🧩 Rendering Strategies
Page	Route	Rendering Type	Description
Home	/	SSG	Pre-rendered at build time for fast access
Product Detail	/products/[slug]	ISR (revalidate: 60s)	Regenerates periodically to show latest stock/price
Dashboard	/dashboard	SSR	Always fetches live data from backend
Admin Panel	/admin	CSR	Uses client-side fetch for adding/editing products
⚙️ Backend API Routes
Route	Method	Description
/api/products	GET	Fetch all products
/api/products/[slug]	GET	Fetch a single product
/api/products	POST	Add a new product
/api/products/[id]	PUT	Update existing product
🧠 Data Model
{
  "id": "string",
  "name": "string",
  "slug": "string",
  "description": "string",
  "price": number,
  "category": "string",
  "inventory": number,
  "lastUpdated": "string (ISO datetime)"
}

🧰 Tech Stack

Next.js (Frontend + Backend)

React

Node.js

Mock JSON Data

🧾 Setup Instructions

Clone the repo:

git clone <your-repo-link>
cd meetsphere


Install dependencies:

npm install


Run locally:

npm run dev


Open in browser:

http://localhost:3000

☁️ Deployment

Deployed on Vercel
👉 https://your-vercel-project-url.vercel.app
