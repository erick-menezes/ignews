import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna';
import { query as q } from 'faunadb';

// TODO later
// https://next-auth.js.org/configuration/options#secret

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: { scope: "read:user" }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("users_by_email"),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index("users_by_email"),
                q.Casefold(email)
              )
            )
          )
        )

        return true;
      } catch {
        return false;
      }

    }, 
  }
}

export default NextAuth(authOptions)