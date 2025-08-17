import Fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import { getUsers } from "./src/database/routes/users.ts";
import { getCourses } from "./src/database/routes/courses.ts";
import { getUsersByID } from "./src/database/routes/users-by-id.ts";
import { createUsers } from "./src/database/routes/create-users.ts";
import { createCourses } from "./src/database/routes/create-courses.ts";




const server = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
}).withTypeProvider<ZodTypeProvider>()
 
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Desafio Node.JS',
            version: '1.0.0',
        }
    },
    transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
    routePrefix: "/docs"
})

server.register(getUsers)
server.register(getUsersByID)
server.register(getCourses)
server.register(createUsers)
server.register(createCourses)



server.listen({ port: 3333 }).then(() => {
    console.log("Server is running");
});