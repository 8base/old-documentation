# Permissions

8base comes with robust CRUD access management for data tables out-of-the-box. However, sometimes you'll want to define your own custom permissions that can be used in the functions code. For example, you might want to lock down access to a 3rd party API only to specific user roles.

In order to do so you can add a custom permission in the `permissions` section of `8base.yml`. This permission will appear in the role management screen allowing to control which role has access to it.

Later, in the function code you can check whether the user executing the function has this permission.

**TODO: Add example JS code** \[block:code\] { "codes": \[ { "code": "functions:\n ....\n \npermissions:\n sendEmail:\n displayName: Send Email\n permission2:\n \# Display name is optional, by default it is set to permission name\n permission3:", "language": "yaml", "name": "8base.yml" } \] } \[/block\]

