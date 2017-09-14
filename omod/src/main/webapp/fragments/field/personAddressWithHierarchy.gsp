<%
    ui.includeJavascript("registrationapp", "field/personAddressWithHierarchy.js")

    def parseAsBoolean = {
        if (it instanceof org.codehaus.jackson.node.BooleanNode) {
            return it.booleanValue
        }
        if (it instanceof java.lang.String) {
            return it.toBoolean()
        }
        return it;
    }
%>

<div id="${ config.id }-container">

	<% levels.each { level ->
        def classes = [ "level" ]
        if (parseAsBoolean(config.required) && level.required) {
            classes.add("required-field")
        }
        def levelInitial = ""
        if (initialValue) {
            // setting this as "value" on the input is not sufficient to set the js state, but we do it anyway
            // so that these values are immediately visible on page load
            levelInitial = initialValue[level.addressField.name] ?: ""
        }
    %>
    
		<div class="form-group row">
			<label for="${ config.id }-${ level.addressField.name }" class="form-group col-md-4">${ ui.message(addressTemplate.nameMappings[level.addressField.name]) }</label>
			<div class="form-group col-md-4">
				<input type="text" class="form-control form-control-sm registration-field ${ classes.join(" ") }" id="${ config.id }-${ level.addressField.name }" 
							name="${ level.addressField.name }" 
							placeholder="${ ui.message(addressTemplate.nameMappings[level.addressField.name]) }" 
							value="${ ui.escapeAttribute(levelInitial) }">
							<div class="invalid-feedback d-none"></div>
			</div>
			<div class="form-group col-md-4">
				<button class="btn btn-success btn-sm addNewAddressEntry" style="background: #28a745;">${ui.message("registrationapp.addressHierarchyWidget.add")}</button>
			</div>
		</div>
    <% } %>

</div>

<script type="text/javascript">

    var personAddressWithHierarchy = {
        id: null,
        container: null,
        initialValue: null,
        shortcutFor: null,
        manualFields: []
    }

    personAddressWithHierarchy.id = '${ config.id }';
    personAddressWithHierarchy.container = jq('#${ config.id }-container');
    <% if (config.shortcutFor) { %>
        personAddressWithHierarchy.shortcutFor = '${ ui.escapeJs(config.shortcutFor) }';
    <% } %>
    <% if (config.manualFields) { %>
        <% config.manualFields.each { %>
            personAddressWithHierarchy.manualFields.push('${ it }');
        <% } %>
    <% } %>
    <% if (initialValue) { %>
        personAddressWithHierarchy.initialValue = ${ ui.toJson(initialValue) };
    <% } %>

    PersonAddressWithHierarchy(personAddressWithHierarchy);

</script>