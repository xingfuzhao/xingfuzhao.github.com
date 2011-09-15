jQuery (function ($) {	

	$("#content div").hide();	
	$("#content div.home").slideToggle("3000");	
	$("#menu ul li.list1").click( function () {			
		$("#content div").slideUp("3000");		
		$("#content div.home").slideToggle("3000");		
	})	;
	
	$("#menu ul li.list2").click( function () {
		$("#content div").slideUp("3000");
		$("#content div.about").slideToggle("3000");
	})	;
	$("#menu ul li.list3").click( function () {
		$("#content div").slideUp("3000");
		$("#content div.folio").slideToggle("3000");
	})	;
	$("#menu ul li.list4").click( function () {	
		$("#content div").slideUp("3000");
		$("#content div.social").slideToggle("3000");
	})	;
	$("#menu ul li.list5").click( function () {	
		$("#content div").slideUp("3000");		
		$("#content div.contact" ).slideToggle("3000");		
	})	;
	
	$("#content div.home img").mouseover(function() {
		$("#content div.home img").css("opacity","0.5");
	});
	$("#content div.home img").mouseout(function() {
		$("#content div.home img").css("opacity","1.0");
	});

	$("#content div.home p").mouseover(function() {
		$("#content div.home p").css("opacity","1.0");
		$("#content div.home p").css("color","pink");
	});
	$("#content div.home p").mouseout(function() {
		$("#content div.home p").css("opacity","0.8");
		$("#content div.home p").css("color","white");
	});
	    
	$("#content div.social ul li").each(function changed() {
		$(this).mouseover(function(){
			$(this).css("padding-left","35px");
		}),
		$(this).mouseout(function(){
			$(this).css("padding-left","30px");
		})
	});		

	$("#content div.folio p").each(function changing() {		
		$(this).mouseover(function() {			
			$(this).css("position","relative")
			$(this).css("left","10")	
			$(this).css("top","-10")
			$(this).css("font-size","16")
			$(this).fadeIn("slow")	
			$(this).fadeTo("fast", 1.0)
		}),
		$(this).mouseout(function() {			
			$(this).css("left","0")
			$(this).css("top","0")	
			$(this).css("font-size","12")
			$(this).fadeTo("fast", 0.25)
		})
	});
	 
	$(" form fieldset input.btn1").click(function mySubmit()
	{
		 if(document.getElementById("name").value=='')
		  {
		  alert('名称不能为空！');
		  return false ;
		  } else if(document.getElementById("email").value=='')
					{
						alert('邮箱不能为空！');
						return false ;
					} else  if (!((/[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+.[a-zA-Z0-9-_.]+/).test(document.getElementById("email").value)))
					{	
						alert('邮箱非法！');
						return false ;			
					}					
		  return  true;
	});
	

});








	