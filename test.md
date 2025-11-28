Here’s a clean Next.js (App Router) explanation for building an Add-to-Cart feature + saving multiple cart item IDs + info in another MongoDB schema — using JavaScript, pnpm, axios, MongoDB, no TypeScript.

---

✅ 1. Core Idea

You will have three parts:

A. Products Collection

Stores your product data.

B. Users Collection

Each user has a cart field containing multiple product IDs & quantities.

C. Cart API Routes

To add/remove/update cart items.

---

✅ 2. Example MongoDB Schemas

🟦 models/Product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
title: String,
price: Number,
image: String
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);

🟩 models/User.js

Here we save multiple cart items inside user schema:

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name: String,
email: String,

cart: [
{
productId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Product"
},
quantity: {
type: Number,
default: 1
}
}
]
});

export default mongoose.models.User || mongoose.model("User", userSchema);

---

✅ 3. MongoDB Connection

lib/mongodb.js

import mongoose from "mongoose";

export const connectDB = async () => {
if (mongoose.connection.readyState === 1) return;
await mongoose.connect(process.env.MONGO_URL);
};

---

✅ 4. Add to Cart API Route

app/api/cart/add/route.js

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
await connectDB();

const { userId, productId } = await req.json();

const user = await User.findById(userId);

// Check if item already exists
const item = user.cart.find((c) => c.productId.toString() === productId);

if (item) {
item.quantity += 1; // if exist, increase
} else {
user.cart.push({ productId, quantity: 1 });
}

await user.save();

return Response.json({ success: true, cart: user.cart });
}

---

✅ 5. Remove From Cart API

app/api/cart/remove/route.js

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
await connectDB();
const { userId, productId } = await req.json();

await User.updateOne(
{ \_id: userId },
{ $pull: { cart: { productId } } }
);

return Response.json({ success: true });
}

---

✅ 6. Get Cart with Full Product Details (Populate)

app/api/cart/route.js

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
await connectDB();

const userId = req.nextUrl.searchParams.get("userId");

const user = await User.findById(userId).populate("cart.productId");

return Response.json({ cart: user.cart });
}

---

✅ 7. Client-Side Example (Add to Cart Button)

(Using axios and JavaScript)

"use client";

import axios from "axios";
import { useState } from "react";

export default function AddToCart({ userId, productId }) {
const [loading, setLoading] = useState(false);

const handleAdd = async () => {
setLoading(true);
await axios.post("/api/cart/add", { userId, productId });
setLoading(false);
};

return (
<button onClick={handleAdd} disabled={loading}>
{loading ? "Adding..." : "Add to Cart"}
</button>
);
}

---

✅ 8. Fetch Cart Items in a Page

"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function CartPage({ userId }) {
const [cart, setCart] = useState([]);

useEffect(() => {
axios.get(`/api/cart?userId=${userId}`).then((res) => {
setCart(res.data.cart);
});
}, []);

return (
<div>
<h2>Your Cart</h2>
{cart.map((item) => (
<div key={item.productId._id}>
<h3>{item.productId.title}</h3>
<p>Price: {item.productId.price}</p>
<p>Qty: {item.quantity}</p>
</div>
))}
</div>
);
}

---

✅ 9. What This Achieves

✔ Stores multiple product IDs

✔ Stores quantity

✔ Fetches full product data using populate()

✔ Works with Next.js App Router

✔ Uses pnpm + JavaScript + axios

✔ Clean separation: API + models + frontend

---

Want a full Cart + Checkout system?

I can build:

✔ Cart page
✔ Update quantity
✔ Remove item
✔ Merge guest cart → user cart
✔ Store orders history
✔ Payment integration (Stripe / Razorpay)

Just tell me “yes continue”.

---_________________________--------____________________________________------

complex form data:-
Here’s the correct, simple, JavaScript-only way to create forms in Next.js App Router (app/ directory) — including how to submit, validate, and send data to an API route.

---

✅ 1. Basic Form in Next.js (Client Component)

Create a component inside:
app/contact/page.js

"use client";

import { useState } from "react";

export default function ContactPage() {
const [form, setForm] = useState({
name: "",
email: "",
message: ""
});

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);

};

return (
<div className="max-w-xl mx-auto p-6">
<h1 className="text-2xl font-bold mb-4">Contact Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border w-full p-2"
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="border w-full p-2"
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          className="border w-full p-2"
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white"
        >
          Submit
        </button>
      </form>
    </div>

);
}

---

✅ 2. Create the API Route

Make a backend handler in:
app/api/contact/route.js

export async function POST(req) {
const body = await req.json();

return Response.json({
success: true,
message: "Form submitted successfully!",
data: body
});
}

✔ Works like Express POST routes
✔ No need for api/contact.js — App Router uses folders

---

✅ 3. Folder Structure

app/
├─ contact/
│ └─ page.js
└─ api/
└─ contact/
└─ route.js

---

⭐ 4. Form with Validation Example

if (!form.email.includes("@")) {
alert("Enter a valid email");
return;
}

Add inside handleSubmit before fetch.

---

⭐ Extra Options You Can Use

If you want, I can show:

✅ Form using react-hook-form
✅ Form submitting to a MongoDB database
✅ Form with server actions (Next.js built-in, no API needed)
✅ File upload form
✅ Login form + NextAuth

Just tell me which one you want next.











category is other scheme object but how to save category field object data in database scheme

@1 make sidebar components inside function(component) send  Prop to second info sidebar
@2 or make inside tourist-places route page second info sidebar













