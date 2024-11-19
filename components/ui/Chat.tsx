'use client';
import React,{ useState } from 'react';
interface Message {
  user: string;
  text: string;
}

interface ChatProps {
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [user] = useState('User'); // Placeholder for user identification

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { user, text: input }]);
      setInput('');
    }
  };

  return (
    <div className="relative p-4 rounded-lg bg-gray-800 h-full max-w-sm mx-auto flex flex-col">
      <div className="absolute top-2 right-2">
        <button
          onClick={onClose}
          className="text-red-500 font-bold"
          aria-label="Close chat"
        >
          X
        </button>
      </div>
      <div className="h-64 overflow-y-auto mb-2 flex-grow">
        {messages.map((msg, index) => (
          <div key={index} className="text-white mb-1">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-lg text-black"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-gray-900 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;