import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User table (carried over from original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Car valuation requests table
export const carValuations = pgTable("car_valuations", {
  id: serial("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  mileage: integer("mileage").notNull(),
  condition: text("condition").notNull(),
  bodyType: text("body_type"),
  color: text("color"),
  transmission: boolean("transmission").default(false),
  catalyticConverter: boolean("catalytic_converter").default(false),
  marketValue: integer("market_value").notNull(),
  initialOffer: integer("initial_offer").notNull(),
  mileageAdjustment: integer("mileage_adjustment").notNull(),
  conditionAdjustment: integer("condition_adjustment").notNull(),
  finalOffer: integer("final_offer").notNull(),
  photoUrls: jsonb("photo_urls").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const insertCarValuationSchema = createInsertSchema(carValuations, {
  make: (schema) => schema.min(1, "Make is required"),
  model: (schema) => schema.min(1, "Model is required"),
  year: (schema) => schema.min(2000, "Year must be 2000 or later"),
  mileage: (schema) => schema.min(0, "Mileage cannot be negative"),
  condition: (schema) => schema.refine(val => 
    ['great', 'good', 'fair', 'bad', 'non-drivable'].includes(val), 
    "Invalid condition selected"
  ),
}).omit({ 
  id: true, 
  createdAt: true
});

export type InsertCarValuation = z.infer<typeof insertCarValuationSchema>;
export type CarValuation = typeof carValuations.$inferSelect;

export const carValuationsRelations = relations(carValuations, ({ one }) => ({
  user: one(users, {
    fields: [carValuations.userId],
    references: [users.id],
  }),
}));
