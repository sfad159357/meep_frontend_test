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
    const { currentUser } = get();
    if (!currentUser) return;

    try {
      const newMessage = await api.createMessage(chatId, {
        ...message,
        senderId: currentUser.id,
        timestamp: Date.now(),
        reactions: [],
      });

      set((state: ChatStore) => ({
        chats: state.chats.map((chat: Chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage,
              updatedAt: Date.now(),
            };
          }
          return chat;
        }),
      }));
    } catch (error) {
      set({ error: 'Failed to send message' });
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