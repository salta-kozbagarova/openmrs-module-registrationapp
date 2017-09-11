<%
    config.require("label", "formFieldName")
    
    def initialDay,initialMonth, initialYear, initialYears, initialMonths
    def minBirthDate, maxBirthDate
    
    if(config.initialValue){
        Calendar cal = Calendar.getInstance()
        cal.setTime(config.initialValue)
        initialDay = cal.get(Calendar.DAY_OF_MONTH)
        initialMonth = cal.get(Calendar.MONTH)+1
        initialYear = cal.get(Calendar.YEAR)
    }
    
    if(config.minDate) {
        minBirthDate = config.minDate.format("dd-MM-yyyy")
    } else {
        minBirthDate = ''
    }
    if(config.maxDate) {
        maxBirthDate = config.maxDate.format("dd-MM-yyyy")
    } else {
        maxBirthDate = ''
    }
%>

<div class="form-group row">
	<label for="${config.formFieldName}" class="form-group col-md-4">${config.label}</label>
	<div class="form-group col-md-4">
		<input type="text" id="${config.formFieldName}" class="form-control form-control-sm">
		<div class="invalid-feedback d-none"></div>
		<input type="hidden" id="${config.formFieldName}Day">
		<input type="hidden" id="${config.formFieldName}Month">
		<input type="hidden" id="${config.formFieldName}Year">
		<input type="hidden" id="${config.formFieldName}-value" name="${config.formFieldName}">
	</div>
	<input id="demographics-unknown" type="hidden" name="unknown" value="false"/>
</div>

<script type="text/javascript">

jq(function() {
	var monthOptions = monthNames;
	var maxDate = new Date("${maxBirthDate}");
	var minDate = new Date("${minBirthDate}");
	jq("#${config.formFieldName}").datepicker({
		dateFormat: "dd-MM-yy",
		firstDay: 1,
		maxDate: maxDate,
		minDate: minDate,
		monthNames: monthOptions,
		showAnim: "fold",
		onSelect: function(text, ins){
	        var selectedDay = ins.selectedDay;
	        selectedDay = selectedDay.toString().length == 1 ? ('0'+selectedDay.toString()) : selectedDay.toString();
	        jq('#${config.formFieldName}Day').val(selectedDay);
	        var selectedMonth = ins.selectedMonth + 1;
	        selectedMonth = selectedMonth.toString().length == 1 ? ('0'+selectedMonth.toString()) : selectedMonth.toString();
	        jq('#${config.formFieldName}Month').val(selectedMonth);
	        var selectedYear = ins.selectedYear;
	        jq('#${config.formFieldName}Year').val(selectedYear);
	        jq('#${config.formFieldName}-value').val(selectedYear + '-' + selectedMonth + '-' + selectedDay);
		}
	});
	
	setDate = function(dd,mm,yyyy){
		jq("#${config.formFieldName}").val(dd + "-" + monthNames[mm-1] + "-" + yyyy);
		
		var selectedDay = dd.toString().length == 1 ? ('0'+dd.toString()) : dd.toString();
        jq('#${config.formFieldName}Day').val(selectedDay);
        
        var selectedMonth = mm.toString().length == 1 ? ('0'+mm.toString()) : mm.toString();
        jq('#${config.formFieldName}Month').val(selectedMonth);
        
        var selectedYear = yyyy;
        jq('#${config.formFieldName}Year').val(selectedYear);
        
        jq('#${config.formFieldName}-value').val(selectedYear + '-' + selectedMonth + '-' + selectedDay);
	}
	
	if(${config.initialValue != null}){
		setDate(initialDay, initialMonth, initialYear);
	}
});

</script>