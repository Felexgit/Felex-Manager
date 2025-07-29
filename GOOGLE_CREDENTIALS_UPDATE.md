# Atualização de Credenciais Google OAuth

## Credenciais Atualizadas

### Cliente OAuth 2.0
- **ID do Cliente**: `[CONFIGURADO VIA VARIÁVEL DE AMBIENTE]`
- **Chave Secreta**: `[CONFIGURADO VIA VARIÁVEL DE AMBIENTE]`

### Chaves de API
- **API Key 1**: `[CONFIGURADO VIA VARIÁVEL DE AMBIENTE]`
- **API Key 2**: `[CONFIGURADO VIA VARIÁVEL DE AMBIENTE]`

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

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
REACT_APP_YOUTUBE_CLIENT_ID=seu_client_id_aqui
REACT_APP_YOUTUBE_CLIENT_SECRET=seu_client_secret_aqui
REACT_APP_YOUTUBE_API_KEY_1=sua_api_key_1_aqui
REACT_APP_YOUTUBE_API_KEY_2=sua_api_key_2_aqui
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