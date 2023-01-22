import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
    app.get('/forums', async (request) => {

        const forums = await prisma.forum.findMany();

        return {
            forums
        }
    })
}
