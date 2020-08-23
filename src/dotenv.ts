import { reader } from "./reader.dotenv.ts";
import { parser } from "./parser.dotenv.ts";

interface ILoadEnvOptions {
	envPath? : string,
	envLockPath? : string | null;
	errorOnDuplicatedKey ? : boolean;
}

/**
 *
 * @param options
 */
const loadEnv = async <T>( options : ILoadEnvOptions = {} ) => {
	const opts : Required<ILoadEnvOptions> = {
		...{
			envPath : ".env",
			envLockPath : null,
			errorOnDuplicatedKey: false
		},
		...options,
	};

	const envContent = await reader( opts.envPath );
	const envParsed = parser.getStructure<T>( envContent );

	if ( opts.envLockPath != null ) {
		const envLockContent = await reader( opts.envLockPath );
		const envContentLines = parser.getLines( envContent );
		const envLockContentLines = parser.getLines( envLockContent );

		const missingVariablesInEnv = envLockContentLines.reduce( ( acc : Array<Error>, currentLine : [ string, string ] ) => {
			const key = currentLine[ 0 ];
			const exists = envContentLines.find( line => line[ 0 ] === key );
			if ( !exists ) {
				acc.push( new Error( `Missing [${ key }] in [${ opts.envPath }]` ) );
			}
			return acc;
		}, [] );

		if ( missingVariablesInEnv.length > 0 ) {
			throw missingVariablesInEnv.join( "\n" );
		}
	}

	return envParsed;
};


export {
	loadEnv
};
