// postcss.config.mjs
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindcssPostcss from '@tailwindcss/postcss'; // Import gói mới

export default {
  plugins: {
    tailwindcss: tailwindcssPostcss, // Sử dụng gói mới
    autoprefixer: {},
  },
};