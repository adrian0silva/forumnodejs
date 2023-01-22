import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fistBoardId = '0730ffac-d039-4194-9571-01aa2aa0efbd';

const secondBoardId = '00880d75-a933-4fef-94ab-e05744435297';

async function run() {
    await prisma.board.deleteMany();

    await Promise.all([
        prisma.board.create({
            data: {
                id: fistBoardId,
                title: 'Off Topic',
                description: 'Discute sobre qualquer coisa',
                created_at: new Date()
            }
        }),
        prisma.board.create({
            data: {
                id: secondBoardId,
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