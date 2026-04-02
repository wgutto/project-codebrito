import { UserRole } from "lib/generated/prisma/enums"
import { userService } from "services/userService"
import { jest } from "@jest/globals"

describe("UserService - Create", () => {
    let mockPrismaUser: any

    beforeEach(() => {
        mockPrismaUser = {
            create: jest.fn()
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("Deve criar um usuário com dados válidos", async () => {
        const userModel = {
            name: "Mariano",
            email: "mariano@gmail.com",
            cpf: "888.888.888-88",
            role: UserRole.STUDENT
        }

        const userCreated = {
            id: 222,
            ...userModel,
            createdAt: new Date()
        }

        mockPrismaUser.crate.mock

        const user = await userService.create(userModel)

        expect(user).toBeDefined()
        expect(user.name).toBe(userModel.name)
        expect(user.email).toBe(userModel.email)
        expect(user.cpf).toBe(userModel.cpf)
        expect(user.role).toBe(userModel.role)
    })
})
