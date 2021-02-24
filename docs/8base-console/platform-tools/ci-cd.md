# Continuous Integration & Continuous Deployment (CI/CD)

8base built CI/CD capabilities natively into the workspace to help developers and teams easily management professional software quality controls when developing their applications. On subscription plans where CI/CD is enabled, developers will be able to create up to a specified number of enviroments and graduate changes through their environment pipeline in a [Git](https://git-scm.com/) like fashion.

## Getting Started with CI/CD

Make sure that the workspace for which you want CI/CD is subscribed to an [8base plan](https://www.8base.com/pricing) where the feature is enabled. Additionally, ensure that you have the latest version of the 8base CLI installed (or a version later than 0.0.98)

```sh
npm install -g 8base-cli
```

## Creating New Environments

When creating new *Environments*, you are able to specify whether you just want to copy the system configuration into the new environment (Tables, Functions, Roles, etc.) or whether you want to copy the system configuration and all data records.

To create a new environment, use the following command.

```sh
8base environment branch

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --name, -n Name of new environment [string][required]
#   --mode, -m The deploy mode [string][choices: "full", "system"] [default: "FULL"]
```

Once the new environment is created you will automatically be moved into it. At any time you can check the current environment by running `8base environment show`.

## Switching between Environments

You can switch between environments when using the CLI by running the following set command and selecting from the terminal list.

```sh
8base environment set
```

## Deleting Environments

To delete an environment, run the following command - keeping in mind the *Master* environment cannot be deleted.

```sh
8base environment delete -n [BRANCH_NAME]
```

_**Note: For a list of all environment commands with their associated options, run `8base environment --help` in your terminal.**_

## Generating Migrations

When changes have been made to your current workspace environment and you're ready to migrate them to a different environment, you'll want to generate a migration file that captures all the changes that have been made. To do so, run the following command:

```sh
8base migration generate

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --dist The folder of migrations [string][default: "./migrations"]
#   --tables, -t Specify table names to generate migrations for data. [array]
#   --environment, -e Target environment
```

Once successfully run, a timestamped migrations script will appear in a directory called `migrations` that's in the root of your project.

## Committing Migrations

Once a migration has been generated, you'll be able to commit it so that the changes propogate to the specified environment. This can be accomplished using the following command:

```sh
8base migration commit

# OPTIONS
#   --debug, -d Turn on debug logs [boolean]
#   --help, -h Show help [boolean]
#   --mode, -m Commit mode. [string][choices: "FULL", "ONLY_MIGRATIONS", "ONLY_PROJECT"] [default: "FULL"]
#   --force, -f You can specify force flag to commit to master without prompt.
#   --environment, -e Specify the environment you want to commit.
```

If you are committing changes to the master branch, you will be prompted to confirm the changes. Otherwise, the commit will take place without any confirmation.

_**Note: For a list of all migration commands with their associated options, run `8base migration --help` in your terminal.**_


## Handling Backups

Sometimes you'll want to take a snapshot of an environment in order to easily restore it at a later date or save it for later reference. This can be accomplished using the following backup commands.

```sh
# Create backup for environment
8base backup create

# List all backups for environment
8base backup list

# Restore environment to backup
8base backup restore
```


