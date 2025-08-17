import {type  FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { db } from "../client.ts"
import { coursesTable, usersTable } from "../schema.ts"
import { eq } from "drizzle-orm"

export const getCourses : FastifyPluginAsyncZod = async (server) => {
server.get("/courses", {
    schema: {
        tags: ['Courses'],
        summary: 'Get all courses',
        response: {
           200: z.object({
            courses: z.array(
                z.object({
                    id: z.uuid(),
                    title: z.string(),
                    description: z.string().nullable(),
                }))
           })
        }   
    }
}, async (request, reply) => {
    const result = await db.select({
        id: coursesTable.id,
        title: coursesTable.title,
        description: coursesTable.description,
    }
    ).from(coursesTable)
    return reply.send({courses: result})
})
}
