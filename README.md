# Real-time Chat Room Application

A modern real-time chat application built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Package Manager:** pnpm
- **Development Environment:** Node.js >= 18

## Features

- Multi-user chat rooms
- Real-time messaging (simulated locally)
- Support for text and image messages
- Message reactions (like, love, laugh)
- User avatars and profiles
- Chat history
- Responsive design

## Prerequisites

- Node.js 18.x or higher
- pnpm (recommended over npm/yarn)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sfad159357/meep_frontend_test.git"
cd meep_frontend_test

```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

## Project Dependencies

```json
{
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@heroicons/react": "^2.2.0",
    "@mui/icons-material": "^6.4.4",
    "@mui/material": "^6.4.4",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "next": "^14.0.0",
    "next-themes": "^0.4.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.0",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/node": "^22.13.2",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0",
    "image-webpack-loader": "^8.1.0",
    "postcss": "^8.4.31",
    "prettier": "^3.0.0",
    "webpack": "^5.98.0",
    "webpack-cli": "^6.0.1"
  }
}
```

## Project Structure

The project follows a feature-based structure:

- `pages/`: Next.js pages and routing
- `components/`: Reusable UI components
- `features/`: Feature-specific components and logic
- `store/`: Zustand state management
- `types/`: TypeScript type definitions
- `styles/`: Global styles and Tailwind configuration

## Configuration Files

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Tailwind Configuration (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#1a1a1a',
      },
    },
  },
  plugins: [],
}
```

## Development Guidelines

1. Follow TypeScript best practices and maintain type safety
2. Use Tailwind CSS for styling
3. Implement components following atomic design principles
4. Use Zustand for state management
5. Follow ESLint and Prettier configurations for code consistency

## Getting Started

After installation, the application will be available at `http://localhost:3000`. The chat functionality is simulated locally without a backend, using Zustand for state management. 