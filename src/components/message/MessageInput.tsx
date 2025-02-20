import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { PaperAirplaneIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useChatStore } from '@/store/chatStore';

interface MessageInputProps {
  chatId: string;
}

export const MessageInput = ({ chatId }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, currentUser } = useChatStore();

  const handleSendMessage = async () => {
    if (!message.trim() || !currentUser || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await addMessage(
        chatId,
        {
          content: message.trim(),
          type: 'text',
          senderId: currentUser.id,
          timestamp: Date.now(),
          reactions: [],
        },
        'text'
      );
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    const imageUrl = URL.createObjectURL(file);

    addMessage(
      chatId,
      {
        content: imageUrl,
        type: 'image',
        senderId: currentUser.id,
        timestamp: Date.now(),
        reactions: [],
      },
      'image'
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="p-2 w-full resize-none rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 min-h-[2.5rem] max-h-32 py-2"
            rows={1}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
          >
            <PhotoIcon className="h-6 w-6" />
          </button>
          
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!message.trim() || isSubmitting}
            className={`inline-flex items-center p-2 rounded-full 
              ${message.trim() && !isSubmitting
                ? 'text-primary-500 hover:text-primary-600 hover:bg-primary-50'
                : 'text-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-primary-500`}
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      
      {isSubmitting && (
        <p className="mt-2 text-xs text-gray-500">Sending...</p>
      )}
    </div>
  );
}; 