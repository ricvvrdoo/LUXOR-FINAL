import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80"
          alt="Luxor Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 text-white">
        <h1 className="text-5xl font-light mb-6">Experience Luxury</h1>
        <p className="text-xl mb-8 max-w-2xl">Discover unparalleled comfort and elegance at Luxor Hotel. Your journey to extraordinary begins here.</p>
        <button className="group bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full flex items-center space-x-2 transition-all">
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}