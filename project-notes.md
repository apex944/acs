# ACS Site Project Notes

## Root

- Project root: `C:\Users\apex\Documents\@Code\ACS Site`
- Preferred asset structure:
  - `assets/css/`
  - `assets/js/`
  - `assets/img/`
  - `assets/fonts/`

## Current Page Structure

- Home: `index.html`
- About: `about/index.html`
- Contact: `Contact/index.html`
- Sales: `catemp/index.html`
- MCS landing: `mcs/index.html`
- MCS FAQ: `mcs/mcs_faq.html`
- MCS product page: `mcs/mcs_page_editable.html`
- ProductInfo section:
  - `ProductInfo/index.html`
  - `ProductInfo/ProductInfo.html`
  - `ProductInfo/stud_info.html`
  - `ProductInfo/stud_features.html`
  - `ProductInfo/stud_install.html`
  - `ProductInfo/stud_dealer.html`
  - `ProductInfo/stud_landing.html`

## Naming / URL Conventions

- Root-relative links are preferred.
- Lowercase normalization is still pending.
- Before pushing with GitHub, do a case-standardization pass on folders/files/asset names.

## Shared Design / Typography

- Shared site font direction: `Instrument Sans, sans-serif`
- Shared nav accent blue: `#2074e6`
- Shared page body color: `#242424`
- Shared page title color: `#242424`
- All current and future pages should include `<link rel="icon" type="image/png" href="/assets/img/favico.png">` in the document head.

## Footer

- Preferred footer is the newer shared footer used across current active pages.
- Social links currently in use:
  - Instagram: `https://www.instagram.com/touringcarparts/`
  - Facebook: `https://www.facebook.com/apexcompetitionsystems`
  - X: `https://x.com/ApexCompetition`
- Placeholder / future socials may still exist for other networks.

## MCS Reference Pattern

These MCS pages are the reference for broader site alignment:

- `mcs/mcs_faq.html`
- `mcs/mcs_page_editable.html`

Target content band width pattern:

- Desktop: `width: calc(100% - 120px); max-width: 1600px; margin-left/right: auto;`
- Mobile: `width: calc(100% - 30px); max-width: 1600px;`

## MCS Nav

- `Suspensions` is the current top-nav label.
- Submenu items under `Suspensions`:
  - `Rebuilds` -> `/mcs/rebuilds/`
  - `Damper FAQ` -> `/mcs/mcs_faq.html`
  - `Dampers 101` -> `/mcs/dampers-101/`
- Dead links are acceptable for now.
- Submenu style:
  - text-only
  - no box
  - blue underline on hover/current
  - drops straight down from `Suspensions`
  - click should hold it open

## Shared Nav / Mobile Drawer

- Shared nav assets:
  - `assets/css/site-shared.css`
  - `assets/js/site.js`
- Shared-layout pages use the newer hamburger drawer.
- MCS pages use their own nav markup/CSS/JS overrides but are visually aligned with the shared pattern.

## ProductInfo Notes

- ProductInfo pages were moved to the new header/footer pattern.
- Backgrounds should be white.
- Header menu should be centered.
- Legacy `products_title.gif` was removed and replaced with spacing.
- Product submenus were restyled to match current nav direction.

## Content / Working Preferences

- Focus changes on structure, layout, assets, and code unless content edits are explicitly requested.
- User is comfortable handling site content and visual direction.
- Keep notes updated when major structural decisions change.

## Last Major Work

- Added `Suspensions` submenu support to shared nav and MCS nav.
- Renamed `mcs_help_page.html` to `mcs_faq.html` and updated active links.
- Standardized more pages around shared typography and footer behavior.
