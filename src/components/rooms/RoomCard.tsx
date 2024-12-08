import React from 'react';
import { Calendar, Users } from 'lucide-react';

interface RoomCardProps {
  title: string;
  price: number;
  image: string;
  capacity: number;
}

export function RoomCard({ title, price, image, capacity }: RoomCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Up to {capacity} guests</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Available</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-light">${price}<span className="text-sm text-gray-500">/night</span></span>
          <button className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}