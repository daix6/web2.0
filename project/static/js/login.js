var allow = true
$(document).ready(function() {
	$("#loginbt").click( function() {
		if (allow) {
			allow = false;
			name_ = $("#name").val();
			psw_ = $("#password").val();
			$.ajax({   
   				type: "post", 
   				url: "/login",  
   				data: {"name":name_,"password":psw_},
   				success: function(flag) {
   					alert(flag);
   					if (flag == "true") {
   						$.get("/");
   					} else {
   						$("small.error").css("display", "block");
   					}
   				},
   			});
   			allow = true;
   		}
	});

});