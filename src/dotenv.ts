import { reader } from "./reader.dotenv.ts";

interface ILoadEnv {
	get( key : string ) : string | number | boolean;

	print() : void;
}

/**
 *
 * @param envPath
 */
const loadEnv = async <T>( envPath : string ) => {
	// TODO return get/print methods beside object.
	return await reader<T>( envPath );
};


export {
	loadEnv
};
