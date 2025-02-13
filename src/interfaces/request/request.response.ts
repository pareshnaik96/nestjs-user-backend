import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: number;
      role: string;
    };
  }
}