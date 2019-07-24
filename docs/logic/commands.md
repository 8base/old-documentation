Below are the list of commands supported by the CLI. You can always get the current list of commands using: 

`8base help`

To view individual command help:

`8base [COMMAND_NAME] help`
[block:api-header]
{
  "title": "deploy"
}
[/block]
deploy application

If you haven't authenticated yet, the `8base CLI` will ask for your credentials in interactive mode. In the future we plan to replace this with browser-base authentication.

[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base deploy",
      "language": "shell",
      "name": "deploy"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "describe"
}
[/block]
describe resulting application artifacts
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base describe",
      "language": "text",
      "name": "describe"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "help"
}
[/block]
display help
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base [COMMAND] help",
      "language": "text",
      "name": "help"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "init"
}
[/block]
configure application in current folder
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base init [DIRECTORY]",
      "language": "text",
      "name": "init"
    }
  ]
}
[/block]
Examples: 
`8base init` - initialize current folder
`8base init dir1` - create folder **dir1** and initialize
[block:api-header]
{
  "title": "invoke"
}
[/block]
invoke deployed function
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base invoke [FUNCTION NAME] [OPTIONS]\n\nOPTIONS\n  -j, --data-json\t\t\t\tinput JSON \n  -p, --data-path\t\t\t\tpath to input JSON",
      "language": "text",
      "name": "invoke"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "invoke-local"
}
[/block]
invoke function locally
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base invoke-local [FUNCTION NAME] [OPTIONS]\n\nOPTIONS\n  -j, --data-json\t\t\t\tinput JSON \n  -p, --data-path\t\t\t\tpath to input JSON",
      "language": "text",
      "name": "invoke-local"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "login"
}
[/block]
login with your 8base credentials
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base login [OPTIONS]\n\nOPTIONS\n  -e, --email\t\t\t\t\tuser email\n  -p, --password\t\t\t\tuser password ",
      "language": "text",
      "name": "login"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "logout"
}
[/block]
clears local login credentials and invalidates API session
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base logout\n",
      "language": "text",
      "name": "logout"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "logs"
}
[/block]
view function logs
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base logs [FUNCTION NAME] [OPTIONS]\n\nOPTIONS\n  -n, --num\t\t\t\t\tnumber of lines to display (default: 10, max: 100)\n  -t, --tail\t\t\t\t\tcontinually stream logs",
      "language": "text",
      "name": "logs"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "package"
}
[/block]
package application without deploying
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base package\n",
      "language": "text",
      "name": "package"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "version"
}
[/block]
output 8base CLI version
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base version\n",
      "language": "text",
      "name": "version"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "config"
}
[/block]
Advanced configuration. Currently only allows to login into a different workspace.
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base config [OPTIONS]\n\nOPTIONS\n  -w, --workspace\t\t\t\tset current workspace",
      "language": "text",
      "name": "config"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "export"
}
[/block]
Export current workspace data schema
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base export [OPTIONS]\n\nOPTIONS\n  -f, --file\t\t\t\t\tDestination file",
      "language": "text",
      "name": "config"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "import"
}
[/block]
Import table schema and/or data from a JSON file
[block:code]
{
  "codes": [
    {
      "code": "USAGE\n  8base import [OPTIONS]\n\nOPTIONS\n  -f, --file\t\t\t\t\tPath to file with schema\n  --schema\t\t\t\t\tImport schema only\n  --data\t\t\t\t\tImport data only",
      "language": "text",
      "name": "config"
    }
  ]
}
[/block]
