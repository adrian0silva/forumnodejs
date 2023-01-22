import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";


interface IParams {
    boardId: string;
}

interface IHeaders {
'h-Custom': string;
}

export async function appRoutes(app: FastifyInstance) {

    app.withTypeProvider<JsonSchemaToTsProvider>()

    app.get('/home', async () => {

        const boards = await prisma.board.findMany();

        return {
            boards
        }
    })

    app.get<{  Params: IParams,
        Headers: IHeaders}>('/boards/:boardId', async (request) => {
        const { boardId } = request.params
        const topics = await prisma.topic.findMany({
            where: {
                boardId: boardId
            }
        })

        return {
            topics
        }
    })

    app.post('/users', async (request) => {
       // const VALUES = ['USER', 'MODERATOR', 'ADMIN'] as const;

        const createUserBody = z.object({
            email: z.string(),
            username: z.string(),
            password: z.string(),
       //     role: z.enum(VALUES)
        })

        const { email, username, password } = createUserBody.parse(request.body);

        await prisma.user.create({
            data: {
                email,
                username,
                created_at: new Date(),
                updated_at: new Date(),
                password
            }
        })
    })

    app.post('/topics', async (request) => {

        const createTopicBody = z.object({
            title: z.string(),
            description: z.string(),
            boardId: z.string(),
            userId: z.string(),
        })

        const { title, description, boardId, userId } = createTopicBody.parse(request.body);

        await prisma.topic.create({
            data: {
                title,
                description,
                created_at: new Date(),
                updated_at: new Date(),
                boardId,
                userId
            }
        })
    })
}
