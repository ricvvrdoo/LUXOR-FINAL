import { useState, useEffect } from 'react';
import { Service, ServiceCategory } from '../data/services';
import { getServices, getServiceCategories } from '../components/services/serviceApi';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, categoriesData] = await Promise.all([
          getServices(),
          getServiceCategories(),
        ]);
        setServices(servicesData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { services, categories, loading, error };
};