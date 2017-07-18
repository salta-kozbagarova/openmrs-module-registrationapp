# openmrs-module-registrationapp
Registration application with some extensions

By this time it has only one add-on. PersonAttributeWithConcept field was added.

# Example of usage of personAttributeWithConcept field

Let's say you have an Document Type attribute. In the json config file just write this:
```
{
	"legend": "Document Type",
	"fields": [
		{
			"type": "personAttribute",
			"label": "Document Type",
			"formFieldName": "documentType",
			"uuid": "f43c168d-4bf0-4b59-a229-a65ae7e03710",
			"widget": {
				"providerName": "registrationapp",
				"fragmentId": "field/personAttributeWithConcept",
				"config": {
					"conceptId": "163147",
					"maxResults": 15
				}
			}
		}
	]
}
```
That is all!)
