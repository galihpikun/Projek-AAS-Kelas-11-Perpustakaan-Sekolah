import { findUserByEmail } from "@/lib/action";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    pages:{
        signIn:"/login"
    },
    providers: [
      CredentialsProvider({
        async authorize(credentials, req) {
            // unboxing data email password
            const email = credentials.email
            const password = credentials.password
            // cari user berdasarkan email
            const user = await findUserByEmail(email)

            if (!user) return null
            // mengcompare password
            const Validation = await compare(password, user.password)

            if (!Validation) return null
            // return user ke session
            return {
                id: user.user_id,
                email : user.email,
                name: user.username,
                role: user.role
            }
        }
      })
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id
          token.role = user.role
        }
        return token
      },
      async session({ session, token, user }) {
        session.user.id = token.id
        session.user.role = token.role
        
        return session
      }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }