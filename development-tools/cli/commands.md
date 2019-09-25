# CLI Commands

Below is a list of available CLI commands. You can always get the most current list of commands using the CLI. Just run:

```sh
# See all commands
$ 8base --help

# Detail specific command
$ 8base [COMMAND_NAME] --help
```

### Commands
When running CLI commands, certain option flags are always available. Currently, they are:

OPTIONS:  
* `--debug`, `-d`  Turn on debug logs                                                     
* `--help`, `-h`   Show help descriptions

##### deploy
Deploys project in current directory to 8base using `8base.yml` config file. To use this command, you must be in the root directory of your 8base project.

```sh
$ 8base deploy [OPTIONS]
```

##### describe
Describes your 8base project’s functions and their types through 8base.yml file, as well as retrieve your workspace endpoint.

```sh
$ 8base describe [OPTIONS]
```

##### init
Initializes a new project with suggested directory structure and example custom functions.

```sh
$ 8base init [PROJECT_NAME]
```

OPTIONS:   
* `--functions`, `-f`  	List of functions - type: array, default: 'resolver:resolver', 'task:task', 'webhook:webhook', 'trigger:trigger']
* `--empty`, `-e` 		Skip examples - type: boolean, default: false
* `--mocks`, `-x`     	Included mocks dir and files - type:boolean, default: true
* `--syntax`, `-s`  	Syntax for the generated file - type: string, default: 'ts', allowed: 'js', 'ts'
* `--silent`        	Disable printing extra info to the console - type: boolean, default: false

##### generate
Generate projects, functions, and some client side resources

```sh
$ 8base generate [RESOURCE_NAME] [OPTIONS]
```

Generators deserve a section of their own! Check it out [here](./generators.md).

##### invoke
Invokes a custom function in the production workspace.

```sh
$ 8base invoke [FUNCTION NAME] [OPTIONS]
```
OPTIONS:
* `--data-json`, `-j`  Input JSON - type: string
* `--data-path`, `-p`  Path to input - type: path
* `--mock`, `-m`       Name of the mock file - type: string

##### invoke-local
Invokes the custom function in the local development workspace.

```sh
$ 8base invoke-local [FUNCTION NAME] [OPTIONS]
```

OPTIONS: 
* `--data-json`, `-j`  Input JSON - type: string
* `--data-path`, `-p`  Path to input - type: path
* `--mock`, `-m`       Name of the mock file - type: string

##### login
Authenticates the command line user by letting them log into an 8base account.

```sh
$ 8base login [OPTIONS]
```

OPTIONS:  
* `-e`, `--email`	 User email - type: string
* `-p`, `--password` User password - type: string

EXAMPLES:
* `8base login`
* `8base login -e my@email.com -p S3cretP@ssw0rd`

##### logout
Clears local login credentials and invalidates API session.

```sh
$ 8base logout
```

##### logs
View a specific functions production logs.

```sh
$ 8base logs [FUNCTION NAME] [OPTIONS]
```

OPTIONS: 
* `-n`, `--num` 	Number of lines to display - type: sting, default: 10, max: 100 
* `-t`, `--tail` 	Continually stream logs - type: boolean

##### package
Package 8base application without deploying it.
 
```sh
$ 8base package [OPTIONS]
```

##### version
Output 8base CLI version.

```sh
$ 8base version
```

##### config
Allows you to select a default workspace and retrieve the API endpoint URL. 

```sh
$ 8base config [OPTIONS]
```

OPTIONS:
* `-w`, `--workspace` set current workspace

##### export
Export current - or specified - workspace data schema to a local file

```sh
$ 8base export [OPTIONS]
```

OPTIONS:  
* `-f`, `--file` 		Destination file
* `-w`, `--workspace`  	Custom workspace id

##### import
Import 8base schema file and data to the current - or specified - workspace.

```sh
8base import OPTIONS
```

OPTIONS:
* `-f`, `--file` 		Path to file with schema - type: string, required: true
* `--schema` 			Import schema only - type: boolean, default: true
* `--data` 				Import data only - type: boolean, default: true
* `-w`, `--workspace`   Specify workspace id - type: string
