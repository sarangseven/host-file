# Sarang S — Personal Portfolio

Live site: **[sarang.me.uk](https://sarang.me.uk)**

A fast, static, single-page portfolio for a sales professional moving into Product and Operations roles. The design is calm, credible and Apple-inspired: glass cards, soft depth, light/dark themes, and a signature animated footer.

## Features

- **Light and dark themes** — light by default, with a toggle (top-left) that remembers the visitor's choice.
- **Apple-style design system** — glass cards, 8px spacing rhythm, SF Pro first (Inter fallback), Space Mono accents, 44px touch targets and 4.5:1 minimum contrast.
- **Scroll reveals and section spy** — built on `IntersectionObserver`, with `prefers-reduced-motion` respected throughout.
- **Live IST clock** and availability line for US and UK time zones.
- **Signature crowd footer** — a walking crowd of 34 original caricature cut-outs crosses in two rows while the owner's photo stands perfectly still, in full colour. A faded burgundy "SARANG" watermark sits behind, and the animation pauses when off-screen.

## Tech stack

Plain HTML, CSS and JavaScript. No framework, no build step, no runtime dependencies.

| Concern | Approach |
| --- | --- |
| Fonts | Self-hosted WOFF2 (Inter, Space Mono); no third-party font requests |
| Images | WebP, kept small |
| Hosting | GitHub repository served through Cloudflare |
| Caching | Version query strings (`?v=`) on CSS, JS and crowd images |

## Project structure

```
.
├── index.html          # Page markup and metadata
├── style.css           # Styles, themes and animations
├── script.js           # Behaviour, links and crowd configuration
├── favicon.ico
└── assets/
    ├── fonts/          # Inter and Space Mono (WOFF2)
    ├── crowd/          # 34 caricature cut-outs (c01–c34.webp)
    ├── sarang.webp     # Footer portrait
    ├── avatar.webp     # Portrait
    ├── bengaluru.webp  # Location image
    ├── about.jpg       # About section image
    ├── og-image.jpg    # Social sharing preview
    └── …               # Favicons and web manifest
```

## Running locally

Open `index.html` in a browser, or serve the folder for a closer match to production:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customising

- **Links** — email, LinkedIn, Instagram, booking calendar and résumé are defined in the `LINKS` object at the top of `script.js`.
- **Images** — replace files in `assets/` using the same file names, and keep them as optimised WebP.
- **Crowd** — each cut-out's name, aspect ratio and relative height live in the table inside `script.js`. Use original artwork only.

## Deployment

1. Commit and push the changed files to the GitHub repository.
2. Cloudflare serves the updated site from the repository.
3. **Cache-busting:** whenever `style.css`, `script.js` or any crowd image changes, bump its `?v=` value in `index.html` so returning visitors don't see stale files.

## Credits and licence

Design and content © Sarang S. All rights reserved. The crowd cut-outs are original caricature-style illustrations; no third-party characters are used.

## Contact

[LinkedIn](https://www.linkedin.com/in/sarang-s-7b0133233) · [sarang.me.uk](https://sarang.me.uk)
