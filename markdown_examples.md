---
description: EXAMPLE OF ALL MARKDOWN COMPONENTS FOR DOCUMENTATION DEVELOPMENT
---

# NOT FOR DOCUMENTATION

Paragraphs look like this.

## Heading 1

### Heading 2

#### Heading 3

* Bulleted
* Lists
* Like
* This

1. Ordered
2. Lists
3. Like
4. This

* [ ] This is
* [ ] a task
* [ ] list

```javascript
function thisIsJavaScriptCode() {}
```

```typescript
const TypeScript = (arg: string) => {}
```

> Nothing like a quote

![Check out this logo and caption](.gitbook/assets/8base-logo.png)

| Table Header 1 | Table Header 2 |
| :--- | :--- |
| Something | Important |

{% hint style="info" %}
Just to give you a hint!
{% endhint %}

This is a link to a page!

{% page-ref page="not-for-documentation.md" %}

{% api-method method="get" host="" path="" %}
{% api-method-summary %}
An epic tool for API Endpoints and Responses!
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="" type="string" required=false %}

{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% tabs %}
{% tab title="First Tab" %}
Tabs can also 
{% endtab %}

{% tab title="Second Tab" %}
Be super userful
{% endtab %}
{% endtabs %}

$$
a + (Math stuff) = a well formatted equation
$$

{% file src=".gitbook/assets/8base-logo.png" caption="This is what an uploaded file looks like \(filename here\)" %}


# Code Tabs 
{% code-tabs %}
{% code-tabs-item title="Bash" %}
```bash

```
{% endcode-tabs-item %}

{% code-tabs-item title="JavaScript" %}
```javascript

```
{% endcode-tabs-item %}

{% code-tabs-item title="Python" %}
```python

```
{% endcode-tabs-item %}
{% endcode-tabs %}
