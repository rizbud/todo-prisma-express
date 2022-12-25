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

const cards = [
  {
    name: "Ask QA Team to test the new feature",
    description: "The new feature is ready to be tested by QA Team",
    statusId: 2,
  },
  {
    name: "Fix the bug",
    description: "The bug is found in the new feature",
    statusId: 4,
  },
  {
    name: "Develop CRUD for products",
    description: "Develop CRUD for products using express and prisma",
    statusId: 3,
  },
  {
    name: "Deploy the new feature",
    description: "Deploy the new feature to production",
    statusId: 1,
  },
];

const main = async () => {
  console.log(`Start seeding ...`);
  await prisma.status.createMany({
    data: statuses,
  });
  await prisma.card.createMany({
    data: cards,
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
