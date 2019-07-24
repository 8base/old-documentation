The easiest way to get familiar with 8base is to run a demo application in your workspace.

### 1. Login to 8base:
Follow the link to <a href="https://app.8base.com" target="_blank">login to 8base</a>.

### 2. Create a new workspace:
You can use an existing empty workspace. However, if your workspace has data we recommend creating a new one by clicking the current workspace name in the header and selecting "New Workspace".
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7ccac88-workspace-select.png",
        "workspace-select.png",
        382,
        206,
        "#f9f9fa"
      ]
    }
  ]
}
[/block]
### 3. Install 8base CLI (<a href="https://nodejs.org/" target="_blank">node.js</a> is required):
```
npm install -g 8base
```

### 4. Clone the demo app github repo:
```
git clone https://github.com/8base/app-example.git
```

### 5. Import data schema and deploy backend logic:
```
cd app-example/server

# Login with CLI. 
# If you have multiple workspaces CLI will prompt you to select the empty one you created earlier.
# Note the API endpoint URL displayed after login - you will need it later.
8base login

# import data schema and sample data
8base import -f DEMO.json

# deploy backend logic
npm install
8base deploy
```

### 6. Run the front-end application:
```
cd ../client
npm install
REACT_APP_8BASE_API_ENDPOINT=!!INSERT_API_URL_HERE!! npm start
```

You can now login into the demo app using your username and password. 

We hope this guide helps you better understand how 8base works. Feel free to modify the data schema in your workspace, build new tables and screens to learn how to develop applications using 8base.
[block:callout]
{
  "type": "warning",
  "title": "Windows users",
  "body": "In order to be able to specify environment variables (e.g. `REACT_APP_8BASE_API_ENDPOINT`) inline on Windows you can use <a href=\"https://www.npmjs.com/package/cross-env\" target=\"_blank\">cross-env</a>:\n`npm install -g cross-env`\n\nThis will allow you to run:\n`cross-env REACT_APP_8BASE_API_ENDPOINT=!!INSERT_API_URL_HERE!! npm start`"
}
[/block]
