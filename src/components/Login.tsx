import { useState, type FormEvent } from 'react';
import { Header } from './Header';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      onLogin();
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="container" style={{ height: 'auto', minHeight: '500px', justifyContent: 'center' }}>
      {/* Header sem botão de sair */}
      <Header />

      <div style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
              Usuário
            </label>
            <input
              type="text"
              className="chat-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário" 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
              Senha
            </label>
            <input
              type="password"
              className="chat-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          {error && (
            <div style={{ 
              color: '#d32f2f', 
              backgroundColor: '#ffebee', 
              padding: '10px', 
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button type="submit" style={{ marginTop: '10px', padding: '15px' }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}