# 🎮 Jogo da Velha Multiplayer

Um jogo da velha (Tic-Tac-Toe) online e em tempo real, desenvolvido com **React**, **TypeScript**, **Vite** e **SignalR**. Jogue com seus amigos criando salas privadas e divirta-se!

## ✨ Funcionalidades

- **Multiplayer em Tempo Real:** Partidas sincronizadas instantaneamente usando WebSockets via SignalR.
- **Sistema de Salas:** Crie uma sala e compartilhe o código com um amigo para jogarem juntos.
- **Personalização:** Escolha seu nome e avatar antes de entrar na partida.
- **Interface Responsiva:** Design moderno e responsivo, adaptado para diferentes tamanhos de tela.
- **Notificações (Toasts):** Alertas visuais para eventos importantes do jogo (vitória, derrota, empate, turno, etc).
- **Modais Interativos:** Confirmações e diálogos para uma melhor experiência de usuário.

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)** - Biblioteca para construção da interface de usuário.
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança e produtividade.
- **[Vite](https://vitejs.dev/)** - Bundler super rápido para desenvolvimento.
- **[SignalR (@microsoft/signalr)](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction)** - Comunicação em tempo real (WebSockets).
- **[React Router DOM 7](https://reactrouter.com/)** - Gerenciamento de rotas da aplicação.
- **[Sass (SCSS)](https://sass-lang.com/)** - Pré-processador CSS para estilização modular e escalável.
- **[ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)** - Padronização e formatação de código.
- **[Husky](https://typicode.github.io/husky/) & [Commitlint](https://commitlint.js.org/)** - Hooks de git para garantir a qualidade dos commits.

## 🚀 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o **Node.js** (versão 24+) e o **pnpm** instalados em sua máquina.

```bash
# Instalar o pnpm globalmente (caso não tenha)
npm install -g pnpm
```

### Passos para rodar localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/kaworii/jogo-da-velha.git
   cd jogo-da-velha
   ```

2. **Instale as dependências:**

   ```bash
   pnpm install
   ```

3. **Configuração de Variáveis de Ambiente (Opcional):**
   O projeto se conecta por padrão ao servidor `https://jogo.kaworii.com.br/GameHub`. Caso queira rodar com um servidor local, crie um arquivo `.env` na raiz do projeto:

   ```env
   VITE_WS_URL=http://localhost:5000/GameHub
   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   pnpm run dev
   ```

5. **Acesse no navegador:**
   Abra `http://localhost:5173` para ver a aplicação rodando.

## 📂 Estrutura do Projeto

A arquitetura do projeto foi pensada para ser modular e escalável:

```text
src/
├── assets/        # Imagens, ícones e avatares
├── core/          # Lógica central da aplicação
│   ├── components/  # Componentes genéricos (Botões, Modais, Toasts, Background)
│   ├── player/      # Contexto e hooks de gerenciamento do jogador
│   ├── routes/      # Configuração de rotas
│   ├── tools/       # Funções utilitárias (texto, avatar)
│   └── ws/          # Contexto e hooks de conexão WebSocket (SignalR)
├── modules/       # Módulos específicos da aplicação (Páginas)
│   └── pages/
│       ├── game/    # Página principal do jogo (Tabuleiro, Menu de info, Código da sala)
│       └── home/    # Página inicial (Input de nome, Seleção de avatar)
├── styles/        # Estilos globais, variáveis, mixins e resets (SCSS)
└── types/         # Definições de tipos globais
```

## 📜 Scripts Disponíveis

No diretório do projeto, você pode rodar os seguintes comandos via `pnpm`:

- `pnpm dev`: Inicia o servidor de desenvolvimento com Hot Module Replacement (HMR).
- `pnpm build`: Compila o TypeScript e faz o build de produção usando o Vite.
- `pnpm preview`: Inicia um servidor local para visualizar o build de produção.
- `pnpm lint`: Executa o ESLint para encontrar e corrigir problemas no código.
- `pnpm prettier`: Formata todos os arquivos suportados pelo Prettier.
- `pnpm ts-check`: Verifica erros de tipagem do TypeScript sem emitir arquivos.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Siga os passos abaixo:

1. Faça um **Fork** do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`).
3. Faça o commit das suas alterações usando o padrão Conventional Commits (`git commit -m 'feat(*): adicionando nova funcionalidade'`).
4. Faça o push para a branch (`git push origin feature/MinhaFeature`).
5. Abra um **Pull Request**.

---

Desenvolvido com 💜 por
[Carolina Diniz](https://github.com/carolina-diniz).
[Wilbsomgs](https://github.com/Wilbsomgs)
