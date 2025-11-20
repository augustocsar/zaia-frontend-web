interface HeaderProps {
  onLogout?: () => void; // Propriedade opcional
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <div className="header" style={{ position: 'relative' }}>
      <h1>Zaia Agent</h1>
      <p>Assistente Inteligente</p>

      {/* Só mostra o botão se a função onLogout for passada */}
      {onLogout && (
        <button
          onClick={onLogout}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            padding: '8px 16px',
            fontSize: '14px',
            boxShadow: 'none',
            width: 'auto'
          }}
        >
          Sair
        </button>
      )}
    </div>
  );
}