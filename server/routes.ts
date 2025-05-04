import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCarValuationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for saving car valuation
  app.post("/api/car-valuation", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertCarValuationSchema.parse(req.body);
      
      // Save to database
      const result = await storage.saveCarValuation(validatedData);
      
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error creating car valuation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // API route for getting all car valuations
  app.get("/api/car-valuations", async (req, res) => {
    try {
      const valuations = await storage.getAllCarValuations();
      return res.json(valuations);
    } catch (error) {
      console.error("Error fetching car valuations:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // API route for getting a specific car valuation
  app.get("/api/car-valuation/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const valuation = await storage.getCarValuationById(id);
      if (!valuation) {
        return res.status(404).json({ error: "Car valuation not found" });
      }

      return res.json(valuation);
    } catch (error) {
      console.error("Error fetching car valuation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // API route for getting car valuations by user ID (for future use)
  app.get("/api/user/:userId/car-valuations", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID format" });
      }

      const valuations = await storage.getCarValuationsByUserId(userId);
      return res.json(valuations);
    } catch (error) {
      console.error("Error fetching user car valuations:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
