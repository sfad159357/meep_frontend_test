import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ChatList } from '@/components/chat-list/ChatList';
import { useChatStore } from '@/store/chatStore';

export default function Home() {
  const { fetchChats, isLoading, error } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="mt-1 text-sm text-gray-600">Your conversations</p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 mb-4"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : error ? (
            <div className="p-4 text-center bg-red-50">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          ) : (
            <ChatList />
          )}
        </div>
      </div>
    </Layout>
  );
} 