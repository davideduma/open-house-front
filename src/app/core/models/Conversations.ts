import { Message } from "./Message";

export interface Conversations {
    id: number,
    user_receiver: string,
    lastMessage: string,
    avatar: string | '',
    status: string,
    timestamp: string,
    messages:Message [],
    user_transmitter: string | null
}