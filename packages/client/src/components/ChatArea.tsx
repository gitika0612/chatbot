import type { Message } from '@/App';
import { Card } from '@/components/ui/card';

type ChatAreaProps = {
   messages: Message[];
   loading: boolean;
   bottomRef: React.RefObject<HTMLDivElement | null>;
};

export default function ChatArea({
   messages,
   loading,
   bottomRef,
}: ChatAreaProps) {
   return (
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-2">
         {messages.map((msg, idx) => (
            <Card
               key={idx}
               className={`max-w-[70%] px-4 py-2 text-sm whitespace-pre-wrap
           ${
              msg.role === 'user'
                 ? 'self-end bg-indigo-600 text-white'
                 : 'self-start bg-gray-200 text-gray-900'
           }`}
            >
               {msg.content}
            </Card>
         ))}
         {loading && (
            <Card className="self-start px-4 py-2 text-sm bg-gray-200">
               Typing...
            </Card>
         )}
         <div ref={bottomRef} />
      </div>
   );
}
