# Subscriptions

Subscriptions let your client-side application receive server-side events from the 8base platform. This is useful when you are building real-time functionality such as chats or notifications. Subscriptions are automatically generated for every data table you create.

Apollo Client provides a standard way to use subscriptions, but some additional configuration needs to be implemented in order to connect to the Websocket endpoint. However, if you are using [EightBaseAppProvider](https://github.com/8base/sdk/tree/master/packages/app-provider) from 8base open-source SDK it does all the configuration for you and you can start using subscriptions out of the box. 

## Example

```javascript
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';

const CHAT_MESSAGE_SUBSCRIPTION = gql`
  subscription onChatMessageAdded($chatId: String!) {
    ChatMessage(filter: {
      mutation_in: [create],
      node: {
        chatId: {
          equals: $chatId
        }
      }
    }) {
      node {
        createdAt
        createdBy {
          firstName
          lastName
        }
        text
      }
    }
  }
`;

const NewChatMessage = ({ chatId }) => (
  <Subscription
    subscription={CHAT_MESSAGE_SUBSCRIPTION}
    variables={{ chatId }}
  >
    {({ data: { ChatMessage }, loading }) => (
      <div>New message: {!loading && ChatMessage.text}</div>
    )}
  </Subscription>
);
```