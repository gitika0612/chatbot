import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type SendMessageProps = {
   onSend: (msg: string) => void;
   loading: boolean;
};

export default function SendMessage({ onSend, loading }: SendMessageProps) {
   const [input, setInput] = useState('');

   const handleSend = () => {
      if (!input.trim()) return;
      onSend(input);
      setInput('');
   };

   return (
      <div className="border-t bg-white px-6 py-4">
         <div className="flex gap-2">
            <Input
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder="Type your message..."
            />
            <Button onClick={handleSend} disabled={loading}>
               Send
            </Button>
         </div>
      </div>
   );
}
