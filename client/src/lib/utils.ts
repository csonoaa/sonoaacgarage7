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
  // No mileage adjustment for cars with less than 50,000 miles
  if (mileage < 50000) {
    return 0;
  }
  
  // Calculate expected mileage based on year (15,000 miles per year)
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  const expectedMileage = age * 15000;
  
  // Cap excessive mileage at 150,000 for adjustment calculations
  const cappedMileage = Math.min(mileage, 150000);
  
  // Calculate mileage difference
  const mileageDifference = cappedMileage - expectedMileage;
  
  // Adjust offer based on mileage (approximately -$0.10 per mile over expected)
  if (mileageDifference > 0) {
    return Math.max(-5000, mileageDifference * -0.1); // Cap at -$5000
  } else if (mileageDifference < 0) {
    // For low mileage cars that are still above 50k miles
    // But below expected mileage, provide a slight positive adjustment
    return Math.min(2000, Math.abs(mileageDifference) * -0.05); // Cap at -$2000 (negative adjustment for lower mileage too)
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
  // For non-drivable cars, set a fixed offer of $900 maximum
  if (condition === 'non-drivable') {
    // Still calculate market value for reference
    const marketValue = getMarketValue(make, model, year);
    
    // Set initial offer as 0 since we're using fixed price logic
    const initialOffer = 0;
    
    // No mileage adjustment for non-drivable
    const mileageAdjustment = 0;
    
    // The condition adjustment is the full $900 (or less if market value * 0.05 is less)
    const conditionAdjustment = Math.min(900, marketValue * 0.05);
    
    // Final offer is capped at $900
    const finalOffer = Math.min(900, conditionAdjustment);
    
    return {
      marketValue,
      initialOffer,
      mileageAdjustment,
      conditionAdjustment,
      finalOffer
    };
  }
  
  // For drivable cars, proceed with normal calculation
  // Calculate market value
  const marketValue = getMarketValue(make, model, year);
  
  // Calculate initial offer (37% off market value)
  const initialOffer = marketValue * 0.63;
  
  // Adjust for mileage (ensure it doesn't exceed half of initial offer)
  let mileageAdjustment = calculateMileageAdjustment(mileage, year);
  
  // Ensure mileage adjustment is never more than 50% of the initial offer
  // This prevents the final offer from going too low or negative
  const maxMileageAdjustment = initialOffer * -0.5; // -50% of initial offer as maximum adjustment
  mileageAdjustment = Math.max(mileageAdjustment, maxMileageAdjustment);
  
  // Adjust for condition
  const conditionAdjustment = calculateConditionAdjustment(condition, marketValue);
  
  // Calculate final offer (ensuring it's never negative)
  const finalOffer = Math.max(0, initialOffer + mileageAdjustment + conditionAdjustment);
  
  return {
    marketValue,
    initialOffer,
    mileageAdjustment,
    conditionAdjustment,
    finalOffer
  };
}
