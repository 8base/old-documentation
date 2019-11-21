# Debugging

Custom Functions (CFs) can be debugged in production and when developing locally. While there are many ways to debug code, and specific IDEs that provide special tooling, here we're addressing the most general ways to debug custom functions in 8base.

### Production Debugging
![Production logs for custom functions](../../.gitbook/assets/cf-searching-logs.gif)

When a CF is deployed to a workspace it becomes visible in the `Logic` screen on the 8base console. This both confirms that the function was successfully deployed and is where the CFs execution logs can be reviewed and tailed in real-time. Logs report each request uniquely.

```bash
START RequestId: 250be4db-cac4-425a-9d4c-24f94ccefd7f Version: $LATEST
END RequestId: 250be4db-cac4-425a-9d4c-24f94ccefd7f
REPORT RequestId: 250be4db-cac4-425a-9d4c-24f94ccefd7f Duration: 0.54 ms Billed Duration: 100 ms Memory Size: 1536 MB Max Memory Used: 88 MB XRAY TraceId: 1-5d794811-0a64a1f6f0c03eb43a0df3b0 SegmentId: 3353cda75bd91f53 Sampled: false
``` 

Using the `console.log` and `console.error` methods inside of a CF will output any given argument to the execution logs. Knowing this, a developer has the flexibility to enrich their logs as needed, as well as output arguments for debugging purposes.

```javascript
export default async (event: any, ctx: any) : Promise<LocalizeResult> => {
  /* To inspecting the event.data object in production */
  console.log('DEBUG: ', event.data);
  // more code
```

### Local Debugging
The suggested method for debugging CFs locally requires a Chrome browser. Once installed, add this script to the project’s package.json file:

```json
"scripts": {
  "debug": "node --inspect $(npm root -g)/8base-cli/dist/index.js "
}
```

The script runs `node --inspect`, and then finds the path to the `8base-cli` package installed globally on the machine - building a path to the executable (e.g., `/usr/local/lib/node_modules/8base-cli/dist/index.js`). Whether yarn or npm is being used won’t matter.

Next, place a `debugger` in the code where you want to pause the execution. When debugging an error, insure that the `debugger` is placed *before* error occurs.

```javascript
export default async (event: any, ctx: any) : Promise<LocalizeResult> => {
  // some code
  debugger;
  // some error.
  new DontExist({ something: 'is wrong' });
```

Before invoking the CF, open Chrome and visit `chrome://inspect`. Click the *Open dedicated DevTools for Node* link. The window that opens is the Chrome developer console where you’re debugger will be stopped.

You can now start debugging the function using the `invoke-local` command.

```bash
npm run debug invoke-local FUNCTION_NAME -p /path/to/mock.json
# or
yarn debug invoke-local FUNCTION_NAME -p /path/to/mock.json
```

When `invoke-local` is called, the 8base CLI first builds the code before running it. Therefore, it's always the **built** code that is being debugged. This is why the source script being debugged, when shown in the Chrome window, might look unfamiliar.

Know that this doesn't affect any access to scope for the `debugger`, but imported modules and function arguments might have been assigned abstracted names. If you want to inspect a module, it’s better to assign it to a variable so that the name will be the same. For example;

```javascript
import AWS from 'aws-sdk';

export default async (event: any, ctx: any) : Promise<LocalizeResult> => {
  // Want to inspect the AWS module?
  const aws = AWS;
  // Now in the debugger you can be sure aws variable is available.
  debugger;
  // more code
```
