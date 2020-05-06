*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Mutating multiple records using filters
You can update multiple table records using 8base's auto-generated GraphQL mutation operations.

***Note**: Some examples might use [aliases](./) to show side by side the use of `data.id` versus `filter`. All examples work without aliases.*

##### Updating all post's titles published before a given day
Prefix the title of every post published before a specific date with the string "LEGACY: ". 

```javascript
mutation {
  postUpdateByFilter(
  data: {
    title: {
      prefix: "LEGACY: "
    }
  },
  filter: {
    publishingDate: {
      lt: "2020-06-05"
    }
  }) {
    count
    items {
      title
    }
  }
}
```

```json
{
  "data": {
    "postUpdateByFilter": {
      "count": 3,
      "items": [
        {
          "title": "LEGACY: My Post"
        },
        {
          "title": "LEGACY: My Other Post"
        },
        {
          "title": "LEGACY: My Other Awesome Post"
        }
      ]
    }
  }
}
```

### Field Type Predicates
When using the `tableNameUpdateByFilter` operation, different field types have different functions that can be used. 

**NOTE: When running the updateByFilter operation, only one coercive method can be used at a time per field.**

##### String
* **prefix**: String - Prepends a supplied string to the field's existing value.
* **postfix**: String - Appends a supplied string to the field's existing value.
* **set**: String - Sets a supplied string as the field's new value.

**Example**
```graphql
mutation {
  postUpdateByFilter(
  data: {
    aTextTypeField: {
      postfix: " - ADD ME AFTER"
    }
  }) {
		items {
      aTextTypeField
    }
  }
}
```

##### Number
* **add**: Int - Adds a supplied Int to the field's existing value.
* **sub**: Int - Subtracts a supplied Int from the field's existing value.
* **mult**: Int - Multiply a supplied Int by the field's existing value.
* **dev**: Int - Divide the field's existing value by a supplied Int.
* **mod**: Int - Modulo the field's existing value by a supplied Int.
* **set**: Int - Sets a supplied Int as the field's new value.
* **pow**: Int - Raise the field's existing value to the exponent of a supplied Int.
* **sqrt**: Boolean - Set the field's existing value to its square root (use `true` or `false`)

**Example**
```graphql
mutation {
  postUpdateByFilter(
  data: {
    aNumberTypeField: {
      pow: 10
    }
  }) {
		items {
      aNumberTypeField
    }
  }
}
```

##### Date
* **set**: String - Sets a supplied Date as the field's new value.
* **add**: UpdateByFilterDatePartsInput - Adds a given number of Days, Months, Years, Hours, Minutes, Seconds, and Microseconds to the field's existing value.
* **sub**: UpdateByFilterDatePartsInput - Subtracts a given number of Days, Months, Years, Hours, Minutes, Seconds, and Microseconds from the field's existing value.

**Example**
```graphql
mutation {
  postUpdateByFilter(
  data: {
    aDateTypeField: {
      add: {
        years: 1
        months: 3
        days: 20
        hours: 13
        seconds: 22
        microseconds: 980
      }
    }
  }) {
		items {
      aDateTypeField
    }
  }
}
```

##### Switch
* **set**: Boolean|String - Set the field's existing value to a supplied Boolean or String value.
* **invert**: Boolean - Switches the field's existing value to its Boolean opposite (`true -> false`, `false -> true`)

**Example**
```graphql
mutation {
  postUpdateByFilter(
  data: {
   aSwitchTypeField: {
     set: "CUSTOM_OPTION" 
   }
  }) {
		items {
      aSwitchTypeField
    }
  }
}
```

##### JSON
* **set**: JSON - Set the field's existing value to a supplied JSON object.

**Example**
```graphql
mutation {
  postUpdateByFilter(
  data: {
   aJsonTypeField: {
     set: {
       hey: "HO!",
       lets: "GO!"
     } 
   }
  }) {
		items {
      aJsonTypeField
    }
  }
}
```