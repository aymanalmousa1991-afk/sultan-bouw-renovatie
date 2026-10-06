/**
 * Maakt drukklare PDF's, previews en de deelafbeelding (og-image) van de printpagina's.
 *
 * Gebruik:
 *   1. npm run build            (bouwt de site, incl. /drukwerk/print/…)
 *   2. start de server           (node ../server/index.js → http://localhost:3000)
 *   3. node scripts/drukwerk.mjs
 *   4. npm run build            (neemt de nieuwe bestanden mee in de site)
 *
 * Opties via omgevingsvariabelen: BASE_URL (standaard http://localhost:3000)
 * en BROWSER_PATH (standaard Microsoft Edge).
 */
import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const BROWSER = process.env.BROWSER_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PUBLIC = fileURLToPath(new URL('../public/', import.meta.url));
const OUT = PUBLIC + 'downloads/';
const BLEED_PX = (3 * 96) / 25.4; // 3 mm afloop in CSS-pixels

const jobs = [
  { path: '/drukwerk/print/visitekaartje/', pdf: 'sultan-bouw-visitekaartje.pdf', width: '91mm', height: '61mm', previews: ['visitekaartje-voorkant', 'visitekaartje-achterkant'] },
  { path: '/drukwerk/print/flyer/', pdf: 'sultan-bouw-flyer-a5.pdf', width: '154mm', height: '216mm', previews: ['flyer-voorkant', 'flyer-achterkant'] },
];

await mkdir(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: BROWSER, headless: true });
const page = await browser.newPage();

for (const job of jobs) {
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 3 });
  await page.goto(BASE + job.path, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Drukklare PDF (met 3 mm afloop)
  await page.pdf({ path: OUT + job.pdf, width: job.width, height: job.height, printBackground: true, preferCSSPageSize: true });

  // Previews zonder afloop (zoals het kaartje er na het snijden uitziet)
  const sheets = await page.$$('.sheet');
  for (const [i, sheet] of sheets.entries()) {
    const box = await sheet.boundingBox();
    await page.screenshot({
      path: OUT + job.previews[i] + '.jpg',
      type: 'jpeg',
      quality: 88,
      clip: { x: box.x + BLEED_PX, y: box.y + BLEED_PX, width: box.width - 2 * BLEED_PX, height: box.height - 2 * BLEED_PX },
    });
  }
  console.log('✓', job.pdf, '+', job.previews.length, 'previews');
}

// Deelafbeelding voor social media en Google
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(BASE + '/drukwerk/print/og/', { waitUntil: 'networkidle0' });
await page.evaluateHandle('document.fonts.ready');
const og = await page.$('.sheet');
await og.screenshot({ path: PUBLIC + 'og-image.jpg', type: 'jpeg', quality: 86 });
console.log('✓ og-image.jpg');

await browser.close();
