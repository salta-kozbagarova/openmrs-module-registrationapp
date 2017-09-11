<%
    ui.includeJavascript("uicommons", "typeahead.js");

    config.require("label")
    config.require("formFieldName")

    def dataItems = 3;
    if (config.dataItems) {
        dataItems = config.dataItems;
    }
%>

<div class="form-group row">
	<label for="${ config.formFieldName }" class="form-group col-md-4">${config.label}</label>
		<div class="form-group col-md-8">

			<input type="text" class="form-control form-control-sm" id="${ config.formFieldName }" name="${ config.formFieldName }" placeholder="${config.label}"
				value="${config.initialValue?: ''}">
			<div class="invalid-feedback d-none"></div>
		</div>
</div>

<% if (!config.ignoreCheckForSimilarNames) { %>
<script type="text/javascript">

    jq(function() {
        jq("#${ config.formFieldName }").autocomplete({
            source: function( request, response ) {
                jq.ajax({
                    url: "${ ui.actionLink("registrationapp", "personName", "getSimilarNames") }",
                    dataType: "json",
                    data: {
                        'searchPhrase': request.term,
                        'formFieldName': '${ config.formFieldName }'
                    },
                    success: function( data ) {
                        response( jq.map( data.names, function( item ) {
                            return {
                                label: item,
                                value: item
                            }
                        }));
                    }
                });
            },
            minLength: 1
        });
    });

</script>
<% } %>