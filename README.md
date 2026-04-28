# Carlos Yajie Fetizanan - Portfolio

A personal portfolio website showcasing projects, skills, and professional experience. The design emphasizes a sleek, elegant aesthetic using glassmorphism effects, featuring a dark theme (`#121212` background) with orange accents (`#ff8c00`).

## Overview

This portfolio highlights my work as an IT major in Business Analytics, UI/UX Designer, and Front End Developer. It is built with:
- **HTML5** for structure
- **CSS3** for styling, animations, media queries, and root variables
- **Vanilla JavaScript** for interactive elements like the typing effect, scroll reveal animations, and magnetic buttons

The project also contains a hybrid structure: while the main application is vanilla HTML/CSS/JS, it also includes a `package.json`, `tsconfig.json`, and a `components/ui` directory to support modern React, TypeScript, Tailwind CSS, and shadcn/ui components for future integration. See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for more details.

## Features

- **Responsive Design**: Smooth adaptation across desktop, tablet, and mobile devices using flexbox and media queries.
- **Dark Theme & Glassmorphism**: A modern UI combining dark backgrounds with translucent, glass-like UI components.
- **Dynamic Animations**: Scroll reveals, counter animations, skill circle fills, and an animated typing effect.
- **Project Showcase**: Links to my open-source projects and professional work.

## Links

- **GitHub**: [https://github.com/crlsyajie](https://github.com/crlsyajie)
- **LinkedIn**: [https://www.linkedin.com/in/carlos-yajie-fetizanan](https://www.linkedin.com/in/carlos-yajie-fetizanan)

## Local Development

To run the project locally for development and testing, you can use Python's built-in HTTP server:

```bash
python3 -m http.server 8000
```

Then, open your browser and navigate to `http://localhost:8000`.

## AI Chatbot (Next.js Migration)

A local AI chatbot has been implemented for the future Next.js migration. It uses **Transformers.js** to run models directly in the browser, ensuring privacy and no token costs.

### Integration

To use the chatbot in your Next.js project:

1. Ensure dependencies are installed: `npm install @xenova/transformers lucide-react motion`
2. Import and add the `<ChatBot />` component to your main layout or page:

```tsx
import { ChatBot } from './components/chatbot/ChatBot';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
```

The chatbot will automatically load the knowledge base from `lib/chatbot/knowledge-base.json` and provide answers about your portfolio.
