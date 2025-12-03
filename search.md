How to make searchbar query in nextjs

Here’s the simplest and proper way to make a search bar with query params in Next.js App Router (JavaScript + pnpm as you requested).

---

✅ Search Bar Using URL Query in Next.js (App Router)

We will use:

useSearchParams → read query

useRouter + usePathname → update query

No TypeScript

Works with pnpm

---

📌 1. Create SearchBar Component (Client Component)

app/components/SearchBar.jsx

"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
const searchParams = useSearchParams();
const router = useRouter();
const pathname = usePathname();

const [search, setSearch] = useState(searchParams.get("q") || "");

const handleSubmit = (e) => {
e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`);

};

return (
<form onSubmit={handleSubmit} className="flex gap-2">
<input
type="text"
placeholder="Search…"
value={search}
onChange={(e) => setSearch(e.target.value)}
className="border px-3 py-2 rounded"
/>

      <button className="bg-black text-white px-4 py-2 rounded">
        Search
      </button>
    </form>

);
}

---

📌 2. Use SearchBar in Your Page

app/page.jsx

import SearchBar from "./components/SearchBar";

export default function Home({ searchParams }) {
const query = searchParams.q || "";

return (
<div className="p-6">
<SearchBar />

      <h2 className="mt-5 text-xl">Search Result for: {query}</h2>
    </div>

);
}

---

📌 3. Use Query to Filter Data (Example)

Let’s say you fetch products:

export default async function Home({ searchParams }) {
const query = searchParams.q || "";

const res = await fetch("https://dummyjson.com/products");
const { products } = await res.json();

const filtered = products.filter((item) =>
item.title.toLowerCase().includes(query.toLowerCase())
);

return (
<div className="p-6">
<SearchBar />

      <h2 className="mt-5 text-xl">
        Showing results for: {query}
      </h2>

      <ul>
        {filtered.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>

);
}

---

🎉 Your search bar is now dynamic and SEO-friendly

✔ Works with Next.js App Router
✔ Updates URL: / ?q=iphone
✔ Server components can read query
✔ You can share links like / ?q=macbook

---

If you want, I can also show:

🔹 Debounce search (search while typing)
🔹 Search with MongoDB + API route
🔹 Search page like /search?q=keyword
🔹 Autocomplete search suggestions

## Just tell me!

But showing error
Error: Cannot read properties of undefined (reading 'q')
// Navbar for all devieses

11 | export default function Navbar({ searchParams }) {

> 12 | const query = searchParams.q || "";

| ^

You're getting this error because layout or components do NOT receive searchParams in Next.js.
Only page.js/page.jsx receives searchParams.

❌ Components like Navbar, Sidebar, Footer
❌ layout.jsx
❌ Server components (except pages)
do not automatically get searchParams.

So searchParams is undefined, and you get:

Cannot read properties of undefined (reading 'q')

---

✅ Fix: Read query from URL inside Navbar using useSearchParams()

If your Navbar is a client component, do this:

✔ Navbar.jsx (Client Component)

"use client";

import { useSearchParams } from "next/navigation";

export default function Navbar() {
const searchParams = useSearchParams();
const query = searchParams.get("q") || "";

return (
<nav className="p-4 bg-gray-100">
<div>Search Query: {query}</div>
</nav>
);
}

No more searchParams.q — use:

searchParams.get("q")

---

🔥 If You Want Search Bar Inside Navbar

"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
const searchParams = useSearchParams();
const router = useRouter();
const pathname = usePathname();

const [search, setSearch] = useState(searchParams.get("q") || "");

const handleSubmit = (e) => {
e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (search) params.set("q", search);
    else params.delete("q");

    router.push(`${pathname}?${params.toString()}`);

};

return (
<nav className="p-4 bg-gray-200">
<form onSubmit={handleSubmit} className="flex gap-2">
<input
type="text"
placeholder="Search…"
value={search}
onChange={(e) => setSearch(e.target.value)}
className="border px-3 py-2 rounded"
/>

        <button className="bg-black text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
    </nav>

);
}

---

🎯 Summary

Component Receives searchParams ? Fix

page.jsx ✅ YES Works normally
layout.jsx ❌ NO Use useSearchParams()
Navbar / Footer / Sidebar ❌ NO Must be use client + useSearchParams()

---

If you want, I can help you integrate this Navbar search into your full Next.js layout structure.

---

Searchbar available in navbar and navbar is layout component available all page. But I want that search any query in search and click to search button navigate search result route showing all search related results

Perfect — this is the correct and clean way to do it in Next.js:

✅ Goal

Searchbar is inside Navbar (inside layout.jsx)

Searchbar should navigate to a page like:

/search?q=iphone

/search page should show all results based on the query.

This is the recommended structure.

---

✅ STEP 1 — Navbar Searchbar (inside layout, must be client component)

✔ The Navbar cannot receive searchParams because it's not a page.
✔ So we use router to navigate to /search.

app/components/Navbar.jsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
const router = useRouter();
const [search, setSearch] = useState("");

const handleSubmit = (e) => {
e.preventDefault();

    if (!search.trim()) return;

    router.push(`/search?q=${search}`);

};

return (
<nav className="p-4 bg-gray-200">
<form onSubmit={handleSubmit} className="flex gap-2">
<input
type="text"
placeholder="Search…"
value={search}
onChange={(e) => setSearch(e.target.value)}
className="border px-3 py-2 rounded"
/>

        <button className="bg-black text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
    </nav>

);
}

---

✅ STEP 2 — Use Navbar in layout

app/layout.jsx

import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
return (
<html lang="en">
<body>
<Navbar />
{children}
</body>
</html>
);
}

---

✅ STEP 3 — Create a search results page

app/search/page.jsx

export default async function SearchPage({ searchParams }) {
const query = searchParams.q || "";

// Example API data
const res = await fetch("https://dummyjson.com/products");
const { products } = await res.json();

const filtered = products.filter((item) =>
item.title.toLowerCase().includes(query.toLowerCase())
);

return (
<div className="p-6">
<h1 className="text-2xl">Results for: {query}</h1>

      {filtered.length === 0 && (
        <p className="mt-4 text-gray-500">No results found.</p>
      )}

      <ul className="mt-5 space-y-2">
        {filtered.map((p) => (
          <li key={p.id} className="border p-2 rounded">
            {p.title}
          </li>
        ))}
      </ul>
    </div>

);
}

---

🔥 How it works

When user searches:

iphone

Navbar runs:

router.push(`/search?q=iphone`)

Then Next.js loads this page:

app/search/page.jsx

And it shows results.

---

🎯 Final Result

Navbar available on all pages

Query updated dynamically

Can share links like:

/search?q=laptop

Clean SEO-friendly routing

No errors

Entire project uses JavaScript & pnpm (as you want)

---

If you want, I can upgrade this to:

✅ Live search with debounce
✅ Show suggestions under search bar
✅ Use MongoDB search
✅ Create /api/search route for backend search

Just tell me!

---

But why this error showing Error: Cannot read properties of undefined (reading 'q')

components\ui\Navbar.jsx (12:30) @ Navbar

10 | // Navbar for all devieses

11 | export default function Navbar({ searchParams }) {

> 12 | const query = searchParams.q || "";

|

This error is 100% expected because:

❌ layout.jsx does NOT pass searchParams to Navbar
❌ Navbar is NOT a page
❌ Only page.jsx gets searchParams

So when you write:

export default function Navbar({ searchParams }) {
const query = searchParams.q || "";
}

👉 searchParams is undefined
👉 searchParams.q throws the error

---

✅ THE FIX (IMPORTANT)

Remove searchParams from the Navbar.
Navbar should NOT accept props.

Instead use useRouter() to navigate.

---

✅ Correct Navbar (No searchParams)

components/ui/Navbar.jsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
const router = useRouter();
const [search, setSearch] = useState("");

const handleSubmit = (e) => {
e.preventDefault();

    if (!search.trim()) return;

    router.push(`/search?q=${search}`);

};

return (
<nav className="p-4 bg-gray-200">
<form onSubmit={handleSubmit} className="flex gap-2">
<input
type="text"
placeholder="Search…"
value={search}
onChange={(e) => setSearch(e.target.value)}
className="border px-3 py-2 rounded"
/>

        <button className="bg-black text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
    </nav>

);
}

---

❗ Why Navbar must NOT use searchParams

Because only pages receive this from Next.js App Router:

export default function Page({ searchParams }) {}

Components do NOT receive it automatically.

Layout also does NOT receive it.

So this is invalid:

<Navbar searchParams={searchParams} />

Next.js doesn’t pass it.

---

✅ Search Page (Receives searchParams correctly)

app/search/page.jsx

export default function SearchPage({ searchParams }) {
const query = searchParams.q || "";

return (
<div className="p-6">
<h1>Results for: {query}</h1>
</div>
);
}

---

🎉 After this fix:

✔ No more error
✔ Navbar works globally
✔ Search redirects to /search?q=iphone
✔ SearchPage shows results

---

If you want, I can check your Navbar code and fix it completely — just paste it here.

---

I am change name search parama.q to search and const {products} = awaited res.json() to title name but search bar button clicking do not work

Got it — you changed:

?q=

to:

?search=

and now the search button does not work.

This happens because you're reading the wrong query param name in your Search Page.

Let me show you the correct full setup for custom query parameter names like search.

---

✅ 1. YOUR NAVBAR (WORKING VERSION)

Since you want:

/search-places?search=new place

Use this:

✔ Navbar.jsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
const [search, setSearch] = useState("");
const router = useRouter();

const handleSubmit = (e) => {
e.preventDefault();

    if (!search.trim()) return;

    router.push(`/search-places?search=${encodeURIComponent(search)}`);

};

return (
<form onSubmit={handleSubmit} className="flex gap-2">
<input
type="text"
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Search..."
className="border px-3 py-2 rounded"
/>

      <button className="bg-black text-white px-4 py-2 rounded">
        Search
      </button>
    </form>

);
}

✔ IMPORTANT

Use encodeURIComponent() — otherwise "new place" breaks the URL.

---

✅ 2. YOUR SEARCH RESULTS PAGE (VERY IMPORTANT)

You MUST read searchParams.search instead of searchParams.q.

app/search-places/page.jsx

export default async function SearchPlacesPage({ searchParams }) {
const query = searchParams.search || ""; // 👈 must match URL param name

const res = await fetch("https://dummyjson.com/products");
const { products } = await res.json();

const filtered = products.filter((item) =>
item.title.toLowerCase().includes(query.toLowerCase())
);

return (
<div className="p-6">
<h1 className="text-xl">Results for: {query}</h1>

      <ul className="mt-4 space-y-2">
        {filtered.map((item) => (
          <li key={item.id} className="border p-2 rounded">
            {item.title}
          </li>
        ))}
      </ul>
    </div>

);
}

---

🛑 WHY YOUR BUTTON WAS NOT WORKING

You likely had:

const query = searchParams.q

but your URL was:

?search=new

So searchParams.q was undefined → server-side filter breaks → page reloads → nothing happens.

---

✅ DOUBLE CHECK LIST

Where What it should be

Navbar → router.push /search-places?search=${search}
URL output ?search=value
Search Page searchParams.search

If ANY of these mismatch, the search breaks.

---

🎉 If you want, paste your exact navbar + page code, and I will fix them line-by-line.

---


AI Overview
Creating search bar functionality in Next.js 15 involves several key steps, especially considering the emphasis on Server Components and Server Actions in newer Next.js versions.

1. Create the Search Input Component:
   Input Field: Create a React component for your search input. This component will contain an <input type="search" /> element.
   State Management (Optional for client-side filtering): If you plan to filter data directly on the client-side (e.g., a small, pre-loaded list), use useState to manage the input's value.
   Styling: Apply CSS to style your search bar for a good user experience.
2. Handling Search Logic:
   Server-Side Search (Recommended for larger datasets/dynamic data):
   Server Actions: For submitting search queries, use Next.js Server Actions. This allows you to perform server-side logic directly from your client components without explicit API routes.
   URL Search Parameters: Update the URL's search parameters (?query=searchTerm) when a search is performed. This enables bookmarking and sharing of search results.
   Data Fetching: On the server, use the updated search parameters to fetch filtered data from your database or external API. Pass this data to your client components.
   Debouncing (Optional): For a better user experience and to prevent excessive server requests during typing, consider debouncing the search input using a library like use-debounce.
   Client-Side Filtering (For smaller, static datasets):
   Data Loading: Load your data (e.g., from a JSON file, or a client-side fetch) into a state variable.
   Filtering Logic: Use JavaScript's filter() method to filter the data based on the search input's value.
   Display Results: Map through the filtered data to display the results.
3. Integrating the Search Component:
   Placement: Integrate your search component into the desired page or layout (e.g., in a header, a dedicated search page).
   Server Component Integration: If using Server Actions and Server Components, ensure the data fetching and processing of search parameters happen efficiently on the server.
   Displaying Results: Create a component to display the search results, which will receive the filtered data as props.
   Example Structure (Server-Side with Server Actions):
   Code

// app/components/SearchInput.jsx
'use client'; // This component needs to be a Client Component to handle user input

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // Install 'use-debounce'

export default function SearchInput() {
const router = useRouter();
const [searchTerm, setSearchTerm] = useState('');

const handleSearch = useDebouncedCallback((term) => {
const params = new URLSearchParams(window.location.search);
if (term) {
params.set('query', term);
} else {
params.delete('query');
}
router.replace(`?${params.toString()}`);
}, 300);

const handleChange = (e) => {
const term = e.target.value;
setSearchTerm(term);
handleSearch(term);
};

return (
<input
      type="search"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
    />
);
}

// app/page.jsx (or any page where you want search results)
import SearchInput from './components/SearchInput';

export default async function HomePage({ searchParams }) {
const query = searchParams?.query || '';

// Fetch data based on 'query' on the server
const data = await fetchData(query); // Replace with your actual data fetching logic

return (
<div>
<SearchInput />
{/_ Display search results based on 'data' _/}
<ul>
{data.map((item) => (
<li key={item.id}>{item.name}</li>
))}
</ul>
</div>
);
}
This example outlines a common approach for implementing search functionality in Next.js 15, leveraging server-side capabilities for efficient data handling.
Dive deeper in AI Mode
AI responses may include mistakes. Learn more
Videos
Next.js 15: Server Actions Search Bar Tutorial - Easy & Effective ...
YouTube · thejayadad
26 Dec 2024

3:34
Use Next.js 15's form component for efficient server-side rendering of search results with prefetching, loading UI, and client-side validation.
Create A Fully Functional Search Bar in Next.js 14 - Step by Step
YouTube · Brett Westwood - Software Engineer
21 Feb 2024

30:53
Create a search bar in Next.js 14 to filter and display database results based on user queries using Prism ORM and MongoDB.
Build A Functional Search Bar with Next.js (SearchParams)
YouTube · Brett Westwood - Software Engineer
17 Jun 2023

38:44
Learn to create a fully functional search bar using Next.js 13 and the search params to filter through cryptocurrency coins based on user input.
Advanced search filtering in NextJs 15 ft Aurora Scharff
YouTube · Hamed Bahram
28 Jan 2025

52:41
Now you're treating the URL not only as a state but as a connection between your client and the server.

Next.js
https://nextjs.org
App Router: Adding Search and Pagination
Learn how to use the Next.js APIs: useSearchParams, usePathname, and useRouter. Implement search and pagination using URL search params.
useRouterNavigating Between PagesMutating Data

DEV Community
https://dev.to
Build a Functional Search Bar in Next.js
3 Dec 2023 — Build a Functional Search Bar in Next.js · Step 1 — Create Next App · Step 2 — Set up the Starter files · Step 3 — Build the SearchInput UI · Step 4 ...
Step 1 - Create Next AppStep 2 — Set up the Starter filesStep 3 — Building the...Step 4 — Build the ProfileCard...

Medium · Samiullahazizi
3 likes · 1 year ago
Adding a Comprehensive Search Input to Your Website with Next.js
Step 1: Set Up Your Next.js Project · Step 2: Create the Search Component · Step 3: Integrate the Search Component · Step 4: Style the Search Bar.

Strapi
https://strapi.io
Epic Next.js 15 Tutorial Part 8: Search and Pagination in Next.js
4 Sept 2025 — We'll create a search component that updates the URL as you type, making searches shareable and bookmarkable. The search will be "smart" - it ...

Next.js
https://nextjs.org
Functions: useSearchParams
useSearchParams is a Client Component hook that lets you read the current URL's query string ... useSearchParams returns a read-only version of the ...
Discussions and forums
How to implement search functionality in next js?

Stack Overflow ·
2y
I want to be able to display the query results that the user typed in the search input field. This is the product card component that maps through all the ...  
More
React with NextJS and Search Bar

Stack Overflow ·
1 answer
·
2y
How would you add a search input that filters data fetched on the server?

Reddit ·
r/nextjs
·
5 comments
·
1y

http://localhost:3000/datafetch/servercomp?movie=Interstellar
