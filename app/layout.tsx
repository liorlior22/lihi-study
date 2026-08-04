import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lihi Study — מערכת לימוד והכנה לבחינות",
  description: "סביבת לימוד אישית בעברית: חומרי מקור, תרגול, מבחנים ומעקב התקדמות.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
