---
name: sportbot-design-skill
description: Human-crafted, anti-template visual design skill for refining the SportBot website without changing functionality.
---

# Skill: Human-Crafted Product Design (SportBot)

## Purpose
Design and refine SportBot as a credible, distinctive fitness product. Improve visual design and user experience without changing product behavior. The result should feel art-directed by a thoughtful human designer—not like a generic AI-generated SaaS template.

## Project context
- Product: SportBot, a Telegram bot for recording workouts, tracking progress, viewing charts, and motivation.
- Existing visual identity: near-black backgrounds, warm orange primary actions, violet brand accent, white typography, fitness photography, Telegram-style product preview.
- Existing project: HTML, CSS, and JavaScript. Treat the current repository as the source of truth; inspect it before making changes.
- User constraint: **design only**. Do not rewrite the app, change business logic, alter Telegram integrations, change translations/content meaning, or remove working features.

## Core design principles

### 1. Human art direction, not “AI slop”
Avoid the familiar generated-landing-page look:
- No endless sequence of identical rounded cards.
- No gratuitous glassmorphism, neon glows, gradient blobs, floating orbs, or decorative grids.
- No random gradient text, oversized headings everywhere, or excessive pill badges.
- No generic stock-photo collage used as decoration without a clear composition.
- No fake product metrics, testimonials, user counts, awards, or claims.
- No animation added merely because it is easy.

Instead:
- Establish a clear visual hierarchy and a small number of deliberate focal points.
- Use asymmetry, varied section compositions, meaningful whitespace, and controlled density.
- Prefer solid surfaces, subtle borders, restrained shadows, and purposeful contrast.
- Use real product screenshots/assets already in the repository where possible.
- Let typography, spacing, image cropping, and layout do most of the design work.
- Make every visual effect explainable by a product or usability purpose.

### 2. Preserve the SportBot identity
- Keep the black / charcoal foundation, orange primary action color, and violet brand accent.
- Orange is for primary actions and important highlights—not every border or heading.
- Violet is a supporting brand accent—not a competing primary color.
- Maintain sufficient contrast in both light and dark themes if both are already supported.
- Do not introduce a new color palette without a strong reason.

### 3. Typography
- Use a deliberate type scale with a limited number of sizes and weights.
- Avoid making every heading huge. Hero heading should be prominent but must not overwhelm the product preview.
- Keep paragraph line lengths comfortable, especially on desktop.
- Ensure Ukrainian and English text both fit naturally; do not hard-code layouts that only work for one language.
- Preserve the current font unless there is a clear technical and visual reason to change it. Do not add external font dependencies casually.

### 4. Layout and composition
- Each section should have its own composition while still belonging to one system.
- Avoid repeating the exact same card grid in every section.
- Use consistent content widths, alignment rules, spacing rhythm, and section transitions.
- Give the product itself visual priority: show what SportBot does, not only decorative fitness imagery.
- Use background photography carefully: preserve legibility with considered crop, overlays, and focal placement.
- Avoid arbitrary section heights and excessive empty space.

### 5. Responsive design
Check at minimum these viewport widths: 360, 390, 430, 768, 1024, 1280, and 1440 px.
- Mobile must be intentionally designed, not merely a compressed desktop layout.
- Prevent fixed/sticky controls from covering content or other controls.
- Respect safe-area insets on mobile devices.
- Check text wrapping, button widths, navigation overflow, image crops, and touch target sizes.
- Do not hide important product information on mobile just to simplify layout.
- Check both Ukrainian and English strings for wrapping and overflow.

### 6. Motion and interaction
- Motion should clarify state or guide attention, not decorate every element.
- Prefer short, subtle transitions; respect `prefers-reduced-motion`.
- Avoid scroll-jacking, constant movement, exaggerated parallax, and distracting loops.
- Preserve all existing interactions and their semantics.
- Hover effects must have equivalent focus/active feedback for keyboard and touch users.

### 7. Accessibility and usability
- Maintain readable contrast and visible keyboard focus.
- Do not communicate state through color alone.
- Keep controls easy to identify and tap.
- Ensure sticky elements do not obscure focus targets or page content.
- Preserve semantic structure and accessible labels.

## Mandatory workflow

### Phase 1 — Inspect before editing
1. Read the project structure and identify the actual entry point, stylesheets, scripts, assets, breakpoints, theme handling, language handling, and shared components.
2. Inspect the full page section by section. Do not rely only on the first screen or screenshots.
3. Identify inline styles, utility classes, duplicated selectors, cascade overrides, and existing responsive rules.
4. Map each proposed visual change to the existing selectors/components.
5. Separate visual issues from functional issues. Do not “fix” functional issues under this design-only task.

### Phase 2 — Plan
Create a short audit with:
- Current strengths worth preserving.
- Visual inconsistencies and responsive defects.
- Prioritized changes: critical, high, medium, polish.
- Exact files/selectors likely to change.
- Risks to existing behavior.

Do not begin broad styling changes until this plan is clear.

### Phase 3 — Implement conservatively
1. Prefer editing existing CSS and adding a clearly named, maintainable design layer only where it is safer.
2. Do not append endless override blocks. Consolidate conflicting rules when safe and explain what was consolidated.
3. Do not alter JavaScript, APIs, data, event handlers, IDs, `data-*` attributes, form names, or integration logic.
4. Do not change content meaning, pricing, metrics, testimonials, links, or calls to action.
5. Do not remove sections or assets unless explicitly authorized.
6. Avoid adding dependencies, icon libraries, web fonts, or external assets unless essential and approved.
7. Preserve theme switching and language switching.
8. Keep CSS readable, scoped, and responsive. Avoid `!important` unless a documented cascade conflict makes it unavoidable.

### Phase 4 — Verify
After changes:
- Compare before/after at all required viewport widths.
- Test light and dark themes if present.
- Test Ukrainian and English.
- Check for horizontal overflow, clipped text, overlapping controls, broken images, and unexpected layout shifts.
- Confirm all existing buttons, links, menus, toggles, modals, calculators, and Telegram actions still work.
- Confirm no JavaScript or functional files were changed. If a functional change seems necessary, stop and ask first.
- If browser preview/testing is unavailable, state that clearly; do not claim visual verification that did not happen.

## SportBot-specific design direction
- The hero should communicate the product quickly and balance the headline with a convincing Telegram interface preview.
- The Telegram preview should look like a deliberate product demonstration, not a random floating glass card.
- Use the existing fitness imagery selectively; avoid visible seams or unrelated crops in the collage.
- Unify sections that currently appear to use older blue/indigo styling with the established SportBot identity, while retaining violet as a restrained secondary accent.
- Make statistics credible and visually quiet enough not to compete with the product. Never invent or inflate numbers.
- Review the mobile sticky Telegram CTA carefully; it must not cover statistics, section content, or other buttons. Prefer visibility-aware behavior only if it can be achieved without changing JavaScript; otherwise use a safe CSS-only placement or ask before changing behavior.
- Preserve the existing content order and feature set unless the owner explicitly approves structural changes.

## Definition of done
The work is complete only when:
- The site feels cohesive, distinctive, and product-led rather than template-generated.
- The SportBot brand remains recognizable.
- All existing features and interactions remain intact.
- Desktop, tablet, and mobile layouts are deliberately composed.
- No new fake claims or unnecessary visual effects have been introduced.
- A concise change log lists modified files, visual improvements, and verification performed.
- Any unverified items or limitations are explicitly disclosed.

## Required response format from the coding agent
1. Brief audit findings.
2. Exact design plan and priorities.
3. Files to be modified and confirmation that JavaScript/business logic will remain untouched.
4. Implemented visual changes.
5. Viewport/theme/language verification results.
6. Remaining issues or items that require owner approval.
