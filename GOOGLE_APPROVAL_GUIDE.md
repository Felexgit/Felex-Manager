# Guia para Aprovação no Google Cloud Console

## 📋 Passo a Passo para Configurar a Aprovação

### 1. Acessar o Google Cloud Console
1. Vá para [Google Cloud Console](https://console.cloud.google.com/)
2. Faça login com sua conta Google
3. Selecione ou crie um projeto

### 2. Habilitar a YouTube Data API
1. No menu lateral, vá em **"APIs & Services"** > **"Library"**
2. Procure por **"YouTube Data API v3"**
3. Clique na API e depois em **"Enable"**

### 3. Configurar Credenciais OAuth 2.0
1. Vá em **"APIs & Services"** > **"Credentials"**
2. Clique em **"Create Credentials"** > **"OAuth client ID"**
3. Selecione **"Web application"**
4. Configure:
   - **Name**: Felex Manager
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `https://felex-manager.vercel.app`
   - **Authorized redirect URIs**:
     - `http://localhost:3000/`
     - `https://felex-manager.vercel.app/`

### 4. Configurar Tela de Consentimento OAuth
1. Vá em **"APIs & Services"** > **"OAuth consent screen"**
2. Selecione **"External"** (se não for organização)
3. Preencha as informações:

#### Informações do App:
- **App name**: Felex Manager
- **User support email**: [seu-email@dominio.com]
- **App logo**: (opcional)

#### Informações de Contato:
- **Developer contact information**: [seu-email@dominio.com]

#### Escopos:
- Clique em **"Add or remove scopes"**
- Adicione os seguintes escopos:
  - `https://www.googleapis.com/auth/youtube.readonly`
  - `https://www.googleapis.com/auth/youtube.upload`
  - `https://www.googleapis.com/auth/youtube.force-ssl`

#### Usuários de Teste:
- Clique em **"Add users"**
- Adicione seu email e outros emails de teste
- **IMPORTANTE**: Apenas usuários de teste podem usar o app até ser aprovado

### 5. Configurar Informações do App
1. Na tela de consentimento, vá em **"App information"**
2. Preencha:

#### Descrição Resumida:
```
Plataforma web para gerenciamento de canais do YouTube com analytics, upload de vídeos e dashboard de estatísticas.
```

#### Descrição Detalhada:
```
O Felex Manager é uma plataforma web moderna que permite aos criadores de conteúdo gerenciar suas contas do YouTube de forma eficiente. Nossa aplicação oferece uma interface intuitiva para visualizar estatísticas do canal, gerenciar vídeos existentes e facilitar o upload de novos conteúdos.

Funcionalidades Principais:
- Dashboard de analytics com métricas em tempo real (inscritos, visualizações, engajamento)
- Lista completa de vídeos com thumbnails e estatísticas detalhadas
- Interface de upload para novos vídeos com configuração de privacidade
- Análise de performance e tendências do canal

Benefícios para Usuários:
- Economia de tempo através de interface centralizada
- Insights valiosos sobre performance do canal
- Facilidade no upload e gerenciamento de conteúdo
- Relatórios profissionais para tomada de decisão

Segurança e Privacidade:
- Autenticação OAuth 2.0 segura
- Apenas dados essenciais são acessados
- Tokens de acesso temporários
- Conformidade com políticas de privacidade do Google

Casos de Uso:
- Criadores de conteúdo individuais gerenciando seus canais
- Empresas de marketing digital monitorando múltiplos canais
- Agências de conteúdo centralizando operações

O Felex Manager contribui positivamente para o ecossistema do YouTube ao facilitar a criação de conteúdo, melhorar a qualidade através de insights e aumentar a produtividade dos criadores.
```

### 6. Configurar URLs
1. Vá em **"Authorized domains"**
2. Adicione: `felex-manager.vercel.app`

### 7. Configurar Política de Privacidade
1. Vá em **"Privacy policy URL"**
2. Adicione: `https://felex-manager.vercel.app/privacy-policy`

### 8. Configurar Termos de Serviço
1. Vá em **"Terms of service URL"**
2. Adicione: `https://felex-manager.vercel.app/terms-of-service`

### 9. Salvar e Publicar
1. Clique em **"Save and continue"** em todas as seções
2. Na seção **"Summary"**, revise todas as informações
3. Clique em **"Back to dashboard"**

### 10. Testar a Aplicação
1. Acesse sua aplicação em `http://localhost:3000`
2. Tente conectar com o YouTube
3. Verifique se o OAuth está funcionando

### 11. Solicitar Verificação (Opcional)
Se quiser que o app seja público (não apenas para usuários de teste):

1. Na tela de consentimento, clique em **"Publish app"**
2. Preencha o formulário de verificação
3. Aguarde a revisão do Google (pode levar semanas)

## 🔧 Configurações Importantes

### URLs de Redirecionamento
Certifique-se de que estas URLs estão configuradas:
- `http://localhost:3000/` (desenvolvimento)
- `https://felex-manager.vercel.app/` (produção)

### Escopos Necessários
- `https://www.googleapis.com/auth/youtube.readonly`
- `https://www.googleapis.com/auth/youtube.upload`
- `https://www.googleapis.com/auth/youtube.force-ssl`

### Usuários de Teste
Adicione pelo menos seu email como usuário de teste para poder usar o app durante o desenvolvimento.

## 🚨 Problemas Comuns

### Erro: "OAuth client was not found"
- Verifique se o Client ID está correto
- Confirme se as URLs de redirecionamento estão configuradas

### Erro: "invalid_client"
- Verifique se o Client ID e Client Secret estão corretos
- Confirme se a API do YouTube está habilitada

### Erro: "redirect_uri_mismatch"
- Verifique se a URL de redirecionamento está exatamente igual no Google Console
- Certifique-se de que não há espaços extras

## ✅ Checklist de Verificação

- [ ] YouTube Data API v3 habilitada
- [ ] Credenciais OAuth 2.0 criadas
- [ ] URLs de redirecionamento configuradas
- [ ] Tela de consentimento configurada
- [ ] Escopos adicionados
- [ ] Usuários de teste adicionados
- [ ] Política de privacidade configurada
- [ ] Termos de serviço configurados
- [ ] App testado localmente
- [ ] App funcionando em produção

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do console do navegador
2. Confirme todas as configurações no Google Cloud Console
3. Teste com diferentes usuários de teste
4. Verifique se as URLs estão corretas

---

**Lembre-se**: O app funcionará apenas com usuários de teste até ser aprovado pelo Google para uso público. 