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

/src/app/api/auth/[...nextauth]/route.js

import { handlers } from "@/auth";

export const { GET, POST } = handlers;

✅
---

5️⃣ Sign In / Sign Up Page (Single Page)

/src/app/login/page.js

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

Tell me 👍











