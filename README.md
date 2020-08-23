# Envfile

A Library for Deno parsing dotenv file making it more friendly for IDEs

# Usage

setup .env file 

define interface structure of output

loadEnv

use anywhere in your app


### Options

envPath | string | optional | null

envLockPath | string | optional | null

errorOnDuplicatedKey | boolean | optional | true


## Advanced Usage

.env structure namespaces

using .env.lock to define mandatory variables (mostly this file does not contain values, just variable names and in case of missing key in .env file it will throw an error)

### Run tests
 
`deno test --allow-read=examples`
