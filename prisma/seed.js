import { prisma } from "../src/lib/prisma.js";
import bcrypt from 'bcrypt'

const hashedPassword = bcrypt.hashSync('123456', 8)
const userData = [
    {username: 'TestAdmin', email:'testadmin@mail.mail', password: hashedPassword, role: 'ADMIN', profilePicture: '', info:''},
    {username: 'TestAdmin2', email:'testadmin2@mail.mail', password: hashedPassword, role: 'ADMIN', profilePicture: '', info:''},
    {username: 'TestUser', email:'testuser@mail.mail', password: hashedPassword, role: 'USER', profilePicture: '', info:''},
    {username: 'TestUser2', email:'testuser2@mail.mail', password: hashedPassword, role: 'USER', profilePicture: '', info:''}
]
async function main() {
    console.log('Cleaning Table')
    // await prisma.$transaction([
        prisma.$executeRawUnsafe('SET FOREIGN KEY CHECKS = 0;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Badge`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `BaseSpirit`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Category`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Recipe`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `UserBadge`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `User`;'),
        prisma.$executeRawUnsafe('SET FOREIGN KEY CHECKS = 1;')
    // ]);
    console.log('Start Seeding')
    const createdUsers = await prisma.user.createMany({
        data: userData,
        skipDuplicates: true
    })
    console.log(`created ${createdUsers.count} users`)}
    main().then(async () => {
        await prisma.$disconnect()
    }). catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

// async function main() {
//     console.log('start cleaning')
//     await prisma.$executeRaw`TRUNCATE TABLE User`
//     console.log('start seeding')
//     const createdUsers = await prisma.user.createMany({
//         data: userData,
//         skipDuplicates: true,
//     })
//     console.log(`created ${createdUsers.count} users`)
// }
// main().then(async () => {
//     await prisma.$disconnect()
// }).catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect()
//     process.exit(1)
// })
