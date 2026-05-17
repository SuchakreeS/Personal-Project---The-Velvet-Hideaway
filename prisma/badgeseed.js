// prisma/badgeseed.js
import { prisma } from "../src/lib/prisma.js";


async function main() {
  console.log("--- Starting Distinction Archive Seed ---");

  const badges = [
    {
      name: "First Pour",
      requirement: "recipe_count_1",
      description: "Recorded your first craft in the archive.",
      image: "https://api.dicebear.com/7.x/icons/svg?seed=FirstPour&backgroundColor=050505"
    },
    {
      name: "Midnight Regular",
      requirement: "login_count_5",
      description: "A familiar face in the dim light of the Hideaway.",
      image: "https://api.dicebear.com/7.x/icons/svg?seed=Regular&backgroundColor=050505"
    },
    {
      name: "Dark Knight",
      requirement: "base_spirit_rum_5",
      description: "Mastered 5 dark rum-based concoctions.",
      image: "https://api.dicebear.com/7.x/icons/svg?seed=DarkKnight&backgroundColor=050505"
    },
    {
      name: "The Archivist",
      requirement: "profile_update_1",
      description: "Refined your personal identity within the system.",
      image: "https://api.dicebear.com/7.x/icons/svg?seed=Archivist&backgroundColor=050505"
    }
  ];

  for (const b of badges) {
    // We use findFirst to avoid the strict "where" unique validation error
    const existingBadge = await prisma.badge.findFirst({
      where: { name: b.name }
    });

    if (existingBadge) {
      // Update existing badge to ensure descriptions/images stay current
      await prisma.badge.update({
        where: { id: existingBadge.id },
        data: b
      });
      console.log(`[UPDATED] Badge: ${b.name}`);
    } else {
      // Create new badge
      await prisma.badge.create({
        data: b
      });
      console.log(`[CREATED] Badge: ${b.name}`);
    }
  }

  console.log("--- Seed Complete: The Hideaway is Ready ---");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });