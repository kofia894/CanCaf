import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CanCAF (Cancer Care Africa Foundation), our mission to strengthen cancer care , our origin story, values, and the team behind our work.",
  openGraph: {
    title: "About CanCAF - Cancer Care Africa Foundation",
    description: "Learn about our mission to strengthen cancer care , our origin story, values, and the team behind our work.",
    images: ["/home/home2.webp"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
