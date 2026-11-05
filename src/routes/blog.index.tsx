import { createFileRoute } from "@tanstack/react-router";
import { BlogIndexPage } from "@/components/blog-content";
import { blogHead } from "@/lib/blog-meta";
export const Route = createFileRoute("/blog/")({ head: () => blogHead(), component: BlogIndexPage });