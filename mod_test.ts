import { assertEquals, assertStrictEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";

import { loadEnv } from "./src/dotenv.ts";

////////////////////////////////////////////////////////////////////////////////

interface IEnvStructure {
	VARIABLE : boolean;
	ANOTHER_TEST : string;
	ANOTHER_TEST_2 : string;
	ANOTHER_TEST_3 : number;
}

Deno.test( {
	name : "Testing .env - Basic structure",
	fn : async () => {
		const mockStructure : IEnvStructure = {
			VARIABLE : false,
			ANOTHER_TEST : "some first text",
			ANOTHER_TEST_2 : "some second text",
			ANOTHER_TEST_3 : 3.14159
		};

		const env = await loadEnv<IEnvStructure>( {
			envPath : "./examples/.env"
		} );

		assertEquals( mockStructure.VARIABLE, env.VARIABLE, "Expected VARIABLE to be same" );
		assertEquals( mockStructure.ANOTHER_TEST, env.ANOTHER_TEST, "Expected ANOTHER_TEST to be same with single quotes" );
		assertEquals( mockStructure.ANOTHER_TEST_2, env.ANOTHER_TEST_2, "Expected ANOTHER_TEST_2 to be same with double quotes" );
		assertEquals( mockStructure.ANOTHER_TEST_3, env.ANOTHER_TEST_3, "Expected ANOTHER_TEST_3 float to be same" );
	},
	sanitizeResources : false,
	sanitizeOps : false
} );

////////////////////////////////////////////////////////////////////////////////

interface IEnvMultilineStructure {
	SECURITY : {
		KEY : string;
	};
}

Deno.test( {
	name : "Testing .env-multiline - Multiline structure",
	fn : async () => {
		const mockStructure : IEnvMultilineStructure = {
			SECURITY : {
				KEY : `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAJlxzvqoDGaanSXkyQdtUVxD/4HTA6DNoODdVn2yHh8n+1XS4dGq
Caqw8v491mOUioI48zxc+fWJndJz2NIU8CUCAwEAAQJAEt+hwsj6xYANBkUuyOAU
WtHuUoye7J9+Q0pWQh2vgMtbBO5wGnmtirQ0vqNve48J6xQjtnRG8CX2o/AIyCKL
gQIhAPtybm8kCgE/reekg46zbfvInu+9im9R8qP00V5q0r5hAiEAnDkXn+d2jnzN
5jLh0JCI9b5lLNtlmYUa9+Zg4BYroEUCIFemWwKZAHfQ99EAku9icptLIsQVQTVu
znMCuxz7hbzhAiBGzAjMypSL1jtpSz3Syu2GkJZBUdwlSpECL0FPzDxREQIhAOgt
0tiMRwonS5uc/sliUnOF1/c47gfcbaJavVSFtqZF
-----END RSA PRIVATE KEY-----`
			}
		};

		const env = await loadEnv<IEnvMultilineStructure>( {
			envPath : "./examples/.env-multiline"
		} );

		assertStrictEquals( mockStructure.SECURITY.KEY, env.SECURITY.KEY, "Expected SECURITY:KEY RSA keys to be same" );
	},
	sanitizeResources : false,
	sanitizeOps : false
} );

////////////////////////////////////////////////////////////////////////////////

interface IEnvJSONStructure {
	data : {
		_id : string;
		index : number;
		guid : string;
		isActive : boolean;
		balance : string;
		picture : string;
		friends : Array<{
			id : number;
			name : string;
		}>
	};
}

Deno.test( {
	name : "Testing .env-json - JSON structure",
	fn : async () => {

		const env = await loadEnv<IEnvJSONStructure>( {
			envPath : "./examples/.env-json"
		} );

		assertStrictEquals( "5f43aa365114a7f64db74b83", env.data._id );
		assertStrictEquals( true, env.data.isActive );
		assertEquals( 3, env.data.friends.length, "Expected data:friends to have 3 items" );
		assertEquals( "Sabrina Willis", env.data.friends[ 1 ].name, "Expected data:friends[1].name to be Sabrina Willis" );
	},
	sanitizeResources : false,
	sanitizeOps : false
} );

////////////////////////////////////////////////////////////////////////////////

interface IEnvNamespaceStructure {
	VARIABLE : boolean;
	MySecretDatabase : {
		host : string;
		port : string;
		password : string;
	},
	MyAnotherSecretDatabase : {
		host : string;
		port : string;
		password : string;
	}
}

Deno.test( {
	name : "Testing .env.namespaces - Namespace structure",
	fn : async () => {

		const env = await loadEnv<IEnvNamespaceStructure>( {
			envPath : "./examples/.env-namespaces"
		} );

		assertEquals( false, env.VARIABLE );
		assertEquals( "won't tell you", env.MyAnotherSecretDatabase.password );

	},
	sanitizeResources : false,
	sanitizeOps : false
} );


////////////////////////////////////////////////////////////////////////////////

interface IEnvDuplicateStructure {
	VARIABLE : string;
}

Deno.test( {
	name : "Testing .env.duplicate-keys - Basic structure",
	fn : async () => {
		/** TODO assertThrowsAsync will throw

		Error: Duplicate [VARIABLE] on line 1
		Error: Duplicate [VARIABLE] on line 2
		 */
		assertEquals( 1, 1 );
	},
	sanitizeResources : false,
	sanitizeOps : false
} );


////////////////////////////////////////////////////////////////////////////////

interface IEnvPredefinedStructure {
	FIRST : string;
	SECOND : string;
	THIRD : string;
}

Deno.test( {
	name : "Testing .env.predefined - Predefined lock Structure",
	fn : async () => {
		/** TODO assertThrowsAsync will throw

		Error: Missing [SECOND] in [./examples/.env-predefined]
		 */

		assertEquals( 1, 1 );
	},
	sanitizeResources : false,
	sanitizeOps : false
} );

