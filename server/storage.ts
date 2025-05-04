import { db } from "@db";
import { carValuations, users } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface CarValuationData {
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  bodyType?: string;
  color?: string;
  transmission: boolean;
  catalyticConverter: boolean;
  marketValue: number;
  initialOffer: number;
  mileageAdjustment: number;
  conditionAdjustment: number;
  finalOffer: number;
  photoUrls?: string[];
  userId?: number;
}

export const storage = {
  // Save a car valuation to the database
  async saveCarValuation(data: CarValuationData) {
    try {
      const [result] = await db.insert(carValuations).values(data).returning();
      return result;
    } catch (error) {
      console.error("Error saving car valuation:", error);
      throw error;
    }
  },

  // Get all car valuations
  async getAllCarValuations() {
    try {
      return await db.query.carValuations.findMany({
        orderBy: (carValuations, { desc }) => [desc(carValuations.createdAt)],
      });
    } catch (error) {
      console.error("Error getting car valuations:", error);
      throw error;
    }
  },

  // Get a specific car valuation by ID
  async getCarValuationById(id: number) {
    try {
      return await db.query.carValuations.findFirst({
        where: eq(carValuations.id, id),
      });
    } catch (error) {
      console.error("Error getting car valuation:", error);
      throw error;
    }
  },

  // Get car valuations for a specific user
  async getCarValuationsByUserId(userId: number) {
    try {
      return await db.query.carValuations.findMany({
        where: eq(carValuations.userId, userId),
        orderBy: (carValuations, { desc }) => [desc(carValuations.createdAt)],
      });
    } catch (error) {
      console.error("Error getting user car valuations:", error);
      throw error;
    }
  },
};
