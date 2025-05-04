import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CarOffer } from "@/pages/home";
import { formatCurrency } from "@/lib/utils";
import { useLocation } from "wouter";

interface ValuationResultProps {
  carOffer: CarOffer;
}

export default function ValuationResult({ carOffer }: ValuationResultProps) {
  const [, navigate] = useLocation();
  
  const handleAcceptOffer = () => {
    // Encode car offer data to pass in URL
    const offerData = encodeURIComponent(JSON.stringify(carOffer));
    navigate(`/sell-now?offer=${offerData}`);
  };
  
  const handleRejectOffer = () => {
    // Simply clear the form and reset
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      // Show a toast notification
      window.location.reload();
    }, 500);
  };
  
  return (
    <Card id="valuationResult" className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
        Your Vehicle Valuation
      </h3>
      
      <div className="flex flex-col items-center">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            Based on the information provided, our offer for your vehicle is:
          </p>
          <div className="mt-4 text-4xl font-bold text-primary">
            {formatCurrency(carOffer.finalOffer)}
          </div>
          
          <p className="mt-2 text-sm text-gray-600">
            This offer is valid for 7 days from today.
          </p>
        </div>
        
        <div className="w-full max-w-md bg-gray-50 rounded-lg p-4 mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Offer Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Market Value</span>
              <span className="font-medium">{formatCurrency(carOffer.marketValue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Initial Offer (37% off Market Value)</span>
              <span className="font-medium">{formatCurrency(carOffer.initialOffer)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mileage Adjustment</span>
              <span className="font-medium">{formatCurrency(carOffer.mileageAdjustment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Condition Adjustment</span>
              <span className="font-medium">{formatCurrency(carOffer.conditionAdjustment)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Final Offer</span>
              <span className="text-primary">{formatCurrency(carOffer.finalOffer)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            type="button" 
            className="px-6 py-2 bg-secondary hover:bg-green-600 text-white font-medium"
            onClick={handleAcceptOffer}
          >
            Accept Offer
          </Button>
          <Button 
            type="button" 
            variant="outline"
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium"
            onClick={handleRejectOffer}
          >
            Reject Offer
          </Button>
        </div>
      </div>
    </Card>
  );
}
