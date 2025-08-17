import {type  FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { db } from "../client.ts"
import { usersTable } from "../schema.ts"
import { eq } from "drizzle-orm"

export const createUsers : FastifyPluginAsyncZod = async (server) => {
server.post("/users", {
    schema: {
        body: z.object({
            name: z.string(),
            email: z.string().email()
        }),
        tags: ['Users'],
        summary: 'Create users',
        response:  {
            201: z.object({
               userID: z.uuid()
            }),
            404: z.null().describe('Error')
        }
    },
}, async (request, reply) => {
      
      const usersChemas = request.body.name
      const usersChemas2 = request.body.email

      const result = await db
      .insert(usersTable)
      .values({name: usersChemas, email: usersChemas2})
      .returning()

    return reply.status(201).send({userID: result[0].id})
})
}