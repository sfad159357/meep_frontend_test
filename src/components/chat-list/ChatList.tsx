import { useChatStore } from '@/store/chatStore';
import { UserInfo } from '../user-info/UserInfo';
import { format } from 'date-fns';
import { Chat, User } from '@/types';
import { useState } from 'react';
import { Modal } from '../modal/Modal';
import { ChatRoom } from '../chat-room/ChatRoom';

export const ChatList = () => {
  const { chats, currentUser, selectedChatId, setSelectedChat } = useChatStore();
  const [selectedChat, setSelectedChatState] = useState<string | null>(null);

  const handleChatClick = (chatId: string) => {
    setSelectedChat(chatId);
    setSelectedChatState(chatId);
  };

  const handleCloseModal = () => {
    setSelectedChatState(null);
  };

  return (
    <>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow overflow-hidden">
        {chats.map((chat: Chat) => {
          const otherParticipant = chat.participants.find(
            (p: User) => p.id !== currentUser?.id
          );

          if (!otherParticipant) return null;

          const isSelected = selectedChatId === chat.id;

          return (
            <li 
              key={chat.id}
              className={`relative ${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
            >
              <button
                onClick={() => handleChatClick(chat.id)}
                className="w-full text-left block p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <UserInfo user={otherParticipant} size="md" showName={false} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {otherParticipant.name}
                      </h3>
                      {chat.lastMessage && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {format(chat.lastMessage.timestamp, 'HH:mm')}
                        </span>
                      )}
                    </div>
                    
                    {chat.lastMessage && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                        {chat.lastMessage.type === 'text' && chat.lastMessage.content}
                        {chat.lastMessage.type === 'image' && '🖼️ Image'}
                        {chat.lastMessage.type === 'system' && (
                          <span className="italic">{chat.lastMessage.content}</span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Unread indicator - 可以之後實作 */}
                {false && (
                  <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary-500" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <Modal
        isOpen={!!selectedChat}
        onClose={handleCloseModal}
        title="Chat"
      >
        {selectedChat && (
          <ChatRoom chatId={selectedChat} />
        )}
      </Modal>
    </>
  );
}; 