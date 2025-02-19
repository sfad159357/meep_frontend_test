export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type ReactionType = 'like' | 'love' | 'laugh';

export type Reaction = {
  id: string;
  type: ReactionType;
  userId: string;
};

export type MessageType = 'text' | 'image' | 'system';

export type Message = {
  id: string;
  content: string;
  type: MessageType;
  senderId: string;
  timestamp: number;
  reactions: Reaction[];
};

export type Chat = {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  updatedAt: number;
}; 