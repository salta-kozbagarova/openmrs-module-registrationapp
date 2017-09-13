jq = jQuery;

// TODO refactor this all into something cleaner

// we expose this in the global scope so that other javascript widgets can access it--probably should have a better pattern for this
//var NavigatorController;

function importMpiPatient(id) {
    $.getJSON(emr.fragmentActionLink("registrationapp", "registerPatient", "importMpiPatient", {mpiPersonId: id}))
        .success(function (response) {
            var link = patientDashboardLink;
            link += (link.indexOf('?') == -1 ? '?' : '&') + 'patientId=' + response.message;
            location.href = link;
        })
        .error(function (xhr, status, err) {
            alert('AJAX error ' + err);
        });
}

jq(function() {
	
	//style fixes
	fixStyles();
	function fixStyles(){
		var conatiners = jq('.container');
		jq.each(conatiners, function(index){
			if(jq(this).attr('id') == 'content'){
				jq(this).removeClass('container');
				jq(this).addClass('container-fluid');
			}
		});
	}
	
	
    //NavigatorController = new KeyboardController();
    
    /*
	 * @author Saltanat Alikhanova
	 * since the 'section' tags were removed from the registerPatient gsp page, navigator has stopped working
	 * properly as it looks at the 'section' tag. And the confirmation submit button got disabled. Here's some
	 * hack that fixes it
	 */
	/*if (typeof(NavigatorController) != 'undefined') {
		var field = NavigatorController.getFieldById("submit");
		field.enable();
		jq('#submit').val(jq('#confirmation_label').text());
	}*/

    /* Similar patient functionality */
    reviewSimilarPatients = emr.setupConfirmationDialog({
        selector: '#reviewSimilarPatients',
        actions: {
            cancel: function () {
                reviewSimilarPatients.close();
            }
        }
    });

    jq('#reviewSimilarPatientsButton').click(function () {
        var slideView = $("#similarPatientsSlideView");
        slideView.slideToggle();

        return false;
    });

    function showSimilarPatients(data) {
        if (data.length == 0 || jq('#checkbox-unknown-patient').is(':checked')) {
            jq("#similarPatients").hide();
            jq("#similarPatientsSlideView").hide();
            return;
        } else {
            jq("#similarPatients").show();
        }

        jq('#similarPatientsCount').text(data.length);
        var similarPatientsSelect = jq('#similarPatientsSelect');
        similarPatientsSelect.empty();
        for (index in data) {
            var item = data[index];
            var isMpi = false;
            if (data[index].mpiPatient != null && data[index].mpiPatient == true) {
                isMpi = true;
            }

            var container = $('#matchedPatientTemplates .container');
            var cloned = container.clone();

            cloned.find('.name').append(item.givenName + ' ' + item.familyName);

            var gender;
            if (item.gender == 'M') {
                gender = emr.message('emr.gender.M');
            } else {
                gender = emr.message('emr.gender.F');
            }

            var attributes = "";
            if (item.attributeMap) {
                _.each(item.attributeMap, function(value, key) {
                    if (value) {
                        attributes = attributes + ", " + value;
                    }
                });
            }

            cloned.find('.info').append(gender + ', ' + item.birthdate + ', ' + item.personAddress + attributes);

            if (item.identifiers) {
                var identifiers = cloned.find('.identifiers');
                item.identifiers.forEach(function (entry) {
                    var clonedIdName = identifiers.find('.idNameTemplate').clone();
                    clonedIdName.text(entry.name + ': ');
                    clonedIdName.removeClass("idNameTemplate");
                    identifiers.append(clonedIdName);

                    var clonedIdValue = identifiers.find(".idValueTemplate").clone();
                    clonedIdValue.text(entry.value);
                    clonedIdValue.removeClass("idValueTemplate");
                    identifiers.append(clonedIdValue);
                });
            }

            var button;
            if (isMpi) {
                button = $('#matchedPatientTemplates .mpi_button').clone();
                button.attr("onclick", "importMpiPatient(" + item.uuid + ")");
            } else {
                button = $('#matchedPatientTemplates .local_button').clone();
                var link = patientDashboardLink;
                link += (link.indexOf('?') == -1 ? '?' : '&') + 'patientId=' + item.uuid;
                button.attr("onclick", "location.href=\'" + link + "\'");
            }
            cloned.append(button);

            $('#similarPatientsSelect').append(cloned);
        }
    }

    getSimilarPatients = function (field) {
        var focusedField = $(':focus');
        jq('.date-component').trigger('blur');

        var formData = jq('#registration').serialize();
        jq.getJSON(emr.fragmentActionLink("registrationapp", "matchingPatients", "getSimilarPatients", {appId: appId}), formData)
            .success(function(data) {
                jq("#reviewSimilarPatientsButton").show();
                showSimilarPatients(data);
            })
            .error(function (xhr, status, err) {
                alert('AJAX error ' + err);
            });
        focusedField.focus();
    };

    jq('input').change(getSimilarPatients);
    jq('select').change(getSimilarPatients);

    /* Exact match patient functionality */
    jq("#confirmation").on('select', function (confSection) {

        var formData = jq('#registration').serialize();

        jq('#exact-matches').hide();
        jq('#mpi-exact-match').hide();
        jq('#local-exact-match').hide();
        jq.getJSON(emr.fragmentActionLink("registrationapp", "matchingPatients", "getExactPatients", {appId: appId}), formData)
            .success(function (data) {
                jq("#reviewSimilarPatientsButton").hide();
                showSimilarPatients(data);
                jq("#similarPatientsSlideView").show();
            })
            .error(function (xhr, status, err) {
                alert('AJAX error ' + err);
            });
    });

    /* Submit functionality */
    jq('#registration').submit(function (e) {
        e.preventDefault();
        if(!validateForm()){
        	return false;
        }
        jq('#submitRegistration').attr('disabled', 'disabled');
        jq('#cancelRegistration').attr('disabled', 'disabled');
        var formData = jq('#registration').serialize();
        jq.getJSON(emr.fragmentActionLink("registrationapp", "registerPatient", "submit", { appId: appId }), formData)
            .success(function (response) {
                emr.navigateTo({"applicationUrl": response.message});
            })
            .error(function (response) {
                jq('#validation-errors-content').html(jq.parseJSON(response.responseText).globalErrors);
                jq('#validation-errors').show();
                jq('#submit').removeAttr('disabled');
                jq('#cancelSubmission').removeAttr('disabled');
        });
    });

    /* Registration date functionality */
    if (jq('registration-date') != null) {  // if retro entry configured
        _.each(jq('registration-date').find("p").has("input, textarea, select, button"), function (field) {       // registration fields are is disabled by default
            if (field.id != 'checkbox-enable-registration-date') {
                field.hide();
            }
        });

        jq('#checkbox-enable-registration-date').click(function () {
            if (jq('#checkbox-enable-registration-date').is(':checked')) {
                _.each(jq('registration-date').find("p").has("input, textarea, select, button"), function (field) {
                    if (field.id != 'checkbox-enable-registration-date') {
                        field.hide();
                    }
                });
            }
            else {
                _.each(jq('registration-date').find("p").has("input, textarea, select, button"), function (field) {
                    if (field.id != 'checkbox-enable-registration-date') {
                        field.show();
                    }
                });
            }
        });
    }

    /* Manual patient identifier entry functionality */
    if (jq('patient-identifier') != null) {   // if manual entry configured
    	jq('patient-identifier').hide();

        jq('#checkbox-autogenerate-identifier').click(function () {
            if (jq('#checkbox-autogenerate-identifier').is(':checked')) {
            	jq('patient-identifier').hide();
            }
            else {
            	jq('patient-identifier').show();
            	jq('patient-identifier').click();
            }
        })
    }

    /* Unknown patient functionality */
    jq('#checkbox-unknown-patient').click(function () {
        if (jq('#checkbox-unknown-patient').is(':checked')) {
            // disable all questions & sections except gender and registration date
        	jq.each(jq('#registration').find("input, textarea, select"), function (index) {
                if (jq(this).attr('id') != 'checkbox-unknown-patient' && jq(this).attr('id') != 'gender') {
                	disable(jq(this));
                }
            });

            // set unknown flag
            jq('#demographics-unknown').val('true');
        }
        else {
        	jq.each(jq('#registration').find("input, textarea, select"), function (index) {
                if (jq(this).attr('id') != 'checkbox-unknown-patient' && jq(this).attr('id') != 'gender') {
                    enable(jq(this));
                }
            });

            // unset unknown flag
            jq('#demographics-unknown').val('false');
            jq('#givenName').focus();
        }
    });
});


function disable(elem){
	elem.attr('disabled', 'true');
	elem.addClass("disabled");
    
    var selectedOption = jq(elem).find('option:selected');
    if (selectedOption.length > 0) {
        selectedOption.removeAttr('selected');
    }
    // handle the case of radio set with a checked item
    else if (elem.attr('type') == 'radio' && elem.is(':checked')) {
    	elem.removeAttr('checked');
    }
    // handle checkbox
    else if (elem.attr('type') == 'checkbox') {
    	elem.removeAttr('checked');
    }
    // handle input field
    else {
    	elem.val("");
    }
    
    var fieldError = $(elem).nextAll('.invalid-feedback').first()[0];
	$(fieldError).removeClass('d-block').addClass('d-none');
	fieldError.innerText = '';
	$(elem).removeClass('registration-form-error').removeClass('is-invalid');
}

function enable(elem){
	elem.removeAttr('disabled');
	elem.removeClass("disabled");
}
