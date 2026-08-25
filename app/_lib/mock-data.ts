import type { Bookmark, Folder } from "./types";

export const folders: Folder[] = [
  { id: "dev", name: "개발", count: 3 },
  { id: "design", name: "디자인", count: 2 },
  { id: "reading", name: "읽을거리", count: 2 },
];

export const bookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Next.js의 공식 문서, App Router와 최신 기능을 설명합니다.",
    folderId: "dev",
  },
  {
    id: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 우선 CSS 프레임워크 공식 사이트입니다.",
    folderId: "dev",
  },
  {
    id: "3",
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    description: "타입스크립트 공식 핸드북 문서입니다.",
    folderId: "dev",
  },
  {
    id: "4",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "디자이너들을 위한 영감 공유 플랫폼입니다.",
    folderId: "design",
  },
  {
    id: "5",
    title: "Figma",
    url: "https://figma.com",
    description: "협업 인터페이스 디자인 툴입니다.",
    folderId: "design",
  },
  {
    id: "6",
    title: "Overreacted",
    url: "https://overreacted.io",
    description: "Dan Abramov의 개발 블로그입니다.",
    folderId: "reading",
  },
  {
    id: "7",
    title: "Refactoring UI",
    url: "https://www.refactoringui.com",
    description: "개발자를 위한 UI 디자인 실전 가이드입니다.",
    folderId: "reading",
  },
];
