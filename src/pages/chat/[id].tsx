import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ChatRoom } from '@/components/chat-room/ChatRoom';
import { useChatStore } from '@/store/chatStore';

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const { fetchChats, setSelectedChat } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    if (id && typeof id === 'string') {
      setSelectedChat(id);
    }
  }, [id, setSelectedChat]);

  if (!id || typeof id !== 'string') {
    return null;
  }

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)]">
        <ChatRoom chatId={id} />
      </div>
    </Layout>
  );
} 