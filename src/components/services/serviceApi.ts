import { Service, ServiceCategory } from '../../data/services';
import { mockServices, mockCategories } from '../../mocks/services';

// Simulating API calls with mock data
export const getServices = async (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockServices), 1000);
  });
};

export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories), 1000);
  });
};

export const bookService = async (serviceId: string, date: string): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};