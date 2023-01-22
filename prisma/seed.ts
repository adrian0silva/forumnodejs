import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fistForumId = '0730ffac-d039-4194-9571-01aa2aa0efbd';

const secondForumId = '00880d75-a933-4fef-94ab-e05744435297';

async function run() {
    await prisma.forum.deleteMany();

    await Promise.all([
        prisma.forum.create({
            data: {
                id: fistForumId,
                title: 'Off Topic',
                description: 'Discute sobre qualquer coisa',
                created_at: new Date()
            }
        }),
        prisma.forum.create({
            data: {
                id: secondForumId,
                title: 'Consoles e Jogos',
                description: 'Playstation,Xbox,Nintendo',
                created_at: new Date()
            }
        })
    ])
}

run()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })