export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface MenuItem {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface DeliveryPlatform {
  name: string;
  url?: string;
}

export interface DeliveryInfo {
  platforms?: DeliveryPlatform[];
  zones?: string[];
  delivery_hours?: { [key: string]: string[] };
}

type TimeSlot = {
  open: string;
  close: string;
};

type OpeningHours = {
  lundi: TimeSlot[];
  mardi: TimeSlot[];
  mercredi: TimeSlot[];
  jeudi: TimeSlot[];
  vendredi: TimeSlot[];
  samedi: TimeSlot[];
  dimanche: TimeSlot[];
};

export interface LegalInfo {
  raison_sociale?: string;
  forme_juridique?: string;
  siret?: string;
}

export interface GoogleReview {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

export interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
}

export interface Restaurant {
  _id?: string;
  owner_id: string;
  name?: string;
  subdomain?: string;
  logo_url?: string;
  phone?: string;
  email?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  google_maps_link?: string;
  social_links?: SocialLinks;
  menu?: MenuCategory[];
  services?: string[];
  delivery_info?: DeliveryInfo;
  opening_hours?: OpeningHours;
  payments_accepted?: string[];
  legal_info?: LegalInfo;
  seo_title?: string;
  seo_description?: string;
  google_place?: GooglePlace;
  google_reviews?: GoogleReview[];
  created_at?: string;
  updated_at?: string;
}
