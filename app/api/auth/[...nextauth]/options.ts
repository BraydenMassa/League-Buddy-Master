import { AuthOptions } from 'next-auth'
import prisma from '@/prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'cred',
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        })
        if (!user) {
          return null
        }
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        return passwordsMatch ? user : null
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
}

export default options
