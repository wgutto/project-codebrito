import type { User } from "../lib/generated/prisma/client.js";
import type { UserUncheckedCreateInput, UserUpdateInput } from "../lib/generated/prisma/models.js";
import { prisma } from "../lib/prisma.js";
import { createService } from "./serviceFactory.js";

export const userService = createService<User, UserUncheckedCreateInput, UserUpdateInput>({
    findMany:         ()               => prisma.user.findMany(),
    findUnique:       ({ where })      => prisma.user.findUnique({ where }),
    create:           ({ data })       => prisma.user.create({ data }),
    update:           ({ where, data })=> prisma.user.update({ where, data }),
    delete:           ({ where })      => prisma.user.delete({ where }),
})