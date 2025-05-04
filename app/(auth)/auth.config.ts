// app/(auth)/auth.config.ts
import type { NextAuthOptions } from 'next-auth';
import { UpstashRedisAdapter } from '@auth/upstash-redis-adapter';
import redis from '@/lib/redis';

export const authConfig: NextAuthOptions = {
  adapter: UpstashRedisAdapter(redis),
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  callbacks: {
    // Die eigentlichen Callback‑Funktionen legen wir in auth.ts fest
  },
};
