# Deploy na Vercel - Fórum Vale Tudo API

## Configuração para Deploy

### 1. Arquivos Criados/Modificados

- `vercel.json` - Configuração do deploy na Vercel
- `.vercelignore` - Arquivos ignorados no deploy
- `src/main.ts` - Modificado para funcionar com serverless
- `package.json` - Adicionados scripts para Vercel
- `src/redis/redis.service.ts` - Atualizado para usar Upstash Redis

### 2. Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente no painel da Vercel:

```
DATABASE_URL=postgresql://username:password@host:port/database
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=1h
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NODE_ENV=production
```

### 3. Configuração do Upstash Redis

1. **Criar conta no Upstash**:
   - Acesse [https://upstash.com](https://upstash.com)
   - Crie uma conta gratuita
   - Crie um novo banco Redis

2. **Obter credenciais**:
   - No dashboard do Upstash, vá para "Details" do seu banco
   - Copie a `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`
   - Configure essas variáveis no painel da Vercel

### 4. Passos para Deploy

1. **Instalar Vercel CLI** (se ainda não tiver):
   ```bash
   npm i -g vercel
   ```

2. **Fazer login na Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy inicial**:
   ```bash
   vercel
   ```

4. **Deploy de produção**:
   ```bash
   vercel --prod
   ```

### 5. Configurações Importantes

- **Banco de Dados**: Use um serviço como Neon, Supabase ou PlanetScale para PostgreSQL
- **Redis**: Usando Upstash Redis (serverless e otimizado para Vercel)
- **CORS**: Já configurado para aceitar todas as origens (`*`)
- **Swagger**: Disponível em `/api/docs` após o deploy

### 6. URLs após Deploy

- API: `https://your-app-name.vercel.app`
- Swagger: `https://your-app-name.vercel.app/api/docs`

### 7. Comandos Úteis

```bash
# Ver logs do deploy
vercel logs

# Ver status do projeto
vercel ls

# Remover deploy
vercel remove
```

### 8. Observações

- A aplicação foi configurada para funcionar em modo serverless
- O arquivo `main.ts` foi modificado para exportar a função bootstrap
- **Upstash Redis** foi configurado para funcionar perfeitamente com serverless
- As migrações do banco devem ser executadas manualmente após o deploy
- Certifique-se de que todas as variáveis de ambiente estão configuradas corretamente

### 9. Vantagens do Upstash Redis

- ✅ Otimizado para serverless
- ✅ Sem cold starts
- ✅ Integração nativa com Vercel
- ✅ Plano gratuito generoso
- ✅ Interface REST simples
