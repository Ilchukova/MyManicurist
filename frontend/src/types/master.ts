import type { Service } from "./service";

export interface PortfolioItem {
  id: string;
  image: string;
  caption: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
}

export type MasterStatus = "active" | "unavailable";

export interface Master {
  id: string;
  name: string;
  district: string;
  styleTags: string[];
  avatar: string;
  status: MasterStatus;
  rating: number;
  reviewCount: number;
  bio: string;
  services: Service[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  availableSlots: string[];
}
