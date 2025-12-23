
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions = {
    providers: [
        Credentials({
            credentials: {
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
                    const exists = await User.findOne({ email });
                    if (exists) throw new Error("User already exists");

                    const hashedPassword = await bcrypt.hash(password, 10);

                    const user = await User.create({
                        name,
                        email,
                        password: hashedPassword,
                    });

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                    };
                }

                // 🔵 SIGN IN
                const user = await User.findOne({ email });
                if (!user) throw new Error("User not found");

                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) throw new Error("Invalid password");

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },
    // pages: {
    //     signOut: "/logout",
    // },
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
