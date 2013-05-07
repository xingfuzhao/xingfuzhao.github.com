
//元素居中
function center(element) {
	var x = ($(window).width()-element.width())/2 + $(document).scrollLeft() + "px";
	var y = ($(window).height()-element.height())/2 + $(document).scrollTop() + "px";
	element.css({left:x,top:y});
}

//可拖动的元素
function dragAble(element) {
	var flag = false;
	element.bind("mousedown",function(e) {
	
		//标记开始拖动
		flag = true;
		
		//获得鼠标点击时的坐标点
		var mousex = e.pageX;
		var mousey = e.pageY;
		
		//element 相对于浏览器左面和上面的距离初始值
		var elementx = element.offset().left;
		var elementy = element.offset().top;
		
		//获得鼠标点击点相对与element的距离
		var emx = mousex - elementx;
		var emy = mousey - elementy;
		
		//alert(elementy);
		
		$(window).bind("mousemove",function(e) {
			
			if(flag == true) {
				//得到元素的新的left值和top值
				var newx = e.pageX - emx;
				var newy = e.pageY - emy;
				if(newx <= 0) {
					newx = 0;
				} 
				if(newy < 0){
					newy = 0;
				} 
				if (newx > ($(window).width() - element.width())) {
					newx = $(window).width() - element.width();
				}
				if (newy > ($(window).height() - element.height())) {
					newy = $(window).height() - element.height();
				}
				element.css({left:newx,top:newy});
			}
		});
		$(window).bind("mouseup",function() {
				flag = false;
		});
	});
}

//密码验证函数
function check_pass(_this) {
	
	var code_length = 0;
	var flag = false;
	var value_length = $.trim($(_this).val()).length;
	if(value_length >= 6 && value_length <= 20) {
		$("#reg dl dd span p strong.q1").html("●").css("color","green");
	} else {
		$("#reg dl dd span p strong.q1").html("◦").css("color","#666");
	}
	
	if(value_length > 0 && !/\s/.test($.trim($(_this).val()))){
		$("#reg dl dd span p strong.q2").html("●").css("color","green");
	}else{
		$("#reg dl dd span p strong.q2").html("◦").css("color","#666");
	}
	
	if(/[a-z]/.test($.trim($(_this).val()))) {
		code_length++;
	}
	if(/[A-Z]/.test($.trim($(_this).val()))) {
		code_length++;
	}
	if(/[0-9]/.test($.trim($(_this).val()))) {
		code_length++;
	}
	if(/[^a-zA-Z0-9]/.test($.trim($(_this).val()))) {
		code_length++;
	}
	
	//alert(code_length);
	if(code_length >= 2) {
		$("#reg dl dd span p strong.q3").html("●").css("color","green");
	}else {
		$("#reg dl dd span p strong.q3").html("◦").css("color","#666");
	}
	
	if(value_length >=10 && code_length >=3){
		$("#reg dl dd span p strong.s1").css("color","green");
		$("#reg dl dd span p strong.s2").css("color","green");
		$("#reg dl dd span p strong.s3").css("color","green");
		$("#reg dl dd span p strong.s4").html("高").css("color","green");
	}else if(value_length >=8 && code_length >=2){
		$("#reg dl dd span p strong.s1").css("color","orange");
		$("#reg dl dd span p strong.s2").css("color","orange");
		$("#reg dl dd span p strong.s3").css("color","#ccc");
		$("#reg dl dd span p strong.s4").html("中").css("color","orange");
	}else if(value_length >=1){
		$("#reg dl dd span p strong.s1").css("color","red");
		$("#reg dl dd span p strong.s2").css("color","#ccc");
		$("#reg dl dd span p strong.s3").css("color","#ccc");
		$("#reg dl dd span p strong.s4").html("低").css("color","red");
	}else{
		$("#reg dl dd span p strong.s1").css("color","#ccc");
		$("#reg dl dd span p strong.s2").css("color","#ccc");
		$("#reg dl dd span p strong.s3").css("color","#ccc");
		$("#reg dl dd span p strong.s4").html(" ").css("color","#ccc");
	}
		
	if((value_length >= 6 && value_length <= 20 && !/\s/.test($.trim($(_this).val())) && code_length >= 2)){
		flag = true;
	}
	return flag;
}

//修改年月日中天数的函数
function change_day(year,month,day,day30,day31){
	//初始化清空所有value值不为0的option
	$(day).find("option[index != 0]").remove();
	
	if($(year).val() != 0 && $(month).val() != 0){
		//alert($.inArray(parseInt($(month).val()),day30));
		if($.inArray(parseInt($(month).val()),day30) > -1) {
			//alert(30);
			for(var k=1;k<=30;k++){
				day.add(new Option(k,k),undefined);
			}
		}else if($.inArray(parseInt($(month).val()),day31) > -1)  {
			//alert(31);
			for(var k=1;k<=31;k++){
				day.add(new Option(k,k),undefined);
			}
		}else{
			if($(year).val() % 4 == 0 && $(year).val() % 100 != 0 || $(year).val() % 400 == 0) {
				for(var k=1;k<=29;k++){
					day.add(new Option(k,k),undefined);
				}
			} else {
				for(var k=1;k<=28;k++){
					day.add(new Option(k,k),undefined);
				}
			}
		}
		
	}
}

//判断是不是中文
function isChinese(str){  
   var reCh=/[u00-uff]/;
   return !reCh.test(str);
}
