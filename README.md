<div align="center">

# 📚 CodeBrito API

**API REST para plataforma de ensino online com gerenciamento de usuários, cursos, categorias e matrículas.**

[![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.2-lightgrey?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.4-2D3748?logo=prisma)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)

</div>

---

## 🚀 Quick Start

```bash
# Clonar e iniciar
git clone https://github.com/wgutto/project-codebrito.git
cd project-codebrito
docker-compose up -d

# Popular banco com dados de exemplo
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npm run seed

# Acessar
# API: http://localhost:3000
# Documentação: http://localhost:3000/api-docs
```

---

## 🛠️ Stack

- **Node.js 22** + **TypeScript** + **Express 5**
- **PostgreSQL 16** + **Prisma ORM**
- **Zod** (validação) + **Helmet/CORS** (segurança)
- **Docker** + **Swagger UI**

---

## 📚 Documentação

Acesse a documentação interativa completa com todos os endpoints, schemas e exemplos:

**👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

**O Swagger inclui:**
- ✅ 28 endpoints documentados (Usuários, Cursos, Categorias, Matrículas)
- ✅ Testar API direto no navegador
- ✅ Schemas de request/response
- ✅ Exemplos de uso

---

## 💻 Comandos Úteis

### Docker
```bash
docker-compose up -d              # Subir aplicação
docker-compose down               # Parar aplicação
docker-compose logs -f app        # Ver logs
docker-compose restart app        # Reiniciar
```

### Banco de Dados
```bash
docker-compose exec app npx prisma studio      # Interface visual
docker-compose exec app npx prisma migrate dev # Nova migration
docker-compose exec app npm run seed           # Popular dados
```

### Desenvolvimento (sem Docker)
```bash
npm install                # Instalar dependências
npm run dev               # Iniciar servidor
npm run lint              # Verificar código
npx prisma studio         # Interface do banco
```

---

## 📦 Recursos

- 👥 **Usuários** — Professores e estudantes com roles diferentes
- 🎓 **Cursos** — Gerenciamento completo com categorias e filtros
- 📝 **Matrículas** — Sistema de inscrições com status
- 🗑️ **Soft Delete** — Remoção segura com restauração
- 🔍 **Filtros** — Busca por data, status e relacionamentos
- 🏭 **Factory Pattern** — Controllers e services reutilizáveis

---

## 🧪 Dados de Exemplo

Após o seed, o banco contém:
- 10 usuários (2 professores + 8 estudantes)
- 3 categorias (Programação, Design, Marketing)
- 4 cursos (Node.js, React, UI Design, Marketing Digital)
- 10 matrículas

---

## 👨‍💻 Autor

**Augusto Brito**

- GitHub: [@wgutto](https://github.com/wgutto)
- Repositório: [project-codebrito](https://github.com/wgutto/project-codebrito)

---

<div align="center">

**Desenvolvido com Node.js, TypeScript e Prisma**

Para mais detalhes, consulte o [Swagger](http://localhost:3000/api-docs) 📖

</div>
