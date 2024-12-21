import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const locale = cookies().get("locale")?.value || "en"; // Default to "en" if no locale cookie

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
