

Pagination in Next.js (App Router) is usually done in 3 common ways.
Since you are using JavaScript (not TypeScript) and pnpm, I’ll keep everything simple and practical.


---

✅ Method 1: Pagination using URL search params (Recommended)

This is best for SEO and works perfectly with server components.

Example URL

/products?page=1
/products?page=2


---

📁 Folder Structure

app/
 ├─ products/
 │   ├─ page.jsx
 │   └─ Pagination.jsx


---

📄 app/products/page.jsx (Server Component)

export default async function ProductsPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const limit = 5;

  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <div>
      <h1>Products</h1>

      {data.products.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}

      <Pagination page={page} total={data.total} limit={limit} />
    </div>
  );
}


---

📄 app/products/Pagination.jsx (Client Component)

"use client";

import { useRouter } from "next/navigation";

export default function Pagination({ page, total, limit }) {
  const router = useRouter();
  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        disabled={page === 1}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
}


---

✅ Method 2: Pagination using useSearchParams (Client Side)

Best when data is fetched on the client side.

"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;

  const nextPage = () => {
    router.push(`?page=${page + 1}`);
  };

  return (
    <button onClick={nextPage}>Next Page</button>
  );
}


---

✅ Method 3: API-based Pagination (MongoDB example)

API Route

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);
  const total = await Product.countDocuments();

  return Response.json({ products, total });
}


---

⚡ Disable Cache for Pagination (Important)

fetch(url, { cache: "no-store" });

OR

export const dynamic = "force-dynamic";


---

🟢 Which method should YOU use?

Case	Best Choice

SEO + Server	Method 1
Client dashboard	Method 2
MongoDB / API	Method 3



---

If you want:

🔹 Pagination with MongoDB

🔹 Pagination with Load More button

🔹 Pagination + Search

🔹 Pagination + Category filter


Tell me 👍

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
======================================================================
======================================================================

======== Pagination + Search + Category filter ========

Below is a clean + real-world explanation of

✅ Pagination + Search
✅ Pagination + Category Filter

Using Next.js App Router + MongoDB + Mongoose
👉 JavaScript only
👉 API-based (best practice)


---

🔹 Core Idea (Very Important)

All features work using URL query params

/products?page=1&q=phone&category=electronics

So we can:

paginate

search

filter
at the same time



---

🧠 Query params we will use

Param	Purpose

page	pagination
limit	items per page
q	search text
category	filter



---

📁 Folder Structure

app/
 ├─ api/products/route.js
 ├─ products/
 │   ├─ page.jsx
 │   └─ Filters.jsx
lib/mongodb.js
models/Product.js


---

## 🚀 API: Pagination + Search + Category

### app/api/products/route.js
```jsx
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const q = searchParams.get("q");
  const category = searchParams.get("category");

  const skip = (page - 1) * limit;

  // 🔍 Build query dynamically
  const query = {};

  if (q) {
    query.title = { $regex: q, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const products = await Product.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(query);

  return Response.json({
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

```
---

🧠 Why dynamic query?

Because user may:

search only

filter only

do both together


MongoDB query becomes smart and flexible


---

🖥️ Frontend Page

app/products/page.jsx (Server Component)
```jsx
export default async function ProductsPage({ searchParams }) {
  const page = searchParams.page || 1;
  const q = searchParams.q || "";
  const category = searchParams.category || "";

  const url = `http://localhost:3000/api/products?page=${page}&limit=5&q=${q}&category=${category}`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  return (
    <div>
      <h1>Products</h1>

      <Filters q={q} category={category} />

      {data.products.map((item) => (
        <p key={item._id}>
          {item.title} - {item.category}
        </p>
      ))}

      <div style={{ marginTop: 20 }}>
        {page > 1 && (
          <a href={`?page=${page - 1}&q=${q}&category=${category}`}>
            Prev
          </a>
        )}

        {"  "} Page {page} {"  "}

        {page < data.totalPages && (
          <a href={`?page=${Number(page) + 1}&q=${q}&category=${category}`}>
            Next
          </a>
        )}
      </div>
    </div>
  );
}

```

🎛️ Filters Component

app/products/Filters.jsx
```jsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Filters({ q, category }) {
  const router = useRouter();
  const [search, setSearch] = useState(q);

  const applyFilters = () => {
    router.push(`?page=1&q=${search}&category=${category}`);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) =>
          router.push(`?page=1&q=${search}&category=${e.target.value}`)
        }
      >
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="books">Books</option>
      </select>

      <button onClick={applyFilters}>Search</button>
    </div>
  );
}



```
🔄 How Everything Works Together

1️⃣ User types search or selects category
2️⃣ URL updates (router.push)
3️⃣ Server page re-fetches data
4️⃣ API filters + paginates MongoDB
5️⃣ Correct page data is returned


---

⚠️ IMPORTANT RULES

Reset page when filters change

?page=1

Count filtered documents only

countDocuments(query)

Always pass params to pagination links

?page=2&q=phone&category=electronics


---

🎯 Result

✔ SEO friendly
✔ Fast MongoDB queries
✔ Works with large data
✔ Clean URL state


---

🚀 Want Next?

Infinite scroll with search

Debounced search

Load more button

Pagination UI component

Server Actions version


Just tell me 👍



=======================================================================
=======================================================================


Below is a clear + step-by-step explanation of Method 3 (API + MongoDB pagination)
👉 JavaScript only (no TypeScript)
👉 Next.js App Router
👉 MongoDB + Mongoose


---

📌 What is API + MongoDB Pagination?

Instead of fetching all documents, we:

Fetch only a small number (limit)

Skip already fetched records (skip)

Control page using query params


Example API URL

/api/products?page=2&limit=5


---

🔢 Pagination Formula (IMPORTANT)

skip = (page - 1) * limit

Page	Limit	Skip

1	5	0
2	5	5
3	5	10



---

📁 Folder Structure

app/
 ├─ api/
 │   └─ products/
 │       └─ route.js
 ├─ products/
 │   └─ page.jsx
lib/
 └─ mongodb.js
models/
 └─ Product.js
✅


---

 ## 🔗 MongoDB Connection (lib/mongodb.js)
```jsx
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}



```
---
📦 Product Model (models/Product.js)
```jsx
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    category: String,
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);

❎❎✅
---

🚀 API Route (app/api/products/route.js)

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;

  const skip = (page - 1) * limit;

  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments();

  return Response.json({
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
✅

---

🧠 What’s happening here?

1️⃣ Read query params

?page=2&limit=5

2️⃣ Convert to numbers

const page = Number(...)
const limit = Number(...)

3️⃣ Calculate skip

const skip = (page - 1) * limit;

4️⃣ MongoDB query

Product.find().skip(skip).limit(limit);

5️⃣ Count total documents

Product.countDocuments();


---

🖥️ Frontend Page (app/products/page.jsx)

export default async function ProductsPage({ searchParams }) {
  const page = searchParams.page || 1;

  const res = await fetch(
    `http://localhost:3000/api/products?page=${page}&limit=5`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <div>
      <h1>Products</h1>

      {data.products.map((item) => (
        <p key={item._id}>{item.title}</p>
      ))}

      <div style={{ marginTop: 20 }}>
        <a href={`?page=${Number(page) - 1}`}>Prev</a>{" "}
        <a href={`?page=${Number(page) + 1}`}>Next</a>
      </div>
    </div>
  );
}

✅
---

⚠️ Important Notes

❌ Do NOT fetch all data

Product.find(); // bad for performance

✅ Always use limit + skip

Product.find().skip(skip).limit(limit);


---

🚀 Improve Pagination (Optional)

✅ Add category filter

const category = searchParams.get("category");

const query = category ? { category } : {};

Product.find(query).skip(skip).limit(limit);

✅ Add search

const q = searchParams.get("q");

const query = q
  ? { title: { $regex: q, $options: "i" } }
  : {};


---

🎯 When should you use this method?

✔ Large data
✔ MongoDB backend
✔ Admin dashboards
✔ SEO friendly pages


---

If you want next:

🔥 Pagination + Search
🔥 Pagination + Category filter
🔥 Infinite scroll
🔥 Load more button


Just tell me 👍


