import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/prismadb"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: googleClientId || '',
      clientSecret: googleClientSecret || '',
    }),

    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Geçersiz mail ya da şifre girdiniz.")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
        })

        if (!user || !user?.hashed_password) {
          throw new Error("Geçersiz mail ya da şifre girdiniz.")
        }

        const comparedPassword = await bcrypt.compare(credentials.password, user.hashed_password)
        if (!comparedPassword) {
          throw new Error("Yanlış şifre girdiniz.")
        }

        return user
      }
    })
  ],

  pages: {
    signIn: "/login"
  },

  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
