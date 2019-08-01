# Webhooks

Webhooks allow you to expose *Custom Functions* as regular RESTful endpoints. They can be very useful if you integrate with a 3rd party service that posts data back to your app using a specified URL. For example, enabling a payment processing service such as Stripe or Coinbase Commerce to notify your app of a successful payment by calling *X* URL.

### 8base.yml Declaration
Webhooks have an optional parameter `path` that allows you to manually specify the final URL fragment. By default, it gets defined as the function name. 

```yaml
functions:
  #
  # Using a default path, the deployed endpoint would
  # be available when making an POST request to:
  #
  # https://api.8base.com/<WORKSPACE_ID>/paymentWebhookDefaultPath
  #
	paymentWebhookDefaultPath:
		handler:
			code: src/paymentWebhook.js
		type: webhook
		method: POST
  #
  # Using a custom path, the deployed endpoint would
  # be available when making an POST request to:
  #
  # https://api.8base.com/<WORKSPACE_ID>/successful-charge-notice
  #
		paymentWebhookCustomPath:
		handler:
			code: src/paymentWebhook.js
		type: webhook
		path: successful-charge-notice
		method: POST
```

All webhooks require is a unique name and allow for the same function to be called from different entries. This means that `functionA` and `functionB` may both specify the same function to be called, even if they different configurations (i.e. POST vs DELETE). You are able to deploy as many webhooks as you want to a single workspace. 


### Webhook Arguments

##### event
When called, 8base will attempt to parse request body and query string and add parsed values to `event.data`. However, the raw request body will always be available on at `event.body`. A webhook's `event` argument can be expected to have the following structure:

```json
{
	"event": {
	  "data": {
	    "arg1": "arg1 value",
	    "arg2": "arg2 value"
	  },
	  "headers": {
	    "x-header-1": "header value"
	  },
	  "body": "raw request body"
	}
}
```
##### ctx
The context argument - `ctx` - exposes the 8base GraphQL API. It can be used to run Queries and Mutations from inside the webhook or to call other custom functions.

```javascript
// Code...
ctx.api.gqlRequest(QUERY, { ...parameters });
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

### Examples

Here is an example webhook with in code documentation to help you get started.

```javascript
// Import any dependencies
import gql from 'graphql-tag';

// Import custom module that handles sending emails
import { sendMail, GMAIL_USER } from '../../mailer';

// Write a GraphQL mutation for updating the state of the invoice.
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

// Define an asynchronous webhook handler function.
module.exports = async (event, ctx) => {
	// Define response placeholder var
  let response

  try {
  	// Expecting payload on event of:
  	//
  	// {
  	//		"invoiceId": <invoiceID>,
  	//		"chargeType": <chargeType>   	
  	// }
  	//
    response = await ctx.api.gqlRequest(INVOICE_MUTATION, { 
    	id: event.data.invoiceId 
    	state: event.data.chargeType
    })
  // Handle error for failed GraphQL mutation
  } catch (e) {
    return { 
	  	data: { 
	  		success: false 
	  	}
	  }
  }

  try {
  	// If the update was successful, send an email to the
  	// app user notifying them.
    const { invoiceUpdatenv: { customer } } = response
    
    // Add email event to logs
    console.log(`Sending email to ${customer.email}...`)
    
    // Send email using imported module
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

  // Handle error for failed email
  } catch (e) {
    return { 
    	data: { 
    		success: false
    	}
    }
  }

  // Return final success response
  return { 
  	data: { 
  		success: true 
  	} 
  }
};
```



