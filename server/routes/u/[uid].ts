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

  const cityHeader = getHeader(event, 'x-vercel-ip-city');
  const city = cityHeader ? decodeURIComponent(cityHeader) : '-';
  const ipHeader = getHeader(event, 'x-forwarded-for');
  const ip = ipHeader ? ipHeader.split(',')[0] : '-';
  const refererHeader = getHeader(event, 'referer');
  const referer = refererHeader ? decodeURIComponent(refererHeader) : '-';

  await event.context.db
    .insertInto('logs')
    .values({
      uid: params.uid,
      city,
      ip,
      referer,
    })
    .execute();

  return sendRedirect(event, url, 301);
});
