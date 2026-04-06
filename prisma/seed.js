import { prisma } from "../src/lib/prisma.js";
// import bcrypt from 'bcrypt'

// const hashedPassword = bcrypt.hashSync('123456', 8)
// const userData = [
//     {username: 'TestAdmin', email:'testadmin@mail.mail', password: hashedPassword, role: 'ADMIN', profilePicture: '', info:''},
//     {username: 'TestAdmin2', email:'testadmin2@mail.mail', password: hashedPassword, role: 'ADMIN', profilePicture: '', info:''},
//     {username: 'TestUser', email:'testuser@mail.mail', password: hashedPassword, role: 'USER', profilePicture: '', info:''},
//     {username: 'TestUser2', email:'testuser2@mail.mail', password: hashedPassword, role: 'USER', profilePicture: '', info:''}
// ]
// const baseSpirits = [
//     {name:"GIN", details:"A clear alcoholic spirit distilled from grain or malt and flavored with juniper berries.", image: "https://lacave-eclairee.fr/en/products/gin-drumshanbo-gunpowder-irish-gin?srsltid=AfmBOoqKwmVutnAQDqeRp43ogWaBj4JwLf6u2EVaNNod02fYc3AbpsEi"},
//     {name:"RUM", details:"An alcoholic liquor distilled from sugar-cane residues or molasses.", image: "https://www.drinkstore.eu/utenti/drinkstore_eu/cache/_pics/7/1/rhum-brugal-anejo-superior-38-cl-100_d39391fb8cca3d87f273955deaab9d76_t.jpg"}
// ]
// const category = [
//     { name: 'Gin', details: 'Botanical' },
//     { name: 'Rum', details: 'Spiced' }
// ]
// const recipes = [
//     {
//         name: 'Dust In The Wind',
//             ingredients: 'Gin, Vermouth, Lemon',
//             instructions: 'Stir with ice and strain.',
//             userId: 1,
//             baseSpiritId: 1,
//             categoryId: 1,
//             image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvG1Zpl_AvfjCF87Y74vtogVqsea7HpKYGQg&s"
//     }
// ]
// async function main() {
//     console.log('Cleaning Table')
//     // await prisma.$transaction([
//         prisma.$executeRawUnsafe('SET FOREIGN KEY CHECKS = 0;'),
//         prisma.$executeRawUnsafe('TRUNCATE TABLE `Badge`;'),
//         prisma.$executeRawUnsafe('TRUNCATE TABLE `BaseSpirit`;'),
//         prisma.$executeRawUnsafe('TRUNCATE TABLE `Category`;'),
//         prisma.$executeRawUnsafe('TRUNCATE TABLE `Recipe`;'),
//         prisma.$executeRawUnsafe('TRUNCATE TABLE `UserBadge`;'),
//         prisma.$executeRawUnsafe('TRUNCATE TABLE `User`;'),
//         prisma.$executeRawUnsafe('SET FOREIGN KEY CHECKS = 1;')
//     // ]);
//     console.log('Start Seeding')
//     const createdUsers = await prisma.user.createMany({
//         data: userData,
//         skipDuplicates: true
//     })
//     const createdCategory = await prisma.category.createMany({
//         data: category,
//         skipDuplicates: true
//     })
//     const createdBaseSpirits = await prisma.basespirit.createMany({
//         data: baseSpirits,
//         skipDuplicates:true
//     })
//     const createdRecipes = await prisma.recipe.createMany({
//         data: recipes,
//         skipDuplicates: true
//     })
//     console.log(`created ${createdUsers.count} users`)}
//     main().then(async () => {
//         await prisma.$disconnect()
//     }). catch(async(e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })

// // async function main() {
// //     console.log('start cleaning')
// //     await prisma.$executeRaw`TRUNCATE TABLE User`
// //     console.log('start seeding')
// //     const createdUsers = await prisma.user.createMany({
// //         data: userData,
// //         skipDuplicates: true,
// //     })
// //     console.log(`created ${createdUsers.count} users`)
// // }
// // main().then(async () => {
// //     await prisma.$disconnect()
// // }).catch(async (e) => {
// //     console.error(e);
// //     await prisma.$disconnect()
// //     process.exit(1)
// // })
////////
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

const hashedPassword = bcrypt.hashSync('123456', 8);

const userData = [
    { username: 'TestAdmin', email: 'testadmin@mail.mail', password: hashedPassword, role: 'ADMIN' },
    { username: 'TestAdmin2', email: 'testadmin2@mail.mail', password: hashedPassword, role: 'ADMIN' },
    { username: 'TestUser', email: 'testuser@mail.mail', password: hashedPassword, role: 'USER' },
    { username: 'TestUser2', email: 'testuser2@mail.mail', password: hashedPassword, role: 'USER' }
];

const categoryData = [
    { name: 'Botanical', details: 'Fresh, herbal, and gin-forward.' },
    { name: 'Spiced & Dark', details: 'Rich, caramel, and aged notes.' },
    { name: 'Spirit-Forward', details: 'Strong, classic, minimal mixers.' },
    { name: 'Sour & Refreshing', details: 'Citrusy and bright.' }
];

const spiritData = [
    { name: "GIN", details: "A botanical spirit flavored primarily with juniper berries.", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1000&auto=format&fit=crop" },
    { name: "RUM", details: "Distilled from sugarcane byproducts, ranging from light to dark.", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop" },
    { name: "VODKA", details: "A clear, high-purity spirit, perfect for clean mixology.", image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=1000&auto=format&fit=crop" },
    { name: "WHISKEY", details: "Aged grain spirit with complex notes of oak and smoke.", image: "https://images.unsplash.com/photo-1527281405159-35d562acd5bc?q=80&w=1000&auto=format&fit=crop" },
    { name: "TEQUILA", details: "Made from blue agave, bringing earthy and peppery vibes.", image: "https://images.unsplash.com/photo-1516535750143-ef555d659143?q=80&w=1000&auto=format&fit=crop" }
];

async function main() {
    console.log('--- Cleaning Database ---');
    await prisma.$executeRawUnsafe('SET FOREIGN KEY CHECKS = 0;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE `User`;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE `BaseSpirit`;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE `Category`;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE `Recipe`;');
    await prisma.$executeRawUnsafe('SET FOREIGN KEY CHECKS = 1;');

    console.log('--- Seeding Users ---');
    for (const u of userData) {
        await prisma.user.create({ data: u });
    }

    console.log('--- Seeding Categories ---');
    for (const c of categoryData) {
        await prisma.category.create({ data: c });
    }

    console.log('--- Seeding Base Spirits ---');
    for (const s of spiritData) {
        await prisma.basespirit.create({ data: s });
    }

    // Fetch IDs to link them correctly
    const allUsers = await prisma.user.findMany();
    const allCats = await prisma.category.findMany();
    const allSpirits = await prisma.basespirit.findMany();

    console.log('--- Seeding Recipes ---');
    const recipeData = [
        {
            name: 'Dust In The Wind',
            ingredients: '45ml Gin, 15ml Dry Vermouth, Lemon Twist',
            instructions: 'Stir with ice for 30 seconds. Strain into a chilled coupe.',
            userId: allUsers[0].id,
            baseSpiritId: allSpirits.find(s => s.name === "GIN").id,
            categoryId: allCats.find(c => c.name === "Botanical").id,
            image: "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?q=80&w=1000&auto=format&fit=crop"
        },
        {
            name: 'Black Parade Nightcap',
            ingredients: '60ml Dark Rum, 2 Dashes Bitters, Orange Peel',
            instructions: 'Muddle orange peel, add rum and bitters. Large ice cube.',
            userId: allUsers[0].id,
            baseSpiritId: allSpirits.find(s => s.name === "RUM").id,
            categoryId: allCats.find(c => c.name === "Spirit-Forward").id,
            image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1000&auto=format&fit=crop"
        },
        {
            name: 'Helena’s Kiss',
            ingredients: '50ml Tequila, 25ml Lime Juice, Agave Syrup, Hibiscus',
            instructions: 'Shake vigorously with ice. Double strain over fresh ice.',
            userId: allUsers[1].id,
            baseSpiritId: allSpirits.find(s => s.name === "TEQUILA").id,
            categoryId: allCats.find(c => c.name === "Sour & Refreshing").id,
            image: "https://images.unsplash.com/photo-1516535750143-ef555d659143?q=80&w=1000&auto=format&fit=crop"
        },
        {
            name: 'The Ghost of You',
            ingredients: '50ml Vodka, 20ml Elderflower Liqueur, Cucumber',
            instructions: 'Muddle cucumber, shake with vodka and liqueur. Fine strain.',
            userId: allUsers[2].id,
            baseSpiritId: allSpirits.find(s => s.name === "VODKA").id,
            categoryId: allCats.find(c => c.name === "Botanical").id,
            image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    for (const r of recipeData) {
        await prisma.recipe.create({ data: r });
    }

    console.log('Seeding finished successfully.');
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
