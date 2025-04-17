import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/db/schema';

export const db = drizzle(import.meta.env.VITE_DATABASE_URL!, { schema });



