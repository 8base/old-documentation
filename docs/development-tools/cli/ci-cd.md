# CI/CD System

Large distributed teams usually have multiple developers working simultaneously on different features of the same application (therefore - same workspace). 
СI/CD system was implemented in order to make parallel isolated development possible for each of the developers. 

After CI/CD is enabled in your Workspace - you can create additional **Environments** inside it.
![CI/CD Switch](../images/enable-ci-cd.png)

Only **Master Environment** is available by default. 
![Master Environment](../images/master-env.png)

Process of creating new Environment (cloning it from other Environment) is called **Branching**.
 
Every Environment has individual URL/API endpoint: 
 
`https://app.8base.com/<workspace_id>_<environment_name>`
 
There is no need to add `<environment_name>` to your URL for requesting Master Environment.

## Environment rules:

1. Environments are inheritable. 
2. Manually changing of *System Part* of the parent Environment and deploying are prohibited after Branching It means that *System Part* of Master Environment can’t be changed as soon as another Environment created. 
You can read more about System and User Parts of 8base workspace/application in our [Overview](../8base-console/getting-started/getting-started.md) section.
3. You can manually change *System Part* and deploy only in inheritors (children) Environments. 
4. Every Environment can have several inheritors.
Changing/deploying to parent Environments is only possible with **Migration** logic.

## CI/CD Commands

All the the interaction with CI/CD System takes place in [8base CLI](../development-tools/cli) 
There are 3 categories of commands corressponding to 3 main components of CI/CD System  ; *Environment commands*, *Migrations commands*, and *Backup commands*.

## Environment Commands:

Environment commands.

### 1. environment branch

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
`8base environment branch -n <env_name> -m FULL/SYSTEM` - branch new environment with `<env_name>` from currently set environment in one of the two modes.

There are two modes of environment Branching are available:

1. Branching in SYSTEM mode: only [System Part](../8base-console/getting-started/getting-started.md)   of the Environment will be cloned.
Branching in FULL mode: both [System and User Parts](../8base-console/getting-started/getting-started.md) of the Environment will be cloned.

### 2. environment set
With the helps of this command you can choose and set environment to work with.

```sh
8base environment set

# DESCRIPTION
#   Set the current environment in your terminal.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --environmentName, -n The environment name of the project [string]
```

### 3. environment show
It displays currently set environment.

```sh
8base environment show

# DESCRIPTION
#   Display current environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

### 4. environment delete
It deletes specified environment

```sh
8base environment delete

# DESCRIPTION
#   Delete a workspace environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --name, -n Name of deleted environment [string][required]
```

### 5. environment list
It displays all of the workspace environments.

```sh
8base environment list

# DESCRIPTION
#   List all of your workspace environments.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

## Migrations Logic and Commands

Making changes and deploying to parent Environments is only possible with **Migration logic**.

Basically, *Migrations* are the files in the ‘migrations’ directory of your local project (`../<localProjectName>/migrations/`) which describe all the changes in [Schema and/or System/User Data](../8base-console/getting-started/getting-started.md). 

### Migration file structure:

 Filename pattern of migation is: 
`<time>-<data/<application-part>-<post-fix>.ts`

File body of migration is: 
```sh
import { Context, MigrationVersion } from "./typing.v1";
export const version: MigrationVersion = "v1";
export const up = async (context: Context) => {
};
```

`Context` - consists of functions for Schema/Data changing and function for GraphQL request execution. 

The `up` function and `version` (`v1` for the version one of migration version) variable must be defined in every migration.

There is `CiCdMigrations` table contained all the already committed  migration’s names  and code in every environment.

### Commands for migraion workflow:

### 1. migration generate

 Creates newly generated migrations files in your `migrations` local project directory.

These kind of migrations are automatically generated by the server after developer made some changes in set Environment (for example - developer creates new table with some fields in children environment). 

‘migration generate’ shall be used every time changes being made in children environment. 

So, as you can see this is convenient way for auto-tracking of changes in environments before and after they are committed. 

Developers can also manually create their own migration files and commit them directly to specified environments. 

Also, generating migrations process for such *User Data* as user tables records is a little different from the described above. 
To generate migrations for such data, you should specify table name in command argument like this: 
`migration generate -t <tableName>`
Please take a note, that this kind of migration returns whole state of requested table records without comparison it to target Environment.  


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

### 2. migration status

Command shows the difference between your local migrations files and migrations, committed to Environment (migrations of `CiCdMigrations` table). 

You can check migrations to commited with `migration status` and easily just delete  migration file if you don’t need corresponding change in your Schema/Data.

```sh
8base migration status

# DESCRIPTION
#   Display migration status.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --environment, -e Target environment [string]
```

### 3. migration commit

Applies local migrations files to target Environment. 

It is important to know that [*Custom Logic (Functions)*](../8base-console/custom-functions.md)) are being deployed at the same time with migrations files after ‘migration commit’ execution by default.

You can change default behavior by changing committing mode:
 
`FULL` mode - commits migrations files AND Custom Logic (Functions)
`ONLY_MIGRATIONS` - commits only migrations (without Custom Logic)
`ONLY_PROJECT` - commits only Custom Logic (without migration files)

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

## Backups Commands:

There is also a server feature for making backups (snapshots) of Environments in order to restore the Environment previous state in case of error.    
Backup commands.

### 1. backup create

Creates the whole backup of current environment.

Backup (snapshot) contains full state of Environment: [System and User Parts](../8base-console/getting-started/getting-started.md) at the same time. 

```sh
8base backup create

# DESCRIPTION
#   Create a new backup of the environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

### 2. backup list

Shows the backups available for current environment.
```sh
8base backup list

# DESCRIPTION
#   List all backups for environment.

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
```

### 3. backup restore

Returns the current environment to the state when it’s backup was created.

It is recommended to execute ‘migration commit’ command before backuping of Environment.

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
## Basic development workflow with CI/CD

To sum up, the basic development workflow with the use of CI/CD could be look like this: 

### Environments: 
`Master Environment` is used as production environment
`staging` environment being branched from `Master`
`dev` Environment being branched from `staging`
Isolated `feature branches` for every single developer task are being branched from `dev`

### Feature development workflow:
1. Developer branches `dev_task_1` from `dev` environment.
2. Developer executes `8base environment set -n dev_task_1`
3. Developer makes changes in the `dev-task_1` environment
4. Developer executes `8base migration generate` command (as the result he gets migration files for System Data update), check the correction of generated migration files, do changes in files if necessary 
5. Developer switches environment to parent one (`dev`) by executing
`8base environment set -n dev`
6. Developer checks the difference between `dev` and his personal feature environment `dev_task_1` by executing `8base migrations status -e dev_task_1` and makes sure only neeeded migrations will be committed.
7. Developer backups the `dev` snapshot.
8. Developer commits local migrations (and/or *Custom Logic*)   by executing `8base migration commit -e dev -m <commit-mode>`.