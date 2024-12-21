import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/lib/react-query/ReactQueryClientProvider";
import UserContextProvider from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Storyvord",
  description: "",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = cookies().get("locale")?.value || "en"; // Default to "en" if no locale cookie
  const messages = await getMessages({ locale });

  return (
    <UserContextProvider>
      <ReactQueryClientProvider>
        <html lang={locale}>
          <body className="font-poppins">
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
