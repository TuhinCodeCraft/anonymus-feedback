import { Message } from "@/models/User";

// This file defines the structure of the API response used in the application.
export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<Message>;
}

