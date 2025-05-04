import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { makesAndModels } from "@/lib/cars-data";
import { CarOffer } from "@/pages/home";
import { Card } from "@/components/ui/card";
import { XIcon, UploadIcon } from "lucide-react";
import { calculateOffer } from "@/lib/utils";

interface CarValuationFormProps {
  setCarOffer: (offer: CarOffer) => void;
}

interface FormData {
  make: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
  bodyType: string;
  color: string;
  transmission: boolean;
  catalyticConverter: boolean;
}

interface PhotoPreview {
  id: string;
  dataUrl: string;
}

export default function CarValuationForm({ setCarOffer }: CarValuationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    bodyType: "",
    color: "",
    transmission: false,
    catalyticConverter: false,
  });

  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<PhotoPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate year options from 2000 to current year + 1
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1999 + 1 }, (_, i) => (currentYear - i).toString());

  // Handle form input changes
  const handleInputChange = (name: string, value: string | boolean) => {
    // If make changes, update model options
    if (name === 'make') {
      const selectedMake = value as string;
      if (selectedMake && makesAndModels[selectedMake]) {
        setModelOptions(makesAndModels[selectedMake]);
        // Reset model selection when make changes
        setFormData((prev) => ({
          ...prev,
          model: "",
          [name]: selectedMake,
        }));
      } else {
        setModelOptions([]);
        setFormData((prev) => ({
          ...prev,
          model: "",
          [name]: selectedMake,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Limit to 5 photos
    const remainingSlots = 5 - photoFiles.length;
    const newFiles: File[] = [];
    const newPreviews: PhotoPreview[] = [];

    Array.from(files).slice(0, remainingSlots).forEach((file) => {
      newFiles.push(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview: PhotoPreview = {
          id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          dataUrl: event.target?.result as string,
        };
        
        setPhotoPreviews((prev) => [...prev, preview]);
      };
      reader.readAsDataURL(file);
    });

    setPhotoFiles((prev) => [...prev, ...newFiles]);
  };

  // Remove photo from previews and files
  const removePhoto = (id: string) => {
    const previewIndex = photoPreviews.findIndex((preview) => preview.id === id);
    if (previewIndex !== -1) {
      const newPreviews = [...photoPreviews];
      newPreviews.splice(previewIndex, 1);
      setPhotoPreviews(newPreviews);

      const newFiles = [...photoFiles];
      newFiles.splice(previewIndex, 1);
      setPhotoFiles(newFiles);
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.make || !formData.model || !formData.year || !formData.mileage || !formData.condition) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // If catalytic converter is missing, treat as non-drivable
    const condition = !formData.catalyticConverter ? 'non-drivable' : formData.condition;

    // Calculate offer
    const offer = calculateOffer(
      formData.make,
      formData.model,
      parseInt(formData.year),
      parseInt(formData.mileage),
      condition,
      formData.catalyticConverter
    );

    // Set car offer to display result
    setCarOffer(offer);

    // Scroll to result (if needed in a real implementation)
    setTimeout(() => {
      document.getElementById('valuationResult')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Vehicle Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Vehicle Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Make Selection */}
          <div>
            <Label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </Label>
            <Select
              value={formData.make}
              onValueChange={(value) => handleInputChange('make', value)}
            >
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder="Select a make" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(makesAndModels).map((make) => (
                  <SelectItem key={make} value={make}>
                    {make.charAt(0).toUpperCase() + make.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Selection */}
          <div>
            <Label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </Label>
            <Select
              value={formData.model}
              onValueChange={(value) => handleInputChange('model', value)}
              disabled={!formData.make}
            >
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder={formData.make ? "Select a model" : "Select a make first"} />
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map((model) => (
                  <SelectItem key={model} value={model.toLowerCase()}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Selection */}
          <div>
            <Label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </Label>
            <Select
              value={formData.year}
              onValueChange={(value) => handleInputChange('year', value)}
            >
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mileage Input */}
          <div>
            <Label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
              Mileage
            </Label>
            <Input
              type="number"
              id="mileage"
              name="mileage"
              min="0"
              step="1"
              placeholder="e.g. 50000"
              className="w-full bg-gray-50"
              value={formData.mileage}
              onChange={(e) => handleInputChange('mileage', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Condition & Features Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Condition & Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Condition Selection */}
          <div>
            <Label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => handleInputChange('condition', value)}
            >
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="great">Great</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="bad">Bad</SelectItem>
                <SelectItem value="non-drivable">Non-Drivable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Body Type Selection */}
          <div>
            <Label htmlFor="bodyType" className="block text-sm font-medium text-gray-700 mb-1">
              Body Type
            </Label>
            <Select
              value={formData.bodyType}
              onValueChange={(value) => handleInputChange('bodyType', value)}
            >
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="coupe">Coupe</SelectItem>
                <SelectItem value="hatchback">Hatchback</SelectItem>
                <SelectItem value="convertible">Convertible</SelectItem>
                <SelectItem value="wagon">Wagon</SelectItem>
                <SelectItem value="van">Van</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color Selection */}
          <div>
            <Label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </Label>
            <Select
              value={formData.color}
              onValueChange={(value) => handleInputChange('color', value)}
            >
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gray">Gray</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="brown">Brown</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Checkboxes for features */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="transmission" 
                checked={formData.transmission}
                onCheckedChange={(checked) => 
                  handleInputChange('transmission', checked === true)
                }
              />
              <Label htmlFor="transmission" className="text-sm text-gray-700">
                Working Transmission
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="catalyticConverter" 
                checked={formData.catalyticConverter}
                onCheckedChange={(checked) => 
                  handleInputChange('catalyticConverter', checked === true)
                }
              />
              <Label htmlFor="catalyticConverter" className="text-sm text-gray-700">
                Has Catalytic Converter
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Upload Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Vehicle Photos</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Upload photos of your vehicle to help us provide a more accurate valuation.
          </p>

          {/* Photo upload control */}
          <div className="flex flex-col items-center space-y-4">
            <div 
              className="w-full flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition" 
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon className="w-12 h-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Drag and drop photos or click to upload</p>
              <p className="text-xs text-gray-500 mt-1">(Maximum 5 photos)</p>
              <input 
                ref={fileInputRef}
                type="file" 
                id="photoUpload" 
                accept="image/*" 
                multiple 
                className="hidden"
                onChange={handlePhotoUpload}
                disabled={photoFiles.length >= 5}
              />
              <Button 
                type="button" 
                className="mt-4 bg-primary hover:bg-blue-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={photoFiles.length >= 5}
              >
                Select Photos
              </Button>
            </div>

            {/* Photo preview area */}
            {photoPreviews.length > 0 && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {photoPreviews.map((preview) => (
                  <div key={preview.id} className="relative rounded-lg overflow-hidden h-40 bg-gray-200">
                    <img 
                      src={preview.dataUrl} 
                      alt="Car photo preview" 
                      className="w-full h-full object-cover" 
                    />
                    <button 
                      type="button" 
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center hover:bg-red-600 transition"
                      onClick={() => removePhoto(preview.id)}
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <Button 
          type="submit"
          className="px-8 py-3 bg-primary text-white font-medium rounded-md shadow-sm hover:bg-blue-600 transition"
        >
          Calculate Offer
        </Button>
      </div>
    </form>
  );
}
