"use client";

import BlogForm from "@/components/BlogForm";

export default function NewBlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <BlogForm mode="new" />
    </main>
  );
}
