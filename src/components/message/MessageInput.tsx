import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { PaperAirplaneIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useChatStore } from '@/store/chatStore';

interface MessageInputProps {
  chatId: string;
}

export const MessageInput = ({ chatId }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addMessage, currentUser } = useChatStore();

  const handleSendMessage = () => {
    if (!message.trim() || !currentUser) return;

    addMessage(
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
    <div className="border-t bg-white p-4">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full resize-none rounded-lg border border-gray-200 p-3 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            rows={1}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <PhotoIcon className="h-6 w-6" />
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="rounded-full bg-primary-500 p-2 text-white hover:bg-primary-600 disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}; 