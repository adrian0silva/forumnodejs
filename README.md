# Forum Backend

O backend da aplicação Forum, construído com NestJS.

## Tecnologias

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

## Estrutura do Projeto

```
src/
├── prisma/          # Configuração do banco de dados
└── main.ts          # Ponto de entrada da aplicação
```

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
- Copie `.env.example` para `.env`
- Configure a URL do banco de dados

3. Configure o banco de dados:
```bash
npx prisma migrate dev
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run start:dev
```

## Scripts

- `npm run start:dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto
- `npm run start:prod` - Inicia o servidor em produção
- `npm run lint` - Executa o ESLint
- `npm run test` - Executa os testes