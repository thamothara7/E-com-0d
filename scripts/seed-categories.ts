import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Spice Mixes",
    description: "Handcrafted blends",
    image: "/images/category-spices.jpg",
    count: 24,
  },
  {
    name: "Ready Mix",
    description: "Meal-ready packets",
    image: "/images/category-ready.jpg",
    count: 18,
  },
  {
    name: "Combo Packs",
    description: "Curated gift sets",
    image: "/images/category-combo.jpg",
    count: 12,
  },
  {
    name: "Best Sellers",
    description: "Most loved picks",
    image: "/images/category-bestsellers.jpg",
    count: 10,
  },
];

async function main() {
  console.log("Seeding categories...");
  
  for (const cat of categories) {
    const existingCat = await prisma.category.findUnique({
      where: { name: cat.name }
    });
    
    if (!existingCat) {
      await prisma.category.create({
        data: {
          name: cat.name,
          description: cat.description,
          image: cat.image,
          count: cat.count
        }
      });
      console.log(`Created category: ${cat.name}`);
    } else {
      console.log(`Category already exists: ${cat.name}`);
    }
  }

  // Link existing products to categories based on the string category name
  const products = await prisma.product.findMany();
  for (const product of products) {
    if (product.category && !product.categoryId) {
      const categoryRec = await prisma.category.findUnique({
        where: { name: product.category }
      });
      if (categoryRec) {
        await prisma.product.update({
          where: { id: product.id },
          data: { categoryId: categoryRec.id }
        });
        console.log(`Linked product ${product.name} to category ${categoryRec.name}`);
      }
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
