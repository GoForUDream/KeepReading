# Keep Reading - Professional Bookstore

A full-stack bookstore application built with modern technologies.

## Tech Stack

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

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (>= 18.0.0)
- npm (>= 9.0.0)
- Docker and Docker Compose

## Installation & Setup

### 1. Install Docker

If you don't have Docker installed:

**macOS:**
Download and install [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Windows:**
Download and install [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

### 2. Database Setup (Docker)

The PostgreSQL 17 database will be automatically started in a Docker container during setup. No manual database creation is needed!

### 3. Automated Setup

Run the automated setup script from the root directory:

```bash
./setup.sh
```

This script will automatically:
1. Check prerequisites (Node.js and Docker)
2. Start PostgreSQL 17 in Docker
3. Install all dependencies
4. Generate Prisma Client
5. Run database migrations

### 4. Run the Application

From the **root directory**, run a single command to start both frontend and backend:

```bash
npm run dev
```

This will start:
- Backend server at http://localhost:4000
- Frontend application at http://localhost:5173
- GraphQL Playground at http://localhost:4000/graphql

**Note:** Every time you run `npm run dev`, the application will automatically:
1. Check TypeScript types in both frontend and backend
2. Run ESLint to check for code quality issues
3. Only start the dev servers if all checks pass

## Available Scripts

### Root Directory
- `npm run dev` - Run both frontend and backend concurrently (with pre-validation)
- `npm run dev:backend` - Run only backend
- `npm run dev:frontend` - Run only frontend
- `npm run validate` - Run type-checking and linting for both frontend and backend
- `npm run type-check` - Run TypeScript type checking for both workspaces
- `npm run lint` - Run linting for both workspaces
- `npm run lint:fix` - Auto-fix linting issues for both workspaces
- `npm run build` - Build both frontend and backend
- `npm run install:all` - Install all dependencies for workspaces

### Backend (cd backend)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run validate` - Run type-checking and linting
- `npm run type-check` - Run TypeScript type checking only
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

### Frontend (cd frontend)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run validate` - Run type-checking and linting
- `npm run type-check` - Run TypeScript type checking only
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix linting issues

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
├── package.json                    # Root package.json with workspaces
└── README.md
```

## API Endpoints

### GraphQL Endpoint
- **URL:** http://localhost:4000/graphql
- **Playground:** Available in development mode

### REST Endpoint
- **Health Check:** http://localhost:4000/health

## GraphQL Schema

### Queries
- `books` - Get all books
- `book(id: ID!)` - Get book by ID
- `bookByIsbn(isbn: String!)` - Get book by ISBN
- `categories` - Get all categories
- `customers` - Get all customers

### Mutations
- `createBook(input: CreateBookInput!)` - Create a new book
- `updateBook(id: ID!, input: UpdateBookInput!)` - Update a book
- `deleteBook(id: ID!)` - Delete a book
- `createCategory(input: CreateCategoryInput!)` - Create a category
- `createCustomer(input: CreateCustomerInput!)` - Create a customer

## Adding Sample Data

You can use the GraphQL Playground to add sample books:

```graphql
mutation {
  createBook(input: {
    title: "The Great Gatsby"
    author: "F. Scott Fitzgerald"
    description: "A classic American novel"
    price: 12.99
    isbn: "978-0-7432-7356-5"
    category: "Fiction"
    stock: 25
    published: "1925-04-10"
  }) {
    id
    title
  }
}
```

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
If ports 4000, 5173, or 5432 are already in use:
- Change `PORT` in `backend/.env` for backend
- Change `server.port` in `frontend/vite.config.ts` for frontend
- Change PostgreSQL port in `docker-compose.yml` (e.g., "5433:5432")

### Module Not Found Errors
Run:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
