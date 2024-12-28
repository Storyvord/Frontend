import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/lib/react-query/ReactQueryClientProvider";
import UserContextProvider from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { getMessages } from "next-intl/server";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Storyvord",
  description: "WE HELP BRANDS AND FILMMAKERS TO SHOOT CONTENT WORLDWIDE",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = cookies().get("locale")?.value || "en"; // Default to "en" if no locale cookie
  const messages = await getMessages({ locale });

  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <UserContextProvider>
      <ReactQueryClientProvider>
        <html lang={locale}>
          <head>
            {/* Google tag (gtag.js) */}
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            ></Script>
            <Script id="gtag" strategy="lazyOnload">
              {`
               window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
                `}
            </Script>
          </head>

          <body className=" font-poppins">
            <NextIntlClientProvider messages={messages}>
              {children}
              <Toaster />
            </NextIntlClientProvider>
          </body>
        </html>
      </ReactQueryClientProvider>
    </UserContextProvider>
  );
}
