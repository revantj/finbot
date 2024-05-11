const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Risk Assessment" },
        { name: "Investment Goals" },
        { name: "Portfolio Management" },
        { name: "Market Analysis" },
        { name: "Financial Planning" },
        { name: "Tax Planning" },
        { name: "Investment Strategies" },
        { name: "Risk Management" },
        { name: "Others" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories:", error);
  } finally {
    await db.$disconnect();
  }
}

main();
