import {type  FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { db } from "../client.ts"
import { usersTable } from "../schema.ts"
import { eq } from "drizzle-orm"

export const getUsersByID : FastifyPluginAsyncZod = async (server) => {
server.get("/users/:id", {
    schema: {
        tags: ['Users'],
        summary: 'Get users by ID',
        params: z.object({
            id: z.uuid(),
        }),
    },
}, async (request, reply) => {
    const  users = request.params.id
    const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, users))

    if (result.length > 0) {
        return reply.send({usersTable: result[0]})
    }

    return reply.status(404).send({message: "User not found"})
})
}