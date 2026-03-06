# Setup Instructions for Next.js, Tailwind CSS, TypeScript, and shadcn/ui

The current codebase is a Vanilla HTML/CSS/JS project. To fully support the newly added React components, you will need to migrate or set up a modern React environment. Below are the steps to initialize a Next.js project with Tailwind CSS, TypeScript, and the shadcn/ui CLI.

## 1. Initialize a Next.js Project

Run the following command to create a new Next.js app. This will automatically set up React, Next.js, TypeScript, and Tailwind CSS.

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
```

When prompted:
- Would you like to use `src/` directory? **Yes** (or No, depending on your preference)
- Would you like to use App Router? **Yes**

## 2. Initialize shadcn/ui

Once inside the newly created project directory, initialize shadcn/ui via its CLI:

```bash
npx shadcn-ui@latest init
```

You will be asked a few questions to configure `components.json`:
- Which style would you like to use? **Default**
- Which color would you like to use as base color? **Slate** (or any preferred color)
- Where is your global CSS file? **app/globals.css** (or `src/app/globals.css`)
- Would you like to use CSS variables for colors? **Yes**
- Are you using a custom tailwind prefix? **(leave blank)**
- Where is your `tailwind.config.js` located? **tailwind.config.ts**
- Configure the import alias for components: **@/components**
- Configure the import alias for utils: **@/lib/utils**
- Are you using React Server Components? **Yes**

### Why is the `/components/ui` Default Path Important?

The shadcn CLI places all its generated UI components (like buttons, dialogs, inputs) inside the `components/ui/` folder by default. This is important for a few key reasons:
1. **Separation of Concerns:** It separates base, reusable UI components (the "design system") from application-specific or page-specific components (which can live in `components/` or within specific route directories).
2. **Predictability:** Tools, developers, and the shadcn CLI itself know exactly where to find and update these primitive components. Keeping them in the default directory ensures seamless updates and additions when running commands like `npx shadcn-ui@latest add [component]`.
3. **Clean Architecture:** Grouping primitive visual components into a dedicated `ui` folder helps maintain a clean, organized project structure as the application scales.

## 3. Install Required Dependencies

For the `GlowingEffect` component to work properly, you need the following specific dependencies:

```bash
npm install motion lucide-react clsx tailwind-merge
```

## 4. Integrate Components

Once the environment is ready:
1. Copy the `lib/utils.ts` into your Next.js project's `lib/` directory (or `src/lib/`).
2. Copy `glowing-effect.tsx` into the `components/ui/` directory.
3. Use the `GlowingEffectDemo` component in your Next.js pages to render the updated portfolio cards.
