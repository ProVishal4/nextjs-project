"use client";
// /*
// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (!res.error) {
//       router.push("/dashboard");
//     } else {
//       alert(res.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="w-96 p-6 border rounded-lg shadow"
//       >
//         <h1 className="text-2xl font-bold mb-4">Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-3 p-2 border rounded"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-3 p-2 border rounded"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="w-full bg-black text-white py-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
// */




// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function LoginPage() {
//   const [isSignup, setIsSignup] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await signIn("credentials", {
//       redirect: true,
//       name: form.name,
//       email: form.email,
//       password: form.password,
//       isSignup: isSignup.toString(),
//       callbackUrl: "/dashboard",
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>{isSignup ? "Create Account" : "Login"}</h2>

//       {isSignup && (
//         <input
//           placeholder="Name"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//       )}

//       <input
//         placeholder="Email"
//         className="dark:bg-[#333030] bg-blue-200 hover:bg-zinc-400/40   hover:dark:bg-zinc-zinc-600 rounded-4xl pl-5 py-3 mr-4 text-zinc-800 dark:text-zinc-400"
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="dark:bg-[#333030] bg-blue-200 hover:bg-zinc-400/40   hover:dark:bg-zinc-zinc-600 rounded-4xl pl-5 py-3 mr-4 text-zinc-800 dark:text-zinc-400"
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />

//       <button
//         className="py-3 px-6 rounded-lg bg-amber-400/90 text-black active:scale-90 hover:bg-amber-600/90"
//         type="submit"
//       >
//         {isSignup ? "Sign Up" : "Login"}
//       </button>

//       <p onClick={() => setIsSignup(!isSignup)}>
//         {isSignup ? "Already have account? Login" : "Create new account"}
//       </p>
//     </form>
//   );
// }


// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       email,
//       password,
//       isSignup: "false",
//       redirect: false,
//     });

//     if (!res.error) router.push("/dashboard/view-database");
//     else alert(res.error);
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white text-zinc-600 p-6 rounded shadow w-80"
//       >
//         <h1 className="text-xl font-bold mb-4">Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 mb-3 bg-zinc-500/10 rounded-md"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 mb-4 bg-zinc-500/10 rounded-md"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="w-full bg-black text-white py-2 rounded">
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// }
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Dashboard() {
  //  const session = await auth();
  const session = await getServerSession(authOptions);
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  //console.log(session)
  if (!session) redirect("/login");

  return (
    <>
      <h1>
        Welcome{" "}
        <span className="text-2xl font-bold text-lime-400">
          {session.user.name}
        </span>{" "}
        <br />{" "}
        <span className="text-2xl font-bold text-lime-400">
          {session.user.email}
        </span>
      </h1>
      ;
      <Link
        className="rounded-md bg-zinc-600 px-3 py-2"
        href={"/dashboard/all-articles"}
      >
        All Articles{" "}
      </Link>
    </>
  );
}