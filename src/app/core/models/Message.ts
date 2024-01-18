
export interface Message {
    content: string;
    sender: string;
    timestamp: string;
    type: 'incoming' | 'outgoing';
}