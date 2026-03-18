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

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET/POST | `/api/users` | Listar ativos / criar usuários |
| GET | `/api/users/todos` | Listar todos (incluindo inativos) |
| GET/PUT/DELETE | `/api/users/:id` | Buscar, atualizar ou soft-delete |
| PATCH | `/api/users/:id/restaurar` | Restaurar usuário deletado |

### Matrículas por Estudante
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/users/:id/matriculas` | Matrículas ativas do aluno |
| GET | `/api/users/:id/matriculas/todas` | Todas as matrículas do aluno |
| POST | `/api/users/:studentId/matriculas/:courseId` | Criar matrícula |
| GET/PUT/DELETE | `/api/users/:studentId/matriculas/:id` | Gerenciar matrícula específica |

### Cursos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/courses?dataInicio=&dataFinal=` | Listar cursos (filtro opcional por data) |
| POST | `/api/courses` | Criar curso |
| GET/PUT/DELETE | `/api/courses/:id` | Buscar, atualizar ou deletar curso |

### Categorias
| Método | Rota | Descrição |
|--------|------|-----------|
| GET/POST | `/api/categories` | Listar / criar categorias |
| GET/PUT/DELETE | `/api/categories/:id` | Buscar, atualizar ou deletar categoria |

### Matrículas (admin)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/registrations` | Listar todas as matrículas |
