interface Env {
	HOTPEPPER_GOURMET_API_KEY: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const value = context.env.HOTPEPPER_GOURMET_API_KEY;
 	return new Response(value);
}
