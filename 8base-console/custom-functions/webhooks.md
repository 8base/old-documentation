# Webhooks

A *webhook* allows you to call *Custom Functions* as regular RESTful endpoints. They can be very useful if you integrate with a 3rd party service that posts data back to your app using a specified URL. For example, enabling a payment processing service such as Stripe or Coinbase Commerce to notify your app of a successful payment by calling *X* URL.

### 8base.yml Declaration
Webhooks have an optional parameter `path` that allows you to manually specify the final URL fragment. By default, it gets defined as the function name. 

```yaml

functions:
  #
  # Using a default path, the deployed endpoint would
  # be available when making an POST request to:
  #
  # https://api.8base.com/<WORKSPACE_ID>/webhook/paymentWebhookDefaultPath
  #
  # Declare custom webhooks like so.
	paymentWebhookDefaultPath:
		handler:
			code: src/paymentWebhook.js
		type: webhook
		method: POST
  #
  # Using a custom path, the deployed endpoint would
  # be available when making an POST request to:
  #
  # https://api.8base.com/<WORKSPACE_ID>/webhook/successful-charge-notice
  #
  # Declare custom webhooks like so.
	paymentWebhookCustomPath:
		handler:
			code: src/paymentWebhook.js
		type: webhook
		path: successful-charge-notice
		method: POST
```

All webhooks require a unique name and allow for the same function to be called from different entries. This means that `functionA` and `functionB` may both specify the same function to be called, even if they have different configurations (i.e. POST vs DELETE). You are able to deploy as many webhooks as you want to a single workspace.

### [Webhook Arguments](./README.md)

### Path Parameters
Webhook functions support the use of path parameters. Path parameters are parameters whose values are set dynamically in the endpoint's path segment, and can be accessed within the handler function. This makes the webhook incredibly dynamic, enabling the path to be used as a means of passing important data to the webhook function.

For example, lets change the last example to include a value named `customerId` in the path. This gets declared in the project's `8base.yml`.

```yaml
...
  paymentWebhookCustomPath:
    handler:
      code: src/paymentWebhook.js
    type: webhook
    # customerId path parameter
    path: '{customerId}/successful-charge-notice'
    method: POST
```

Once deployed, the updated webhook endpoint gets set to `https://api.8base.com/<WORKSPACE_ID>/webhook/{customerId}/successful-charge-notice` and allows for a `customerId` param to be accesed on the `event` argument.

```javascript
module.exports = async (event, ctx) => {
  /* Accessing pathParameters from the event object */
  let customerId = event.pathParameters.customerId;

  /* Function code*/
};
```

### Webhook Response
The format of the response object is left entirely up to the developer, giving full control over the returned HTTP status code, headers and response body.

*An HTTP `statusCode` value is required*

```javascript
return {
  statusCode: 200, // statusCode is required
  headers: {
    "x-custom-header" : "My Header Value"
  },
  body: JSON.stringify({ message: "Hello World!" })
}
```
{% hint style="info" %}
##### Getting the webhook URL

In order to get your webhook URL after you have deployed it, run `8base describe [FUNCTION_NAME]` using the CLI.
{% endhint %}

### Example

Here is an example webhook with in-code documentation to help you get started.

```javascript
/**
 * Import any dependencies. All deployed functions can utilize any dependency
 * that was declared in the projects package.json file.
 */
import gql from 'graphql-tag';

/**
 * Custom modules can get imported (and shared between functions) 
 * by importing/requiring them using relative paths.
 */
import { sendMail, GMAIL_USER } from '../../mailer';

/**
 * Inside the webhook, API calls can be executed against your 
 * workspace and 3rd party API's.
 */
const INVOICE_MUTATION = gql`
  mutation Invoice($id: ID!, $state: STRING!) {
    invoiceUpdate(data: {
    	id: $id
    	state: $state
    }) {
      id
      state
      customer {
      	name
      	email
      }
    }
  }
`;

/**
 * Webhook response objects require a statusCode attribute to be specified.
 * A response body can get specified as a stringified JSON object and any
 * custom headers set.
 */
const responseBuilder = (code=200, message=undefined, headers={}) => ({
  body: JSON.stringify({ message }),
  statusCode: code,
  headers
})

/** 
 * The webhook function's handler can be synchronous or asynchronous and
 * is always passed the event, and context (ctx) arguments.
 */
module.exports = async (event, ctx) => {
  let response

  try {
    /**
     * Access posted data on the event object:
     * {
     *   "invoiceId": <invoiceID>,
     *   "chargeType": <chargeType>
     * }
     */
    response = await ctx.api.gqlRequest(INVOICE_MUTATION, {
    	id: event.data.invoiceId
    	state: event.data.chargeType
    })
  /* Handle errors for failed GraphQL mutation */
  } catch (e) {
    return responseBuilder(422, "Failed to update invoice")
  }

  try {
  	/**
     * If the update was successful, send an email to the
     * app user notifying them.
     */
    const { invoiceUpdatenv: { customer } } = response

    /* Add email event to logs */
    console.log(`Sending email to ${customer.email}...`)

    /* Send email using imported module */
    await sendMail({
      from: GMAIL_USER,
      to: customer.email,
      subject: 'An update about your invoice',
      html: `
      	Hi ${customer.name},
      	You're invoice was just marked ${invoiceUpdate.state}
      	Thanks!
      `
    })

  /* Handle error for failed email */
  } catch (e) {
    return responseBuilder(400, 'Failed to notify user')
  }

  /* Return final success response */
  return responseBuilder(200, 'Success')
};
```
