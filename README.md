# CodeBrito API

API REST de uma plataforma de ensino online. Gerencia usuários, cursos, categorias e matrículas.

## Tecnologias

- **Node.js** + **TypeScript**
- **Express 5**
- **Prisma 7** (PostgreSQL)
- **Zod** — validação de requisições
- **Helmet** + **CORS** — segurança

## Destaques de Arquitetura

- Factory pattern em services e controllers — elimina boilerplate de CRUD em todos os recursos
- Tratamento de erros centralizado via `AppError` + middleware de erros do Express
- Soft delete em usuários e cursos
- Validação de entrada com schemas Zod na camada de controller

## Como Rodar

```bash
npm install

# configure sua DATABASE_URL no .env
npx prisma migrate dev
npm run seed
npm run dev
```

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET/POST | `/api/users` | Listar / criar usuários |
| GET/PUT/DELETE | `/api/users/:id` | Buscar, atualizar ou soft-delete de usuário |
| PATCH | `/api/users/:id/restaurar` | Restaurar usuário deletado |
| GET | `/api/users/:id/matriculas` | Listar matrículas de um aluno |
| GET/POST | `/api/courses` | Listar / criar cursos |
| GET/PUT/DELETE | `/api/courses/:id` | Buscar, atualizar ou deletar curso |
| GET/POST | `/api/categories` | Listar / criar categorias |
| GET/PUT/DELETE | `/api/categories/:id` | Buscar, atualizar ou deletar categoria |
| GET/POST | `/api/registrations` | Listar / criar matrículas |
| GET/PUT/DELETE | `/api/registrations/:id` | Buscar, atualizar ou deletar matrícula |
