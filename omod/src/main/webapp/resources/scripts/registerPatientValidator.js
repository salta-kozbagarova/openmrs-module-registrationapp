jq = jQuery;

jq(function() {
	$('input[name="IIN"]').keypress(function(e){
		if (e.which == 13) {
			e.preventDefault();
		}
		var iin = $(this).val();
		var fieldError = $(this).nextAll('.field-error').first();
		if(iin.match(/^\d{12}$/) === null){
			fieldError.innerText = '${ ui.message("registrationapp.patient.iin.validation.incorrectIin") }';
		} else {
			fieldError.innerText = '';
			isIINUnique(iin);
		}
	});
	
	isIINUnique = function (iin) {
        var iin = iin;
        jq.getJSON(emr.fragmentActionLink("registrationapp", "matchingPatients", "isIinUnique", {appId: appId}), {iin: iin})
            .success(function(data) {
                console.log('success');
            })
            .error(function (xhr, status, err) {
            	console.log('AJAX error '+err);
            });
    };
});