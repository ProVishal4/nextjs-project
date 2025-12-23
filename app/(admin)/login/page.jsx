"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
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
    <form onSubmit={submit} className="p-6 max-w-sm mx-auto">
      <input
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-black text-white w-full py-2">Login</button>
    </form>
  );
}
