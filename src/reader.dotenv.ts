import { parser } from "./parser.dotenv.ts";

const reader = async <T>( envPath : string ) => {
	try {
		const file = await Deno.open( envPath );
		return await parser<T>( file );
	} catch ( e ) {
		// TODO react exception;
		if ( e instanceof Deno.errors.NotFound ) {

		}

		if ( e instanceof Deno.errors.PermissionDenied ) {

		}
		console.error( e );
	}
};

export {
	reader
};
