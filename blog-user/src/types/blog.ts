import { ReactNode } from "react";

// types/blog.ts
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  affiliateLink: string;
  status: 'Draft' | 'Published';
  category?: string;
  createdAt?: string;
}
