import axios from 'axios';
import RedisClient from '@/lib/redis';

export async function GET(req: Request) {
    const origin = req.headers.get('origin') || "";

    const redis = RedisClient.redis;
    
    const cookie = req.headers.get('cookie') || '';
    const url = new URL(req.url);
    const cursor_string = url.searchParams.get('cursor_string') ?? '';
    if (cookie && !cookie.includes('osu_session')) {
        const cacheKey = `osu_search:browse${cursor_string? `:${cursor_string}` : ''}`;
        // Use slave for read operations
        const cached = await redis.get(cacheKey);
        if (cached) {
            return new Response(cached, {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': origin,
                },
            });
        }
        const createUrl = new URL('https://osu.ppy.sh/beatmapsets/search');
        if (cursor_string) {
            createUrl.searchParams.set('cursor_string', cursor_string);
        }
        const osuRes = await axios.get(createUrl.toString(), {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        });
        const data = osuRes.data;
        // Use master for write operations
        await redis.set(cacheKey, JSON.stringify(data), 'EX', 60 * 30); // 30 min cache
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin,
            },
        });
    }

    const query = url.searchParams.get('q') ?? '';
    const e = url.searchParams.get('e') ?? '';
    const c = url.searchParams.get('c') ?? '';
    const g = url.searchParams.get('g') ?? '';
    const l = url.searchParams.get('l') ?? '';
    const m = url.searchParams.get('m') ?? '';
    const nsfw = url.searchParams.get('nsfw') ?? '';
    const played = url.searchParams.get('played') ?? '';
    const r = url.searchParams.get('r') ?? '';
    const sort = url.searchParams.get('sort') ?? '';
    const s = url.searchParams.get('s') ?? '';
    const full_query =
        "q=" + encodeURIComponent(query) +
        "&e=" + encodeURIComponent(e) +
        "&c=" + encodeURIComponent(c) +
        "&g=" + encodeURIComponent(g) +
        "&l=" + encodeURIComponent(l) +
        "&m=" + encodeURIComponent(m) +
        "&nsfw=" + encodeURIComponent(nsfw) +
        "&played=" + encodeURIComponent(played) +
        "&r=" + encodeURIComponent(r) +
        "&sort=" + encodeURIComponent(sort) +
        "&s=" + encodeURIComponent(s) +
        "&cursor_string=" + encodeURIComponent(cursor_string);

    const cacheKey = `osu_search:${full_query}`;
    // Use slave for read operations
    const cached = await redis.get(cacheKey);
    if (cached) {
        return new Response(cached, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin,
            },
        });
    }

    const osuRes = await axios.get(`https://osu.ppy.sh/beatmapsets/search?${full_query}`, {
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
    });
    const data = osuRes.data;

    // Use master for write operations
    await redis.set(cacheKey, JSON.stringify(data), 'EX', 60 * 5); // 5 min cache

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
        },
    });
}
