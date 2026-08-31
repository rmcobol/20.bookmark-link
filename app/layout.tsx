import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BookmarkProvider } from "./_lib/bookmark-context";
import { FolderProvider } from "./_lib/folder-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = "폴더별로 정리하는 나만의 북마크 서비스";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "북마크 링크",
    template: "%s | 북마크 링크",
  },
  description,
  openGraph: {
    title: "북마크 링크",
    description,
    siteName: "북마크 링크",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/thumbnail.png", width: 2400, height: 1260 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "북마크 링크",
    description,
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FolderProvider>
          <BookmarkProvider>{children}</BookmarkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
