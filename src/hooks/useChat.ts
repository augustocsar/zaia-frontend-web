import { useState } from 'react';
import type { Message } from '../types';
import { api } from '../services/api';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Adiciona mensagem na lista
  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessages(prev => [...prev, { id: Date.now(), text, sender }]);
  };

  // Função para atualizar a última mensagem do bot (efeito de digitação)
  const updateLastBotMessage = (chunk: string) => {
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last?.sender === 'bot') {
        return prev.map((m, i) => 
          i === prev.length - 1 ? { ...m, text: m.text + chunk } : m
        );
      }
      return prev;
    });
  };

  // Envia texto
  const sendMessage = async (input: string) => {
    if (!input.trim() || loading) return;

    addMessage(input, 'user');
    setLoading(true);
    
    // Cria bolha vazia do bot
    addMessage('', 'bot');

    try {
      const response = await api.sendChatStream(input);
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        // Limpeza simples e atualização
        updateLastBotMessage(chunk.replace(/1/g, '')); 
      }
    } catch (error) {
      updateLastBotMessage('Erro ao conectar com o agente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Envia PDF
  const sendPdf = async (file: File) => {
    addMessage(`Enviando PDF: ${file.name}...`, 'user');
    setLoading(true);
    addMessage('', 'bot');

    try {
      const data = await api.uploadPDF(file);
      updateLastBotMessage(data.status || 'PDF processado!');
    } catch (error) {
      updateLastBotMessage('Erro ao enviar PDF.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessage, sendPdf };
}