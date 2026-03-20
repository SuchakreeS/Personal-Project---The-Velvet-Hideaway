import {prisma} from './src/lib/prisma.js'

prisma.$queryRaw`show tables`.then(console.log)

prisma.user.count().then(console.log)