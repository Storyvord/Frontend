import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const locale = cookies().get("locale")?.value || "en"; // Default to "en" if no locale cookie

  // return {
  //   locale,
  //   messages: (await import(`./locales/${locale}.json`)).default,
  // };

  // Dynamically import all JSON files for the current locale
  const commonMessages = (await import(`./locales/${locale}/common.json`)).default;
  const homeMessages = (await import(`./locales/${locale}/home.json`)).default;
  const authMessages = (await import(`./locales/${locale}/auth.json`)).default;

  // Merge all messages into a single object
  const messages = {
    ...commonMessages,
    ...homeMessages,
    ...authMessages,
  };

  return {
    locale,
    messages,
  };
});
