<%
    config.require("formFieldName")
    config.require("options")
    
    def classes;
    if (config.classes) {
    	classes = config.classes.join(' ');
    }
%>

<div class="form-group row">
	<label for="${config.formFieldName}" class="form-group col-md-4">${config.label}</label>
	<div class="form-group col-md-8">
	
		<select class="form-control form-control-sm registration-field ${classes}" 
					id="${config.formFieldName}" name="${config.formFieldName}">
			
			<% if(!config.hideEmptyLabel) { %>
	            <option value="">${config.emptyOptionLabel ?: ''}</option>
	        <% } %>
			<% config.options.each {
	            def selected = it.selected || it.value == config.initialValue
	        %>
	            <option value="${ it.value }"  <% if (selected) { %>selected<% } %>>${ ui.message(it.label) }</option>
	        <% } %>
		</select>
	<div class="invalid-feedback d-none"></div>
	</div>
</div>