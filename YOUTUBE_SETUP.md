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
5. Adicione `https://felex-manager.vercel.app/` como URI de redirecionamento

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