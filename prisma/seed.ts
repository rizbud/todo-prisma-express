import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const statuses = [
  {
    name: "To Do",
  },
  {
    name: "Pending/Blocked",
  },
  {
    name: "In Progress",
  },
  {
    name: "Completed",
  },
];

const main = async () => {
  console.log(`Start seeding ...`);
  const status = await prisma.status.createMany({
    data: statuses,
  });
  console.log(`Seeding finished.`);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
