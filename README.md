# Love Joy Angeles Itable — Personal Portfolio

A responsive, single-page portfolio made with **HTML, CSS, and vanilla JavaScript**. No build tools are required.

## How to run

1. Open `index.html` in a web browser, or use the **Live Server** extension in VS Code.
2. Optionally deploy these files to GitHub Pages, Netlify, or Vercel.

## Attendify integration

- Attendify appears under All projects and Management. Its card and native details dialog link to the GitHub source.
- In `script.js`, keep `PROJECTS.attendance.demo` as `null` until deployment. Set it to the production HTTPS URL to enable Open Live System in both locations. Local/private-network URLs remain hidden.
- Run `node --check script.js` and `node --check mini-systems.js` from this folder.
- Use VS Code Live Server on `index.html`. Check all filters, all four dialogs, Tab/Shift+Tab focus containment, Escape and close-button dismissal, focus returning to the opener, themes, mobile navigation, CV links, and GitHub copy/toast. Inspect DevTools Console and check widths of 320, 390, 768, and 1440 pixels.
- Deploy only this portfolio: commit and push these files to the Git repository connected to the existing Vercel portfolio project. Keep its Root Directory pointed at `lovejoy_portfolio` if this folder is inside the repository, with no build command for this static site. Review the preview deployment before promoting to production. Attendify requires its own PHP/Laravel hosting.

## What's included

- Responsive dark/light themes with saved preferences
- Smooth section animations and scroll indicator
- Collapsible mobile navigation
- Filterable project gallery
- Interactive project detail popups
- GitHub copy button
- Accessible keyboard controls and reduced-motion support

## Make it yours

- **Your introduction, education, and journey:** edit `index.html`.
- **Projects:** edit the project cards in `index.html` and the matching `PROJECTS` object in `script.js`.
- **Your GitHub URL/username:** search `eljayyit17-afk` in `index.html` and `script.js` and replace it if needed.
- **Colors, layout, fonts:** edit the theme variables at the top of `styles.css`.
- **Developer profile:** the hero uses a text-based profile terminal; no portrait asset is required.
- **Contact information:** email, GitHub, and Facebook links are in `index.html`.
- **Project visuals:** e-Kalinga uses a labelled feature map, not an actual system screenshot. No project screenshot assets are included.

### Notes

This site prominently features **e-Kalinga, our BSIT capstone project developed for the Solo Parent Department of Mandaluyong City**, along with Attendance Monitoring System, Visitor Log System, and Big Five Personality Test. Some project descriptions are deliberately general so no unsupported features are claimed.

Built for Love Joy Angeles Itable · Updated October 2026.

## Latest updates
- Database skills: MySQL, MariaDB, PostgreSQL, phpMyAdmin.
- Contact: itablelove@gmail.com, Facebook: https://www.facebook.com/lovejoy.itable

## Design and interaction
- Layout and dark/light design tokens live in styles.css; playground components live in mini-systems.css.
- Mobile navigation, project filters, native detail dialogs, and reduced-motion support are retained.
- Inventory, tasks, and grade demos preserve browser data; deletion offers a 10-second Undo action.
- CV viewing and downloading use the included PDF directly.
- No build step or additional dependencies are required.

## Motion
- `motion.css` owns hero entrances, theme-aware background orbs, card hover effects, button interactions, and reveal transitions.
- The existing `.reveal` observer uses sibling delays capped at 240 ms. Reveal translation is separate from hover transforms.
- Background motion can be paused in the hero; its setting is saved independently of the color theme. Orbs pause while off-screen or while the browser tab is hidden.
- Reduced-motion preferences apply on load and when changed while the page is open.
- The scroll progress bar uses a transform instead of changing its width.
