import NextAuth from "next-auth";
import {authOptions} from './options'

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}

// handler as GET/POST exports the API handler for both GET and POST methods — which is required because:
// GET is used for fetching session info, CSRF token, etc.
// POST is used for actions like sign-in, sign-out, callback, etc.