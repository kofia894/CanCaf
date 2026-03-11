import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Applications Opening Soon - CGCPON Africa',
  description: 'CGCPON Africa applications are currently closed. Stay updated for future application periods for the Cancer Genetic Counselling Certificate Programme.',
  openGraph: {
    title: 'Applications Opening Soon - CGCPON Africa',
    description: 'CGCPON Africa applications are currently closed. Check back soon for future application periods.',
    images: ['/home/capacitybuilding.webp'],
  },
}

export default function ApplicationsClosedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
