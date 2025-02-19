import { useChatStore } from '@/store/chatStore';
import { Message as MessageComponent } from '../message/Message';
import { MessageInput } from '../message/MessageInput';
import { UserInfo } from '../user-info/UserInfo';
import { Chat, User, Message } from '@/types';

interface ChatRoomProps {
  chatId: string;
}

export const ChatRoom = ({ chatId }: ChatRoomProps) => {
  const { chats, currentUser } = useChatStore();
  const chat = chats.find((c: Chat) => c.id === chatId);

  if (!chat || !currentUser) return null;

  const otherParticipant = chat.participants.find(
    (p: User) => p.id !== currentUser.id
  );

  if (!otherParticipant) return null;

  return (
    <div className="flex h-full flex-col rounded-lg bg-white shadow">
      {/* Header */}
      <div className="border-b p-4">
        <UserInfo user={otherParticipant} size="lg" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No messages yet</p>
          </div>
        ) : (
          chat.messages.map((message: Message) => {
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
          })
        )}
      </div>

      {/* Input */}
      <MessageInput chatId={chatId} />
    </div>
  );
}; 