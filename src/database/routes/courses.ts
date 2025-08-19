import {type  FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { db } from "../client.ts"
import { coursesTable, usersTable } from "../schema.ts"
import { ilike, asc, and, SQL } from "drizzle-orm"

export const getCourses : FastifyPluginAsyncZod = async (server) => {
server.get("/courses", {
    schema: {
        tags: ['Courses'],
        summary: 'Get all courses',
        querystring: z.object({
            search: z.string().optional(),
            orderBy: z.enum(['title']).optional().default('title'),
            page: z.coerce.number().optional().default(1),
        }),
        response: {
           200: z.object({
            courses: z.array(
                z.object({
                    id: z.uuid(),
                    title: z.string(),
                    description: z.string().nullable(),
                })),
                total: z.number(),
           }),
        }   
    }
}, async (request, reply) => {
    const {search, orderBy, page} = request.query
    
    const conditions: SQL[] = []

    if(search) {
        conditions.push(ilike(coursesTable.title, `%${search}%`))
    } 

    const [result, total] = await Promise.all([
        db.select({
            id: coursesTable.id,
            title: coursesTable.title,
            description: coursesTable.description,
        }  
        ).from(coursesTable)
        .orderBy(asc(coursesTable[orderBy]))
        .where(and(...conditions))
        .limit(2)
        .offset((page - 1) * 2),

        db.$count(coursesTable, and(...conditions))

    ])

    return reply.send({courses: result, total})
})
}
