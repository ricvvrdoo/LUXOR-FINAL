import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Service } from '../../data/services';

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-4">
      <img 
        src={service.imageUrl} 
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-amber-500 text-xl font-semibold mb-2">{service.name}</h3>
        <p className="text-gray-300 text-sm mb-3">{service.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-400">
            {service.duration && (
              <span className="flex items-center mr-4">
                <Clock className="w-4 h-4 mr-1" />
                {service.duration}
              </span>
            )}
            <span className="text-amber-500 font-semibold">
              ${service.price}
            </span>
          </div>
        </div>

        <button
          onClick={() => onBook(service.id)}
          disabled={!service.available}
          className={`w-full py-2 px-4 rounded-md transition-colors ${
            service.available
              ? 'bg-amber-500 hover:bg-amber-600 text-black'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {service.available ? 'Book Now' : 'Currently Unavailable'}
        </button>
      </div>
    </div>
  );
};