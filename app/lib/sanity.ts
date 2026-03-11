import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Read-only client for fetching data
export const client = createClient({
  projectId: "jasxwv4t",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Write client for creating/updating documents (server-side only)
export const writeClient = createClient({
  projectId: "jasxwv4t",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// News type matching Sanity schema
export interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
}

// Query for latest 3 news items (home page)
export const LATEST_NEWS_QUERY = `*[_type == "news"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  publishedAt,
  image
}`;

// Query for all news items (news page)
export const ALL_NEWS_QUERY = `*[_type == "news"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  image
}`;

// Query for single news item by slug
export const NEWS_BY_SLUG_QUERY = `*[_type == "news" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  body
}`;

// Fetch options with revalidation
export const fetchOptions = { next: { revalidate: 60 } };