import { create } from 'zustand';
import { Chat, Message, Reaction, User } from '@/types';
import { api } from '@/services/api';

export interface ChatStore {
  chats: Chat[];
  currentUser: User | null;
  selectedChatId: string | null;
  isLoading: boolean;
  error: string | null;
  setCurrentUser: (user: User) => void;
  setSelectedChat: (chatId: string) => void;
  fetchChats: () => Promise<void>;
  addMessage: (
    chatId: string, 
    message: Omit<Message, 'id'>, 
    type: 'text' | 'image'
  ) => Promise<void>;
  addReaction: (chatId: string, messageId: string, reaction: Omit<Reaction, 'id'>) => Promise<void>;
  removeReaction: (chatId: string, messageId: string, reactionId: string) => Promise<void>;
}

// Mock current user for demo
const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  avatar: '/assets/avatars/user-1.jpg',
};

// Mock initial chats for demo
const mockChats: Chat[] = [
  {
    id: 'chat-1',
    participants: [
      mockUser,
      { id: 'user-2', name: 'Jane Smith', avatar: '/assets/avatars/user-2.jpg' },
    ],
    messages: [],
    updatedAt: Date.now(),
  },
  {
    id: 'chat-2',
    participants: [
      mockUser,
      { id: 'user-3', name: 'Mike Johnson', avatar: '/assets/avatars/user-3.jpg' },
    ],
    messages: [],
    updatedAt: Date.now(),
  },
];

export const useChatStore = create<ChatStore>((set: (state: Partial<ChatStore> | ((state: ChatStore) => Partial<ChatStore>)) => void, get: () => ChatStore) => ({
  chats: mockChats,
  currentUser: mockUser,
  selectedChatId: null,
  isLoading: false,
  error: null,
  
  setCurrentUser: (user: User) => set({ currentUser: user }),
  
  setSelectedChat: (chatId: string) => set({ selectedChatId: chatId }),
  
  fetchChats: async () => {
    set({ isLoading: true, error: null });
    try {
      const chats = await api.getConversations();
      set({ chats, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch chats', isLoading: false });
    }
  },
  
  addMessage: async (chatId: string, message: Omit<Message, 'id'>, type: 'text' | 'image') => {
    try {
      // 防止重複添加
      set((state) => {
        const chat = state.chats.find((c) => c.id === chatId);
        if (!chat) return state;

        // 檢查最後一條消息是否完全相同（防止重複）
        const lastMessage = chat.messages[chat.messages.length - 1];
        if (lastMessage && 
            lastMessage.content === message.content && 
            lastMessage.type === message.type &&
            lastMessage.senderId === message.senderId &&
            Date.now() - lastMessage.timestamp < 1000) { // 1秒內的相同消息視為重複
          return state;
        }

        // 如果不是重複消息，則添加
        const newMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...message
        };

        return {
          ...state,
          chats: state.chats.map((c) =>
            c.id === chatId
              ? {
                  ...c,
                  messages: [...c.messages, newMessage],
                }
              : c
          ),
        };
      });
    } catch (error) {
      console.error('Failed to add message:', error);
      throw error;
    }
  },
  
  addReaction: async (chatId: string, messageId: string, reaction: Omit<Reaction, 'id'>) => {
    try {
      await api.addReaction(chatId, messageId, reaction);
      set((state: ChatStore) => ({
        chats: state.chats.map((chat: Chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: chat.messages.map((msg: Message) => {
                if (msg.id === messageId) {
                  return {
                    ...msg,
                    reactions: [...msg.reactions, { ...reaction, id: `reaction-${Date.now()}` }],
                  };
                }
                return msg;
              }),
            };
          }
          return chat;
        }),
      }));
    } catch (error) {
      set({ error: 'Failed to add reaction' });
    }
  },
  
  removeReaction: async (chatId: string, messageId: string, reactionId: string) => {
    try {
      await api.removeReaction(chatId, messageId, reactionId);
      set((state: ChatStore) => ({
        chats: state.chats.map((chat: Chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: chat.messages.map((msg: Message) => {
                if (msg.id === messageId) {
                  return {
                    ...msg,
                    reactions: msg.reactions.filter((r: Reaction) => r.id !== reactionId),
                  };
                }
                return msg;
              }),
            };
          }
          return chat;
        }),
      }));
    } catch (error) {
      set({ error: 'Failed to remove reaction' });
    }
  },
})); 