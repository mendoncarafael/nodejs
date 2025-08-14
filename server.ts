import Fastify from "fastify";
import { db } from "./src/database/client.ts";
// import { users } from "./src/database/schema.ts"
import { courses } from "./src/database/schema.ts"
import { usersTable } from "./src/database/schema.ts"
import { eq } from "drizzle-orm";
import { z } from "zod";




const server = Fastify();

server.get("/courses", async (request, reply) => {
        const result = await db.select().from(courses)
        return reply.send({courses: result})
})

server.get("/users", async (request, reply) => {
    const result = await db.select().from(usersTable)
    return reply.send({usersTable: result})
})

server.get("/users/:id", async (request, reply) => {
    const  users = z.object({
        id: z.string()
    })
    const result = await db.select().from(usersTable).where(eq(usersTable.id, usersTable.id))
    return reply.send({usersTable: result})
})


server.post("/users", async (request, reply) => {

    const users = z.object({
        name: z.string(),
        email: z.string()
      });
      
      const { name, email } = users.parse(request.body);

      // 3. Inserir no banco usando a tabela, não o schema do Zod
      const result = await db.insert(usersTable).values({
        name,
        email
      });

    return reply.send({users: result})
})

server.listen({ port: 3333 }).then(() => {
    console.log("Server is running");
});