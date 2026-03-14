import type { Course } from "../lib/generated/prisma/client.js";
import type { CourseUncheckedCreateInput, CourseUpdateInput } from "../lib/generated/prisma/models.js";
import { prisma } from "../lib/prisma.js";
import { createService } from "./serviceFactory.js";

export const courseService = createService<Course, CourseUncheckedCreateInput, CourseUpdateInput>({
    findMany:         ()               => prisma.course.findMany(),
    findUnique:       ({ where })      => prisma.course.findUnique({ where }),
    create:           ({ data })       => prisma.course.create({ data }),
    update:           ({ where, data })=> prisma.course.update({ where, data }),
    delete:           ({ where })      => prisma.course.delete({ where }),
})