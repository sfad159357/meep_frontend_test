import { Chat, Message, User } from '@/types';
import chatData from '@/constant/chat_data.json';

// 從聊天數據中提取唯一的用戶
const extractUsers = (messages: any[]): User[] => {
  const uniqueUsers = new Map();
  
  messages.forEach(msg => {
    if (!uniqueUsers.has(msg.userId)) {
      uniqueUsers.set(msg.userId, {
        id: `user-${msg.userId}`,
        name: msg.user,
        avatar: msg.avatar
      });
    }
  });

  return Array.from(uniqueUsers.values());
};

// 將消息按照對話ID分組
const groupMessagesByConversation = (messages: any[]): Record<string, Message[]> => {
  const groupedMessages = messages.reduce((acc, msg) => {
    const chatId = `chat-${msg.conversationId}`;
    if (!acc[chatId]) {
      acc[chatId] = [];
    }
    
    acc[chatId].push({
      id: `msg-${msg.conversationId}-${acc[chatId].length + 1}`,
      content: msg.message,
      type: msg.messageType,
      senderId: `user-${msg.userId}`,
      timestamp: msg.timestamp,
      reactions: Object.entries(msg.reactions).map(([type, count]) => ({
        id: `reaction-${type}-${Date.now()}`,
        type,
        count: count as number
      }))
    });
    
    return acc;
  }, {} as Record<string, Message[]>);

  return groupedMessages;
};

// 創建聊天對話
const createChats = (messages: Record<string, Message[]>, users: User[]): Chat[] => {
  return Object.entries(messages).map(([chatId, msgs]) => {
    // 獲取該對話中的所有參與者ID
    const participantIds = new Set(msgs.map(msg => msg.senderId));
    
    return {
      id: chatId,
      participants: users.filter(user => participantIds.has(user.id)),
      messages: msgs,
      lastMessage: msgs[msgs.length - 1],
      updatedAt: msgs[msgs.length - 1].timestamp
    };
  });
};

export const mockUsers = extractUsers(chatData.messages);
export const mockMessages = groupMessagesByConversation(chatData.messages);
export const mockChats = createChats(mockMessages, mockUsers); 