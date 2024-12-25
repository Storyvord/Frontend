import Cookies from "js-cookie";
import english from "./locales/en/side-menu.json";
import hindi from "./locales/hi/side-menu.json";

export const getLanguageFromCookies = (): "english" | "hindi" => {
  const lang = Cookies.get("locale");
  return lang === "hi" ? "hindi" : "english"; // default to "english" if not "hi"
};

const translations = { english, hindi };

export const getLocalizedString = (key: string) => {
  const language = getLanguageFromCookies();
  const keys = key.split(".");
  let result: any = translations[language];

  // Traverse the object based on the split keys
  for (const k of keys) {
    if (!result[k]) {
      // Key not found, return original key or fallback
      return key;
    }
    result = result[k];
  }

  return result || key;
};
