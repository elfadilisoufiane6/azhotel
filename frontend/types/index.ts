export type Currency = "MAD" | "EUR" | "USD";

export type Amenity = {
  id: string;
  name: string;
  icon: string;
};

export type RoomImage = {
  url: string;
  alt: string;
};

export type RoomCategory = "twin" | "double" | "single" | "suite";

export type Room = {
  id: string;
  slug: string;
  name: string;
  category: RoomCategory;
  shortDescription: string;
  description: string;
  basePrice: number;
  currency: Currency;
  size: number;          // sqm
  maxGuests: number;
  beds: string;
  view: string;
  images: RoomImage[];
  amenities: Amenity[];
  rateOptions: RateOption[];
};

export type RateOption = {
  id: string;
  name: string;
  price: number;
  refundable: boolean;
  prepayment: boolean;
  breakfastIncluded: boolean;
  description: string;
};

export type Booking = {
  id: string;
  reference: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  currency: Currency;
  status: "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled";
  createdAt: string;
};

export type Review = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  score: number;
  title?: string;
  body: string;
  travelType?: string;
  stayDate?: string;
  createdAt: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
};

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  category: "rooms" | "restaurant" | "spa" | "gardens" | "art" | "exterior";
  width: number;
  height: number;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};
