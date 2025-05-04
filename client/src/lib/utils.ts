import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { carBaseValues, conditionFactors } from "./cars-data";
import { CarOffer } from "@/pages/home";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency
 */
export function formatCurrency(value: number): string {
  return '$' + Math.round(value).toLocaleString();
}

/**
 * Calculate the market value for a vehicle based on make, model and year
 */
export function getMarketValue(make: string, model: string, year: number): number {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  
  // Get base value from the make or use default
  const baseValue = carBaseValues[make] || carBaseValues.default;
  
  // Adjust for age (roughly 10% depreciation per year)
  const depreciation = Math.min(0.80, age * 0.10); // Cap at 80% depreciation
  return baseValue * (1 - depreciation);
}

/**
 * Calculate mileage adjustment based on mileage and year
 */
export function calculateMileageAdjustment(mileage: number, year: number): number {
  // Calculate expected mileage based on year (15,000 miles per year)
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  const expectedMileage = age * 15000;
  
  // Calculate mileage difference
  const mileageDifference = mileage - expectedMileage;
  
  // Adjust offer based on mileage (approximately -$0.10 per mile over expected)
  if (mileageDifference > 0) {
    return Math.max(-5000, mileageDifference * -0.1); // Cap at -$5000
  } else if (mileageDifference < 0) {
    return Math.min(2000, Math.abs(mileageDifference) * 0.05); // Cap at +$2000
  }
  
  return 0;
}

/**
 * Calculate condition adjustment based on condition and market value
 */
export function calculateConditionAdjustment(condition: string, marketValue: number): number {
  const adjustmentFactor = conditionFactors[condition] || 0;
  return marketValue * adjustmentFactor;
}

/**
 * Calculate complete car offer
 */
export function calculateOffer(
  make: string,
  model: string,
  year: number,
  mileage: number,
  condition: string
): CarOffer {
  // Calculate market value
  const marketValue = getMarketValue(make, model, year);
  
  // Calculate initial offer (37% off market value)
  const initialOffer = marketValue * 0.63;
  
  // Adjust for mileage
  const mileageAdjustment = calculateMileageAdjustment(mileage, year);
  
  // Adjust for condition
  const conditionAdjustment = calculateConditionAdjustment(condition, marketValue);
  
  // Calculate final offer
  const finalOffer = initialOffer + mileageAdjustment + conditionAdjustment;
  
  return {
    marketValue,
    initialOffer,
    mileageAdjustment,
    conditionAdjustment,
    finalOffer
  };
}
