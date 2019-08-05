# Filestack

### File picker for React

For React developers 8base SDK provides `@8base/file-input` package that automates the steps described here. If you're looking for an easy way to integrate file uploading capability into your application read the [Client Tools](./file_upload.md) section. 

8base provides a native file management capability. You can attach files to your data object by creating a field of type `File`. A `File` field can store one or multiple files. You can manage granular files permissions just like you would for any other table.

In the GraphQL API `Files` is just another table that supports all standard CRUD operations as well as connections to other tables. When you create a field of type `File` the platform creates a relationship (connection) between your table and the `Files` table under the hood. This allows you to use connection-related operations such as `create`, `connect`, `disconnect` on file-type fields.

8base is natively integrated with [Filestack](https://www.filestack.com/) to handle file uploads, delivery and transformations. Filestack provides file `handle`, which is a unique identifier of the file inside Filestack. You provide Filestack `handle` when creating a `File` object in 8base.

The workflow of creating a file consists of the following steps:

1. **Get Filestack upload details**

   You can use the `fileUploadInfo` query to get all fields required by Filestack to upload a file. It generates a temporary policy allowing you to upload a file to a predefined path, based on your workspace ID.

```javascript
{
  fileUploadInfo {
    policy
    signature
    apiKey
    path
  }
}
```

2. **Upload file to Filestack** Use Filestack API or picker to upload the file using the parameters from the step 1. On successful upload Filestack returns file `handle`. You can learn more about uploading files directly to Filestack [here](https://www.filestack.com/docs/concepts/uploading/). For React developers using the 8base SDK, it provides [tools](./file_upload.md) to simplify file uploads such that you never need to interact with Filestack directly.

3. **Create file in 8base** Create file in 8base by passing the Filestack `handle` from step 2. You can either create a `File` object directly so you can later connect it to other tables: 

```javascript
mutation {
  fileCreate(data: {
    fileId: "<FILE_ID>" # Filestack handle here
    filename: "<FILE_ID>"
  }) {
    id
  }
}
```

 or you can create and connect file at the same time: 

```javascript
mutation {
  customerCreate(data: {
    picture: {
      create: {
        fileId: "<FILE_ID>" # Filestack handle here
        filename: "<FILE_ID>"
      }
    }
  }) {
    id
  }
}
```

### Filestack API

Filestack has API clients, Pickers and Framework integrations that make it easy to upload your files using a variety of different languages and frameworks. See the full list [here](https://www.filestack.com/docs/api/#api-clients). You will need to use the [security credentials](../../8base-console/roles-and-permissions.md) from the 8base GraphQL API to upload files to Filestack. This is how to upload a file to the API using a basic `CURL` request:

```sh
curl -X POST \
     --data-binary @FILE_NAME_HERE \
     --header "Content-Type:MIME_TYPE_HERE" "https://www.filestackapi.com/api/store/S3?key=YOUR_API_KEY_HERE&policy=YOUR_POLICY_HERE&signature=YOUR_SIGNATURE_HERE&path=YOUR_PATH_HERE"
```

The success response should look similar to this:

```json
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

### React Native Support
Filestack does not have an SDK for React Native. See below for how to implement file uploads in React Native using the `fetch()` API and the `ImagePicker` API from Expo. 

```javascript
const handlePost = async () => {
  const body = new FormData()

  // files are required to be sent as multipart form data to Filestack api
  body.append("fileUpload", {
    name: "test",
    uri: `${this.state.file.replace("file://", "")}`
  })

  const {fileUploadInfo} = this.props.data
  const endoint = [
    `https://www.filestackapi.com/api/store/S3`,
    `?key=${fileUploadInfo.apiKey}`,
    `&policy=${fileUploadInfo.policy}`,
    `&signature=${fileUploadInfo.signature}`,
    `&path=${fileUploadInfo.path}`
  ].join('')

  try {
    const response = await fetch(endoint, {
      method: 'POST',
      body: body
    })

    const responseJson = await response.json()

    this.setState({
      handle: responseJson.url.slice(33) 
    })
  } catch (e) {
    console.log("error", e)
  }
}

// (...)

const _pickImage = async () => {
  // Allow application access to Camera Roll
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); 
  
  // (...)
  
  //The ImagePicker API from expo returns a URI, which we will use to access the file object to upload to Filestack.
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3]
  });

  if (!result.cancelled) {
    this.setState({ file: result.uri });
  }
}
```

