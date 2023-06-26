/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        resp: "768px",
      },
      colors: {
        primaryBlue: "hsl(238, 40%, 52%)",
        primaryRed: "hsl(358, 79%, 66%)",
        primaryGray: "hsl(239, 57%, 85%)",
        primaryPaleRed: "hsl(357, 100%, 86%)",
        "base-100": "hsl(0, 0%, 100%)",
        "base-200": "hsl(228, 33%, 97%)",
        "base-300": "hsl(223, 19%, 93%)",
        "base-400": "hsl(211, 10%, 45%)",
        "base-500": "hsl(212, 24%, 26%)",
        loading: "theme(colors.base-200)",
      },
      gridTemplateColumns: {
        sendReplyDesktop: "max-content 1fr min-content",
        commentDesktop: "max-content 1fr max-content",
      },
      gridTemplateRows: {
        commentDesktop: "max-content 1fr max-content",
      },
    },
  },
  plugins: [],
};
