import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma"; // Σωστή διαδρομή αφού το lib είναι μέσα στο app
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Έλεγχος αν δόθηκαν στοιχεία
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Please fill in all fields");
        }

        // 2. Αναζήτηση του χρήστη στη βάση δεδομένων
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        // 3. Αν δεν βρεθεί ο χρήστης
        if (!user) {
          throw new Error("Invalid credentials");
        }

        // 4. Σύγκριση του κωδικού με το hash στη βάση
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        // 5. Αν όλα είναι σωστά, επιστρέφουμε τον χρήστη στο session
        return {
          id: user.id,
          name: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Ορίζουμε τη δική μας custom σελίδα login
  },
  session: {
    strategy: "jwt", // Χρήση JSON Web Tokens για μέγιστη ταχύτητα
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
