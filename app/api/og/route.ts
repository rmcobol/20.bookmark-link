import { NextRequest, NextResponse } from "next/server";

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
};

function decodeHtmlEntities(value: string): string {
  return value.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x27;/g, (match) => HTML_ENTITIES[match]);
}

function extractMetaContent(html: string, keys: string[]): string | undefined {
  for (const key of keys) {
    const propertyFirst = new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]*content=["']([^"']*)["'][^>]*>`,
      "i",
    );
    const contentFirst = new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${key}["'][^>]*>`,
      "i",
    );

    const match = html.match(propertyFirst) ?? html.match(contentFirst);
    if (match?.[1]) return decodeHtmlEntities(match[1]);
  }
  return undefined;
}

function extractTitleTag(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1] ? decodeHtmlEntities(match[1].trim()) : undefined;
}

function isDisallowedHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (lower === "localhost" || lower.endsWith(".localhost")) return true;
  if (lower === "0.0.0.0" || lower === "::1") return true;

  const ipv4 = lower.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const a = Number(ipv4[1]);
    const b = Number(ipv4[2]);
    if (a === 127 || a === 10 || a === 0) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
  }

  return false;
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "url 쿼리 파라미터가 필요합니다." }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "올바르지 않은 URL입니다." }, { status: 400 });
  }

  if (
    (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") ||
    isDisallowedHost(parsedUrl.hostname)
  ) {
    return NextResponse.json({ error: "올바르지 않은 URL입니다." }, { status: 400 });
  }

  const fallback = {
    url: parsedUrl.toString(),
    title: parsedUrl.hostname,
    description: "",
    image: undefined as string | undefined,
  };

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BookmarkLinkBot/1.0)" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return NextResponse.json(fallback);
    }

    const html = await response.text();

    const title = extractMetaContent(html, ["og:title", "twitter:title"]) ?? extractTitleTag(html);
    const description = extractMetaContent(html, [
      "og:description",
      "twitter:description",
      "description",
    ]);
    const rawImage = extractMetaContent(html, ["og:image", "og:image:url", "twitter:image"]);
    const image = rawImage ? new URL(rawImage, parsedUrl).toString() : undefined;

    return NextResponse.json({
      url: parsedUrl.toString(),
      title: title || fallback.title,
      description: description ?? "",
      image,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
