import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '~/types';

const db = createKysely<Database>();

declare module 'h3' {
  interface H3EventContext {
    db: typeof db;
  }
}

export default eventHandler((event) => {
  if (!event.context.db) {
    event.context.db = db;
  }
});
