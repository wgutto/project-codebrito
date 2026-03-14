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

const categoryTitles = ["Programação", "Design", "Marketing"]

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

    console.log("Seeding categories...")
    for (const title of categoryTitles) {
        const exists = await prisma.category.findFirst({ where: { title } })
        if (!exists) await prisma.category.create({ data: { title } })
    }
    console.log(`${categoryTitles.length} categories seeded.`)

    console.log("Seeding courses...")
    const ana   = await prisma.user.findUnique({ where: { email: "ana.silva@email.com" } })
    const bruno = await prisma.user.findUnique({ where: { email: "bruno.costa@email.com" } })
    const [catProg, catDesign, catMarketing] = await Promise.all([
        prisma.category.findFirst({ where: { title: "Programação" } }),
        prisma.category.findFirst({ where: { title: "Design" } }),
        prisma.category.findFirst({ where: { title: "Marketing" } }),
    ])

    const coursesData = [
        { title: "Node.js do Zero",          description: "API REST com Node.js e TypeScript",    teacherId: ana!.id,   categoryId: catProg!.id     },
        { title: "React na Prática",          description: "Criando interfaces modernas com React", teacherId: ana!.id,   categoryId: catProg!.id     },
        { title: "UI Design para Iniciantes", description: "Fundamentos de design de interfaces",  teacherId: bruno!.id, categoryId: catDesign!.id   },
        { title: "Marketing Digital",         description: "Estratégias de marketing online",       teacherId: bruno!.id, categoryId: catMarketing!.id },
    ]

    for (const course of coursesData) {
        const exists = await prisma.course.findFirst({ where: { title: course.title } })
        if (!exists) await prisma.course.create({ data: course })
    }
    console.log(`${coursesData.length} courses seeded.`)

    console.log("Seeding registrations...")
    const courses = await prisma.course.findMany()
    const courseByTitle = new Map(courses.map(c => [c.title, c]))

    const students = await prisma.user.findMany({ where: { role: UserRole.STUDENT } })
    const studentByEmail = new Map(students.map(s => [s.email, s]))

    const registrationsData = [
        { studentId: studentByEmail.get("carla.mendes@email.com")!.id,   courseId: courseByTitle.get("Node.js do Zero")!.id           },
        { studentId: studentByEmail.get("carla.mendes@email.com")!.id,   courseId: courseByTitle.get("React na Prática")!.id          },
        { studentId: studentByEmail.get("diego.ferreira@email.com")!.id, courseId: courseByTitle.get("Node.js do Zero")!.id           },
        { studentId: studentByEmail.get("elena.rocha@email.com")!.id,    courseId: courseByTitle.get("UI Design para Iniciantes")!.id },
        { studentId: studentByEmail.get("felipe.lima@email.com")!.id,    courseId: courseByTitle.get("Marketing Digital")!.id         },
        { studentId: studentByEmail.get("gabriela.nunes@email.com")!.id, courseId: courseByTitle.get("React na Prática")!.id          },
        { studentId: studentByEmail.get("gabriela.nunes@email.com")!.id, courseId: courseByTitle.get("UI Design para Iniciantes")!.id },
        { studentId: studentByEmail.get("henrique.souza@email.com")!.id, courseId: courseByTitle.get("Node.js do Zero")!.id           },
        { studentId: studentByEmail.get("isabella.alves@email.com")!.id, courseId: courseByTitle.get("Marketing Digital")!.id         },
        { studentId: studentByEmail.get("joao.pereira@email.com")!.id,   courseId: courseByTitle.get("React na Prática")!.id          },
    ]

    for (const reg of registrationsData) {
        const exists = await prisma.registration.findFirst({
            where: { studentId: reg.studentId, courseId: reg.courseId },
        })
        if (!exists) await prisma.registration.create({ data: reg })
    }
    console.log(`${registrationsData.length} registrations seeded.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
