import { Generated, ColumnType } from 'kysely';

export interface Database {
  logs: {
    id: Generated<number>;
    uid: string;
    city: string;
    ip: string;
    referer: string;
    created_at: ColumnType<Date, string | undefined, never>;
  };
}
