# Keep Reading - Professional Bookstore

A full-stack bookstore application built with modern technologies.

## Technologies

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Apollo Client
- Ant Design

### Backend

- Node.js
- TypeScript
- Express
- Apollo Server
- GraphQL
- PostgreSQL 17
- Prisma ORM

### DevOps

- Docker & Docker Compose
- GraphQL Code Generator
- GitHub Actions CI/CD
- ESLint
- npm Workspaces

## Project Structure

```
KeepReading/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   ├── src/
│   │   ├── graphql/
│   │   │   ├── schema.ts          # GraphQL type definitions
│   │   │   └── resolvers.ts       # GraphQL resolvers
│   │   └── index.ts               # Server entry point
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── apollo/
│   │   │   └── client.ts          # Apollo Client setup
│   │   ├── graphql/
│   │   │   └── queries.ts         # GraphQL queries/mutations
│   │   ├── pages/
│   │   │   ├── Home.tsx           # Home page
│   │   │   └── Books.tsx          # Books listing page
│   │   ├── App.tsx                # Main App component
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── tsconfig.json
├── docker-compose.yml              # PostgreSQL container config
├── package.json                    # Root package.json with workspaces
├── setup.sh                        # Automated setup script
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 18.0.0)
- npm (>= 9.0.0)
- Docker and Docker Compose

### Install Docker

**macOS:**
Download and install [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

**Linux:**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Windows:**
Download and install [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

## How to Run the App

### 1. Clone the Repository

```bash
git clone https://github.com/GoForUDream/KeepReading.git
cd KeepReading
```

### 2. Automated Setup

Run the automated setup script:

```bash
./setup.sh
```

This script will automatically:

- Check prerequisites (Node.js and Docker)
- Start PostgreSQL 17 in Docker
- Install all dependencies
- Generate Prisma Client
- Run database migrations
- Generate GraphQL types (runs automatically via postinstall)

### 3. Start the Application

From the root directory:

```bash
npm run dev
```

This will start:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:4000
- **GraphQL Playground:** http://localhost:4000/graphql

**Note:** The application automatically runs TypeScript and ESLint validation before starting. The dev servers will only start if all checks pass.

## GraphQL Code Generation

This project uses **GraphQL Code Generator** to automatically generate TypeScript types and React hooks from the GraphQL schema. This eliminates manual type definitions and provides fully typed hooks with features like `onSuccess`, `onError`, and `refetch`.

### How It Works

1. **Backend exports schema**: The GraphQL schema is exported to `backend/schema.graphql`
2. **Frontend runs codegen**: Types and hooks are generated in `frontend/src/generated/graphql.ts`
3. **Use typed hooks**: Import hooks like `useLoginMutation()`, `useBooksQuery()`, etc.

### Generated Files

**⚠️ Important:** The `frontend/src/generated/` folder is git-ignored and auto-generated. Never edit these files manually!

### When to Run Codegen

Codegen runs automatically in these scenarios:
- ✅ After `npm install` (via postinstall hook)
- ✅ During CI pipeline (before tests and builds)
- ⚠️ Manually when backend schema changes

### Manual Codegen

If you modify the GraphQL schema or operations, regenerate types:

```bash
# 1. Export schema from backend
npm run schema:export --workspace=backend

# 2. Generate types and hooks for frontend
npm run codegen --workspace=frontend
```

### Development Workflow

For automatic regeneration during development:

```bash
npm run codegen:watch --workspace=frontend
```

### Usage Example

**Before (Manual types):**
```typescript
import { useQuery, useMutation } from '@apollo/client';

const { data, loading } = useQuery<{ books: Book[] }>(GET_BOOKS);
const [login] = useMutation<{ login: AuthResponse }>(LOGIN_MUTATION);
```

**After (Generated hooks):**
```typescript
import { useBooksQuery, useLoginMutation } from '@/generated/graphql';

// ✨ Fully typed, no manual definitions needed
const { data, loading, refetch } = useBooksQuery();

const [login] = useLoginMutation({
  onCompleted: (data) => {
    // data.login.user is fully typed!
    console.log(data.login.user.email);
  },
  onError: (error) => {
    console.error(error.message);
  },
});
```

### GraphQL Operations

Define queries and mutations in:
- `frontend/src/graphql/queries/queries.graphql`
- `frontend/src/graphql/mutations/mutations.graphql`

These files generate typed hooks automatically!

## Docker Management

### Managing the PostgreSQL Database

**Start the database:**

```bash
docker compose up -d postgres
```

**Stop the database:**

```bash
docker compose stop postgres
```

**Stop and remove the database (data persists in volume):**

```bash
docker compose down
```

**View database logs:**

```bash
docker compose logs postgres
```

**Access PostgreSQL CLI:**

```bash
docker compose exec postgres psql -U postgres -d keep_reading
```

**Remove database data completely:**

```bash
docker compose down -v
```

## Troubleshooting

### Database Connection Issues

If you get database connection errors:

1. Ensure Docker is running: `docker ps`
2. Check if PostgreSQL container is running: `docker compose ps`
3. Restart the database: `docker compose restart postgres`
4. Check database logs: `docker compose logs postgres`

### Port Already in Use

If ports 4000, 5173, or 5433 are already in use:

- Change `PORT` in `backend/.env` for backend
- Change `server.port` in `frontend/vite.config.ts` for frontend
- Change PostgreSQL port in `docker-compose.yml` (e.g., "5434:5432")

### Module Not Found Errors

Run:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

## Support

For issues and questions, please open an issue in the repository.
