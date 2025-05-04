import { Card } from "@/components/ui/card";
import CarValuationForm from "@/components/car-valuation-form";
import ValuationResult from "@/components/valuation-result";
import { useState } from "react";

export interface CarOffer {
  marketValue: number;
  initialOffer: number;
  mileageAdjustment: number;
  conditionAdjustment: number;
  finalOffer: number;
}

export default function Home() {
  const [carOffer, setCarOffer] = useState<CarOffer | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">sonoaac garage</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {/* Page Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Get Your Car Valuation</h2>
          <p className="mt-2 text-gray-600">
            Fill out the form below to receive an instant offer for your vehicle.
          </p>
        </div>

        {/* Car Valuation Form */}
        <Card className="bg-white shadow-md p-6">
          <CarValuationForm setCarOffer={setCarOffer} />
        </Card>

        {/* Valuation Result */}
        {carOffer && (
          <div className="mt-8">
            <ValuationResult carOffer={carOffer} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">sonoaac garage</h3>
              <p className="text-gray-400 text-sm">
                We provide fair valuations for all types of vehicles. Our offers are competitive and
                transparent.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>123 Auto Lane, Cartown</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@sonoaacgarage.com</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Monday-Friday: 8am - 6pm</li>
                <li>Saturday: 9am - 5pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} sonoaac garage. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
