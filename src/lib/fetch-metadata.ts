export type UrlMetadata = {
    title?: string;
    image_url?: string;
    source_domain: string;
}

export async function fetchUrlMetadata(url: string): Promise<UrlMetadata> {
    const source_domain = new URL(url).hostname;
    try {
        const res = await fetch(url, {
            redirect: 'follow',
            headers: {
                // basic UA helps some sites return OG tags
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36',
                accept: 'text/html,*/*',
            },
            // small timeout guard
            cache: 'no-store',
        });
        console.log("res-metadata", res);
        const html = await res.text();

        const og = (prop: string) =>
            html.match(new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'))?.[1];

        const metaName = (name: string) =>
            html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'))?.[1];

        const titleTag = html.match(/<title>([^<]+)<\/title>/i)?.[1];

        const title = og('og:title') || metaName('twitter:title') || titleTag || url;
        const image_url = og('og:image') || metaName('twitter:image');

        return { title, image_url, source_domain };
    } catch (err) {
        console.log("err - ", err);
        return { source_domain }
    }


}