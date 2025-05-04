import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CarOffer } from "./home";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface SellNowPageProps {
  carOffer?: CarOffer; 
}

export default function SellNow() {
  const [, navigate] = useLocation();
  
  // Try to parse car offer from URL state
  const searchParams = new URLSearchParams(window.location.search);
  const offerParam = searchParams.get('offer');
  
  let initialOffer: CarOffer | undefined;
  try {
    if (offerParam) {
      initialOffer = JSON.parse(decodeURIComponent(offerParam));
    }
  } catch (error) {
    console.error("Failed to parse car offer from URL", error);
  }
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    hasTitle: true,
  });
  
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, hasTitle: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !pickupDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select a pickup date",
        variant: "destructive"
      });
      return;
    }
    
    // If user does not have title, redirect to home page with non-drivable option
    if (!formData.hasTitle) {
      toast({
        title: "Title Required",
        description: "Without a title, your vehicle will be valued as non-drivable. Redirecting you to update your valuation.",
        variant: "destructive"
      });
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/?condition=non-drivable");
      }, 3000);
      
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Here we would submit the data to the backend
      // For now, just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Success!",
        description: `Your vehicle sale has been scheduled for pickup on ${format(pickupDate, "MMMM do, yyyy")}. We'll be in touch soon!`,
      });
      
      // Redirect to home after success
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container max-w-3xl py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Vehicle Sale</CardTitle>
          <CardDescription>
            Provide your information to finalize the sale and schedule a pickup
          </CardDescription>
        </CardHeader>
        
        {initialOffer && (
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Your Offer Summary</h3>
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between py-1">
                  <span>Market Value:</span>
                  <span className="font-medium">${initialOffer.marketValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Initial Offer:</span>
                  <span className="font-medium">${initialOffer.initialOffer.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Mileage Adjustment:</span>
                  <span className="font-medium text-destructive">${initialOffer.mileageAdjustment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Condition Adjustment:</span>
                  <span className={`font-medium ${initialOffer.conditionAdjustment >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                    ${initialOffer.conditionAdjustment.toLocaleString()}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between py-1">
                  <span className="font-semibold">Final Offer:</span>
                  <span className="font-bold text-xl">${initialOffer.finalOffer.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  placeholder="John Doe" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  placeholder="(555) 123-4567" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="address">Street Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  placeholder="123 Main St" 
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    placeholder="Anytown" 
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    placeholder="CA" 
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input 
                    id="zip" 
                    name="zip" 
                    placeholder="12345" 
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-3">
                <Label>Pickup Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !pickupDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {pickupDate ? format(pickupDate, "PPP") : <span>Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                      initialFocus
                      disabled={(date) => {
                        // Disable dates in the past and dates more than 30 days in the future
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        
                        const thirtyDaysFromNow = new Date();
                        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
                        
                        return date < today || date > thirtyDaysFromNow;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-center space-x-2 py-2">
                <Checkbox 
                  id="hasTitle" 
                  checked={formData.hasTitle}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="hasTitle" className="font-medium cursor-pointer">
                  I confirm that I have the vehicle title
                </Label>
              </div>
              
              {!formData.hasTitle && (
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-md text-yellow-800 dark:text-yellow-200">
                  <p className="text-sm">
                    <strong>Important:</strong> Without a title, your vehicle will be valued as non-drivable, 
                    with a maximum offer of $900. If you proceed, you'll be redirected to update your valuation.
                  </p>
                </div>
              )}
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Complete Sale"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}