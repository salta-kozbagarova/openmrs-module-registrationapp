<%
	import groovy.json.*
    config.require("formFieldName")
    config.require("conceptId")
    
    def maxResults = config.maxResults ? config.maxResults : 20;
    def conceptAnswers = new JsonBuilder(conceptAnswers);
    
    def classes;
    if (config.classes) {
    	classes = config.classes.join(' ');
    }
%>

<script type="text/javascript">
    jq(function() {
    var consAnswers = ${conceptAnswers};
        jq('#${ config.formFieldName }').autocomplete({
            source: function(request, response){
            	var respData = jq.grep(consAnswers, function(elem){
					return elem.value.match(new RegExp(request.term, 'i')) != null;
				});
				respData = respData.slice(0,${maxResults});
				response(respData);
            },
            autoFocus: false,
            minLength: 1,
            delay: 300
        }); 
    });
</script>

<div class="form-group row">
	<label for="${ config.formFieldName }" class="form-group col-md-4">${config.label}</label>
		<div class="form-group col-md-8">

			<input type="text" class="form-control form-control-sm registration-field ${classes}" id="${ config.formFieldName }" name="${ config.formFieldName }" placeholder="${config.label}"
				value="${config.initialValue?: ''}">
			<div class="invalid-feedback d-none"></div>
		</div>
</div>