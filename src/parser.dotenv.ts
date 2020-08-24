/**
 *
 * @param base
 * @param nestedKeys
 * @param value
 */
import { appendRecursiveProperties, cleanseKeyString, cleanseValueString } from "./helper.dotenv.ts";


const parser = {
	/**
	 *
	 * @param envContent
	 */
	getLines : ( envContent : string ) : Array<[ string, string ]> => {
		return envContent.split( /\n|\r|\r\n/ )
						 .filter( line => line.length > 0 && !line.startsWith( "#" ) )
						 .reduce( ( acc : Array<[ string, string ]>, currentLine : string ) => {
							 const parts = currentLine.split( "=" );
							 if ( currentLine.includes( "=" ) ) {
								 acc[ acc.length ] = [ cleanseKeyString( parts[ 0 ] ), cleanseValueString( parts[ 1 ] ) ];
							 } else {
								 acc[ acc.length - 1 ][ 1 ] += "\n" + parts[ 0 ].trim();
							 }
							 return acc;
						 }, [] );
	},
	checkDuplicateKeys : ( envContent : string, lines : Array<[ string, string ]>, errorOnDuplicateKey : boolean = true ) => {
		if ( errorOnDuplicateKey === false ) return lines;

		const duplicateKeysInEnv : Map<number, Error> = new Map<number, Error>();

		const rawLines = envContent.split( "\n" );

		lines.reduce( ( acc : Array<string>, currentLine : [ string, string ] ) => {
			const key = currentLine[ 0 ];
			if ( acc.includes( key ) ) {
				rawLines.forEach( ( line, index ) => {
					const lineNumber = index + 1;
					if ( line.startsWith( key ) ) {
						duplicateKeysInEnv.set( lineNumber, new Error( `Duplicate [${ key }] on line ${ lineNumber }` ) );
					}
				} );
			}
			acc.push( key );
			return acc;
		}, [] );

		if ( duplicateKeysInEnv.size > 0 ) {
			throw [ ...duplicateKeysInEnv.values() ].join( "\n" );
		}
		return lines;
	},
	/**
	 *
	 * @param envContent
	 * @param errorOnDuplicateKey
	 */
	getStructure : <T>( envContent : string, errorOnDuplicateKey : boolean = true ) : T => {
		return parser.checkDuplicateKeys( envContent, parser.getLines( envContent ), errorOnDuplicateKey )
					 .reduce( ( acc : T, currentLine : [ string, string ] ) => {
						 const key = currentLine[ 0 ];
						 const value = currentLine[ 1 ];
						 const nestedKeys = key.split( ":" );

						 appendRecursiveProperties( acc, nestedKeys, value );

						 return acc;
					 }, {} as T );
	}
};

export {
	parser
};
