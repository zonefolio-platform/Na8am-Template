import axios from 'axios';
import { readFile } from 'fs/promises';
import { join } from 'path';

type TemplateData = {
    hero?: {
        name?: string;
        title?: string;
        image?: string;
        socialLinks?: Array<{
            name: string;
            url: string;
        }>;
    };
    about?: {
        bio?: string;
        skills?: string[];
        experience?: Array<{
            position: string;
            company: string;
            duration: string;
            description?: string;
        }>;
        education?: Array<{
            degree: string;
            university: string;
            from: string;
            to: string;
            GPA?: string;
        }>;
    };
    projects?: Array<{
        id: number;
        name: string;
        description?: string;
        image?: string;
        technologies?: string[];
        liveUrl?: string;
        githubUrl?: string;
    }>;
    contact?: {
        email: string;
        phone?: string;
        location?: string;
        whatsapp?: string;
        socialLinks?: Record<string, string>;
    };
};

/**
 * Fetch template data from API (server-side)
 * Supports both external URLs and local file paths
 */
export async function fetchTemplateData(): Promise<TemplateData> {
    const apiUrl = process.env.NEXT_PUBLIC_DATA_API_URL;

    if (!apiUrl) {
        console.warn('NEXT_PUBLIC_DATA_API_URL not set, returning empty data');
        return {};
    }

    try {
        // Handle local file paths (e.g., /fakeAPI.json)
        if (apiUrl.startsWith('/')) {
            const filePath = join(process.cwd(), 'public', apiUrl);
            const fileContent = await readFile(filePath, 'utf-8');
            return JSON.parse(fileContent) as TemplateData;
        }

        // Handle external URLs
        const response = await axios.get<TemplateData>(apiUrl, { timeout: 5000 });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch template data:', error);
        return {};
    }
}

export type { TemplateData };
