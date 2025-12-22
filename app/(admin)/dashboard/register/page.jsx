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
        className="bg-white text-zinc-600 p-6 rounded shadow w-80"
      >
        <h1 className="text-xl font-bold mb-4">Register</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border  mb-3 border-zinc-500/20 rounded-md"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 border-zinc-500/20 rounded-md"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 border-zinc-500/20 rounded-md"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
