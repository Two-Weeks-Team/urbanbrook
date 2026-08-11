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

const title = "SILLÉANCE — 공간에서 만든 기억을 일상으로 | AgentBa.se";
const description =
  "Urbanbrook의 공간 경험을 향 기억, 제품 시스템, Persona Agent, 12주 파일럿으로 확장한 Two Weeks Team의 상세 인터랙티브 독립 제안입니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanbrook.agentba.se"),
  title,
  description,
  applicationName: "SILLÉANCE Interactive Proposal",
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
    siteName: "SILLÉANCE Interactive Proposal",
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
