# Configuração do Supabase para Autenticação

## 🚀 Configuração Inicial

### 1. Criar Projeto no Supabase
1. Aceda a [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto
4. Aguarde a configuração inicial

### 2. Obter Credenciais
1. No dashboard do seu projeto, vá para **Settings** > **API**
2. Copie os seguintes valores:
   - **Project URL** (ex: `https://your-project.supabase.co`)
   - **anon public** key (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Configurar Variáveis de Ambiente
Crie um ficheiro `.env.local` na raiz do projeto com:

```env
VITE_SUPABASE_URL=sua_url_do_projeto_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

### 4. Configurar Autenticação no Supabase
1. No dashboard, vá para **Authentication** > **Settings**
2. Configure os **Site URL** para: `http://localhost:5173` (ou a porta que estiver a usar)
3. Em **Redirect URLs**, adicione: `http://localhost:5173/**`

### 5. Configurar Provedores de Autenticação (Opcional)

#### GitHub OAuth
1. Vá para **Authentication** > **Providers**
2. Ative o **GitHub** provider
3. Configure o **Client ID** e **Client Secret** do GitHub
4. No GitHub, configure a **Authorization callback URL** para: `https://your-project.supabase.co/auth/v1/callback`

## 🔧 Funcionalidades Implementadas

### ✅ Login/Registo com Email e Senha
- Formulário de login e registo
- Validação de campos
- Mensagens de erro
- Loading states

### ✅ Login Social
- GitHub OAuth (configurável)
- Fácil adição de outros provedores

### ✅ Gestão de Sessão
- Persistência automática da sessão
- Logout funcional
- Proteção de rotas

### ✅ Interface de Utilizador
- Design moderno e responsivo
- Dropdown de utilizador no header
- Loading screens
- Feedback visual

## 🎨 Componentes Criados

### `/src/lib/supabase.js`
- Configuração do cliente Supabase
- Exportação da instância para uso global

### `/src/contexts/AuthContext.jsx`
- Contexto React para gestão de autenticação
- Hook `useAuth()` para acesso fácil
- Gestão automática de estado de utilizador

### `/src/components/auth/LoginPage.jsx`
- Página de login/registo completa
- Design moderno com Tailwind CSS
- Suporte para login social e email/senha

## 🔒 Segurança

- Chaves de API no lado do cliente são seguras (VITE_*)
- Autenticação gerida pelo Supabase
- Sessões persistentes e seguras
- Logout automático em mudanças de estado

## 🚀 Próximos Passos

1. **Configurar base de dados**: Criar tabelas para dados da aplicação
2. **Row Level Security**: Configurar políticas de acesso
3. **Perfis de utilizador**: Adicionar campos personalizados
4. **Mais provedores**: Google, Facebook, etc.

## 📝 Notas Importantes

- O ficheiro `.env.local` não deve ser commitado no Git
- As variáveis de ambiente devem começar com `VITE_` para serem acessíveis no frontend
- Teste sempre em modo de desenvolvimento antes de fazer deploy 