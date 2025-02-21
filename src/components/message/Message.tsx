import { Message as MessageType, User, Reactions } from '@/types';
import { UserInfo } from '../user-info/UserInfo';
import { format } from 'date-fns';
import Image from 'next/image';
import { HeartIcon, HandThumbUpIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, HandThumbUpIcon as HandThumbUpIconSolid, FaceSmileIcon as FaceSmileIconSolid } from '@heroicons/react/24/solid';
import { useChatStore } from '@/store/chatStore';
import type { ChatStore } from '@/store/chatStore';
import { useState } from 'react';

interface MessageProps {
  message: MessageType;
  sender: User;
  isCurrentUser: boolean;
}

export const Message = ({ message, sender, isCurrentUser }: MessageProps) => {
  const { addReaction, removeReaction } = useChatStore();
  const selectedChatId = useChatStore((state: ChatStore) => state.selectedChatId);
  const currentUser = useChatStore((state: ChatStore) => state.currentUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize reactions if they don't exist
  if (!message.reactions) {
    message.reactions = {
      like: 0,
      love: 0,
      laugh: 0
    };
  }

  const reactionIcons = {
    like: { outline: HandThumbUpIcon, solid: HandThumbUpIconSolid },
    love: { outline: HeartIcon, solid: HeartIconSolid },
    laugh: { outline: FaceSmileIcon, solid: FaceSmileIconSolid },
  } as const;

  const handleReaction = async (type: keyof Reactions) => {
    if (!selectedChatId || isSubmitting || !currentUser) return;
    
    try {
      setIsSubmitting(true);
      const currentCount = message.reactions[type];
      
      if (currentCount > 0) {
        await removeReaction(selectedChatId, message.id, type);
      } else {
        await addReaction(selectedChatId, message.id, {
          type,
          count: 1  // Always increment by 1
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} gap-4 mb-4`}>
      <UserInfo user={sender} size="sm" showName={false} />
      
      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`
            flex flex-col
            ${isCurrentUser ? 'items-end' : 'items-start'}
          `}
        >
          <div
            className={`
              rounded-lg 
              ${isCurrentUser 
                ? 'bg-primary-500 text-white dark:bg-primary-600' 
                : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
              }
              ${message.type === 'image' ? 'p-0 bg-transparent shadow-lg' : 'px-4 py-2'} 
            `}
          >
            {message.type === 'text' && <p>{message.content}</p>}
            
            {message.type === 'image' && (
              <div className="relative max-w-md">
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent rounded-t-lg pointer-events-none"></div>
                <Image
                  src={message.content}
                  alt="Shared image"
                  width={400}
                  height={400}
                  style={{ 
                    objectFit: 'contain',
                    width: 'auto',
                    height: 'auto'
                  }}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwSkNOPTYwPTYyRkNUSFZIMS8wTh8+YV1JXE5WaXRlc35DWGR+aWf/2wBDARUXFyAeIBogHB4gGBgYICQiICAgICQsJCQkJCQsLiwsLCwsLC4uLi4uLi4uMTExMTExOTk5OTk5OTk5OTk5OTn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  className="rounded-lg transition-opacity duration-300 opacity-0"
                  onLoadingComplete={(img) => {
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100');
                  }}
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority={false}
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {format(message.timestamp, 'HH:mm')}
            </span>
            
            <div className="flex gap-1">
              {(Object.entries(reactionIcons) as [keyof Reactions, typeof reactionIcons[keyof Reactions]][]).map(([type, { outline: Icon, solid: SolidIcon }]) => {
                const count = message.reactions[type];
                const hasReacted = count > 0;
                const ReactionIcon = hasReacted ? SolidIcon : Icon;
                const iconColor = type === 'love' 
                  ? 'text-red-500 dark:text-red-400' 
                  : type === 'laugh'
                  ? 'text-yellow-500 dark:text-yellow-400'
                  : hasReacted 
                  ? 'text-primary-500 dark:text-primary-400' 
                  : 'text-gray-500 dark:text-gray-400';
                
                return (
                  <button
                    key={type}
                    onClick={() => handleReaction(type)}
                    className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1 ${iconColor}`}
                    disabled={isSubmitting}
                  >
                    <ReactionIcon className="w-4 h-4" />
                    {count > 0 && (
                      <span className="text-xs">{count}</span>
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