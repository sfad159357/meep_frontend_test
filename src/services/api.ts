import { Chat, Message, ReactionType } from '@/types';
import { mockChats, mockMessages } from './mockData';

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // 獲取對話列表
  async getConversations(): Promise<Chat[]> {
    await delay(500); // 模擬網絡延遲
    return mockChats;
  },

  // 獲取特定對話的消息
  async getMessages(conversationId: string): Promise<Message[]> {
    await delay(300);
    return mockMessages[conversationId] || [];
  },

  // 創建新消息
  async createMessage(conversationId: string, message: Omit<Message, 'id'>): Promise<Message> {
    await delay(200);
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      reactions: {
        like: 0,
        love: 0,
        laugh: 0
      }
    };

    // 更新 mock 數據
    if (!mockMessages[conversationId]) {
      mockMessages[conversationId] = [];
    }
    mockMessages[conversationId].push(newMessage);

    // 更新對話的最後一條消息
    const chat = mockChats.find(c => c.id === conversationId);
    if (chat) {
      chat.lastMessage = newMessage;
      chat.updatedAt = newMessage.timestamp;
    }

    return newMessage;
  },

  // 添加反應
  async addReaction(conversationId: string, messageId: string, reaction: { type: ReactionType; count: number }): Promise<void> {
    await delay(200);
    const messages = mockMessages[conversationId];
    const message = messages?.find(m => m.id === messageId);
    if (message) {
      message.reactions[reaction.type] = message.reactions[reaction.type] + 1;
    }
  },

  // 移除反應
  async removeReaction(conversationId: string, messageId: string, reactionType: ReactionType): Promise<void> {
    await delay(200);
    const messages = mockMessages[conversationId];
    const message = messages?.find(m => m.id === messageId);
    if (message && message.reactions[reactionType] > 0) {
      message.reactions[reactionType] = message.reactions[reactionType] - 1;
    }
  },
}; 