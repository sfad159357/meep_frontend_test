import { useChatStore } from '@/store/chatStore';
import { Message as MessageComponent } from '../message/Message';
import { MessageInput } from '../message/MessageInput';
import { UserInfo } from '../user-info/UserInfo';
import { Chat, User, Message } from '@/types';
import { useEffect, useRef } from 'react';

interface ChatRoomProps {
  chatId: string;
}

export const ChatRoom = ({ chatId }: ChatRoomProps) => {
  const { chats, currentUser, isLoading, error } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chat = chats.find((c: Chat) => c.id === chatId);

  // 自動滾動到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col animate-pulse">
        <div className="flex-1 p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <p className="text-red-500 mb-2">Failed to load chat</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-primary-500 hover:text-primary-600"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!chat || !currentUser) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <p className="text-gray-500">Chat not found</p>
      </div>
    );
  }

  const otherParticipant = chat.participants.find(
    (p: User) => p.id !== currentUser.id
  );

  if (!otherParticipant) return null;

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No messages yet</p>
          </div>
        ) : (
          <>
            {chat.messages.map((message: Message) => {
              const sender = chat.participants.find(
                (p: User) => p.id === message.senderId
              );
              if (!sender) return null;

              return (
                <MessageComponent
                  key={message.id}
                  message={message}
                  sender={sender}
                  isCurrentUser={message.senderId === currentUser.id}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <MessageInput chatId={chatId} />
    </div>
  );
}; 