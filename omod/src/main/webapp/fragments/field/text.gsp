<%
    config.require("label")
    config.require("formFieldName")
    
    def classes;
    if (config.classes) {
    	classes = config.classes.join(' ');
    }
%>

<script type="text/javascript">
    jq(function() {
    	${config.javascript}
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