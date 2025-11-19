import { useState, useEffect, useRef } from 'react';
import './App.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Envia mensagem de texto
  const sendTextMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const botMessage: Message = { id: Date.now() + 1, text: '', sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:1234'),
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) throw new Error('Erro na API');

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const cleanChunk = chunk.replace(/1/g, '').trim();
        if (cleanChunk) {
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last?.sender === 'bot') {
              const addSpace = last.text && !last.text.endsWith(' ') && !cleanChunk.startsWith(' ');
              return prev.map((m, i) =>
                i === prev.length - 1 ? { ...m, text: m.text + (addSpace ? ' ' : '') + cleanChunk } : m
              );
            }
            return prev;
          });
        }
      }
    } catch {
      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1 ? { ...m, text: 'Erro na conexão.' } : m
      ));
    } finally {
      setLoading(false);
    }
  };

  // Envia PDF
  const sendPdf = async (file: File) => {
    const userMessage: Message = { id: Date.now(), text: `Enviando PDF: ${file.name}`, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    const botMessage: Message = { id: Date.now() + 1, text: '', sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload-pdf', {
        method: 'POST',
        headers: { 'Authorization': 'Basic ' + btoa('admin:1234') },
        body: formData,
      });

      if (!response.ok) throw new Error();

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const cleanChunk = chunk.replace(/1/g, '').trim();
        if (cleanChunk) {
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last?.sender === 'bot') {
              const addSpace = last.text && !last.text.endsWith(' ') && !cleanChunk.startsWith(' ');
              return prev.map((m, i) =>
                i === prev.length - 1 ? { ...m, text: m.text + (addSpace ? ' ' : '') + cleanChunk } : m
              );
            }
            return prev;
          });
        }
      }
    } catch {
      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1 ? { ...m, text: 'Erro ao enviar PDF.' } : m
      ));
    } finally {
      setLoading(false);
      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSend = () => {
    if (pdfFile) sendPdf(pdfFile);
    else if (input.trim()) sendTextMessage();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Zaia Agent</h1>
        <p>Login: admin / 1234</p>
      </div>

      <div className="chat">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="bubble">
              {msg.text || (msg.sender === 'bot' && loading ? 'Digitando...' : '')}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        {/* Linha do texto + botão enviar */}
        <div className="text-send-row">
          <input
              type="text"  // <--- ADICIONE ISSO
              className="chat-input" // <--- ADICIONE ISSO
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && !loading && handleSend()}
              placeholder="Clima, dólar, euro, bitcoin ou pergunta sobre PDF..."
              disabled={loading}
          />
          <button onClick={handleSend} disabled={loading || (!input.trim() && !pdfFile)}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>

        {/* Botão Anexar PDF embaixo e centralizado */}
        <div className="file-upload-bottom">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={e => e.target.files?.[0] && setPdfFile(e.target.files[0])}
            id="pdf-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="pdf-upload" className="file-label-bottom">
            {pdfFile ? `PDF anexado: ${pdfFile.name}` : 'Anexar PDF'}
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;