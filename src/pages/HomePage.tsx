import React from 'react';
import { ArrowRight } from 'lucide-react';

export function HomePage() {
  return (
    <div className="bg-black min-h-screen pb-20">
      <div className="relative h-[40vh]">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80"
          alt="Luxor Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
        <div className="absolute bottom-0 p-6">
          <h1 className="text-3xl font-light text-white mb-2">Welcome to Luxor</h1>
          <p className="text-gray-300">Your luxury escape awaits</p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-light text-amber-500 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-gray-900 p-4 rounded-lg text-left hover:bg-gray-800">
              <span className="text-amber-500 block mb-1">Book a Room</span>
              <span className="text-gray-400 text-sm">Find your perfect stay</span>
            </button>
            <button className="bg-gray-900 p-4 rounded-lg text-left hover:bg-gray-800">
              <span className="text-amber-500 block mb-1">Services</span>
              <span className="text-gray-400 text-sm">Explore amenities</span>
            </button>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-light text-amber-500">Featured Rooms</h2>
            <button className="text-amber-500 flex items-center space-x-1">
              <span>View all</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {/* Featured rooms will be rendered here */}
          </div>
        </section>
      </div>
    </div>
  );
}