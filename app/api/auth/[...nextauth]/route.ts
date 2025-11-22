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
                const DUMMY_EMAIL = process.env.DUMMY_EMAIL || "";
                const DUMMY_PASSWORD = process.env.DUMMY_PASSWORD || "";

                if (!DUMMY_EMAIL || !DUMMY_PASSWORD) {
                    console.warn("DUMMY_EMAIL or DUMMY_PASSWORD not set in environment; authorize will always fail.");
                    return null;
                }

                if (
                    credentials?.email === DUMMY_EMAIL &&
                    credentials?.password === DUMMY_PASSWORD
                ) {
                    return {
                        id: "1",
                        name: "Test User",
                        email: DUMMY_EMAIL,
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