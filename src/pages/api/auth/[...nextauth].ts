import { query as q } from 'faunadb'

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { fauna } from '../../../services/fauna'

export default NextAuth({

  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope: 'https://www.googleapis.com/auth/userinfo.email  https://www.googleapis.com/auth/userinfo.profile'
    })
  ],
  jwt: {
    signingKey: process.env.SIGNING_KEY
  },
  callbacks: {
    async signIn(user, account, profile) {
      const { name, email } = user
      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            {
              data: {
                name,
                email
              }
            }
          )
        )
        return true
      } catch {
        return false
      }
    },
  }
})