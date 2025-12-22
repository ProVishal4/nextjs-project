Below is a simple, practical guide to use Auth.js (NextAuth) in Next.js App Router using JavaScript, pnpm, and NO TypeScript.
1️⃣ Install Auth.js (NextAuth)
Copy code
Bash
pnpm add next-auth
2️⃣ Create Auth Configuration
Create this file:
Copy code

/src/auth.js
Copy code
```Jsx
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
3️⃣ Create API Route (App Router)
Create:
Copy code

/src/app/api/auth/[...nextauth]/route.js
Copy code
Js
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
✅ This is mandatory for Auth.js to work.
4️⃣ Add Environment Variables
In .env.local:
Copy code
Env
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=xxxxx
GOOGLE_CLIENT_SECRET=xxxxx
Generate secret:
Copy code
Bash
openssl rand -base64 32
5️⃣ Wrap App with Session Provider
Create:
Copy code

/src/components/SessionProvider.jsx
Copy code
Js
"use client";

import { SessionProvider } from "next-auth/react";

export default function Provider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
Use it in layout.js:
Copy code
Js
import Provider from "@/components/SessionProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
6️⃣ Login & Logout Buttons (Client Component)
Copy code
Js
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Welcome {session.user.name}</p>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }

  return <button onClick={() => signIn("google")}>Login with Google</button>;
}
7️⃣ Protect a Page (Server Component)
Copy code
Js
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <h1>Dashboard</h1>;
}
8️⃣ Protect API Route
Copy code
Js
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  return Response.json({ message: "Protected API" });
}
9️⃣ Custom Login Page (Optional)
Copy code

/src/app/login/page.js
Copy code
Js
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn("google")}>
        Sign in with Google
      </button>
    </div>
  );
}
```
🔐 Summary
✔ App Router support
✔ Server + Client auth
✔ Google OAuth
✔ Protected pages & APIs
✔ JavaScript only
✔ pnpm compatible
If you want:
Credentials (email/password)
MongoDB / Appwrite / Prisma
Role-based auth (admin/user)
Middleware protection
Tell me 👍


======================================================================================================================================================


To create a user from the Sign-In page you must use Credentials Provider and manually save the user in your database (MongoDB / Appwrite / etc.).

Below is the clean + real-world pattern used in Next.js App Router, Auth.js, JavaScript, pnpm.


---

1️⃣ Install Credentials Provider

pnpm add next-auth


---

2️⃣ Database User Model (Example: MongoDB)

/src/lib/models/User.js
```jsx
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
✅

---

// 3️⃣ Auth.js with Credentials (CREATE USER HERE)

// /src/auth.js

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isSignup: { label: "Signup", type: "text" },
      },

      async authorize(credentials) {
        await connectDB();

        const { name, email, password, isSignup } = credentials;

        // 🔹 SIGN UP (Create User)
        if (isSignup === "true") {
          const userExists = await User.findOne({ email });
          if (userExists) throw new Error("User already exists");

          const hashedPassword = await bcrypt.hash(password, 10);

          const user = await User.create({
            name,
            email,
            password: hashedPassword,
          });

          return {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        }

        // 🔹 SIGN IN
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Wrong password");

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
✅

---

4️⃣ API Route (Required)

//src/app/api/auth/[...nextauth]/route.js

import { handlers } from "@/auth";

export const { GET, POST } = handlers;

✅
---

5️⃣ Sign In / Sign Up Page (Single Page)

//src/app/login/page.js

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn("credentials", {
      redirect: true,
      name: form.name,
      email: form.email,
      password: form.password,
      isSignup: isSignup.toString(),
      callbackUrl: "/dashboard",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isSignup ? "Create Account" : "Login"}</h2>

      {isSignup && (
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit">
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have account? Login" : "Create new account"}
      </p>
    </form>
  );
}


---

6️⃣ How It Works (IMPORTANT)

✔ Same page for Login + Signup
✔ isSignup=true → user is created in database
✔ isSignup=false → normal login
✔ Password securely hashed
✔ Session auto created


---

7️⃣ Protect Pages

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  return <h1>Welcome {session.user.email}</h1>;
}


---

🔐 Final Flow

Signup Page → Create User → Auto Login → Dashboard
Login Page → Validate User → Dashboard


---

If you want next:

Email verification

Forgot password

Role based auth

Appwrite instead of MongoDB

JWT custom fields


Just tell me 👍
```
---------------------------------------------------
=====================================================================


Below is a **complete, simple GitHub login setup using NextAuth (Auth.js v5)** for **Next.js App Router**, **JavaScript (JSX)**, **TailwindCSS**, and **pnpm** — exactly matching your stack.

---

## 1️⃣ Install NextAuth (Auth.js)

```bash
pnpm add next-auth
```

---

## 2️⃣ Create GitHub OAuth App

1. Go to 👉 [https://github.com/settings/developers](https://github.com/settings/developers)
2. **New OAuth App**
3. Fill:

   * **Application name**: Your app name
   * **Homepage URL**: `http://localhost:3000`
   * **Authorization callback URL**:

     ```
     http://localhost:3000/deshboard 
     http://localhost:3000/api/auth/callback/github
     
     ```
4. Save and copy:

   * **Client ID**
   * **Client Secret**

---
============

Application name:-
nextjs-project

Homepage URL:-
 http://localhost:3000/deshboard

Application description:-
This is next auth

Authorization callback URL:-
 http://localhost:3000/api/auth/callback/github

Client ID:-
Ov23lixLcdQ8vzNezHw7

secret key:-
d36945cfdfdc78bf77511602f07d482fa9b59a40
==============


## 3️⃣ Add Environment Variables

Create **`.env.local`**

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

NEXTAUTH_SECRET=super-secret-key
NEXTAUTH_URL=http://localhost:3000
```

Generate secret:

```bash
openssl rand -base64 32
```

---

## 4️⃣ Configure NextAuth (App Router)

Create file:

📁 `app/api/auth/[...nextauth]/route.js`

```js
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
```

---

## 5️⃣ Wrap App with Session Provider

📁 `app/providers.jsx`

```jsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
``` 

📁 `app/layout.jsx`

```jsx
import Providers from "./providers";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## 6️⃣ Create Login Page (Tailwind UI)

📁 `app/login/page.jsx`

```jsx
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
```

---

## 7️⃣ Get Logged-in User Data

### Client Component

```jsx
"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  if (!session) return <p>Not logged in</p>;

  return (
    <div>
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
      <img src={session.user.image} width={40} />
    </div>
  );
}
```

---

## 8️⃣ Protect Routes (Server Component)

📁 `app/dashboard/page.jsx`

```js
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return <h1>Dashboard (Protected)</h1>;
}
```

---

## 9️⃣ Logout Button

```jsx
"use client";
import { signOut } from "next-auth/react";

<button onClick={() => signOut()}>
  Logout
</button>
```

---

## ✅ Final Flow

```
Login Page → GitHub OAuth → Session Stored → Protected Routes Access
```

---

If you want next:

* 🔒 **Role-based access**
* 🗄️ **MongoDB user save**
* 🔁 **Middleware route protection**
* 🎨 **Better Tailwind login UI**


==================================================================================================================================================================================================github login with manule login=====================================



Below is a **FULL WORKING Auth.js (NextAuth v5) setup** that:

✅ Uses **GitHub sign-in**
✅ **Detects NEW user on first login**
✅ Redirects new users to **Register page**
✅ Saves extra user info (username, role, etc.)
✅ Uses **Next.js App Router + JSX + TailwindCSS + pnpm**

No TypeScript. Clean structure. Beginner-friendly.

---

# 🗂️ Folder Structure (Important)

```
app/
├─ api/
│  ├─ auth/
│  │  └─ [...nextauth]/
│  │     └─ route.js
│  └─ register/
│     └─ route.js
│
├─ login/
│  └─ page.jsx
│
├─ register/
│  └─ page.jsx
│
├─ dashboard/
│  └─ page.jsx
│
├─ providers.jsx
├─ layout.jsx
└─ page.jsx
```

---

# 1️⃣ Install Packages

```bash
pnpm add next-auth mongoose
```

---

# 2️⃣ MongoDB Connection

📁 `lib/mongodb.js`

```js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};
```

---

# 3️⃣ User Model

📁 `models/User.js`

```js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  username: String,
  role: { type: String, default: "user" },
  isProfileComplete: { type: Boolean, default: false },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
```

---

# 4️⃣ Auth.js Configuration (IMPORTANT)

📁 `app/api/auth/[...nextauth]/route.js`

```js
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          isProfileComplete: false,
        });
      }

      return true;
    },

    async jwt({ token }) {
      await connectDB();
      const dbUser = await User.findOne({ email: token.email });

      if (dbUser) {
        token.isProfileComplete = dbUser.isProfileComplete;
        token.role = dbUser.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.isProfileComplete = token.isProfileComplete;
      session.user.role = token.role;
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

# 5️⃣ Session Provider

📁 `app/providers.jsx`

```jsx
"use client";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

📁 `app/layout.jsx`

```jsx
import Providers from "./providers";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

# 6️⃣ Login Page (Tailwind)

📁 `app/login/page.jsx`

```jsx
"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        <button
          onClick={() => signIn("github")}
          className="w-full bg-black text-white py-2 rounded"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
```

---

# 7️⃣ Dashboard (Redirect New Users)

📁 `app/dashboard/page.jsx`

```js
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (!session.user.isProfileComplete) {
    redirect("/register");
  }

  return <h1 className="text-2xl">Welcome to Dashboard</h1>;
}
```

---

# 8️⃣ Register Page (New User Form)

📁 `app/register/page.jsx`

```jsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function RegisterPage() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");

  const submitHandler = async () => {
    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    window.location.href = "/dashboard";
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-xl font-bold mb-4">Complete Profile</h1>

        <input
          className="border w-full p-2 mb-4"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={submitHandler}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
```

---

# 9️⃣ Register API Route

📁 `app/api/register/route.js`

```js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" });

  const { username } = await req.json();

  await connectDB();
  await User.findOneAndUpdate(
    { email: session.user.email },
    { username, isProfileComplete: true }
  );

  return Response.json({ success: true });
}
```

---

# ✅ FINAL AUTH FLOW

```
GitHub Login
   ↓
Check DB
   ↓
New User? → register page
   ↓
Save profile
   ↓
Dashboard
```

---

## 🔥 What you learned

✔ Auth.js GitHub login
✔ Detect new user
✔ Custom register page
✔ MongoDB user storage
✔ Route protection

---

If you want next:

* 🔐 **Middleware protection**
* 👥 **Admin / User roles**
* 🖼️ **Avatar upload**
* 🔑 **Credentials login**

Just tell me 👍


==============================================================================================================================================================================
============================Manule input Credentials provider Login====================





Great question 👍
You already have **Auth.js (NextAuth v5) Credentials provider** code — now I’ll show you **how to send signup data from UI**, **register user**, **sign in**, **Tailwind pages**, and **full folder structure** for **Next.js App Router (JSX)**.

---

# ✅ What we will build

* ✅ Register (Sign Up) page
* ✅ Login (Sign In) page
* ✅ Auth.js credentials setup (your code, improved)
* ✅ MongoDB user save
* ✅ TailwindCSS UI
* ✅ Clean folder structure

---

# 📁 Folder Structure (Recommended)

```
app/
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.js
├── login/
│   └── page.jsx
├── register/
│   └── page.jsx
├── dashboard/
│   └── page.jsx
├── layout.jsx
├── providers.jsx
lib/
├── mongodb.js
models/
├── user.js
```

---

# 1️⃣ MongoDB Connection

📁 `lib/mongodb.js`

```js
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(process.env.MONGODB_URI);
};
```

---

# 2️⃣ User Model

📁 `models/user.js`

```js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
```

---

# 3️⃣ Auth.js (Credentials) — Improved Version

📁 `app/api/auth/[...nextauth]/route.js`

```js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        name: { type: "text" },
        email: { type: "email" },
        password: { type: "password" },
        isSignup: { type: "text" },
      },

      async authorize(credentials) {
        await connectDB();

        const { name, email, password, isSignup } = credentials;

        // 🟢 SIGN UP
        if (isSignup === "true") {
          const userExists = await User.findOne({ email });
          if (userExists) throw new Error("User already exists");

          const hashedPassword = await bcrypt.hash(password, 10);

          const user = await User.create({
            name,
            email,
            password: hashedPassword,
          });

          return {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        }

        // 🔵 SIGN IN
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid password");

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

# 4️⃣ Providers Wrapper

📁 `app/providers.jsx`

```jsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

📁 `app/layout.jsx`

```jsx
import Providers from "./providers";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

# 5️⃣ Register Page (Sign Up) – TailwindCSS

📁 `app/register/page.jsx`

```jsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      ...form,
      isSignup: "true",
      redirect: false,
    });

    if (!res.error) router.push("/dashboard");
    else alert(res.error);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h1 className="text-xl font-bold mb-4">Register</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
```

---

# 6️⃣ Login Page (Sign In)

📁 `app/login/page.jsx`

```jsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      isSignup: "false",
      redirect: false,
    });

    if (!res.error) router.push("/dashboard");
    else alert(res.error);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}
```

---

# 7️⃣ Protected Dashboard Page

📁 `app/dashboard/page.jsx`

```js
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return <h1 className="text-2xl">Welcome {session.user.name}</h1>;
}
```

---

# ✅ Flow Summary

```
Register Page → Credentials (isSignup=true) → MongoDB Save
Login Page → Credentials (isSignup=false) → Session
Dashboard → Protected Route
```

---

If you want next:

* 🔐 **Middleware-based route protection**
* 🧑‍💼 **User roles (admin/user)**
* 🌍 **JWT custom fields**
* 🎨 **Better UI with validation**

Just tell me 👌
















































