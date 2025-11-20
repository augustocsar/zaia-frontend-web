import { useState, useRef } from 'react';

interface Props {
  onSendText: (text: string) => void;
  onSendPdf: (file: File) => void;
  loading: boolean;
}

export function InputArea({ onSendText, onSendPdf, loading }: Props) {
  const [input, setInput] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (pdfFile) {
      onSendPdf(pdfFile);
      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else if (input.trim()) {
      onSendText(input);
      setInput('');
    }
  };

  return (
    <div className="input-area">
      <div className="text-send-row">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
          placeholder="Digite sua pergunta..."
          disabled={loading || !!pdfFile}
        />
        <button onClick={handleSend} disabled={loading || (!input.trim() && !pdfFile)}>
          {loading ? '...' : 'Enviar'}
        </button>
      </div>

      <div className="file-upload-bottom">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => e.target.files?.[0] && setPdfFile(e.target.files[0])}
          id="pdf-upload"
          style={{ display: 'none' }}
        />
        <label htmlFor="pdf-upload" className="file-label-bottom">
          {pdfFile ? `📎 ${pdfFile.name}` : 'Anexar PDF'}
        </label>
      </div>
    </div>
  );
}