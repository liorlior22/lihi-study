import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lihi Last Test — הדרך שלך להצליח",
  description: "סביבת הלמידה והמבחנים האישית של ליהי",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
