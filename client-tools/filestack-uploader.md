# Filestack

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

