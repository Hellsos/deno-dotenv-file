import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";

import { loadEnv } from "./src/dotenv.ts";

interface IEnvStructure {
	VARIABLE : boolean;
}

Deno.test( {
	name : "Testing .env structure",
	fn : async () => {
		const mockStructure = {
			VARIABLE : false
		};

		const env = await loadEnv<IEnvStructure>( {
			envPath : "./examples/.env"
		} );

		assertEquals( env.VARIABLE, mockStructure.VARIABLE );
	},
	sanitizeResources : false,
	sanitizeOps : false
} );
