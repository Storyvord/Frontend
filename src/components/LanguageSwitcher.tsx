"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSwitcher = () => {
  const router = useRouter();

  const handleChangeLanguage = (locale: string) => {
    Cookies.set("locale", locale); // Store locale in a cookie
    router.refresh(); // Trigger a re-render with the new locale
  };

  return (
    <Select
      onValueChange={(locale) => handleChangeLanguage(locale)} // Listen to value changes
      defaultValue={Cookies.get("locale") || "en"} // Default to the stored locale or fallback to "en"
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिंदी</SelectItem>
        {/* <SelectItem value="zh-CN">中国</SelectItem> */}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
