# Hono + Next.js Template

A modern full-stack monorepo template featuring a Hono-powered REST API backend and a Next.js frontend, powered by Turborepo.

## Tech Stack

### Backend (Hono)

- [Hono](https://hono.dev/) - Lightweight, ultrafast web framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [JWT](https://jwt.io/) - JSON Web Token authentication

### Frontend (Next.js)

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React Query](https://tanstack.com/query/latest) - Data fetching and caching
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable UI components built with Radix UI
- [Tailwind CSS v4](https://tailwindcss.com/) - Next generation utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) - Type safety

### Development Tools

- [Turborepo](https://turbo.build/) - High-performance build system
- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## Project Structure

```
/
├── apps/                # Application packages
│   ├── client/         # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/    # App router pages
│   │   │   ├── components/
│   │   │   └── lib/    # Utilities and configurations
│   │   └── public/     # Static assets
│   └── server/         # Hono backend
│       ├── src/
│       │   ├── db/     # Database configuration
│       │   ├── routes/ # API routes
│       │   └── types/  # TypeScript types
│       └── .env        # Environment variables
├── packages/           # Shared packages
│   ├── eslint-config/ # ESLint configurations
│   └── tsconfig/      # TypeScript configurations
└── turbo.json         # Turborepo configuration
```

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp apps/server/.env.example apps/server/.env
   cp apps/client/.env.example apps/client/.env
   ```

3. Run development servers:
   ```bash
   pnpm dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8888

## Features

- ⚡️ Turborepo for optimal DX and build performance
- 🎨 Modern UI with shadcn/ui components
- 🎯 Type-safe API calls with Zod validation
- 📱 Responsive design with Tailwind CSS v4
- 🔐 JWT Authentication
- 🚀 Fast API responses with Hono
- 📦 Shared configurations across apps
- 🔄 Hot Module Replacement
- 🛠️ Development tools preconfigured

## Development Workflow

### Running Specific Apps

```bash
# Run frontend only
pnpm dev --filter=client

# Run backend only
pnpm dev --filter=server
```

### Building

```bash
# Build all apps
pnpm build

# Build specific app
pnpm build --filter=client
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
