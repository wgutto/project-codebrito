import type { CreateCourseDto, UpdateCourseDto } from "../config/validators/courseSchema.js";
import type { Course } from "../lib/generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { createService } from "./serviceFactory.js";

export const courseService = createService<Course, CreateCourseDto, UpdateCourseDto>({
    findMany:         ()               => prisma.course.findMany(),
    findUnique:       ({ where })      => prisma.course.findUnique({ where }),
    create:           ({ data })       => prisma.course.create({ data }),
    update:           ({ where, data })=> prisma.course.update({ where, data }),
    delete:           ({ where })      => prisma.course.delete({ where }),
})