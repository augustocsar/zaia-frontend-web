import { useEffect, useRef } from 'react';
import type { Message } from '../types';

interface Props {
  messages: Message[];
  loading: boolean;
}

export function MessageList({ messages, loading }: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      {messages.map((msg) => (
        <div key={msg.id} className={`message ${msg.sender}`}>
          <div className="bubble">
            {msg.text || (msg.sender === 'bot' && loading ? '...' : '')}
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}