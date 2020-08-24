/**
 *
 * @param stringValue
 */
const cleanseKeyString = ( stringValue : string ) => {
	return stringValue.trim();
};

/**
 *
 * @param stringValue
 */
const cleanseValueString = ( stringValue : string ) => {
	let formatted = stringValue.trim();
	if ( [ "'", "\"" ].includes( formatted.charAt( 0 ) ) ) formatted = formatted.slice( 1 );
	if ( [ "'", "\"" ].includes( formatted.charAt( formatted.length - 1 ) ) ) formatted = formatted.slice( 0, -1 );
	return formatted;
};


/**
 *
 * @param stringValue
 */
const parseValueFromString = ( stringValue : string ) => {
	if ( stringValue === "null" ) return null;
	if ( stringValue === "undefined" ) return undefined;
	if ( stringValue === "true" ) return true;
	if ( stringValue === "false" ) return false;
	let number = parseFloat( stringValue );
	if ( number ) return number;
	try {
		return JSON.parse( stringValue );
	} catch ( e ) {
		return stringValue;
	}
};


/**
 *
 * @param base
 * @param nestedKeys
 * @param value
 */
const appendRecursiveProperties = ( base : any, nestedKeys : Array<string>, value : string ) => {
	return nestedKeys.reduce( ( acc : any, current : string, index : number ) => {
		if ( typeof acc[ current ] === "object" ) {
			return acc[ current ] = acc[ current ];
		} else if ( index < nestedKeys.length - 1 ) {
			return acc[ current ] = {};
		} else {
			return acc[ current ] = parseValueFromString( value );
		}
	}, base );
};

export {
	cleanseValueString,
	cleanseKeyString,
	parseValueFromString,
	appendRecursiveProperties
};
