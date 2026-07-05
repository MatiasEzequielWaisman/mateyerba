import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Verde bosque — primary brand color
        forest: {
          50: "#EFF5F1",
          100: "#DCEAE1",
          200: "#B8D4C4",
          300: "#8FBBA4",
          400: "#5E9680",
          500: "#3D7561",
          600: "#2C5C4A",
          700: "#234A3C",
          800: "#1B3A2F",
          900: "#142B23",
          950: "#0C1B16",
          DEFAULT: "#1B3A2F",
        },
        // Verde oliva — secondary brand color
        olive: {
          50: "#F5F5E9",
          100: "#E9EACB",
          200: "#D2D49B",
          300: "#B7BB6E",
          400: "#9CA24C",
          500: "#7F8639",
          600: "#656B2D",
          700: "#4F5424",
          800: "#3D411C",
          900: "#2C2F14",
          DEFAULT: "#7F8639",
        },
        // Crema — base neutral warm background
        cream: {
          50: "#FFFEFC",
          100: "#FDFBF6",
          200: "#FAF6EC",
          300: "#F5EFDD",
          DEFAULT: "#FAF6EC",
        },
        // Beige — secondary neutral
        beige: {
          100: "#F4ECDA",
          200: "#EDE0C4",
          300: "#E2CFA4",
          400: "#D4B87E",
          DEFAULT: "#EDE0C4",
        },
        // Dorado / cobre — acento
        gold: {
          50: "#FBF3E7",
          100: "#F4E1C0",
          200: "#E9C68C",
          300: "#DDA95D",
          400: "#C98F45",
          500: "#C08A4E",
          600: "#A66E38",
          700: "#85572D",
          DEFAULT: "#C08A4E",
        },
        stone: {
          50: "#FAFAF8",
          100: "#F2F1EC",
          200: "#E4E2D9",
          300: "#CBC8BA",
          400: "#A6A192",
          500: "#7D786A",
          600: "#5C584D",
          700: "#45423A",
          800: "#302E29",
          900: "#1E1C19",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "#B3402C",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl": ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-lg": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["2.125rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["1.625rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        xs: "0.25rem",
        sm: "0.375rem",
        DEFAULT: "0.625rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgb(20 43 35 / 0.06)",
        card: "0 4px 20px -4px rgb(20 43 35 / 0.10)",
        elevated: "0 12px 40px -8px rgb(20 43 35 / 0.16)",
        premium: "0 24px 64px -12px rgb(20 43 35 / 0.22)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s cubic-bezier(0.22,1,0.36,1)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 1.6s infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
