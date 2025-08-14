import Fastify from "fastify";
import { db } from "./src/database/client.ts";
// import { users } from "./src/database/schema.ts"
import { courses } from "./src/database/schema.ts"
import { users } from "./src/database/schema.ts"
// import { z } from "zod";


const server = Fastify();

server.get("/courses", async (request, reply) => {
        const result = await db.select().from(courses)
        return reply.send({courses: result})
})

server.get("/users", async (request, reply) => {
    const result = await db.select().from(users)
    return reply.send({usern: result})
})

server.post("/users", async (request, reply) => {
    const { name, email } = request.body
    const result = await db.insert(users).values({ name, email })
    return reply.send({user: result})
})

server.listen({ port: 3333 }).then(() => {
    console.log("Server is running");
});