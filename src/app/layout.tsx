import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/lib/react-query/ReactQueryClientProvider";
import UserContextProvider from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Storyvord",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <ReactQueryClientProvider>
        <html lang="en">
          <head>
            {/* Google tag (gtag.js) */}
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-M7P4WLNXPJ"></Script>
            <Script id="gtag" strategy="lazyOnload">
              {`
               window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-M7P4WLNXPJ');
                `}
            </Script>
          </head>

          <body className=" font-poppins">
            {children}
            <Toaster />
          </body>
        </html>
      </ReactQueryClientProvider>
    </UserContextProvider>
  );
}
