import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      opacity: {
        disabled: "0.5",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, #012284 0%, #08477E 23%, #1AA36E 73%, #25D865 100%)",
      },
      colors: {
        "bg-color-2": "rgba(245, 245, 245, 1)",
        "text-color-1": "rgba(17, 17, 17, 1)",
        "text-color-2": "rgba(17, 17, 17, 0.5)",
        shark: {
          950: "#212529",
        },
        congress: {
          800: "#023e8a",
        },
        "blue-gray": {
          100: "rgb(255 255 255 / var(--tw-bg-opacity))",
          600: "rgb(84 110 122 / var(--tw-text-opacity))",
          900: "rgb(38 50 56 / var(--tw-text-opacity))",
        },
        chatbot: {
          color1: "#22CB67",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          "1": "#FFFFFF",
          "2": "#0A0A41",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          green: "#22CB67",
          main: "#111111",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        iconButton: {
          DEFAULT: "hsl(var(--iconButton))",
          foreground: "hsl(var(--iconButton-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        sans_serif: ["Josefin Sans"],
        barlow: ["Barlow"],

        josefin: ["Josefin Sans"],
        "barlow-2": ["Barlow Condensed"],

        "Josefin-Sans": ["Josefin Sans"],
        jacquard: ["Jacquard 12"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: { "3xl": "0 35px 60px -15px green" },
      screens: {
        xxs: "325px",
        xsm: "400px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontWeight: {
        thin: "100", // Poppins Thin
        extralight: "200", // Poppins ExtraLight
        light: "300", // Poppins Light
        normal: "400", // Poppins Regular
        medium: "500", // Poppins Medium
        semibold: "600", // Poppins SemiBold
        bold: "700", // Poppins Bold
        extrabold: "800", // Poppins ExtraBold
        black: "900", // Poppins Black
      },
      fontSize: {
        "heading-1": ["32px", { fontWeight: "500" }], // Poppins Medium
        "heading-2": ["24px", { fontWeight: "600" }], // Poppins SemiBold
        "heading-3": ["16px", { fontWeight: "600" }], // Poppins SemiBold
        "paragraph-1": ["20px", { fontWeight: "600" }], // Poppins SemiBold
        "paragraph-2-medium": ["16px", { fontWeight: "500" }], // Poppins Medium
        "paragraph-2-regular": ["16px", { fontWeight: "400" }], // Poppins Regular
        "paragraph-3-medium": ["12px", { fontWeight: "500" }], // Poppins Medium
        "paragraph-3-regular": ["12px", { fontWeight: "400" }], // Poppins Regular
        "paragraph-3-small-medium": ["10px", { fontWeight: "500" }], // Poppins Medium
        "paragraph-3-small-regular": ["10px", { fontWeight: "400" }], // Poppins Regular
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, any>, variants?: string[]) => void;
    }) {
      const newUtilities = {
        ".font-poppins-thin": {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "100",
        },
        ".font-poppins-extralight": {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "200",
        },
        ".font-poppins-light": {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "300",
        },
        ".font-poppins-normal": {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "400",
        },
        ".font-poppins-medium": {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "500",
        },
        ".font-poppins-semibold": {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "600",
        },
        ".font-poppins-bold": {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "700",
        },
        ".font-poppins-extrabold": {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "800",
        },
        ".font-poppins-black": {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "900",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;
