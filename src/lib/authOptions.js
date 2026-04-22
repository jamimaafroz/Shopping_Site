import dbConnect, { collectionObj } from "@/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Inside src/lib/authOptions.js

      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          if (!email || !password) return null;

          // THE FIX IS HERE: Connect exactly how you originally did it
          const usersCollection = await dbConnect(collectionObj.userCollection);
          const user = await usersCollection.findOne({ email });

          if (!user) {
            console.log("Login failed: User not found");
            return null;
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            console.log("Login failed: Wrong password");
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Authorize Error:", error); // This will catch any future crashes!
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
