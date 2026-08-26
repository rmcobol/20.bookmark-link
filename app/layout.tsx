import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BookmarkProvider } from "./_lib/bookmark-context";
import { FolderProvider } from "./_lib/folder-context";
import { bookmarks, folders } from "./_lib/mock-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookmark Link",
  description: "폴더별로 정리하는 나만의 북마크 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FolderProvider initialFolders={folders}>
          <BookmarkProvider initialBookmarks={bookmarks}>{children}</BookmarkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
