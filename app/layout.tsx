import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_KR({
  variable: "--font-sans-kr",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const serif = Noto_Serif_KR({
  variable: "--font-serif-kr",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const title = "SILLÉANCE — Urbanbrook을 위한 독립 향 기억 콘셉트 | AgentBa.se";
const description =
  "Two Weeks Team이 독립적으로 작성한 비공식 향·공간·웰니스 콘셉트 제안입니다. Urbanbrook의 공식 사이트나 확정 프로그램이 아닙니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanbrook.agentba.se"),
  title,
  description,
  applicationName: "Urbanbrook Scent Memory Concept",
  authors: [{ name: "Two Weeks Team · AgentBa.se" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "Urbanbrook Scent Memory Concept",
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "공간에서 만든 기억을, 일상으로. 움직이는 향의 결 가운데 고요한 세라믹 오브제",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f1ede3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
