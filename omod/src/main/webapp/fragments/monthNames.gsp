<%
	import groovy.json.*
    
    def monthOptions = new ArrayList<String>()
               
    for(i=1; i<=12; i++){
    	monthOptions.add(ui.message("registrationapp.month."+i))
    }
    
    def monthOptionsJson = new JsonBuilder(monthOptions);
%>

<script type="text/javascript">
    var monthNames = ${ monthOptionsJson }
</script>