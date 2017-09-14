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
	
	$.fn.clearErrors = function(){
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		$(fieldError).removeClass('d-block').addClass('d-none');
		fieldError.innerText = '';
		$(this).removeClass('registration-form-error').removeClass('is-invalid');
	};
	
	$.fn.setErrors = function(message){
		var fieldError = $(this).nextAll('.invalid-feedback').first()[0];
		$(fieldError).removeClass('d-none').addClass('d-block');
		fieldError.innerText = message;
		$(this).addClass('registration-form-error').addClass('is-invalid');
	};
	
	$('.registration-field').each(function(index){
		$(this).attr('data-validated-field',true);
	});
	
	$('.registration-field.required-field').each(function(index){
		var isInput = $(this).is('input') || $(this).is('textarea');
		var fieldValue;
		
		if(isInput){
			$(this).keyup(function(e){
				if (e.which == 13) {
					e.preventDefault();
				}
				fieldValue = $(this).val();
				$(this).clearErrors();
				if(!fieldValue.trim() || fieldValue.trim() == ''){
					$(this).setErrors(validationMessages.thisFieldIsRequired);
				}
			})
			.blur(function(){
				fieldValue = $(this).val();
				$(this).clearErrors();
				if(!fieldValue.trim() || fieldValue.trim() == ''){
					$(this).setErrors(validationMessages.thisFieldIsRequired);
				}
			});
		} else{
			$(this).change(function(){
				fieldValue = $(this).find(':selected').val();
				$(this).clearErrors();
				if(!fieldValue.trim() || fieldValue.trim() == ''){
					$(this).setErrors(validationMessages.thisFieldIsRequired);
				}
			});
		}
	});
	
	$('.registration-field.iin-field').each(function(index){
		$(this).keyup(function(e){
			if (e.which == 13) {
				e.preventDefault();
			}
			checkIinIsValid($(this));
		})
		.blur(function(){
			checkIinIsValid($(this));
		});
	});
	
	$('.registration-field.email-field').each(function(index){
		$(this).keyup(function(e){
			if (e.which == 13) {
				e.preventDefault();
			}
			checkEmailIsValid($(this));
		})
		.blur(function(){
			checkEmailIsValid($(this));
		});
	});
	
	checkIinIsRequired = function(elem){
		var iinField = $(elem);
		var iin = $(iinField).val();
		if(!iin.trim()){
			var citizenship = $('input[name="citizenship"]').val();
			var months = getMonths($('#birthdateDay').val(), $('#birthdateMonth').val(), $('#birthdateYear').val());
			if(citizenship.trim() == residenceCountry && months >= 3){
				$(iinField).setErrors(validationMessages.enterTheIin);
			}
		}
	}
	
	checkIinIsValid = function(elem){
		var iinField = $(elem);
		var iin = $(iinField).val();
		
		$(iinField).clearErrors();
		
		if(!iin.trim() || iin.trim() == ''){
			checkIinIsRequired(elem);
			return null;
		}
		if(iin.match(/^\d{12}$/) === null){
			$(iinField).setErrors(validationMessages.incorrectIin);
		} else {
			checkIINUnique(iin).success(function(response){
				if(!response){
					$(iinField).setErrors(validationMessages.theGivenIinHasAlreadyExistsInTheSystem);
				} else{
					$(iinField).clearErrors();
					
					if(!checkBirthdate(iin)){
						$(iinField).setErrors(validationMessages.incorrectIin);
					}
					
					if(!checkIinControlNum(iin)){
						$(iinField).setErrors(validationMessages.incorrectIin);
					}
				}
			});
		}
	}
	
	checkEmailIsValid = function(elem){
		var emailField = $(elem);
		var emailAddress = $(emailField).val();
		$(emailField).clearErrors();
		
	    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	    if(!pattern.test(emailAddress)){
	    	$(emailField).setErrors(validationMessages.incorrectEmail);
	    }
	};
	
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