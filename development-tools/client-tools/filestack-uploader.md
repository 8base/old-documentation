# Filestack

\[block:callout\] { "type": "info", "title": "File picker for React", "body": "For React developers 8base SDK provides `@8base/file-input` package that automates the steps described here. If you're looking for an easy way to integrate file uploading capability into your application read the [Client Tools](https://github.com/8base/Documentation/tree/4df3b0cc7b342fe0d3468fbf0a5cafa597c6f037/docs/api/file-upload/README.md) section." } \[/block\] 8base provides a native file management capability. You can attach files to your data object by creating a field of type `File`. A `File` field can store one or multiple files. You can manage granular files permissions just like you would for any other table.

In the GraphQL API `Files` is just another table that supports all standard CRUD operations as well as connections to other tables. When you create a field of type `File` the platform creates a relationship\(connection\) between your table and the `Files` table under the hood. This allows you to use connection-related operations such as `create`, `connect`, `disconnect` on file-type fields.

8base is natively integrated with [Filestack](https://www.filestack.com/) to handle file uploads, delivery and transformations. Filestack provides file `handle`, which is a unique identifier of the file inside Filestack. You provide Filestack `handle` when creating a `File` object in 8base.

The workflow of creating a file consists of the following steps:

1. **Get Filestack upload details**

   You can use the `fileUploadInfo` query to get all fields required by Filestack to upload a file. It generates a temporary policy allowing you to upload a file to a predefined path, based on your workspace ID.

   \[block:code\]

   {

   "codes": \[

   {

   "code": "{\n fileUploadInfo {\n policy\n signature\n apiKey\n path\n }\n}",

   "language": "javascript",

   "name": "fileUploadInfo query"

   }

   \]

   }

   \[/block\]

2. **Upload file to Filestack** Use Filestack API or picker to upload the file using the parameters from the step 1. On successful upload Filestack returns file `handle`. You can learn more about uploading files directly to Filestack [here](https://www.filestack.com/docs/concepts/uploading/). For React developers 8base SDK provides [tools](https://github.com/8base/Documentation/tree/4df3b0cc7b342fe0d3468fbf0a5cafa597c6f037/docs/api/file-upload/README.md) to simplify file uploads such that you never need to interact with Filestack directly.
3. **Create file in 8base** Create file in 8base by passing the Filestack `handle` from step 2. You can either create a `File` object directly so you can later connect it to other tables: \[block:code\] { "codes": \[ { "code": "mutation {\n fileCreate\(data: {\n fileId: \"g8fLXNCRT4K3TJSUFrRW\" \# Filestack handle here\n filename: \"upload.jpg\"\n }\) {\n id\n }\n}", "language": "javascript", "name": "fileCreate mutation" } \] } \[/block\] or you can create and connect file at the same time: \[block:code\] { "codes": \[ { "code": "mutation {\n customerCreate\(data: {\n picture: {\n create: {\n fileId: \"g8fLXNCRT4K3TJSUFrRW\" \# Filestack handle here\n filename: \"avatar.jpg\"\n }\n }\n }\) {\n id\n }\n}", "language": "javascript", "name": "Create and connect file to a data object" } \] } \[/block\]


Filestack has API clients, Pickers and Framework integrations that make it easy to upload your files using a variety of different languages and frameworks. See the full list [here](https://www.filestack.com/docs/api/#api-clients). You will need to use the [security credentials](https://github.com/8base/Documentation/tree/4df3b0cc7b342fe0d3468fbf0a5cafa597c6f037/docs/api/files-api/README.md) from the 8base GraphQL API to upload files to Filestack. This is how to upload a file to the API using a basic `CURL` request:

```text
curl -X POST --data-binary @FILE_NAME_HERE --header "Content-Type:MIME_TYPE_HERE" \
"https://www.filestackapi.com/api/store/S3?key=YOUR_API_KEY_HERE&policy=YOUR_POLICY_HERE&signature=YOUR_SIGNATURE_HERE&path=YOUR_PATH_HERE"
```

The response should look similar to this:

```text
{
  "container": "8base-user-uploads-t2w73r32mzob09ve",
  "url": "https://cdn.filestackcontent.com/VJaeYGhMSJ2FJJnvSPx9",
  "filename": "temp.png",
  "key": "production/cjnl1ykw1000601p65lhyxdno/cjrnmwgrd006p01pdt5zoejze/mBKjQeQ5RriwpSXhsDCv_temp.png",
  "type": "image/png",
  "size": 139976
}
```

In this case, your handle will be `VJaeYGhMSJ2FJJnvSPx9`, the last portion of `"url"`.

Filestack does not have an SDK for React Native. See below for how to implement file uploads in React Native using the `fetch()` API and the `ImagePicker` API from Expo. \[block:code\] { "codes": \[ { "code": "handlePost = async \(\) =&gt; {\n const body = new FormData\(\); // files are required to be sent as multipart form data to Filestack api\n body.append\(\"fileUpload\", {\n name: \"test\",\n uri: `${this.state.file.replace(\"file://\", \"\")}`\n }\)\n const {fileUploadInfo} = this.props.data\n try {\n const response = await fetch\(\n `https://www.filestackapi.com/api/store/S3?\n key=${fileUploadInfo.apiKey}\n &policy=${fileUploadInfo.policy}\n &signature=${fileUploadInfo.signature}\n &path=${fileUploadInfo.path}`,\n {\n method: 'POST',\n body: body\n }\n \);\n const responseJson = await response.json\(\);\n this.setState\({handle: responseJson.url.slice\(33\) }\) //Filestack \"Handle\" is the last portion of the return URL\n } catch \(e\) {\n console.log\(\"error\", e\)\n }\n }\n\n// \(...\)\n\n \_pickImage = async \(\) =&gt; {\n const { status } = await Permissions.askAsync\(Permissions.CAMERA\_ROLL\); // Allow application access to Camera Roll\n\n // \(...\)\n\n //The ImagePicker API from expo returns a URI, which we will use to access the file object to upload to Filestack.\n let result = await ImagePicker.launchImageLibraryAsync\({\n allowsEditing: true,\n aspect: \[4, 3\]\n }\);\n\n if \(!result.cancelled\) {\n this.setState\({ file: result.uri }\);\n }\n };", "language": "javascript" } \] } \[/block\]

