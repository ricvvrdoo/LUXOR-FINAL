import { Service, ServiceCategory } from '../data/services';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Luxury Spa Treatment',
    description: 'Indulge in our signature spa treatment with premium oils and hot stones',
    price: 150,
    duration: '90 min',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
    category: 'spa',
    available: true
  },
  {
    id: '2',
    name: 'Fine Dining Experience',
    description: 'Five-course gourmet dinner prepared by our Michelin-starred chef',
    price: 200,
    duration: '120 min',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    category: 'dining',
    available: true
  },
  {
    id: '3',
    name: 'Personal Training Session',
    description: 'One-on-one fitness training with our certified instructors',
    price: 80,
    duration: '60 min',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
    category: 'fitness',
    available: true
  }
];

export const mockCategories: ServiceCategory[] = [
  {
    id: 'spa',
    name: 'Spa & Wellness',
    icon: 'spa',
    description: 'Relaxation and rejuvenation services'
  },
  {
    id: 'dining',
    name: 'Dining',
    icon: 'utensils',
    description: 'Fine dining experiences'
  },
  {
    id: 'fitness',
    name: 'Fitness',
    icon: 'dumbbell',
    description: 'Gym and personal training'
  }
];