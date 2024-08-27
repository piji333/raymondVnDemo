import { defineConfig } from 'astro/config';

import relativeLinks from "astro-relative-links";

// https://astro.build/config
export default defineConfig({
  site: 'https://piji333.github.io/raymondVnDemo',
  // base: '',
  integrations: [relativeLinks()]
});