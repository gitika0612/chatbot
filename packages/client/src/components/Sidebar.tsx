import { useState } from 'react';
import type { Chat } from '@/App';
import { Button } from '@/components/ui/button';
import { MessageSquareIcon, SidebarIcon } from 'lucide-react';
import clsx from 'clsx';

type SidebarProps = {
   chats: Chat[];
   activeChatId: string | null;
   setActiveChatId: (id: string) => void;
   onNewChat: () => void;
};

export default function Sidebar({
   chats,
   activeChatId,
   setActiveChatId,
   onNewChat,
}: SidebarProps) {
   const [isOpen, setIsOpen] = useState(true);

   return (
      <div
         className={clsx(
            'bg-[#f9f9f9] flex flex-col border-r overflow-hidden',
            'transition-all duration-300 ease-in-out',
            isOpen ? 'w-72 px-4 py-3' : 'w-16 px-4 py-3'
         )}
      >
         {/* Toggle Button when closed */}
         {!isOpen && (
            <div className="flex flex-col h-full">
               <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-200 text-gray-800 transition-colors duration-200 cursor-pointer"
               >
                  <SidebarIcon className="h-6 w-6" />
               </Button>
            </div>
         )}

         {/* Sidebar content when open */}
         {isOpen && (
            <>
               {/* Header */}
               <div className="flex items-center justify-between pb-3">
                  <span className="font-bold text-gray-800 text-lg">
                     AI Chatbot
                  </span>
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setIsOpen(false)}
                     className="p-2 rounded-full hover:bg-gray-200 text-gray-800 transition-colors duration-200 cursor-pointer"
                  >
                     <SidebarIcon className="h-6 w-6" />
                  </Button>
               </div>

               {/* New Chat Button */}
               <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                  <Button
                     variant="ghost"
                     size="lg"
                     onClick={onNewChat}
                     className="flex items-center gap-2 text-gray-800 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors duration-200 justify-start p-3 cursor-pointer w-full"
                  >
                     <MessageSquareIcon className="h-4 w-4" />
                     New Chat
                  </Button>

                  {/* Chat List */}
                  <div className="mt-4 flex flex-col gap-1">
                     {chats.map((chat) => (
                        <div
                           key={chat.id}
                           onClick={() => setActiveChatId(chat.id)}
                           className={`cursor-pointer rounded px-3 py-2 text-sm hover:bg-gray-200 ${
                              chat.id === activeChatId
                                 ? 'bg-gray-200 font-semibold'
                                 : ''
                           }`}
                        >
                           {chat.title}
                        </div>
                     ))}
                  </div>
               </div>
            </>
         )}
      </div>
   );
}
