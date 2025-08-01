# 🚀 Configuração Rápida do Supabase

## ⚡ Passos Rápidos (5 minutos)

### 1. Criar Projeto no Supabase
1. Vá para [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub ou crie conta
4. Clique em "New Project"
5. Escolha organização e nome do projeto
6. Aguarde a configuração (2-3 minutos)

### 2. Obter Credenciais
1. No dashboard, vá para **Settings** (⚙️) > **API**
2. Copie:
   - **Project URL** (ex: `https://abc123.supabase.co`)
   - **anon public** key (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Configurar Aplicação
1. Crie um ficheiro `.env.local` na raiz do projeto
2. Adicione:
```env
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

### 4. Testar
1. Execute `npm run dev`
2. A página de login deve aparecer
3. Teste criar uma conta ou fazer login

## 🎯 Modo Demonstração

Se não configurar o Supabase, a aplicação funciona em **modo demonstração**:
- Pode testar todas as funcionalidades
- Dados são salvos localmente
- Não precisa de configuração

## 🔧 Problemas Comuns

### Tela Branca
- Verifique se o ficheiro `.env.local` existe
- Confirme que as credenciais estão corretas
- Reinicie o servidor: `npm run dev`

### Erro de Conexão
- Verifique se o projeto Supabase está ativo
- Confirme que as URLs estão corretas
- Teste no browser: `sua_url_supabase.co`

### Login Não Funciona
- Verifique se o email está confirmado
- Tente criar uma nova conta
- Verifique os logs no console do browser

## 📞 Suporte

Se tiver problemas:
1. Verifique o console do browser (F12)
2. Confirme as credenciais do Supabase
3. Teste em modo demonstração primeiro 