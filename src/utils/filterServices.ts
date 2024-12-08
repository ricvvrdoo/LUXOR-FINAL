import { Service } from '../data/services';

export const filterServices = (
  services: Service[],
  searchQuery: string,
  selectedCategory: string | null
): Service[] => {
  return services.filter((service) => {
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};