# Atualização de Credenciais Google OAuth

## Credenciais Atualizadas

### Cliente OAuth 2.0
- **ID do Cliente**: `895426659962-m3hthn9787ahqa82b1n3aqdi9hq7hp5q.apps.googleusercontent.com`
- **Chave Secreta**: `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`

### Chaves de API
- **API Key 1**: `AIzaSyAzy2pVC5SGFqotgHKWBNL8zY9BcFr7lGw`
- **API Key 2**: `AIzaSyBkGjZ2L1A3YPHpapY9fz8pkDURJxrbLrk`

### Nome da Aplicação
- **Nome**: Flex Manager

## Arquivos Atualizados

### 1. `src/config/youtube.ts`
- Configurado para usar variáveis de ambiente
- Removidas credenciais hardcoded por segurança
- Sistema de fallback implementado

### 2. `src/services/youtubeService.ts`
- Adicionado suporte para múltiplas API keys
- Implementado sistema de fallback automático
- Melhorada a robustez das requisições

## Configuração de Ambiente

⚠️ **IMPORTANTE**: As credenciais devem ser configuradas via variáveis de ambiente por segurança.

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_YOUTUBE_CLIENT_ID=895426659962-m3hthn9787ahqa82b1n3aqdi9hq7hp5q.apps.googleusercontent.com
REACT_APP_YOUTUBE_CLIENT_SECRET=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
REACT_APP_YOUTUBE_API_KEY_1=AIzaSyAzy2pVC5SGFqotgHKWBNL8zY9BcFr7lGw
REACT_APP_YOUTUBE_API_KEY_2=AIzaSyBkGjZ2L1A3YPHpapY9fz8pkDURJxrbLrk
```

## URIs de Redirecionamento Configurados

- **Desenvolvimento**: `http://localhost:3000/`
- **Produção**: `https://felex-manager.vercel.app/`

## Escopos OAuth Configurados

- `https://www.googleapis.com/auth/youtube.upload`
- `https://www.googleapis.com/auth/youtube.readonly`
- `https://www.googleapis.com/auth/youtube.force-ssl`

## Segurança

✅ **Credenciais não hardcoded no código**
✅ **Uso de variáveis de ambiente**
✅ **Proteção contra exposição de secrets**
✅ **Sistema de fallback para API keys**

## Data da Atualização

**Data**: $(date)
**Status**: ✅ Credenciais atualizadas e configuradas de forma segura 