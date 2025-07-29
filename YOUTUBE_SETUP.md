# Configuração do YouTube

## Variáveis de Ambiente

Para usar a integração do YouTube, você precisa configurar as seguintes variáveis de ambiente:

### 1. Criar arquivo `.env` na raiz do projeto:

```env
REACT_APP_YOUTUBE_CLIENT_ID=your_youtube_client_id_here
REACT_APP_YOUTUBE_CLIENT_SECRET=your_youtube_client_secret_here
```

### 2. Configurações do Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Habilite a YouTube Data API v3
4. Configure as credenciais OAuth 2.0
5. **Adicione os URIs de redirecionamento autorizados**:
   - `http://localhost:3000/` (para desenvolvimento)
   - `https://felex-manager.vercel.app/` (para produção)
6. **Configure a tela de consentimento OAuth**:
   - Adicione seu email como usuário de teste
   - Configure os escopos necessários
7. **Publique a aplicação** (ou mantenha em modo de teste)

### 3. Escopos Necessários

- `https://www.googleapis.com/auth/youtube.upload`
- `https://www.googleapis.com/auth/youtube.readonly`
- `https://www.googleapis.com/auth/youtube.force-ssl`

## Funcionalidades

- ✅ Conexão OAuth com YouTube
- ✅ Visualização de estatísticas do canal
- ✅ Lista de vídeos com métricas
- ✅ Upload de vídeos (interface pronta)
- ✅ Analytics (preparado para implementação)

## Segurança

⚠️ **IMPORTANTE**: Nunca commite as credenciais reais no GitHub. Use variáveis de ambiente para produção.

## Troubleshooting

### Erro: "OAuth client was not found" / "invalid_client"

**Causas possíveis:**
1. **Client ID incorreto**: Verifique se o Client ID está correto no Google Cloud Console
2. **URIs de redirecionamento não configurados**: Adicione `http://localhost:3000/` e `https://felex-manager.vercel.app/`
3. **Aplicação não publicada**: Publique a aplicação ou adicione seu email como usuário de teste
4. **YouTube Data API não habilitada**: Habilite a API no Google Cloud Console

**Soluções:**
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Vá em "APIs & Services" > "Credentials"
3. Edite seu OAuth 2.0 Client ID
4. Adicione os URIs de redirecionamento autorizados
5. Vá em "OAuth consent screen" e adicione seu email como usuário de teste
6. Habilite a YouTube Data API v3 em "APIs & Services" > "Library" 