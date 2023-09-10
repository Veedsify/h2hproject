const { PrismaClient } = require("@prisma/client")

const queryDb = new PrismaClient()

module.exports = queryDb