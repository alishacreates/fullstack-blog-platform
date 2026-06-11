import { Blog } from "../types/blog";

const API_BASE_URL = 'http://localhost:5000/api/blogs';

/* =========================
   CREATE BLOG
========================= */
export async function createBlog(data: Partial<Blog>) {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create blog');
  }

  return res.json();
}

/* =========================
   GET ALL BLOGS (ADMIN)
========================= */
export async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(API_BASE_URL, {
    cache: 'no-store', // admin needs fresh data
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  return res.json();
}

/* =========================
   GET BLOG BY ID
========================= */
export async function getBlogById(id: string): Promise<Blog> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blog');
  }

  return res.json();
}

/* =========================
   UPDATE BLOG
========================= */
export async function updateBlog(
  id: string,
  data: Partial<Blog>
) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update blog');
  }

  return res.json();
}

/* =========================
   DELETE BLOG
========================= */
export async function deleteBlog(id: string) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to delete blog');
  }

  return true;
}

