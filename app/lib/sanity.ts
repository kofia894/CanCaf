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

// Gallery image type
export interface GalleryImage {
  _key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asset: any;
  caption?: string;
  alt?: string;
}

// News type matching Sanity schema
export interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  gallery?: GalleryImage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
}

// Query for latest 3 news items (home page)
export const LATEST_NEWS_QUERY = `*[_type == "news"] | order(order asc)[0...3]{
  _id,
  title,
  slug,
  publishedAt,
  image
}`;

// Query for all news items (news page)
export const ALL_NEWS_QUERY = `*[_type == "news"] | order(order asc){
  _id,
  title,
  slug,
  publishedAt,
  image
}`;

// Query for paginated news items
export const PAGINATED_NEWS_QUERY = `*[_type == "news"] | order(order asc)[$start...$end]{
  _id,
  title,
  slug,
  publishedAt,
  image
}`;

// Query for total news count
export const NEWS_COUNT_QUERY = `count(*[_type == "news"])`;

// Query for single news item by slug
export const NEWS_BY_SLUG_QUERY = `*[_type == "news" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  gallery[]{
    _key,
    asset,
    caption,
    alt
  },
  body
}`;

// Fetch options with revalidation
export const fetchOptions = { next: { revalidate: 60 } };

// Site Settings type
export interface SiteSettings {
  cgcponApplicationsOpen: boolean;
  cgcponClosedMessage: string;
  cgcponRegistrationFee: number;
}

// Query for site settings (singleton document)
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  cgcponApplicationsOpen,
  cgcponClosedMessage,
  cgcponRegistrationFee
}`;

// Fetch site settings with shorter revalidation for quick updates
export const settingsFetchOptions = { next: { revalidate: 10 } };