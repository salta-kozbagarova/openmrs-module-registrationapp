<%
    if (sessionContext.authenticated && !sessionContext.currentProvider) {
        throw new IllegalStateException("Logged-in user is not a Provider")
    }
    ui.decorateWith("appui", "standardEmrPage")
    /*ui.includeJavascript("uicommons", "handlebars/handlebars.min.js", Integer.MAX_VALUE - 1);
    ui.includeJavascript("uicommons", "navigator/validators.js", Integer.MAX_VALUE - 19)
    ui.includeJavascript("uicommons", "navigator/navigator.js", Integer.MAX_VALUE - 20)
    ui.includeJavascript("uicommons", "navigator/navigatorHandlers.js", Integer.MAX_VALUE - 21)
    ui.includeJavascript("uicommons", "navigator/navigatorModels.js", Integer.MAX_VALUE - 21)
    ui.includeJavascript("uicommons", "navigator/navigatorTemplates.js", Integer.MAX_VALUE - 21)
    ui.includeJavascript("uicommons", "navigator/exitHandlers.js", Integer.MAX_VALUE - 22);*/
	ui.includeJavascript("uicommons", "emr.js");
    ui.includeJavascript("registrationapp", "registerPatient.js");
    ui.includeJavascript("registrationapp", "registerPatientValidator.js");
    ui.includeCss("registrationapp","registerPatient.css")

    def genderOptions = [ [label: ui.message("emr.gender.M"), value: 'M'],
                          [label: ui.message("emr.gender.F"), value: 'F'] ]
	
	Calendar cal = Calendar.getInstance()
    def maxAgeYear = cal.get(Calendar.YEAR)
    def minAgeYear = maxAgeYear - 120
    def minRegistrationAgeYear= maxAgeYear - 15 // do not allow backlog registrations older than 15 years
    
    Calendar maxBirthDate = Calendar.getInstance()
    Calendar minBirthDate = Calendar.getInstance()
    minBirthDate.set(year:(maxBirthDate[Calendar.YEAR] - 120), month:(maxBirthDate[Calendar.MONTH]), date:maxBirthDate[Calendar.DATE])

    def breadcrumbMiddle = breadcrumbOverride ?: '';

    def patientDashboardLink = patientDashboardLink ? ("/${contextPath}/" + patientDashboardLink) : ui.pageLink("coreapps", "clinicianfacing/patient")
    def identifierSectionFound = false
%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">

<!-- used within registerPatient.js -->
<%= ui.includeFragment("registrationapp", "validationMessages") %>
<%= ui.includeFragment("registrationapp", "monthNames") %>
<%= ui.includeFragment("appui", "messages", [ codes: [
        'emr.gender.M',
        'emr.gender.F'
].flatten()
]) %>

${ ui.includeFragment("uicommons", "validationMessages")}

<style type="text/css">
#similarPatientsSelect .container {
    overflow: hidden;
}

#similarPatientsSelect .container div {
    margin: 5px 10px;
}

#similarPatientsSelect .container .name {
    font-size: 25px;
    display: inline-block;
}

#similarPatientsSelect .container .info {
    font-size: 15px;
    display: inline-block;
}

#similarPatientsSelect .container .identifiers {
    font-size: 15px;
    display:inline-block;
    min-width: 600px;
}

#similarPatientsSelect .container .identifiers .idName {
    font-size: 15px;
    font-weight: bold;
}

#similarPatientsSelect .container .identifiers .idValue {
    font-size: 15px;
    margin: 0 20px 0 0;
}
</style>
<script type="text/javascript">

    var breadcrumbs = _.compact(_.flatten([
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        ${ breadcrumbMiddle },
        { label: "${ ui.message("registrationapp.registration.label") }", link: "${ ui.pageLink("registrationapp", "registerPatient") }" }
    ]));

    var testFormStructure = "${formStructure}";
    var patientDashboardLink = '${patientDashboardLink}';
    var appId = '${ui.escapeJs(appId)}';

    // hack to create the sections variable used by the unknown patient handler in registerPatient.js
    var sections =  [];
    <% formStructure.sections.each { structure ->
            def section = structure.value;  %>
            sections.push('${section.id}');
    <% } %>

</script>

<div id="validation-errors" class="note-container" style="display: none" >
    <div class="note error">
        <div id="validation-errors-content" class="text">

        </div>
    </div>
</div>

<div id="content" class="container-fluid">
    <h2>
        ${ ui.message("registrationapp.registration.label") }
    </h2>

	<div id="similarPatients" class="highlighted" style="display: none;">
		   <div class="left" style="padding: 6px"><span id="similarPatientsCount"></span> ${ ui.message("registrationapp.similarPatientsFound") }</div><button class="right" id="reviewSimilarPatientsButton">${ ui.message("registrationapp.reviewSimilarPatients.button") }</button>
		   <div class="clear"></div>
	</div>

    <div id="matchedPatientTemplates" style="display:none;">
        <div class="container"
             style="border-color: #00463f; border-style: solid; border-width:2px; margin-bottom: 10px;">
            <div class="name"></div>
            <div class="info"></div>
            <div class="identifiers">
                <span class="idName idNameTemplate"></span><span class="idValue idValueTemplate"></span>
            </div>
        </div>
        <button class="local_button" style="float:right; margin:10px; padding: 2px 8px" onclick="location.href='/openmrs-standalone/coreapps/clinicianfacing/patient.page?patientId=7'">
            ${ui.message("registrationapp.open")}
        </button>
        <button class="mpi_button" style="float:right; margin:10px; padding: 2px 8px" onclick="location.href='/execute_script_which_will_request_service_to_import_patient_from_mpi_to_local_DB_and_redirect_to_patient_info'">
            ${ui.message("registrationapp.importAndOpen")}
        </button>
    </div>

    <div id="similarPatientsSlideView" style="display: none;">
        <ul id="similarPatientsSelect" class="select" style="width: auto;">

        </ul>
    </div>

    <form id="registration" method="POST">

        <% if (includeRegistrationDateSection) { %>
        <div id="registration-info" class="non-collapsible">

            <fieldset id="registration-date" class="multiple-input-date no-future-date">
                <h3>${ui.message("registrationapp.registrationDate.question")}</h3>

                <p>
                    <input id="checkbox-enable-registration-date" type="checkbox" checked/>
                    <label for="checkbox-enable-registration-date">${ui.message("registrationapp.registrationDate.today")}</label>
                </p>

                ${ ui.includeFragment("uicommons", "field/multipleInputDate", [
                        label: "",
                        formFieldName: "registrationDate",
                        left: true,
                        classes: ['required'],
                        showEstimated: false,
                        initialValue: new Date(),
                        minYear: minRegistrationAgeYear,
                        maxYear: maxAgeYear,
                ])}
            </fieldset>
        </div>
        <% } %>
		
		<div class="row mt-2 pt-2">
              <div class="form-check col-md-6">
                    <input id="checkbox-unknown-patient" type="checkbox" class="form-check-input"/>
                    <label for="checkbox-unknown-patient">${ui.message("registrationapp.patient.demographics.unknown")}</label>
            </div>
          </div>
		  
	<!-- read configurable sections from the json config file-->
	<% formStructure.sections.each { structure ->
		def section = structure.value
		def questions = section.questions
	%>
		
	<div class="card mt-2">
		<div class="card-header">
		${ui.message(section.label)}
		</div>
		<div class="card-body">
			<div class="row">
				
				<% if (section.id == 'demographics') { %>
				   <div class="col-md-6">
				   
					   <% nameTemplate.lines.each { line ->
			                // go through each line in the template and find the first name token; assumption is there is only one name token per line
			                def name = line.find({it['isToken'] == 'IS_NAME_TOKEN'})['codeName'];
			                def initialNameFieldValue = ""
			                if(patient.personName && patient.personName[name]){
			                    initialNameFieldValue = patient.personName[name]
			                }
			            %>
		                    ${ ui.includeFragment("registrationapp", "field/personName", [
		                            label: ui.message(nameTemplate.nameMappings[name]),
		                            size: nameTemplate.sizeMappings[name],
		                            formFieldName: name,
		                            dataItems: 4,
		                            left: true,
		                            initialValue: initialNameFieldValue,
		                            classes: [(name == "givenName" || name == "familyName") ? "required" : ""]
		                    ])}
	
	                    <% } %>
					   <input type="hidden" name="preferred" value="true"/>
				   </div>
				   <div class="col-md-6">
						   
						${ ui.includeFragment("registrationapp", "field/dropDown", [
                                id: "gender",
                                label: ui.message("registrationapp.patient.gender.chooseAGender"),
                                formFieldName: "gender",
                                options: genderOptions,
                                classes: ["required"],
                                initialValue: patient.gender,
                                hideEmptyLabel: false,
                                emptyOptionLabel: ui.message("registrationapp.patient.gender.chooseAGender")
                        ])}
							   
						${ ui.includeFragment("registrationapp", "field/multipleInputDate", [
								id: "birthdate",
                                label: ui.message("registrationapp.patient.birthdate.label"),
                                formFieldName: "birthdate",
                                left: true,
                                showEstimated: true,
                                estimated: patient.birthdateEstimated,
                                initialValue: patient.birthdate,
                                minDate: minBirthDate.time,
                                maxDate: maxBirthDate.time
                        ])}
							   
				   </div>
			   <% } %>
			   
			   <div class="col-md-6">
			   
			   <%
			   		def questionsSize
			   		def questionBlockSize = 0;
			   		def i = 0;
			   		if(questions != null){
			   			questionsSize = questions.size()
				   		if(questionsSize % 2 == 1){
				   			questionBlockSize = (questionsSize - 1)/2 + 1
				   		} else{
				   			questionBlockSize = questionsSize/2
				   		}
			   		}
			   %>
			   <% questions.each { question ->
	                def fields=question.fields
	                def classes;
	                i++;
	                if (question.legend == "Person.address") {
	                    classes = "requireOne"
	                }
	                if (question.cssClasses) {
	                    classes = classes + (classes ? ' ' : '') + question.cssClasses.join(" ") + " col-md-4"
	                }
	            %>
	            
		            <% fields.each { field ->
	                    def configOptions = (field.fragmentRequest.configuration != null) ? field.fragmentRequest.configuration : [:] ;
	                    configOptions.label = ui.message(field.label)
	                    configOptions.formFieldName = field.formFieldName
	                    configOptions.left = true
	                    configOptions.classes = field.cssClasses
	                    if (field.type == 'personAttribute') {
	                        configOptions.uuid = field.uuid
	                    }
	
	                    if (field.type == 'personAddress') {
	                        configOptions.addressTemplate = addressTemplate
	                    }
	
	                    if (field.type == 'personRelationships') {
	                        configOptions.relationshipTypes = relationshipTypes
	                    }
	                %>
	                
		                ${ ui.includeFragment(field.fragmentRequest.providerName, field.fragmentRequest.fragmentId, configOptions)}
			            
			            <% if (i == questionBlockSize) { %>
			            	</div>
			            	<div class="col-md-6">
			            <% } %>
	                <% } %>
	            
	            <% } %>
	            </div>
			</div>
		</div>
	</div>
	<% } %>
		
	<div class="row justify-content-center">
		<div class="form-group row">
			<div id="confirmation" class="col">
				<button id="cancelRegistration" class="btn btn-danger" style="background: #dc3545;" type="button">${ui.message("registrationapp.cancel")}</button>
				<button id="submitRegistration" type="submit" class="btn btn-success" style="background: #28a745;">${ui.message("registrationapp.confirm")}</button>
			</div>
		</div>
	</div>

    </form>
</div>