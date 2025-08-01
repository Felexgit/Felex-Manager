# AutoPost AI - Sistema de Gestão de Redes Sociais

Uma aplicação moderna para gestão automatizada de conteúdo em redes sociais, construída com React, Vite, Tailwind CSS e Supabase.

## 🚀 Funcionalidades

- **Autenticação Completa**: Login/registo com email/senha e GitHub OAuth
- **Dashboard Intuitivo**: Interface moderna e responsiva
- **AI Studio**: Criação e gestão de agentes de IA
- **Calendário de Publicações**: Agendamento e gestão de conteúdo
- **Gestão de Conteúdo**: Organização de posts e mídia
- **Análises**: Métricas e relatórios de desempenho

## 🛠️ Tecnologias

- **Frontend**: React 18, Vite, Tailwind CSS
- **Autenticação**: Supabase Auth
- **Base de Dados**: Supabase PostgreSQL
- **Ícones**: Lucide React
- **Estado**: React Context API

## 📦 Instalação e Configuração

### 1. Clonar e Instalar Dependências
```bash
git clone <repository-url>
cd felex-manager-new
npm install
```

### 2. Configurar Supabase
1. Siga as instruções em [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
2. Crie um ficheiro `.env.local` com as suas credenciais do Supabase

### 3. Executar em Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🏗️ Estrutura do Projeto

### `/src/components/`
- **`App.jsx`** - Componente principal com autenticação
- **`/auth/`** - Componentes de autenticação
  - `LoginPage.jsx` - Página de login/registo
- **`/ui/`** - Componentes de interface reutilizáveis
- **`/sections/`** - Seções principais da aplicação
- **`/modals/`** - Modais da aplicação

### `/src/contexts/`
- **`AuthContext.jsx`** - Gestão de estado de autenticação

### `/src/lib/`
- **`supabase.js`** - Configuração do cliente Supabase

### `/src/data/`
- **`mockData.js`** - Dados mock centralizados

## 🔧 Scripts Disponíveis

- **`npm run dev`** - Executa em modo desenvolvimento
- **`npm run build`** - Constrói para produção
- **`npm run lint`** - Executa o linter
- **`npm run preview`** - Pré-visualiza a build de produção

## 🎨 Design System

A aplicação utiliza Tailwind CSS com um design system consistente:
- **Cores**: Tons de cinza e índigo
- **Tipografia**: Sistema de fontes responsivo
- **Componentes**: Reutilizáveis e acessíveis
- **Animações**: Transições suaves e feedback visual

## 🔒 Autenticação

O sistema de autenticação inclui:
- Login/registo com email e senha
- Login social (GitHub)
- Gestão automática de sessões
- Proteção de rotas
- Logout funcional

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deploy

Para fazer deploy da aplicação:

1. Configure as variáveis de ambiente de produção
2. Execute `npm run build`
3. Faça deploy dos ficheiros da pasta `dist/`

## 📄 Licença

Este projeto está sob a licença MIT.
