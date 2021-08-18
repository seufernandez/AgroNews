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
  
  callbacks: {
    async session(session){
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active",
              )
            ]),
          )
        )
        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch {
        return {
          ...session,
          activeSubscription: null
        }
      }
    },  
    async signIn(user, account, profile) {
      const { name, email } = user
      try { 
        await fauna.query(
          q.If(
            // (
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              ) 
            ),  
            // ) {
            q.Create(
              q.Collection('users'),
              {
                data: {
                  name,
                  email 
                }
              }
            ),
            //} else {
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )

        return true
      } catch {
        return false
      }
    },
  }
})