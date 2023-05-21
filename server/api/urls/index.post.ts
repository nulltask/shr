import { uid as uuid } from 'uid-promise';
import { z, parseBodyAs } from '@sidebase/nuxt-parse';
import kv from '@vercel/kv';

const bodySchema = z.object({
  url: z.string().url(),
});

export default defineEventHandler(async (event) => {
  const body = await parseBodyAs(event, bodySchema);
  const uid = await uuid(10);

  await kv.set(`urls:${uid}`, body.url);

  return {
    uid,
    url: body.url,
  };
});
