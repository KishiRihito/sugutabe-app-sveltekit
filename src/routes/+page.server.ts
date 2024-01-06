import type { PageServerLoad } from './$types';
import { HOTPEPPER_GOURMET_API_KEY, DEV_CORS_PROXY_URL } from "$env/static/private";

const mode = import.meta.env.MODE;

export const load: PageServerLoad = async ({ url, route, params }) => {
  return {
    mode: mode,
    api_key: HOTPEPPER_GOURMET_API_KEY,
    proxy_url: DEV_CORS_PROXY_URL,
  }
};
