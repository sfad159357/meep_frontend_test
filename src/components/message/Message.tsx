import { Message as MessageType, User } from '@/types';
import { UserInfo } from '../user-info/UserInfo';
import { format } from 'date-fns';
import Image from 'next/image';
import { HeartIcon, HandThumbUpIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, HandThumbUpIcon as HandThumbUpIconSolid, FaceSmileIcon as FaceSmileIconSolid } from '@heroicons/react/24/solid';
import { useChatStore } from '@/store/chatStore';
import type { ChatStore } from '@/store/chatStore';

interface MessageProps {
  message: MessageType;
  sender: User;
  isCurrentUser: boolean;
}

export const Message = ({ message, sender, isCurrentUser }: MessageProps) => {
  const { addReaction, removeReaction } = useChatStore();
  const selectedChatId = useChatStore((state: ChatStore) => state.selectedChatId);

  const reactionIcons = {
    like: { outline: HandThumbUpIcon, solid: HandThumbUpIconSolid },
    love: { outline: HeartIcon, solid: HeartIconSolid },
    laugh: { outline: FaceSmileIcon, solid: FaceSmileIconSolid },
  };

  const handleReaction = (type: 'like' | 'love' | 'laugh') => {
    if (!selectedChatId) return;
    
    const existingReaction = message.reactions.find(
      (r) => r.userId === sender.id && r.type === type
    );

    if (existingReaction) {
      removeReaction(selectedChatId, message.id, existingReaction.id);
    } else {
      addReaction(selectedChatId, message.id, {
        type,
        userId: sender.id,
      });
    }
  };

  return (
    <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} gap-4 mb-4`}>
      <UserInfo user={sender} size="sm" showName={false} />
      
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">{sender.name}</span>
          
          <div className={`rounded-message p-3 max-w-md ${
            isCurrentUser 
              ? 'bg-primary-500 text-white dark:bg-primary-600' 
              : 'bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100'
          }`}>
            {message.type === 'text' && <p>{message.content}</p>}
            
            {message.type === 'image' && (
              <div className="relative w-64 h-64">
                <Image
                  src={message.content}
                  alt="Shared image"
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwSkNOPTYwPTYyRkNUSFZIMS8wTh8+YV1JXE5WaXRlc35DWGR+aWf/2wBDARUXFyAeIBogHB4gGBgYICQiICAgICQsJCQkJCQsLiwsLCwsLC4uLi4uLi4uMTExMTExOTk5OTk5OTk5OTk5OTn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  className="object-cover rounded-lg transition-opacity duration-300 opacity-0"
                  onLoadingComplete={(img) => {
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100');
                  }}
                />
              </div>
            )}
            
            {message.type === 'system' && (
              <p className="text-sm italic text-gray-500">{message.content}</p>
            )}
          </div>
          
          <div className="flex gap-2 mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {format(message.timestamp, 'HH:mm')}
            </span>
            
            <div className="flex gap-1">
              {Object.entries(reactionIcons).map(([type, { outline: Icon, solid: SolidIcon }]) => {
                const hasReacted = message.reactions.some(
                  (r) => r.type === type && r.userId === sender.id
                );
                const reactionCount = message.reactions.filter(r => r.type === type).length;
                const ReactionIcon = hasReacted ? SolidIcon : Icon;
                
                return (
                  <button
                    key={type}
                    onClick={() => handleReaction(type as 'like' | 'love' | 'laugh')}
                    className={`p-1 rounded-full hover:bg-gray-100 flex items-center gap-1 ${
                      hasReacted ? 'text-primary-500' : 'text-gray-500'
                    } dark:hover:bg-gray-700`}
                  >
                    <ReactionIcon className="w-4 h-4" />
                    {reactionCount > 0 && (
                      <span className="text-xs">{reactionCount}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 