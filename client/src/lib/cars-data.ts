// Data for car makes and models
export const makesAndModels: Record<string, string[]> = {
  'toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius'],
  'honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V'],
  'ford': ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge', 'Ranger', 'Bronco'],
  'chevrolet': ['Silverado', 'Malibu', 'Equinox', 'Tahoe', 'Suburban', 'Camaro', 'Traverse'],
  'nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Murano', 'Frontier', 'Titan'],
  'bmw': ['3 Series', '5 Series', 'X3', 'X5', 'X7', '7 Series', 'i4'],
  'mercedes': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'A-Class'],
  'audi': ['A4', 'A6', 'Q5', 'Q7', 'A3', 'e-tron', 'Q3'],
  'hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Venue'],
  'kia': ['Forte', 'Optima', 'Sportage', 'Sorento', 'Telluride', 'Soul', 'Seltos']
};

// Base values for different makes (for valuation)
export const carBaseValues: Record<string, number> = {
  'toyota': 25000,
  'honda': 23000,
  'ford': 28000,
  'chevrolet': 27000,
  'nissan': 22000,
  'bmw': 45000,
  'mercedes': 50000,
  'audi': 42000,
  'hyundai': 20000,
  'kia': 19000,
  'default': 25000
};

// Condition adjustment factors
export const conditionFactors: Record<string, number> = {
  'great': 0.05,     // +5% for great condition
  'good': 0,         // No adjustment for good (standard) condition
  'fair': -0.05,     // -5% for fair condition
  'bad': -0.15,      // -15% for bad condition
  'non-drivable': -0.40, // -40% for non-drivable condition
};
