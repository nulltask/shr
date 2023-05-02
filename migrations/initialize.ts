import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('logs')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('uid', 'varchar', (col) => col.notNull())
    .addColumn('city', 'varchar', (col) => col)
    .addColumn('ip', 'varchar', (col) => col)
    .addColumn('referer', 'varchar', (col) => col)
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema.createIndex('logs_uid_index').on('logs').column('uid').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('logs').execute();
}
