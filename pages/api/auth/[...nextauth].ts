import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "../../../lib/prismadb";
import bCrypt from "bcrypt-nodejs";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const authOptions = {
    // adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            //@ts-ignore
            authorize: async (credentials, req) => {
                const username = credentials?.username ?? "";
                const password = credentials?.password ?? "";

                let isLoggedIn = false;
                let user = null;

                if (username && password) {
                    try {
                        user = await prisma.users.findFirst({
                            where: { username },
                        });

                        const passwordMatch = await bCrypt.compareSync(
                            password,
                            user?.password ?? ""
                        );

                        isLoggedIn = passwordMatch;
                    } catch (e) {}
                }

                if (isLoggedIn) {
                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        username: user?.username,
                        mail: user?.mail,
                        isAdmin: user?.isAdmin,
                    };
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    callbacks: {
        //@ts-ignore
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        //@ts-ignore
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },

    pages: {
        signIn: "/login", //Need to define custom login page (if using)
        admin: "/admin",
    },
};

//@ts-ignore
export default NextAuth(authOptions);
