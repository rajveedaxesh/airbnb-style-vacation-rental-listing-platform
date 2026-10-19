export interface ListingPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'Living Room' | 'Bedroom' | 'Jacuzzi & Spa' | 'Kitchen & Dining' | 'Bathroom' | 'Outdoor & Pool';
  alt: string;
}

export interface AmenityItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  featured: boolean;
  description?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  userDuration: string;
}

export interface HostInfo {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  joinedDate: string;
  reviewsCount: number;
  rating: number;
  responseRate: string;
  responseTime: string;
  bio: string;
  coHosts?: { name: string; avatar: string }[];
}

export interface ListingDetails {
  id: string;
  title: string;
  location: string;
  city: string;
  state: string;
  country: string;
  guestsCount: number;
  bedroomsCount: number;
  bedsCount: number;
  bathsCount: number;
  rating: number;
  reviewsCount: number;
  isGuestFavorite: boolean;
  isSuperhost: boolean;
  pricePerNight: number;
  cleaningFee: number;
  serviceFeeRate: number;
  host: HostInfo;
  photos: ListingPhoto[];
  description: string;
  highlights: { icon: string; title: string; subtitle: string }[];
  amenities: AmenityItem[];
  reviews: ReviewItem[];
  categoryRatings: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}
