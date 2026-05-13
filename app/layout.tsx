import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteSettings } from "@/lib/actions";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.heroTitle || "Portfolio";
  const description = settings?.heroSubtitle || "Full-Stack Developer Portfolio";

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description,
    keywords: settings?.seoKeywords || ["Portfolio", "Developer", "Next.js"],
    authors: [{ name: "Yubraj Panday" }], // You might want to make this dynamic too
    openGraph: {
      title: title,
      description: description,
      type: "website",
      locale: "en_US",
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const socialLinks = settings?.socialLinks as { github?: string; linkedin?: string; twitter?: string } | null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yubraj Panday", // Dynamic if you add name to settings
    "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "jobTitle": "Full-Stack Engineer",
    "sameAs": [
      socialLinks?.github,
      socialLinks?.linkedin,
      socialLinks?.twitter
    ].filter(Boolean)
  }

  // @ts-ignore
  const styleSettings = settings?.styleSettings as {
    primaryColor?: string,
    backgroundColor?: string,
    textColor?: string,
    cardBackgroundColor?: string,
    cardBackgroundColorDark?: string,
    navbarColor?: string,
    navbarColorDark?: string
  } | null;

  const primaryColor = styleSettings?.primaryColor || "#3b82f6";
  const backgroundColor = styleSettings?.backgroundColor || "#f5f6f8";
  const textColor = styleSettings?.textColor || "#0f172a";

  // Defaults
  const cardBackgroundColor = styleSettings?.cardBackgroundColor || "#ffffff";
  const cardBackgroundColorDark = styleSettings?.cardBackgroundColorDark || "rgba(255, 255, 255, 0.05)";

  const navbarColor = styleSettings?.navbarColor || "rgba(255, 255, 255, 0.8)";
  const navbarColorDark = styleSettings?.navbarColorDark || "rgba(15, 23, 42, 0.8)";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary: ${primaryColor};
              --background: ${backgroundColor};
              --text-main: ${textColor};
              --card-bg: ${cardBackgroundColor};
              --navbar-bg: ${navbarColor};
            }
            .dark {
              --background: #101622; /* Default dark background, can be made dynamic too if requested */
              --text-main: #ffffff;
              --card-bg: ${cardBackgroundColorDark};
              --navbar-bg: ${navbarColorDark};
            }
          `
        }} />
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
