import { z } from 'zod';
import { insertUserSchema, insertMiningStatsSchema, users, miningStats } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  users: {
    create: {
      method: 'POST' as const,
      path: '/api/users',
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/users/:id',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  mining: {
    getStats: {
      method: 'GET' as const,
      path: '/api/mining/:userId',
      responses: {
        200: z.custom<typeof miningStats.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    updateStats: {
      method: 'PUT' as const,
      path: '/api/mining/:userId',
      input: insertMiningStatsSchema.partial(),
      responses: {
        200: z.custom<typeof miningStats.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    toggle: {
      method: 'POST' as const,
      path: '/api/mining/:userId/toggle',
      input: z.object({ active: z.boolean() }),
      responses: {
        200: z.custom<typeof miningStats.$inferSelect>(),
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
