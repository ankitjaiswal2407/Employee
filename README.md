# apaHR — Employee Leave Portal (Static)

This is a small static front-end demo (HTML/CSS/JS) for an employee leave portal.

Quick notes for Vercel deployment

1. This project is static — no build step required. The included `vercel.json` routes all requests to `index.html` so the app behaves as a single-page app.

2. To deploy:
   - Install the Vercel CLI: `npm i -g vercel` (optional) or use the Vercel dashboard.
   - From the project folder run: `vercel` and follow prompts.

3. Optional: If you want the logo and hero images to be bundled and not hotlinked, add them to an `assets/` folder and update the image `src` in `index.html` and `style.css`.

Mobile/Responsive notes

- Navigation collapses into a hamburger on small screens and opens into a dropdown.
- Header hides when scrolling down and reappears when scrolling up to increase reading space.
- Calendar switches to a horizontally-scrollable week view on small screens for comfortable date selection.

If you'd like, I can:
- Add local assets to avoid external hotlinks.
- Add a tiny build (e.g., with Parcel) if you plan to add a CSS preprocessor or bundler.
