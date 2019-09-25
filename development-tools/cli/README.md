# CLI

The 8base Command Line Interface \(CLI\) makes it easy to generate custom functions and manage workspaces straight from the terminal. Run the following commands to get going!

## Install
```sh
# Install the CLI Globally 
$ npm install -g 8base-cli

# Ensure proper install
$ 8base -v

# See what's possible!
$ 8base -h
=>
DESCRIPTION
  The 8base Command Line Interface is a unified tool to manage your 8base workspaces services.

USAGE
  8base <command> [OPTIONS]

  Use 8base command `--help` for information on a specific command. Use 8base help topics to view a list of available help topics. The synopsis for each command shows it’s parameters and their usage. Optional options are shown in square brackets.

COMMANDS
  8base config               Allows you to select a default workspace and retrieve the API endpoint URL.
  8base deploy               Deploys project in current directory to 8base using 8base.yml config file. To use this command,
                             you must be in the root directory of your 8base project.
  8base describe [name]      Describes your 8base project’s functions and their types through 8base.yml file.
  8base export               Export current workspace data schema
  8base generate <command>   Generator for server and client side resources                                        [aliases: g]
  8base import               Import 8base schema file and data to the current - or specified - workspace.
  8base init                 Initializes a new project with example directory structure and custom functions.
  8base invoke <name>        Invokes a custom function in the production workspace.
  8base invoke-local <name>  Invokes the custom function in the local development workspace.
  8base login                Authenticates the command line user by letting them log into an 8base account.
  8base logout               Clears local login credentials and invalidates API session.
  8base logs                 Authenticates the command line user by letting them log into an 8base account.
  8base package              Package 8base application without deploying it.

OPTIONS
  --version, -v  Show version number
  --debug, -d    Turn on debug logs
  --help, -h     Show help
```

You can check that it was installed successfully by running:

```text
8base help
```
