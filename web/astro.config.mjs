import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Het adres van de live website. Zodra er een eigen domein is: SITE_URL instellen
// (bijv. in de Dockerfile/fly.toml) of hier aanpassen, en opnieuw bouwen.
const SITE = process.env.SITE_URL || 'https://sultan-bouw-renovatie.fly.dev';

export default defineConfig({
  site: SITE,
  integrations: [sitemap({ filter: (page) => !page.includes('/drukwerk/print/') })],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Tijdens `npm run dev` gaan API-calls naar de lokale Express-server
      proxy: { '/api': 'http://localhost:3000' },
    },
  },
});
