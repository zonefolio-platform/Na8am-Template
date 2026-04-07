import type { Metadata } from "next";
import type { TemplateData } from "@/types/template";

/**
 * Generate metadata from template data
 * Creates SEO-optimized metadata for the portfolio
 */
export function generateMetadataFromData(data: TemplateData): Metadata {
    // Extract data with fallbacks
    const name = data?.hero?.name || 'Portfolio Template';
    // const title = data?.hero?.title || 'Professional & Modern';
    const bio = data?.about?.bio || 'A beautiful, responsive portfolio template built with Next.js, Tailwind CSS, and modern web technologies. Perfect for showcasing your work professionally.';

    // Generate professional page title
    const pageTitle = `${name} `;

    // Use bio as description (truncate if too long)
    const description = bio.length > 160
        ? bio.substring(0, 157) + '...'
        : bio;

    return {
        title: pageTitle,
        description,
        keywords: ['portfolio', 'template', 'next.js', 'tailwind', 'responsive', 'modern'],
        authors: [{ name }],
        creator: name,
        openGraph: {
            type: 'website',
            locale: 'en_US',
            title: pageTitle,
            description,
            siteName: name,
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: 'google-site-verification',
        },
    };
}
