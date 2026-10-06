# Sultan Bouw & Renovatie

Website en API van **Sultan Bouw & Renovatie** — renovatiebedrijf in Amsterdam, actief tot 60 km daarbuiten.

## Opbouw

```
web/      Website (Astro + Tailwind CSS + GSAP/Lenis animaties)
  src/data/site.ts   ← alle bedrijfsgegevens, diensten, cijfers en FAQ op één plek
  src/pages/         ← pagina's (home, diensten, offerte, contact, privacy, 404)
  src/components/    ← onderdelen van de pagina's
server/   Express API: offerte- en contactformulier, reviews (MongoDB + Gmail SMTP)
```

De server serveert in productie de gebouwde website (`web/dist`) én de API op hetzelfde domein.

## Lokaal draaien

```bash
npm run setup                  # dependencies installeren
cp server/env.example.txt server/.env   # en invullen
npm run build                  # website bouwen
npm start                      # http://localhost:3000
```

Tijdens het ontwikkelen aan de website (met live herladen):

```bash
npm run dev:server   # API op :3000
npm run dev:web      # website op :4321 (API-calls gaan via proxy naar :3000)
```

> Let op: door het `&`-teken in de mapnaam werken `npx`/`.bin`-commando's op Windows niet.
> De scripts in `web/package.json` roepen Astro daarom direct via `node` aan.

## API

| Endpoint | Methode | Beschrijving |
|---|---|---|
| `/api/offerte` | POST (multipart) | Offerte-aanvraag met max. 5 foto's |
| `/api/contact` | POST (JSON) | Contactbericht |
| `/api/review` | POST (JSON) | Review (pas zichtbaar na goedkeuring via de links in de e-mail) |
| `/api/reviews/:id/approve` · `/delete` | GET/POST | Goedkeuren of verwijderen (ondertekende link) |
| `/api/reviews` | GET | Goedgekeurde reviews |
| `/api/health` | GET | Healthcheck |

Klanten kunnen een review achterlaten via `/review/` (deel die link na een klus).

Aanvragen worden gemaild naar `NOTIFICATION_EMAIL` (met foto's als bijlage) en — als er een database is — ook bewaard in MongoDB (`leads`).

## Deployen (Fly.io)

```bash
fly secrets set MONGODB_URI=... SMTP_HOST=smtp.gmail.com SMTP_PORT=465 SMTP_USER=... SMTP_PASS=... NOTIFICATION_EMAIL=... REVIEW_SECRET=... PUBLIC_URL=...
fly deploy
```
