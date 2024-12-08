import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ServiceCard } from '../components/services/ServiceCard';
import { CategoryFilter } from '../components/services/CategoryFilter';
import { useServices } from '../context/useServices';
import { filterServices } from '../utils/filterServices';

export const ServicesPage: React.FC = () => {
  const { services, categories, loading, error } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = filterServices(services, searchQuery, selectedCategory);

  const handleBookService = (serviceId: string) => {
    // Implement booking logic or navigation to booking page
    console.log('Booking service:', serviceId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <div className="text-amber-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-white p-4">
      <h1 className="text-2xl font-bold text-amber-500 mb-4">Our Services</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onBook={handleBookService}
          />
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No services found matching your criteria
        </div>
      )}
    </div>
  );
};