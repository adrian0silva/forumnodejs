// Carrega variáveis de ambiente do arquivo .env
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

// === CONFIGURAÇÃO DO TYPEORM ===
// Existem duas formas de configurar a conexão:
// 1️⃣ Tradicional (campos separados: host, port, user, etc.)
// 2️⃣ Moderna (usando DATABASE_URL completa — ideal para serviços como Neon, Render, etc.)

// 🔸 FORMA ANTIGA — deixada comentada apenas como referência
/*
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,               // Endereço do servidor PostgreSQL
  port: Number(process.env.DB_PORT),       // Porta do banco (geralmente 5432)
  username: process.env.DB_USERNAME,       // Usuário do banco
  password: process.env.DB_PASSWORD,       // Senha do banco
  database: process.env.DB_NAME,           // Nome do banco de dados
  
  migrations: [__dirname + '/migrations/*.{js,ts}'],   // Caminho das migrations
};
*/

// 🔹 NOVA CONFIGURAÇÃO — usando DATABASE_URL completa
// Exemplo no .env:
// DATABASE_URL="postgresql://usuario:senha@host:porta/banco?sslmode=require"
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,                 // URL única de conexão (padrão Neon)
  // entities: [__dirname + '/../**/*.entity.{js,ts}'], // Descomente se estiver usando entidades
  migrations: [__dirname + '/migrations/*.{js,ts}'],   // Caminho das migrations
  ssl: { rejectUnauthorized: false },            // Necessário para conexões seguras (Neon, etc.)
};

// Cria a instância de DataSource a partir das opções definidas
const dataSource = new DataSource(dataSourceOptions);

// Exporta a instância como padrão — usada em scripts e CLI do TypeORM
export default dataSource;
