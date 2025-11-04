import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { authService } from './features/auth/auth.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

async function startServer() {
  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apply middleware
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      credentials: true,
    })
  );
  app.use(express.json());

  // Apply Apollo middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');

        console.log('[Auth] Authorization header:', authHeader ? 'EXISTS' : 'MISSING');
        console.log('[Auth] Token:', token ? 'EXISTS' : 'MISSING');

        // If token exists, verify and decode it
        if (token) {
          try {
            const decoded = authService.verifyToken(token);
            console.log('[Auth] Token verified successfully, userId:', decoded.userId);
            return {
              req,
              userId: decoded.userId,
              userEmail: decoded.email,
              userRole: decoded.role,
            };
          } catch (error) {
            // Token is invalid or expired, continue without userId
            console.log('[Auth] Token verification failed:', error instanceof Error ? error.message : error);
            return { req };
          }
        }

        console.log('[Auth] No token provided');
        return { req };
      },
    })
  );

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Keep Reading API is running' });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
    console.log(`📚 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
