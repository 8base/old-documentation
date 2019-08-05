# Commands

Below are the list of commands supported by the CLI. You can always get the current list of commands using:

`8base help`

To view individual command help:

`8base [COMMAND_NAME] help` 

### deploy
Deploy an application.

```sh
8base deploy
```

### describe
Describe resulting application artifacts.

```sh
8base describe
```

### help
Display help. 

```sh
8base [COMMAND] help
```

### init
Initialize 8base application in current folder.

```sh
8base init [DIRECTORY]
```

> Examples: `8base init` - initialize current folder `8base init my-project` - create folder **my-project** and initialize 

### invoke
Invoke deployed function.

```sh
8base invoke [FUNCTION NAME] [OPTIONS]
```
OPTIONS
 * -j, --data-json input JSON 
 * -p, --data-path path to input JSON

### invoke-local
Invoke function locally.

```sh
  8base invoke-local [FUNCTION NAME] [OPTIONS]
```

OPTIONS
 * -j, --data-json input JSON 
 * -p, --data-path path to input JSON

### login
Login with your 8base credentials.

```sh
8base login [OPTIONS]
```

OPTIONS
 * -e, --email user email
 * -p, --password user password

### logout
Clears local login credentials and invalidates API session.

```sh
8base logout
```

### logs
View function logs.

```sh
8base logs [FUNCTION NAME] [OPTIONS]
```

OPTIONS
 * -n, --num number of lines to display (default: 10, max: 100) 
 * -t, --tail continually stream logs

### package
Package application without deploying .
 
`8base package`

### version
Output 8base CLI version.

```sh
8base version
```

### config
Advanced configuration. Currently only allows to login into a different workspace. 

`8base config [OPTIONS]`

OPTIONS
 * -w, --workspace set current workspace

### export
Export current workspace data schema.

`8base export [OPTIONS]`

OPTIONS
 * -f, --file Destination file

### import
Import table schema and/or data from a JSON file.

```sh
8base import OPTIONS
```

OPTIONS 
 * -f, --file Path to file with schema
 * --schema Import schema only
 * --data Import data only

