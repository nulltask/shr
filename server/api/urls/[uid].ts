import kv from '@vercel/kv';
import { z, parseParamsAs } from '@sidebase/nuxt-parse';

const paramsSchema = z.object({
  uid: z.string(),
});

export default defineEventHandler(async (event) => {
  const params = parseParamsAs(event, paramsSchema);
  const url = await kv.get<string>(`urls:${params.uid}`);

  if (!url) {
    throw createError({ statusCode: 404 });
  }

  const logs = await event.context.db
    .selectFrom('logs')
    .selectAll()
    .where('uid', '=', params.uid)
    .orderBy('created_at', 'desc')
    .execute();

  return {
    uid: params.uid,
    url,
    logs,
  };
});
