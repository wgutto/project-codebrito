import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient, UserRole } from "../src/lib/generated/prisma/client.js"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const users = [
    { name: "Ana Silva",      email: "ana.silva@email.com",      cpf: "111.111.111-01", role: UserRole.TEACHER },
    { name: "Bruno Costa",    email: "bruno.costa@email.com",    cpf: "111.111.111-02", role: UserRole.TEACHER },
    { name: "Carla Mendes",   email: "carla.mendes@email.com",   cpf: "111.111.111-03", role: UserRole.STUDENT },
    { name: "Diego Ferreira", email: "diego.ferreira@email.com", cpf: "111.111.111-04", role: UserRole.STUDENT },
    { name: "Elena Rocha",    email: "elena.rocha@email.com",    cpf: "111.111.111-05", role: UserRole.STUDENT },
    { name: "Felipe Lima",    email: "felipe.lima@email.com",    cpf: "111.111.111-06", role: UserRole.STUDENT },
    { name: "Gabriela Nunes", email: "gabriela.nunes@email.com", cpf: "111.111.111-07", role: UserRole.STUDENT },
    { name: "Henrique Souza", email: "henrique.souza@email.com", cpf: "111.111.111-08", role: UserRole.STUDENT },
    { name: "Isabella Alves", email: "isabella.alves@email.com", cpf: "111.111.111-09", role: UserRole.STUDENT },
    { name: "João Pereira",   email: "joao.pereira@email.com",   cpf: "111.111.111-10", role: UserRole.STUDENT },
]

async function main() {
    console.log("Seeding users...")

    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: user,
        })
    }

    console.log(`${users.length} users seeded.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
