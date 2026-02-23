import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider }    from "@/lib/i18n";
import BackgroundManager   from "@/components/BackgroundManager";
import Nav                 from "@/components/Nav";
import CursorBox           from "@/components/CursorBox";

export const metadata: Metadata = {
  title: {
    default:  "Jopalesi",
    template: "%s | Jopalesi",
  },
  description:
    "Jopalesi is a platform for curiosity, inquiry and critical exploration. " +
    "We meet weekly in Rīga, Latvia, and seek collaborations around open and accessible data.",
  keywords: [
    "Jopalesi", "Jopalesi Science", "research", "science", "Rīga", "Latvia",
    "collaboration", "open data", "critical exploration", "inquiry", "weekly meetings",
    "RAA.SPACE", "Matīsa iela",
  ],
  authors:  [{ name: "Jopalesi Science", url: "https://jopalesi.science" }],
  creator:  "Jopalesi Science",
  metadataBase: new URL("https://jopalesi.science"),
  alternates: {
    canonical: "https://jopalesi.science",
  },
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://jopalesi.science",
    siteName:    "Jopalesi",
    title:       "Jopalesi",
    description:
      "A platform for curiosity, inquiry and critical exploration. " +
      "Weekly meetings in Rīga, Latvia.",
    images: [
      {
        url:    "/social-icon.svg",
        width:  512,
        height: 512,
        alt:    "Jopalesi",
      },
    ],
  },
  twitter: {
    card:        "summary",
    title:       "Jopalesi",
    description:
      "A platform for curiosity, inquiry and critical exploration. " +
      "Weekly meetings in Rīga, Latvia.",
    images: ["/social-icon.svg"],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:  true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <I18nProvider>
          <BackgroundManager />
          <Nav />
          <CursorBox />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
