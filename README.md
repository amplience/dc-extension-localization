# dc-extension-localise

> Translating can be long and painful fast track your inline localisable text with our auto translating custom extension.


## dev

```bash
$ npm run start
```

## build

```bash
$ npm run build
```


## Register the extension 

- Name your extension
- Add your extension url
- Generate API Key API key from [here](https://translate.yandex.com/developers/keys).
- Add undert installation parmas called TRANSLATION_API_KEY

### Here is a snippet so you can add your extension easily

```json
{
  "title": "title",
  "description": "description",
  "allOf": [
    {
      "$ref": "http://bigcontent.io/cms/schema/v1/localization#/definitions/localized-string"
    }
  ],
  "ui:extension": {
    "name": "<your name of extension here>"
  }
}
```

### Example Installation Params

```json 
{
  "TRANSLATION_API_KEY": "trnsl.1.1.20181113T13154q3434df54b6aa.051c8d933f00f1315ba7esaf3497d2922dace4eb64a1"
}
```

## Content Type Schema

Here is a basic schema just including the translate custom extension.
```json
{
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "http://localise.com",

	"title": "Title",
	"description": "Description",

	"allOf": [
		{
			"$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/content"
		}
	],
	
	"type": "object",
	"properties": {
		"localise": {
			"title": "title",
			"description": "description",
			"allOf": [
				{ "$ref": "http://bigcontent.io/cms/schema/v1/localization#/definitions/localized-string" }
			],
			"ui:extension": {
				"name": "<your name of extension here>"
			}
		}
	},
	"propertyOrder": []
}
```