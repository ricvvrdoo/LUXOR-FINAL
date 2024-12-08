export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration?: string;
    imageUrl: string;
    category: 'spa' | 'dining' | 'fitness' | 'events' | 'transport';
    available: boolean;
  }
  
  export interface ServiceCategory {
    id: string;
    name: string;
    icon: string;
    description: string;
  }