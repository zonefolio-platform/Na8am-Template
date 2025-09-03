import axios from 'axios';

export default async function fetcher(url: string) {
    const res = await axios.get(url, { timeout: 5000 });
    return res.data;
}