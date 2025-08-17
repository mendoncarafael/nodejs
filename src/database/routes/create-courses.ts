import {type  FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { db } from "../client.ts"
import { coursesTable, usersTable } from "../schema.ts"
import { eq } from "drizzle-orm"

export const createCourses : FastifyPluginAsyncZod = async (server) => {
server.post("/courses", {
    schema: {
        body: z.object({
            title: z.string(),
            description: z.string()
        }),
        tags: ['Courses'],
        summary: 'Create courses',
        response:  {
            201: z.object({
                id: z.uuid(),
               title: z.string(),
               description: z.string()
            }),
            404: z.null().describe('Error')
        }
    },
}, async (request, reply) => {
      
      const usersChemas2 = request.body.title
      const usersChemas = request.body.description

      const result = await db
      .insert(coursesTable)
      .values({title: usersChemas2, description: usersChemas})
      .returning()

    if (!result[0].id || !result[0].title || !result[0].description) {
      return reply.status(404).send(null)
    }
    return reply.status(201).send({
      id: result[0].id as string,
      title: result[0].title as string,
      description: result[0].description as string
    })
})
}