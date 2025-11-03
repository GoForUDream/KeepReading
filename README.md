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
