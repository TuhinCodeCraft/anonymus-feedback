import 'next-auth'
import { DefaultSession } from 'next-auth';

// Extending NextAuth's default 'User' interface with custom fields
declare module 'next-auth' {
    interface User {
        _id?: string; // MongoDB _id from DB model
        isVerified?: boolean; // Whether the user's email/account is verified
        isAcceptingMessages?: boolean; // Custom logic (like availability)
        username?: string; // Username from DB
    }

    // Extending the session type to include these custom fields
    interface Session{
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
        } & DefaultSession['user'] // whenever there is a session, it will have the default user fields as well
    }
}

// Extending JWT token fields to include custom user values
declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
}