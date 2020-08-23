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
	// TODO clean side quotes
	return stringValue.trim();
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
	return stringValue;
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
