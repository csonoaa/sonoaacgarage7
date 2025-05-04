import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    // Check if there are any existing car valuations
    const existingValuations = await db.query.carValuations.findMany({
      limit: 1,
    });

    if (existingValuations.length === 0) {
      console.log("Seeding sample car valuations...");
      
      // Add sample car valuations for demonstration
      await db.insert(schema.carValuations).values([
        {
          make: "toyota",
          model: "camry",
          year: 2018,
          mileage: 45000,
          condition: "good",
          bodyType: "sedan",
          color: "silver",
          transmission: true,
          catalyticConverter: true,
          marketValue: 18500,
          initialOffer: 11655,
          mileageAdjustment: 0,
          conditionAdjustment: 0,
          finalOffer: 11655,
          photoUrls: ["https://example.com/toyota-camry-1.jpg"]
        },
        {
          make: "ford",
          model: "f-150",
          year: 2015,
          mileage: 78000,
          condition: "fair",
          bodyType: "truck",
          color: "blue",
          transmission: true,
          catalyticConverter: true,
          marketValue: 22000,
          initialOffer: 13860,
          mileageAdjustment: -1200,
          conditionAdjustment: -1100,
          finalOffer: 11560,
          photoUrls: ["https://example.com/ford-f150-1.jpg"]
        },
        {
          make: "honda",
          model: "civic",
          year: 2020,
          mileage: 25000,
          condition: "great",
          bodyType: "sedan",
          color: "white",
          transmission: true,
          catalyticConverter: true,
          marketValue: 19800,
          initialOffer: 12474,
          mileageAdjustment: 500,
          conditionAdjustment: 990,
          finalOffer: 13964,
          photoUrls: ["https://example.com/honda-civic-1.jpg"]
        }
      ]);
      
      console.log("✅ Car valuations seeded successfully");
    } else {
      console.log("Skipping seeding car valuations - data already exists");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
