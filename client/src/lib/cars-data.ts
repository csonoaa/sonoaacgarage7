// Data for car makes and models
export const makesAndModels: Record<string, string[]> = {
  'toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Sienna', 'Venza', '4Runner', 'Avalon', 'C-HR', 'GR86', 'Land Cruiser', 'Sequoia', 'bZ4X', 'Supra'],
  'honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V', 'Ridgeline', 'Passport', 'Insight', 'Clarity', 'CR-Z', 'Element', 'Crosstour', 'Prologue'],
  'ford': ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge', 'Ranger', 'Bronco', 'Expedition', 'Fusion', 'Focus', 'Fiesta', 'EcoSport', 'Maverick', 'Transit', 'F-250', 'F-350', 'Mustang Mach-E', 'Lightning'],
  'chevrolet': ['Silverado', 'Malibu', 'Equinox', 'Tahoe', 'Suburban', 'Camaro', 'Traverse', 'Trax', 'Blazer', 'Colorado', 'Impala', 'Corvette', 'Spark', 'Bolt', 'Trailblazer', 'Express', 'Sonic'],
  'nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Murano', 'Frontier', 'Titan', 'Maxima', 'Kicks', 'Armada', 'Versa', 'GT-R', '370Z', 'Leaf', 'Juke', 'Quest', 'Rogue Sport', 'Z'],
  'bmw': ['3 Series', '5 Series', 'X3', 'X5', 'X7', '7 Series', 'i4', '1 Series', '2 Series', '4 Series', '6 Series', '8 Series', 'X1', 'X2', 'X4', 'X6', 'Z4', 'i3', 'i7', 'i8', 'iX'],
  'mercedes': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'A-Class', 'B-Class', 'CLA', 'CLS', 'G-Class', 'GLB', 'GLA', 'SL', 'SLC', 'AMG GT', 'EQS', 'EQE', 'V-Class', 'Maybach'],
  'audi': ['A4', 'A6', 'Q5', 'Q7', 'A3', 'e-tron', 'Q3', 'A5', 'A7', 'A8', 'Q2', 'Q4', 'Q8', 'TT', 'R8', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'e-tron GT'],
  'hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Venue', 'Accent', 'Veloster', 'IONIQ', 'Genesis', 'Azera', 'Nexo', 'IONIQ 5', 'IONIQ 6'],
  'kia': ['Forte', 'Optima', 'Sportage', 'Sorento', 'Telluride', 'Soul', 'Seltos', 'Rio', 'Stinger', 'K5', 'Carnival', 'Niro', 'Cadenza', 'EV6', 'EV9'],
  'volkswagen': ['Golf', 'Jetta', 'Passat', 'Tiguan', 'Atlas', 'ID.4', 'Taos', 'Arteon', 'Beetle', 'CC', 'Touareg', 'Golf GTI', 'Golf R', 'ID.Buzz'],
  'subaru': ['Forester', 'Outback', 'Impreza', 'Legacy', 'Crosstrek', 'WRX', 'Ascent', 'BRZ', 'Tribeca', 'Baja', 'Solterra'],
  'mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5 Miata', 'CX-30', 'CX-3', 'CX-50', 'RX-7', 'RX-8', 'MX-30'],
  'lexus': ['ES', 'RX', 'NX', 'GX', 'IS', 'LX', 'UX', 'LC', 'LS', 'RC', 'GS', 'CT', 'SC', 'RZ'],
  'acura': ['MDX', 'RDX', 'TLX', 'ILX', 'RLX', 'NSX', 'ZDX', 'TSX', 'RSX', 'Integra'],
  'infiniti': ['Q50', 'QX60', 'QX80', 'QX50', 'QX55', 'Q60', 'G35', 'G37', 'FX35', 'M35', 'JX35'],
  'cadillac': ['Escalade', 'XT5', 'CT4', 'CT5', 'XT4', 'XT6', 'ATS', 'CTS', 'SRX', 'XTS', 'ELR', 'LYRIQ'],
  'lincoln': ['Navigator', 'Aviator', 'Corsair', 'Nautilus', 'MKZ', 'Continental', 'MKC', 'MKX', 'MKT', 'Town Car'],
  'buick': ['Enclave', 'Encore', 'Envision', 'LaCrosse', 'Regal', 'Verano', 'Cascada', 'Lucerne', 'Encore GX'],
  'jeep': ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Patriot', 'Liberty', 'Commander', 'Wagoneer', 'Grand Wagoneer'],
  'ram': ['1500', '2500', '3500', 'ProMaster', 'ProMaster City', 'Dakota'],
  'dodge': ['Charger', 'Challenger', 'Durango', 'Journey', 'Grand Caravan', 'Dart', 'Viper', 'Avenger', 'Nitro'],
  'chrysler': ['300', 'Pacifica', 'Voyager', 'Town & Country', 'Sebring', 'PT Cruiser', '200'],
  'gmc': ['Sierra', 'Terrain', 'Acadia', 'Yukon', 'Canyon', 'Savana', 'Envoy', 'Hummer EV'],
  'volvo': ['XC90', 'XC60', 'XC40', 'S60', 'S90', 'V60', 'V90', 'C40'],
  'porsche': ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', '718 Cayman', '718 Boxster'],
  'jaguar': ['F-PACE', 'XF', 'XE', 'F-TYPE', 'E-PACE', 'I-PACE', 'XJ'],
  'land rover': ['Range Rover', 'Discovery', 'Defender', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque', 'Discovery Sport'],
  'tesla': ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck', 'Roadster'],
  'mini': ['Cooper', 'Countryman', 'Clubman', 'Paceman', 'Convertible']
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
  'volkswagen': 26000,
  'subaru': 24000,
  'mazda': 23000,
  'lexus': 40000,
  'acura': 35000,
  'infiniti': 36000,
  'cadillac': 45000,
  'lincoln': 42000,
  'buick': 30000,
  'jeep': 32000,
  'ram': 33000,
  'dodge': 29000,
  'chrysler': 28000,
  'gmc': 32000,
  'volvo': 38000,
  'porsche': 65000,
  'jaguar': 48000,
  'land rover': 55000,
  'tesla': 52000,
  'mini': 28000,
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
