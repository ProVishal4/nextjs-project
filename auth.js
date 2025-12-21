
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {connectDB} from "@/lib/mongodb";
import User from "@/models/user";

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

