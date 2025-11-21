import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                // DUMMY LOGIN
                if (
                    credentials?.email === "test@example.com" &&
                    credentials?.password === "dummyPassword"
                ) {
                    return {
                        id: "1",
                        name: "Test User",
                        email: "test@example.com",
                    };
                }

                return null;
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };