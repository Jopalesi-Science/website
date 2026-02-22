import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider }    from "@/lib/i18n";
import BackgroundManager   from "@/components/BackgroundManager";
import Nav                 from "@/components/Nav";
import CursorBox           from "@/components/CursorBox";

export const metadata: Metadata = {
  title: "Jopalesi",
  description: "—",
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
