export interface ServiceProvider {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    experience: number;
    location: string;
    availability: string[];
    imageUrl: string;
    reviews: number;
  }