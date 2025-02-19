import { Chat, Message, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    avatar: '/assets/avatars/user-1.jpg',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    avatar: '/assets/avatars/user-2.jpg',
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    avatar: '/assets/avatars/user-3.jpg',
  },
];

export const mockMessages: Record<string, Message[]> = {
  'chat-1': [
    {
      id: 'msg-1',
      content: 'Hey, how are you?',
      type: 'text',
      senderId: 'user-1',
      timestamp: Date.now() - 86400000, // 1 day ago
      reactions: [],
    },
    {
      id: 'msg-2',
      content: "I'm good, thanks! How about you?",
      type: 'text',
      senderId: 'user-2',
      timestamp: Date.now() - 82800000, // 23 hours ago
      reactions: [
        {
          id: 'reaction-1',
          type: 'like',
          userId: 'user-1',
        },
      ],
    },
  ],
  'chat-2': [
    {
      id: 'msg-3',
      content: 'Did you see the new project requirements?',
      type: 'text',
      senderId: 'user-3',
      timestamp: Date.now() - 3600000, // 1 hour ago
      reactions: [],
    },
  ],
};

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    participants: [mockUsers[0], mockUsers[1]],
    messages: mockMessages['chat-1'],
    lastMessage: mockMessages['chat-1'][mockMessages['chat-1'].length - 1],
    updatedAt: mockMessages['chat-1'][mockMessages['chat-1'].length - 1].timestamp,
  },
  {
    id: 'chat-2',
    participants: [mockUsers[0], mockUsers[2]],
    messages: mockMessages['chat-2'],
    lastMessage: mockMessages['chat-2'][mockMessages['chat-2'].length - 1],
    updatedAt: mockMessages['chat-2'][mockMessages['chat-2'].length - 1].timestamp,
  },
]; 