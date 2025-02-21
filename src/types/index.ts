export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type ReactionType = 'like' | 'love' | 'laugh';

export type Reactions = {
  like: number;
  love: number;
  laugh: number;
};

export type MessageType = 'text' | 'image' | 'system';

export type Message = {
  id: string;
  content: string;
  type: MessageType;
  senderId: string;
  timestamp: number;
  reactions: Reactions;
};

export type Chat = {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  updatedAt: number;
}; 