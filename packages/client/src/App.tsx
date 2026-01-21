import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import SendMessage from './components/sendMessage';

export type Message = {
   role: 'user' | 'assistant';
   content: string;
};

export type Chat = {
   id: string;
   title: string;
   messages: Message[];
};

function App() {
   const [chats, setChats] = useState<Chat[]>([]);
   const [activeChatId, setActiveChatId] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);
   const bottomRef = useRef<HTMLDivElement | null>(null);

   const activeChat = chats.find((c) => c.id === activeChatId) || null;

   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [activeChat?.messages]);

   const createNewChat = () => {
      const newChat: Chat = {
         id: uuidv4(),
         title: `Chat ${chats.length + 1}`,
         messages: [],
      };
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChat.id);
   };

   const sendMessage = async (prompt: string) => {
      if (!prompt.trim() || !activeChat || loading) return;

      const userMessage: Message = { role: 'user', content: prompt };
      const updatedChat = {
         ...activeChat,
         messages: [...activeChat.messages, userMessage],
      };

      setChats((prev) =>
         prev.map((chat) => (chat.id === activeChat.id ? updatedChat : chat))
      );

      setLoading(true);

      try {
         const res = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               prompt,
               conversationId: activeChat.id,
            }),
         });

         if (!res.ok) throw new Error('Request failed');

         const data = await res.json();

         const botMessage: Message = {
            role: 'assistant',
            content: data.message,
         };

         setChats((prev) =>
            prev.map((chat) =>
               chat.id === activeChat.id
                  ? { ...chat, messages: [...chat.messages, botMessage] }
                  : chat
            )
         );
      } catch {
         setChats((prev) =>
            prev.map((chat) =>
               chat.id === activeChat.id
                  ? {
                       ...chat,
                       messages: [
                          ...chat.messages,
                          {
                             role: 'assistant',
                             content: '❌ Something went wrong.',
                          },
                       ],
                    }
                  : chat
            )
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex h-screen">
         <Sidebar
            chats={chats}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            onNewChat={createNewChat}
         />
         <div className="flex-1 flex flex-col bg-white">
            {activeChat ? (
               <>
                  <div className="px-6 py-4 border-b font-semibold text-lg">
                     {activeChat.messages.length === 0
                        ? "What's on your mind?"
                        : activeChat.title}
                  </div>
                  <ChatArea
                     messages={activeChat.messages}
                     loading={loading}
                     bottomRef={bottomRef}
                  />
                  <SendMessage onSend={sendMessage} loading={loading} />
               </>
            ) : (
               <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a chat or create a new one
               </div>
            )}
         </div>
      </div>
   );
}

export default App;
