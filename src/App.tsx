import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import { useChat } from './hooks/useChat';
import { Login } from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { messages, loading, sendMessage, sendPdf } = useChat();

  // Função para deslogar (simplesmente muda o estado para false)
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="container">
      {/* Passamos a função de logout aqui */}
      <Header onLogout={handleLogout} />
      
      <MessageList 
        messages={messages} 
        loading={loading} 
      />
      
      <InputArea 
        onSendText={sendMessage} 
        onSendPdf={sendPdf} 
        loading={loading} 
      />
    </div>
  );
}

export default App;