// src/services/api.ts
const AUTH_HEADER = { 'Authorization': 'Basic ' + btoa('admin:1234') };

export const api = {
  // Envia o chat e retorna a resposta "crua" para ler o stream depois
  async sendChatStream(question: string) {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...AUTH_HEADER,
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) throw new Error('Erro na API de Chat');
    return response;
  },

  // Envia o PDF
  async uploadPDF(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/upload-pdf', {
      method: 'POST',
      headers: AUTH_HEADER, // Não precisa de Content-Type para FormData
      body: formData,
    });

    if (!response.ok) throw new Error('Erro no Upload');
    
    // O backend retorna JSON simples no upload: {"status": "..."}
    return await response.json();
  }
};