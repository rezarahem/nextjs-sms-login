import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dana)'],
      },
    },
    fontWeight: {
      hairline: '10',
      thin: '100',
      ultralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '910',
      extrablack: '940',
      heavy: '980',
      fat: '1000',
    },
  },
  plugins: [],
};
export default config;
