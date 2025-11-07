/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'off-white': '#FAFAF8',
        'cream': '#F7F3F0',
        'light-gray': '#E8E6E1',
        'medium-gray': '#9B9691',
        'charcoal': '#2C2926',
        'rich-black': '#1A1815',
        'gold': '#C9A961',
        'gold-light': '#E4D4A8',
        'gold-dark': '#9C7F3E',
        'burgundy': '#6B2737',
        'navy': '#1E3A5F',
        // Legacy colors for compatibility
        'luxury-cream': '#F7F3F0',
        'luxury-charcoal': '#2C2926',
        'luxury-slate': '#9B9691',
        'cigar-gold': '#C9A961',
        'cigar-copper': '#B87333',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
