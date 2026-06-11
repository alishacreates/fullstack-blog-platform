// src/lib/api.ts (or wherever this file lives)

import { Product } from "@/types/blog";

// ---------------- PRODUCTS ----------------

const PRODUCT_API_URL = "http://localhost:5000/api/products";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(PRODUCT_API_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${PRODUCT_API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

// ---------------- BLOGS ----------------

const BLOG_API_URL = "http://localhost:5000/api/blogs";

export interface BlogComment {
  id: number | string;
  author: string;
  text: string;
  createdAt: string;
}

export interface BlogDetail {
  title: string;
  category: string;
  description: string;
  image: string;
  author: string;
  date: string; // formatted date string
  slug: string;
  content: string;
  likes?: number;
  comments?: BlogComment[];
}

/**
 * Fetch a single blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<any> {
  const res = await fetch(`${BLOG_API_URL}/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

/**
 * Like / unlike a blog.
 * Assume backend returns { likes: number, userHasLiked: boolean }
 */
export async function likeBlog(slug: string): Promise<{
  likes: number;
  userHasLiked?: boolean;
}> {
  const res = await fetch(`${BLOG_API_URL}/slug/${slug}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ action: "toggle" }) // if your backend needs it
  });

  if (!res.ok) {
    throw new Error("Failed to like blog");
  }

  return res.json();
}

/**
 * Add a comment to a blog.
 * Assume backend returns the created comment.
 */
export async function addBlogComment(slug: string, text: string) {
  const res = await fetch(`${BLOG_API_URL}/slug/${slug}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Comment API error:", res.status, errorBody); // 👈 log details
    throw new Error("Failed to add comment");
  }

  return res.json(); // created comment
}