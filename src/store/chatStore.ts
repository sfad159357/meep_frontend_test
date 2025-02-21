import { create } from 'zustand';
import { Chat, Message, User, Reactions, ReactionType } from '@/types';
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
  addReaction: (chatId: string, messageId: string, reaction: { type: ReactionType, count: number }) => Promise<void>;
  removeReaction: (chatId: string, messageId: string, reactionType: ReactionType) => Promise<void>;
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
      set((state) => {
        const chat = state.chats.find((c) => c.id === chatId);
        if (!chat) return state;

        // Only check for duplicates if it's a text message
        if (type === 'text') {
          const lastMessage = chat.messages[chat.messages.length - 1];
          if (lastMessage && 
              lastMessage.content === message.content && 
              lastMessage.type === message.type &&
              lastMessage.senderId === message.senderId &&
              Date.now() - lastMessage.timestamp < 1000) {
            return state;
          }
        }

        const newMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...message,
          type,
          reactions: {
            like: 0,
            love: 0,
            laugh: 0
          }
        };

        const updatedChat = {
          ...chat,
          messages: [...chat.messages, newMessage],
          updatedAt: Date.now()
        };

        return {
          ...state,
          chats: state.chats.map((c) =>
            c.id === chatId ? updatedChat : c
          ),
        };
      });
    } catch (error) {
      console.error('Failed to add message:', error);
      throw error;
    }
  },
  
  addReaction: async (chatId: string, messageId: string, reaction: { type: ReactionType, count: number }) => {
    const originalState = get();

    // Optimistic update
    set((state: ChatStore) => ({
      chats: state.chats.map((chat: Chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map((msg: Message) => {
              if (msg.id === messageId) {
                const currentCount = msg.reactions[reaction.type];
                return {
                  ...msg,
                  reactions: {
                    ...msg.reactions,
                    [reaction.type]: currentCount + 1
                  }
                };
              }
              return msg;
            }),
          };
        }
        return chat;
      }),
    }));

    try {
      await api.addReaction(chatId, messageId, reaction);
    } catch (error) {
      // Rollback on error
      set({ chats: originalState.chats, error: 'Failed to add reaction' });
      throw error;
    }
  },
  
  removeReaction: async (chatId: string, messageId: string, reactionType: ReactionType) => {
    const originalState = get();

    // Optimistic update
    set((state: ChatStore) => ({
      chats: state.chats.map((chat: Chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map((msg: Message) => {
              if (msg.id === messageId) {
                const currentCount = msg.reactions[reactionType];
                return {
                  ...msg,
                  reactions: {
                    ...msg.reactions,
                    [reactionType]: Math.max(0, currentCount - 1)
                  }
                };
              }
              return msg;
            }),
          };
        }
        return chat;
      }),
    }));

    try {
      await api.removeReaction(chatId, messageId, reactionType);
    } catch (error) {
      // Rollback on error
      set({ chats: originalState.chats, error: 'Failed to remove reaction' });
      throw error;
    }
  },
})); 