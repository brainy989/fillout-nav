# Fillout Navigation Demo (Next.js & Tailwind)

A responsive, animated page navigation UI built with Next.js App Router, TypeScript, and Tailwind CSS. Features dynamic page button management, icons, drag-and-drop reordering, rename/duplicate/delete, and animated menus.

## Features

- Built with Next.js App Router (TypeScript)
- Fully componentized: NavButton, AddPageButton, animated SettingsMenu, and modular SVG icons
- SmallPlusButton between items for inserting pages
- Draggable list, renaming, reordering, duplicating, deleting items
- Modern, springy menu animation (Framer Motion)
- Tailwind CSS and clsx for dynamic styling
- Custom Google fonts via next/font

## Tech Stack/Dependencies

- [Next.js 14+](https://nextjs.org/)
- [React 18+](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (for menu animation)
- [clsx](https://github.com/lukeed/clsx) (utility for class composition)
- [Geist & Geist Mono](https://vercel.com/font) fonts

## Getting Started

1. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```
2. **Run the app:**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
fillout-nav/
├── src/
│   └── app/
│       ├── components/
│       │   ├── AddPageButton.tsx
│       │   ├── NavButton.tsx
│       │   ├── Navigation.tsx
│       │   ├── SettingsMenu.tsx
│       │   └── icons/
│       │       └── [IconName]Icon.tsx
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── public/
│   └── [SVG assets]
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.[ts|js]
└── README.md
```

## Key Scripts

- `yarn dev` / `npm run dev` — Start the Next.js development server
- `yarn build` / `npm run build` — Build the app for production
- `yarn lint` / `npm run lint` — Lint all source files

## Customization

- **Icons:** Place new icon components in `src/app/components/icons/`
- **Animation:** Adjust Framer Motion params in `NavButton.tsx` for spring/slide effect
- **Styling:** Tune styles with Tailwind and arbitrary values for pixel-perfect design

## Credits

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Geist Font](https://vercel.com/font)
- [Fillout Challenge inspiration](https://fillout.com/)

---

Want to contribute or discuss improvements? Open an issue or submit a PR!
