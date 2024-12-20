import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Create a user with challenges
    const user1 = await prisma.user.create({
        data: {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            challenges: {
                create: [
                    {
                        title: 'Bald Spot',
                        xLoc1: 100,
                        yLoc1: 150,
                        imageUrl1: 'https://example.com/image1-1.jpg',
                        xLoc2: 200,
                        yLoc2: 250,
                        imageUrl2: 'https://example.com/image1-2.jpg',
                        xLoc3: 300,
                        yLoc3: 350,
                        imageUrl3: 'https://example.com/image1-3.jpg',
                    },
                    {
                        title: 'Bookstore Carpet',
                        xLoc1: 120,
                        yLoc1: 170,
                        imageUrl1: 'https://example.com/image2-1.jpg',
                        xLoc2: 220,
                        yLoc2: 270,
                        imageUrl2: 'https://example.com/image2-2.jpg',
                        xLoc3: 320,
                        yLoc3: 370,
                        imageUrl3: 'https://example.com/image2-3.jpg',
                    },
                ],
            },
        },
        include: {
            challenges: true, // Include the challenges to access their IDs
        },
    });

    // Create another user without challenges
    const user2 = await prisma.user.create({
        data: {
            name: 'Bob Smith',
            email: 'bob.smith@example.com',
        },
    });

    // Create standalone challenges with no author
    const standaloneChallenge = await prisma.challenge.create({
        data: {
            title: 'LDC Entrance',
            xLoc1: 50,
            yLoc1: 80,
            imageUrl1: 'https://example.com/standalone1.jpg',
            xLoc2: 150,
            yLoc2: 180,
            imageUrl2: 'https://example.com/standalone2.jpg',
            xLoc3: 250,
            yLoc3: 280,
            imageUrl3: 'https://example.com/standalone3.jpg',
        },
    });

    // Create leaderboard entries
    await prisma.leaderboard.createMany({
        data: [
            {
                userId: user1.id, // Alice Johnson
                challengeId: user1.challenges[0].id, // Bald Spot
                score: 95,
                createdAt: new Date(),
            },
            {
                userId: user1.id, // Alice Johnson
                challengeId: user1.challenges[1].id, // Bookstore Carpet
                score: 88,
                createdAt: new Date(),
            },
            {
                userId: user2.id, // Bob Smith
                challengeId: standaloneChallenge.id, // LDC Entrance
                score: 78,
                createdAt: new Date(),
            },
        ],
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
