# Hono + Next.js Template

A full-stack template featuring a Hono-powered REST API backend and a modern Next.js frontend.

## Tech Stack

### Backend
- [Hono](https://hono.dev/) - Lightweight, ultrafast web framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [JWT](https://jwt.io/) - JSON Web Token authentication

### Frontend
- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React Query](https://tanstack.com/query/latest) - Data fetching and caching
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable UI components
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Project Structure

```
/
├── server/              # Hono backend
│   ├── src/
│   │   ├── db/         # Database configuration and schema
│   │   ├── middleware/ # Auth middleware
│   │   ├── routes/     # API routes
│   │   ├── schemas/    # Zod validation schemas
│   │   └── types/      # TypeScript types
│   └── .env            # Environment variables
└── client/             # Next.js frontend (to be implemented)
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user

### Posts (Protected Routes)
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get single post
- `POST /posts` - Create new post (auth required)
- `PUT /posts/:id` - Update post (auth required, owner only)
- `DELETE /posts/:id` - Delete post (auth required, owner only)

## Getting Started

### Backend Setup
1. Install dependencies:
   ```bash
   cd server
   bun install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your database URL and JWT secret.

3. Run development server:
   ```bash
   bun dev
   ```
   Server will start at http://localhost:8888

### Frontend Setup (Coming Soon)
1. Install dependencies:
   ```bash
   cd client
   pnpm install
   ```

2. Run development server:
   ```bash
   pnpm dev
   ```
   Client will start at http://localhost:3000

## Features

- 🔐 JWT Authentication
- 🔄 CRUD Operations
- 📝 Post Management
- 🎨 Modern UI Components
- 🚀 Fast API Responses
- ✨ Type Safety
- 🔍 Data Validation
- 📱 Responsive Design (coming soon)

## Development

### API Request Examples

#### Login
```bash
curl -X POST http://localhost:8888/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

#### Create Post (Protected)
```bash
curl -X POST http://localhost:8888/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "My Post", "content": "Post content"}'
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.