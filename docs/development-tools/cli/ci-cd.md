#  CI/CD Commands

Below is a list of available CI/CD commands. You can always get the most current list of commands using the CLI. Just run:

```sh
# See all commands
$ 8base --help

# Detail specific command
$ 8base [COMMAND_NAME] --help
```

Please checkout [CI/CD System](/docs/8base-console/platform-tools/ci-cd) section to know more about how it works.

### Environment Commands

##### 1. environment branch

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

Using example:
```
# Branch new environment with `<env_name>` from currently set environment in one of the two modes.

8base environment branch -n <env_name> -m FULL/SYSTEM
```

Checkout [this](/docs/8base-console/platform-tools/ci-cd#environment-commands) section to know more about branching modes.

##### 2. environment set

This command selects and sets the current working environment.

```sh
8base environment set

# DESCRIPTION
#   Set the current environment in your terminal.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --environmentName, -n The environment name of the project [string]
```

##### 3. environment show

Displays currently set environment.

```sh
8base environment show

# DESCRIPTION
#   Display current environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

##### 4. environment delete

Deletes a named environment.

```sh
8base environment delete

# DESCRIPTION
#   Delete a workspace environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --name, -n Name of deleted environment [string][required]
```

##### 5. environment list

Displays all environments in the current workspace.

```sh
8base environment list

# DESCRIPTION
#   List all of your workspace environments.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

### Commands for migration workflow

##### 1. migration generate

```
# Generates new migration files in your local `migrations` project directory.

migration generate
```

```sh
8base migration generate

# DESCRIPTION
#   Get committed migrations.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --dist The folder of migrations [string][default: "./migrations"]
#   --tables, -t Specify table names to generate migrations for data. [array]
#   --environment, -e Target environment [string]
```

##### 2. migration status


```sh
8base migration status

# DESCRIPTION
#   Display migration status.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --environment, -e Target environment [string]
```

##### 3. migration commit

Applies local migrations files to target Environment.

```sh
8base migration commit

# DESCRIPTION
#   Deploys migration in the 'migrations' directory to 8base. To use this command, you must be in the root directory of your 8base
#   project.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --mode, -m Commit mode. [string][choices: "FULL", "ONLY_MIGRATIONS", "ONLY_PROJECT"] [default: "FULL"]
#   --force, -f You can specify force flag to commit to master without prompt.
#   --environment, -e Specify the environment you want to commit. [string]
```

### Backups Commands

##### 1. backup create

```sh
8base backup create

# DESCRIPTION
#   Create a new backup of the environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

##### 2. backup list


```sh
8base backup list

# DESCRIPTION
#   List all backups for environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

##### 3. backup restore

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