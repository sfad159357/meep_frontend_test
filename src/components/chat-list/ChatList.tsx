import { useChatStore } from '@/store/chatStore';
import { UserInfo } from '../user-info/UserInfo';
import { format } from 'date-fns';
import Link from 'next/link';
import { Chat, User } from '@/types';
export const ChatList = () => {
  const { chats, currentUser, selectedChatId } = useChatStore();

  return (
    <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow overflow-hidden">
      {chats.map((chat: Chat) => {
        const otherParticipant = chat.participants.find(
          (p: User) => p.id !== currentUser?.id
        );

        if (!otherParticipant) return null;

        return (
          <li 
            key={chat.id}
            className={`${selectedChatId === chat.id ? 'bg-primary-50' : ''}`}
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <UserInfo user={otherParticipant} size="md" showName={false} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/chat/${chat.id}`}
                    className="block hover:bg-gray-50 -m-4 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {otherParticipant.name}
                      </h3>
                      {chat.lastMessage && (
                        <span className="text-xs text-gray-500">
                          {format(chat.lastMessage.timestamp, 'HH:mm')}
                        </span>
                      )}
                    </div>
                    
                    {chat.lastMessage && (
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {chat.lastMessage.type === 'text' && chat.lastMessage.content}
                        {chat.lastMessage.type === 'image' && '🖼️ Image'}
                        {chat.lastMessage.type === 'system' && (
                          <span className="italic">{chat.lastMessage.content}</span>
                        )}
                      </p>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}; 