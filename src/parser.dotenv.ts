/**
 *
 * @param base
 * @param nestedKeys
 * @param value
 */
const appendRecursiveProperties = ( base : any, nestedKeys : Array<string>, value : string | boolean | number ) => {
	return nestedKeys.reduce( ( acc : any, current : string, index : number ) => {
		if ( acc[ current ] ) {
			return acc[ current ] = acc[ current ];
		} else if ( index < nestedKeys.length - 1 ) {
			return acc[ current ] = {};
		} else {
			return acc[ current ] = value;
		}
	}, base );
};

/**
 *
 * @param envFile
 */
const parser = async <T>( envFile : Deno.File ) => {
	const decoder = new TextDecoder( "utf-8" );
	const text = decoder.decode( await Deno.readAll( envFile ) );

	// TODO multiline
	return text.split( "\n" )
			   .filter( line => line.length > 0 && !line.startsWith( "#" ) )
			   .reduce( ( acc : T, currentLine : string ) => {
				   const parts = currentLine.split( "=" );
				   const key = parts[ 0 ].trim();
				   const value = parts[ 1 ].trim().replace( /"/g, "" ).replace( /'/g, "" );
				   const nestedKeys = key.split( ":" );

				   appendRecursiveProperties( acc, nestedKeys, value );

				   return acc;
			   }, {} as T );
};

export {
	parser
};
