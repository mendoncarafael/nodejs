import {type  FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { db } from "../client.ts"
import { usersTable } from "../schema.ts"
import { eq } from "drizzle-orm"

export const getUsers : FastifyPluginAsyncZod = async (server) => {
server.get("/users", {
    schema: {
        tags: ['Users'],
        summary: 'Get all users',
        response: {
           200: z.object({
            users: z.array(
                z.object({
                    id: z.uuid(),
                    name: z.string(),
                    email: z.string().nullable(),
                }))
           })
        }   
    }
}, async (request, reply) => {
    const result = await db.select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
    }
    ).from(usersTable)
    return reply.send({users: result})
})
}
