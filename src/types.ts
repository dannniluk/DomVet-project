export type ViewMode = 'home' | 'prices' | 'doctors' | 'services' | 'service-detail' | 'exotics' | 'pharmacy' | 'contacts';

export interface PharmacyProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: string;
  inStock: boolean;
  categoryId: string;
  categoryName: string;
  description: string;
  image: string;
}

export interface Doctor {
  id: string;
  name: string;
  position: string;
  specialization: string[];
  shortSpecialization: string;
  experienceYears: number;
  education: string;
  bio: string;
  image: string;
  scheduleDays: string;
  specialtiesForFilter: ('all' | 'therapy' | 'surgery' | 'ultrasound' | 'anesthesiology' | 'dermatology' | 'oncology' | 'exotics')[];
}

export interface PriceItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  priceNum: number;
  category: string;
  subCategory?: string;
  popular?: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  whenNeeded: string[];
  preparation?: string[];
  doctors: string[]; // doctor IDs
  popularPriceIds: string[];
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  date: string;
  text: string;
  rating: number;
  source: string;
  petInfo?: string;
}

export interface BookingData {
  name: string;
  phone: string;
  petType: string;
  petName: string;
  serviceCategory: string;
  preferredDoctorId?: string;
  preferredDate?: string;
  preferredTime?: string;
  comment?: string;
}
