// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";

// const handler = NextAuth({
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_CLIENT_ID,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         }),
//     ],
//     // pages: {
//     //     signIn: "/login",
//     // },
//     session: {
//         strategy: "jwt",
//     }, 
// });

// export { handler as GET, handler as POST };

// import { handlers } from "@/auth";

// export const { GET, POST } = handlers;

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
//import { auth, handlers } from "@/auth";

export const authOptions = {
    providers: [
        Credentials({
            name: "credentials", 
            credentials: {
                // name: { type: "text" },
                // email: { type: "email" }, 
                // password: { type: "password" },
                // isSignup: { type: "text" },
                name: {},
                email: {},
                password: {},
                isSignup: {},
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
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    // pages: {
    //     signIn: "/login",
    // },
};

// const {handlers, auth} = NextAuth(authOptions);
// export {  GET,  POST };

// export const { handlers, auth } = NextAuth(authOptions);
// export const { GET, POST } = handlers;


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };