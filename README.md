# DotEnv File  [![Deno ci](https://github.com/Hellsos/deno-dotenv-file/workflows/CI/badge.svg)](https://github.com/Hellsos/deno-dotenv-file)

A library for Deno parsing .env file into object oriented structure making it more friendly for working in IDEs.

## Usage

Setup **.env** file.

````
# .env

Debug = false

MasterDatabase:host = 'host'
MasterDatabase:port = 'port'
MasterDatabase:password = 'secret'
````

Define interface structure of **.env** file, load and print out the structure.

````ts
// app.ts
import { loadEnv } from "https://deno.land/x/dotenvfile/mod.ts";

interface IEnvStructure {
	Debug : boolean;
	MasterDatabase : {
		host: string;
		port: string;
		password: string;
	}
}

const env = await loadEnv<IEnvStructure>();

console.log( env ); // Printing parsed object from .env
console.log('Host is:',  env.MasterDatabase.host ); // Printing MasterDatabase:host value

````

Then execute in your app. `deno run --allow-read=.env app.ts`.

````
{ 
    Debug: false, 
    MasterDatabase: { 
        host: "host", 
        port: "port", 
        password: "secret"
    } 
}

Host is: host
````

## Options

- `envPath?: string`: Optional path to `.env` file. Default value is `.env`.
- `envLockPath?: string|null`: Optional path to `.env.lock` file. Default value is `null`. If there is path defined, parser will determine whether `.env` has present keys defined in `.env.lock` and in case of missing ones will throw an error. 
- `errorOnDuplicateKey?: boolean`: Set to `false` will no longer throw an error when there is duplicity in `.env` variables. Default value is `true`.


## Advanced Usage

### .env.lock file

Using `.env.lock` file to define mandatory variables which has to be present in `.env` file.

This scenario is often used in situations, where you don't want to publish files which does contain credentials or any secret data into your repository but you still need to ensure that `.env` file has all variables it needs before starting your application.

For this situation there is `.env.lock` file which does not contain any secret or config data but variable names which must be set in `.env` file. In case of missing variable it will throw an error.

Setup **.env** and **.env.lock** file.

````
# .env

Example = 'Value'
````
````
# .env.lock

Example =
MandatoryVariable =
AnotherMandatoryVariable:nested =
````

Define interface structure of **.env.lock** file, load and try to print out parsed structure.

````ts
// app.ts
import { loadEnv } from "https://deno.land/x/dotenvfile/mod.ts";

interface IEnvStructure {
    Example : string;
    MandatoryVariable : string;
    AnotherMandatoryVariable : {
        nested : string
    };
}

const env = await loadEnv<IEnvStructure>({
    envLockPath: '.env.lock'
});

console.log( env );
````

Then execute in your app. `deno run --allow-read=.env,.env.lock app.ts`.
In this case it will lead to throwing an error because of missing variables `MandatoryVariable` and `AnotherMandatoryVariable:nested` defined in `.env.lock` file.

````
error: Uncaught 
Error: Missing [MandatoryVariable] in [.env]
Error: Missing [AnotherMandatoryVariable:nested] in [.env]
````

### Run tests
 
`deno test --allow-read=examples`
