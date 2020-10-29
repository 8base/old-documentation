# CI/CD Commands

CI/CD commands help developers set up and manage their CI/CD flows using from the terminal. There are 3 command categories that are relevant to CI/CD; *environment*, *migrations*, and *backup*.

## Environment Commands

Environment commands.

### environment branch

```sh
8base environment branch

# DESCRIPTION
#   Create new branch from current environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --name, -n Name of new environment [string][required]
#   --mode, -m The deploy mode [string][choices: "full", "system"] [default: "FULL"]
```


### environment delete

```sh
8base environment delete

# DESCRIPTION
#   Delete a workspace environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --name, -n Name of deleted environment [string][required]
```

### environment list

```sh
8base environment list

# DESCRIPTION
#   List all of your workspace environments.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

### environment set

```sh
8base environment set

# DESCRIPTION
#   Set the current environment in your terminal.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --environmentName, -n The environment name of the project [string]
```

### environment show

```sh
8base environment show

# DESCRIPTION
#   Display current environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

## Migration Commands

Migration commands.

### migration commit

```sh
8base migration commit

# DESCRIPTION
#   Deploys migration in the 'migrations' directory to 8base. To use this command, you must be in the root directory of your 8base
#   project.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --mode, -m Commit mode. [string][choices: "FULL", "ONLY_MIGRATIONS", "ONLY_PROJECTS"] [default: "FULL"]
#   --force, -f You can specify force flag to commit to master without prompt.
#   --environment, -e Specify the environment you want to commit. [string]
```

### migration generate

```sh
8base migration plan

# DESCRIPTION
#   Get committed migrations.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --dist The folder of migrations [string][default: "./migrations"]
#   --tables, -t Specify table names to generate migrations for data. [array]
#   --environment, -e Target environment [string]
```

### migration status

```sh
8base migration status

# DESCRIPTION
#   Display migration status.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --environment, -e Target environment [string]
```

## Backup Commands

Backup commands.

### backup create

```sh
8base backup create

# DESCRIPTION
#   Create a new backup of the environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

### backup export

```sh
8base backup export

# DESCRIPTION
#   Generate export url for backup.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --environment, -e Target environment [string][required]
#   --backup, -b Target backup name [string][required]
```

### backup import

```sh
8base backup import

# DESCRIPTION
#   Enroll external backup to environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --environment, -e Target environment name. [string][required]
#   --url, -u External backup url. [string][required]
```

### backup list

```sh
8base backup list

# DESCRIPTION
#   List all backups for environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

### backup restore

```sh
8base backup restore [OPTIONS].

# DESCRIPTION
#   Restore environment to backup.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --backup, -b The name of the target backup [string][required]
#   --environment, -e Target environment name [string][required]
```
