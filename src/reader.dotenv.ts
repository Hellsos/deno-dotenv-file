const reader = async ( envPath : string ) => {
	const file = await Deno.open( envPath );
	const decoder = new TextDecoder( "utf-8" );
	return decoder.decode( await Deno.readAll( file ) );
};

export {
	reader
};
