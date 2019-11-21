# Generators

Generators are awesome. Essentially, they can be used to reliably scaffold application resources—like custom functions—that can then be customized. Relying on generators will also help ensure that your project directories stay organized.

### Commands
When running `8base generate [COMMAND]`, certain option flags are always available. Currently, they are:

OPTIONS:  
* `--debug`, `-d`  	Turn on debug logs                                                     
* `--help`, `-h` 	Show help descriptions
* `--silent` 	    Disable printing extra info to the console

Let's walk through a few examples of using generators.

### Custom Functions
Custom function generators will add all the files required for a given type, along with boiler-plate code.

##### Resolvers
Generate a custom resolver function.

```sh
$ 8base generate resolver [FUNCTION_NAME] [OPTIONS]
```

OPTIONS:
* `--mocks`, `-x`	Included mocks dir and files — type: boolean, default: true
* `--syntax`, `-s`  Syntax for the generated file — type: string, default: 'ts', allowed: ['js', 'ts']

EXAMPLE: 
```sh
$ 8base generate resolver myNewResolver --syntax='ts' --mocks=true

=>
Updated file 8base.yml
Created file src/resolvers/myNewResolver/handler.ts
Created file src/resolvers/myNewResolver/mocks/request.json
Created file src/resolvers/myNewResolver/schema.graphql

Boom! Your new myNewResolver function has been successfully generated. To add any required settings, check out its configuration block in your projects 8base.yml file.

generate done. Time: 18 ms.
```

##### Webhooks
Generate a custom webhook function.

```sh
$ 8base generate webhook [FUNCTION_NAME] [OPTIONS]
```

OPTIONS:
* `--path`, `-p`    Path for the url (https:<endpoint>/<PATH>) — type: string
* `--method`, `-m`  HTTP verb to invoke the function — type: string, allowed: ['POST', 'GET', 'DELETE', 'PUT']
* `--mocks`, `-x`	Included mocks dir and files — type: boolean, default: true
* `--syntax`, `-s`  Syntax for the generated file — type: string, default: 'ts', allowed: ['js', 'ts']

EXAMPLE: 
```sh
$ 8base generate webhook myNewWebhook --method='GET' --path='friends/{id}' --syntax='ts' --mocks=true

=>
Updated file 8base.yml
Created file src/webhooks/myNewWebhook/handler.ts
Created file src/webhooks/myNewWebhook/mocks/request.json

Boom! Your new myNewWebhook function has been successfully generated. To add any required settings, check out its configuration block in your projects 8base.yml file.

generate done. Time: 12 ms.
```

##### Trigger
Generate a custom trigger function.

```sh
$ 8base generate trigger [FUNCTION_NAME] [OPTIONS]
```

OPTIONS:
* `--type`, `-t` 	   	The trigger type — type: string, allowed: ['before', 'after']
* `--operation`, `-o`   Operation that invokes the trigger — type: string
* `--mocks`, `-x`		Included mocks dir and files — type: boolean, default: true
* `--syntax`, `-s`  	Syntax for the generated file — type: string, default: 'ts', allowed: ['js', 'ts']

EXAMPLE:
```sh
$ 8base generate trigger myNewTrigger --operation='User.update' --type='after' --syntax='ts' --mocks=true

=>
Updated file 8base.yml
Created file src/triggers/myNewTrigger/handler.ts
Created file src/triggers/myNewTrigger/mocks/request.json

Boom! Your new myNewTrigger function has been successfully generated. To add any required settings, check out its configuration block in your projects 8base.yml file.

generate done. Time: 14 ms.
```

##### Task
Generate a custom task function.

```sh
$ 8base generate task [FUNCTION_NAME] [OPTIONS]
```

OPTIONS:
* `--schedule`, `--sch`  Schedule on which the task runs — type: string
* `--mocks`, `-x`		Included mocks dir and files — type: boolean, default: true
* `--syntax`, `-s`  	Syntax for the generated file — type: string, default: 'ts', allowed: ['js', 'ts']

EXAMPLE:
```sh
$ 8base generate task myNewTask --schedule='rate(1 day)' --syntax='ts' --mocks=true

=>
Updated file 8base.yml
Created file src/tasks/myNewTask/handler.ts
Created file src/tasks/myNewTask/mocks/request.json

Boom! Your new myNewTask function has been successfully generated. To add any required settings, check out its configuration block in your projects 8base.yml file.

generate done. Time: 11 ms.
```

##### Mock
Generate a mock for a custom function.

```sh
$ 8base generate mock [FUNCTION_NAME] [OPTIONS]
```

OPTIONS:
* `--mockName`, `-m`    Name of the mock request — type: string, default: 'request'
* `--syntax`, `-s`  	Syntax for the generated file — type: string, default: 'ts', allowed: ['js', 'ts']

EXAMPLE:
```sh
# NOTE: The function name is the function your generating a mock for!
$ 8base generate mock myNewResolver --mockName='success'

=>
Created file src/resolvers/myNewResolver/mocks/success.json

Boom! Your new success request mock has been successfully generated.

generate done. Time: 10 ms.
```

### Client Side
Application generators can be used for building 'starter-app-like' skeletons in supported frameworks. Please note that this feature is highly experimental on our part!

##### App
Generate a starter app in a specified framework.

```sh
$ 8base generate app [PROJECT_NAME]
```

Currently, only ReactJs is supported and the application template can be found [here](https://github.com/8base/react-app-starter).

##### Scaffold
Scaffold client side resources for a given table resource.

```sh
$ 8base generate scaffold [TABLE_NAME] [OPTIONS]
```

OPTIONS:
* `--depth`	Depth of the generated query — type: number, default: 1

EXAMPLE:
```sh
# NOTE: The table name is in your workspace.
$ 8base generate scaffold myTable --depth=1

=>
✔ Choose table fields › createdAt, field1, relationship1
✔ Choose form fields › field1, relationship1

src/routes/boards/BoardCreateDialog.js
src/routes/boards/BoardEditDialog.js
src/routes/boards/BoardDeleteDialog.js
src/routes/boards/BoardsTable.js
src/routes/boards/index.js
src/Root.js

Boards was successfully created

generate done. Time: 30,186 ms.
```
