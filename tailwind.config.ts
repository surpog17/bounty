import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tech: {
          primary: '#0F172A',       // Dark Navy (background)
          secondary: '#1E293B',     // Slate Gray (cards, sections)
          accent: '#3B82F6',        // Sky Blue (buttons, links)
          highlight: '#22D3EE',     // Light Cyan (hover effects)
          text: '#F1F5F9',          // Primary Text
          muted: '#94A3B8',         // Muted Text
        },
      },
    },
  },
  plugins: [],
};

export default config;
