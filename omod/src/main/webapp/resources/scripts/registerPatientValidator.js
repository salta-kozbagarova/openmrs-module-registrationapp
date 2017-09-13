jq = jQuery;

jq(function() {
	var residenceCountry = 'Казахстан';
	
	$.fn.validate = function(){
	    $(this).trigger('blur'); 
	    if($(this).hasClass('disabled')){
			var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
			$(fieldError).removeClass('d-block').addClass('d-none');
			fieldError.innerText = '';
			$(this).removeClass('registration-form-error').removeClass('is-invalid');
		}
	};
	
	$('input[name="IIN"]').attr('data-validated-field',true);
	$('input[name="IIN"]').keyup(function(e){
		if (e.which == 13) {
			e.preventDefault();
		}
		checkIinIsValid();
	})
	.blur(function(){
		checkIinIsValid();
	});
	
	$('input[name="givenName"]').attr('data-validated-field',true);
	$('input[name="givenName"]').keyup(function(e){
		if (e.which == 13) {
			e.preventDefault();
		}
		var givenName = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!givenName.trim() || givenName.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	})
	.blur(function(){
		var givenName = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!givenName.trim() || givenName.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	});
	
	$('input[name="familyName"]').attr('data-validated-field',true);
	$('input[name="familyName"]').keyup(function(e){
		if (e.which == 13) {
			e.preventDefault();
		}
		var familyName = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!familyName.trim() || familyName.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	})
	.blur(function(){
		var familyName = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!familyName.trim() || familyName.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	});
	
	$('input[name="documentType"]').attr('data-validated-field',true);
	$('input[name="documentType"]').keyup(function(e){
		if (e.which == 13) {
			e.preventDefault();
		}
		var documentType = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!documentType.trim() || documentType.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	})
	.blur(function(){
		var documentType = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!documentType.trim() || documentType.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	});
	
	$('input[name="documentNumber"]').attr('data-validated-field',true);
	$('input[name="documentNumber"]').keyup(function(e){
		if (e.which == 13) {
			e.preventDefault();
		}
		var documentNumber = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!documentNumber.trim() || documentNumber.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	})
	.blur(function(){
		var documentNumber = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!documentNumber.trim() || documentNumber.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	});
	
	$('input[name="documentDate"]').attr('data-validated-field',true);
	$('input[name="documentDate"]').keyup(function(e){
		if (e.which == 13) {
			e.preventDefault();
		}
		var documentDate = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!documentDate.trim() || documentDate.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	})
	.blur(function(){
		var documentDate = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!documentDate.trim() || documentDate.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	});
	
	$('input[id="birthdate"]').attr('data-validated-field',true);
	$('input[id="birthdate"]').keyup(function(e){
		if (e.which == 13) {
			e.preventDefault();
		}
		var birthdate = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!birthdate.trim() || birthdate.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	})
	.blur(function(){
		var birthdate = $(this).val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!birthdate.trim() || birthdate.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	});
	
	$('input[name="gender"]').attr('data-validated-field',true);
	$('input[name="gender"]').keyup(function(e){
		if (e.which == 13) {
			e.preventDefault();
		}
		var gender = $('#gender option:selected').val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!gender.trim() || gender.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	})
	.blur(function(){
		var gender = $('#gender option:selected').val();
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
		
		if(!gender.trim() || gender.trim() == ''){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = validationMessages.thisFieldIsRequired;
			$(this).addClass('registration-form-error').addClass('is-invalid');
		}
	});
	
	checkIinIsRequired = function(){
		var iinField = $('input[name="IIN"]');
		var iin = $(iinField).val();
		var fieldError = $(iinField).nextAll('.invalid-feedback').first()[0];
		if(!iin.trim()){
			var citizenship = $('input[name="citizenship"]').val();
			/*var estimatedMonths = $('#birthdateMonths-field').val();
			var estimatedYears = $('#birthdateYears-field').val();
			var birthDay = $('#birthdateDay-field').val();
			var birthMonth = $('#birthdateMonth-field').val();
			var birthYear = $('#birthdateYear-field').val();*/
			
			//var months = estimatedYears ? (estimatedYears*12 + (estimatedMonths ? estimatedMonths : 0)) : getMonths(birthYear, birthMonth, birthDay);
			var months = getMonths($('#birthdateDay').val(), $('#birthdateMonth').val(), $('#birthdateYear').val());
			
			if(citizenship.trim() == residenceCountry && months >= 3){
				$(fieldError).removeClass('d-none').addClass('d-block');
				fieldError.innerText = validationMessages.enterTheIin;
				$(iinField).addClass('registration-form-error').addClass('is-invalid');
			}
		}
	}
	
	checkIinIsValid = function(){
		var iinField = $('input[name="IIN"]');
		var iin = $(iinField).val();
		var fieldError = $(iinField).nextAll('.invalid-feedback').first()[0];
		
		clearErrors = function(){
			fieldError.innerText = '';
			$(fieldError).removeClass('d-block').addClass('d-none');
			$(iinField).removeClass('registration-form-error').removeClass('is-invalid');
		}
		setErrors = function(message){
			$(fieldError).removeClass('d-none').addClass('d-block');
			fieldError.innerText = message;
			$(iinField).addClass('registration-form-error').addClass('is-invalid');
		}
		
		clearErrors();
		
		if(!iin.trim() || iin.trim() == ''){
			checkIinIsRequired();
			return null;
		}
		if(iin.match(/^\d{12}$/) === null){
			setErrors(validationMessages.incorrectIin);
		} else {
			checkIINUnique(iin).success(function(response){
				if(!response){
					setErrors(validationMessages.theGivenIinHasAlreadyExistsInTheSystem);
				} else{
					clearErrors();
					
					if(!checkBirthdate(iin)){
						setErrors(validationMessages.incorrectIin);
					}
					
					if(!checkIinControlNum(iin)){
						setErrors(validationMessages.incorrectIin);
					}
				}
			});
		}
	}
	
	checkBirthdate = function(iin){
		var century = iin.charAt(6);
		
		if(century < 1 || century > 6){
			return false;
		}
		
		var year = iin.substr(0,2);
		var day = iin.substr(4,2);
		var trimmedDay = day.charAt(0) == '0' ? day.substr(1) : day;
		var month = iin.substr(2,2);
		var trimmedMonth = month.charAt(0) == '0' ? month.substr(1) : month;
		var fullYear;
		
		switch(century){
			case '1':
			case '2':
				fullYear = '18'+year;
				break;
			case '3':
			case '4':
				fullYear = '19'+year;
				break;
			case '5':
			case '6':
				fullYear = '20'+year;
				break;
		}
		
		if(trimmedDay < 1 || trimmedDay > 31 || trimmedMonth < 1 || trimmedMonth > 12){
            return false;
        } else if(trimmedMonth == 2 && (trimmedDay > 29 || (trimmedDay > 28 && fullYear % 4 != 0))){
                return false;
        } else if(trimmedDay > 30 && (trimmedMonth == 4 || trimmedMonth == 6 || trimmedMonth == 9 || trimmedMonth == 11)){
            return false;
        }

		var dateObject = new Date(fullYear, trimmedMonth-1, trimmedDay);

        if(dateObject > new Date()){
        	return false;
        }
        
        $("#birthdate").val(trimmedDay + "-" + monthNames[trimmedMonth-1] + "-" + fullYear);
		
		var selectedDay = day;
        $('#birthdateDay').val(day);
        
        var selectedMonth = month;
        $('#birthdateMonth').val(month);
        
        var selectedYear = fullYear;
        $('#birthdateYear').val(fullYear);
        
        $('#birthdate-value').val(selectedYear + '-' + selectedMonth + '-' + selectedDay);
        
		if(century%2==0){
			$('#gender').val('F');
		} else{
			$('#gender').val('M');
		}
		return true;
	}
	
	checkIinControlNum = function(iin){
		var controlNum = iin.charAt(11);
		var sum = 0;
		var i = 1;
		var recheck = false;
		var rankWeight;
		while(i<12){
			if(!recheck){
				sum += iin.charAt(i-1)*i;
				i++;
			} else{
				rankWeight = (i+2) < 12 ? (i+2) : (i-11);
				sum += iin.charAt(i-1)*rankWeight;
				i++;
			}
			if(i==12 && sum%11>=10){
				if(recheck){
					return false;
				} else{
					sum = 0;
					i = 1;
					recheck = true;
				}
			} else if(i==12 && controlNum != sum%11){
				return false;
			}
		}
		return true;
	}
	
	checkIINUnique = function (iin) {
        return jq.getJSON(emr.fragmentActionLink("registrationapp", "matchingPatients", "isIinUnique", {appId: appId, iin: iin}));
    };
    
    getAge = function(year, month, day){
    	var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(yyyy < year || yyyy == year){
        	return null;
        }
        if((yyyy-1) == year && (mm < month || (mm == month && dd < day))){
        	return 0;
        }
        if(mm < month || (mm == month && dd < day)){
        	return yyyy-year-1;
        }
        if((mm == month && dd >= day) || mm > month){
        	return yyyy-year;
        }
    }
    
    getMonths = function(year, month, day){
    	if(!year || !month || !day){
    		return -1;
    	}
    	var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var years = yyyy - year;
        if(yyyy < year){
        	return -1;
        }
        if(dd < day){
    		return years*12 - month + mm - 1;
    	}
    	if(dd >= day){
    		return years*12 - month + mm;
    	}
    }
    
    validateForm = function(){
    	$('[data-validated-field=true]').each(function(){
    		$(this).validate();
    	});
    	var errors = $('.registration-form-error');
    	return errors.length == 0;
    }
});