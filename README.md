# 🎨 Zaia Agent - Frontend

Interface moderna de chat desenvolvida com **React**, **TypeScript** e **Vite**.
O sistema oferece uma experiência fluida com suporte a respostas em tempo real (streaming), upload de documentos e autenticação mockada.

## ✨ Funcionalidades

* **Chat Interativo:** Interface estilo mensageiro com bolhas de conversa.
* **Streaming Real-time:** As respostas da IA aparecem letra por letra à medida que são geradas.
* **Integração RAG:** Botão dedicado para upload e análise de PDFs.
* **Segurança:** Tela de Login (Mock) para proteção de acesso.
* **Design Responsivo:** Layout fluido e moderno com CSS puro.

## 🛠️ Stack Tecnológica

* **React 19**
* **TypeScript**
* **Vite** (Build tool ultra-rápida)
* **CSS Modules**

## 📂 Estrutura do Projeto

```text
frontend-zaia-agent/
├── src/
│   ├── components/   # Componentes visuais (Login, Chat, Input...)
│   ├── hooks/        # Lógica de estado (useChat)
│   ├── services/     # Comunicação com API (axios/fetch)
│   ├── types/        # Tipagem TypeScript
│   ├── App.tsx       # Componente Principal
│   └── main.tsx      # Entrada do React
├── public/           # Assets estáticos
├── index.html        # HTML base
├── vite.config.ts    # Configuração do Vite e Proxy
└── package.json      # Dependências e scripts
```

## 🚀 Como Rodar

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/augustocsar/zaia-frontend-web.git
    cd backend-zaia-agent
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

3.  **I🔑 Acesso (Demo): Para testar a aplicação, utilize as credenciais de demonstração:**
    ```bash
    Usuário: admin
    Senha: 1234
    ```

---
**Desenvolvido por Augusto César**


