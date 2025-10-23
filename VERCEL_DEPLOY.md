# Deploy na Vercel - Fórum Vale Tudo API

## Configuração para Deploy

### 1. Arquivos Criados/Modificados

- `vercel.json` - Configuração do deploy na Vercel
- `.vercelignore` - Arquivos ignorados no deploy
- `src/main.ts` - Modificado para funcionar com serverless
- `package.json` - Adicionados scripts para Vercel

### 2. Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente no painel da Vercel:

```
DATABASE_URL=postgresql://username:password@host:port/database
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=1h
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NODE_ENV=production
```

### 3. Passos para Deploy

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

### 4. Configurações Importantes

- **Banco de Dados**: Use um serviço como Neon, Supabase ou PlanetScale para PostgreSQL
- **Redis**: Use Redis Cloud ou Upstash para Redis
- **CORS**: Já configurado para aceitar todas as origens (`*`)
- **Swagger**: Disponível em `/api/docs` após o deploy

### 5. URLs após Deploy

- API: `https://your-app-name.vercel.app`
- Swagger: `https://your-app-name.vercel.app/api/docs`

### 6. Comandos Úteis

```bash
# Ver logs do deploy
vercel logs

# Ver status do projeto
vercel ls

# Remover deploy
vercel remove
```

### 7. Observações

- A aplicação foi configurada para funcionar em modo serverless
- O arquivo `main.ts` foi modificado para exportar a função bootstrap
- As migrações do banco devem ser executadas manualmente após o deploy
- Certifique-se de que todas as variáveis de ambiente estão configuradas corretamente
