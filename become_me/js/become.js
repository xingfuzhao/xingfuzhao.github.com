$(function(){
	
	//个人中心下拉菜单的显示与隐藏
	$("#header .member").hover(
		function() {
			$(this).css("background","url('images/arrow2.png') no-repeat right 55%");
			$(".member_ul").show();
		},
		function() {
			$(this).css("background","url('images/arrow.png') no-repeat right 55%");
			$(".member_ul").hide();
		}
	);
	
	//登录弹出框的显示与隐藏
	
	//点击弹出框显示
	$(".login").click(function() {
		
		//获取浏览器的可是区域的宽高值
		var xw=$(window).width()+"px";
		var yw=$(window).height()+"px";
		
		//设置遮罩层的宽高和弹出框的居中
		$("#screen").css({width:xw,height:yw});
		center($("#login"));
		
		//窗口大小改变时重新调整弹出框的位置和遮罩层的大小
		$(window).bind("resize",function() {
			
			//重新调整浏览器大小时让弹出框居中
			center($("#login"));
			
			/*
			//重新调整浏览器时让弹出框始终出现在可视范围内
			if($("#login").offset().left > $(window).width()-$("#login").width()) {
				$("#login").css({left:$(window).width()-$("#login").width()});
			} else if($("#login").offset().top > $(window).height()-$("#login").height()) {
				$("#login").css({top:$(window).height()-$("#login").height()});
			}
			*/
			
			var xw=$(window).width()+"px";
			var yw=$(window).height()+"px";
			$("#screen").css({width:xw,height:yw});
		});
		
		//让弹出框和遮罩层显示出来
		$("#screen").show();
		$("#login").show();
		
		//滚动时重新设置弹出框的位置和遮罩层的大小
		$(window).bind("scroll",function() {
			
			//重新调整浏览器大小时让弹出框居中
			center($("#login"));
			
			//重新调整浏览器时让弹出框始终出现在可视范围内
		    //$("#login").css({left:$("#login").offset().left + $(document).scrollLeft()});
			//$("#login").css({top:$("#login").offset().top + $(document).scrollTop()});
			
			var xw=$(window).width() + $(document).scrollLeft() + "px";
			var yw=$(window).height() + $(document).scrollTop() +"px";
			$("#screen").css({width:xw,height:yw});
		});
		dragAble($("#login"));
	});
	
	//点击弹出框隐藏
	$("#login .close").click(function() {
		$("#login").hide();
		$("#screen").hide();
	});
	
	//menu菜单滑动效果
	$("#menu .about li").hover(
		function(){
			var target = $(this).index() * 85;
			$("#menu .nav_bg").animate({left:target + 20},"fast",function(){
				$(".nav_bg ul.ultwo").animate({left:-target});
			});
		},
		function(e){
			//判断鼠标移出到哪里如果仍然是 li 则不执行回到首页位置的动画
			if(!(e.relatedTarget.nodeName == "LI")) {
				$("#menu .nav_bg").animate({left:0 + 20},"fast",function(){
					$("#menu .nav_bg ul.ultwo").animate({left:0});
				});
			}
		}
	);
	
	//注册验证
	//验证用户名
	$("#reg form input[name = 'user']").bind("focus",function(){
		$("#reg dl dd span.user_info").show();
		$("#reg dl dd span.user_error").hide();
		$("#reg dl dd span.user_succ").hide();
	}).bind("blur",function(){
		if($.trim($("#reg form input[name = 'user']").val()) == '') {
			$("#reg dl dd span.user_info").hide();
			$("#reg dl dd span.user_error").hide();
			$("#reg dl dd span.user_succ").hide();
		} else if(!/[a-zA-Z0-9_]{2,20}/.test($.trim($("#reg form input[name = 'user']").val()))) {
			$("#reg dl dd span.user_info").hide();
			$("#reg dl dd span.user_error").show();
			$("#reg dl dd span.user_succ").hide();
		} else {
			$("#reg dl dd span.user_info").hide();
			$("#reg dl dd span.user_error").hide();
			$("#reg dl dd span.user_succ").show();
		}
	});
	
	//验证密码
	$("#reg form input[name = 'pass']").bind("focus",function(){
		$("#reg dl dd span.pass_info").show();
		$("#reg dl dd span.pass_error").hide();
		$("#reg dl dd span.pass_succ").hide();
	}).bind("blur",function(){
		if($.trim($("#reg form input[name = 'pass']").val()) == '') {
			$("#reg dl dd span.pass_info").hide();
			$("#reg dl dd span.pass_error").hide();
			$("#reg dl dd span.pass_succ").hide();
		}else if(check_pass($("#reg form input[name = 'pass']"))) {
			$("#reg dl dd span.pass_info").hide();
			$("#reg dl dd span.pass_error").hide();
			$("#reg dl dd span.pass_succ").show();
		} else {
			$("#reg dl dd span.pass_info").hide();
			$("#reg dl dd span.pass_error").show();
			$("#reg dl dd span.pass_succ").hide();
		
		}
	});
	
	$("#reg form input[name = 'pass']").bind("keyup",function(){
		check_pass(this);
	});
	
	//验证密码确认
	$("#reg form input[name = 'notpass']").bind("focus",function(){
		$("#reg dl dd span.notpass_info").show();
		$("#reg dl dd span.notpass_error").hide();
		$("#reg dl dd span.notpass_succ").hide();
	}).bind("blur",function(){
		if($("#reg form input[name = 'notpass']").val() == $("#reg form input[name = 'pass']").val()){
			$("#reg dl dd span.notpass_info").hide();
			$("#reg dl dd span.notpass_error").hide();
			$("#reg dl dd span.notpass_succ").show();
		}else{
			$("#reg dl dd span.notpass_info").hide();
			$("#reg dl dd span.notpass_error").show();
			$("#reg dl dd span.notpass_succ").hide();
		}
	});
	
	//验证注册邮箱
	$("#reg form input[name = 'email']").bind("focus",function(){
		
		//得到焦点后显示菜单
		$("#reg dl dd .ul_email").show();
		
		$("#reg dl dd span.email_info").show();
		$("#reg dl dd span.email_error").hide();
		$("#reg dl dd span.email_succ").hide();
	}).bind("blur",function(){
		
		//失去焦点后隐藏下拉菜单
		$("#reg dl dd .ul_email").hide();
		
		//xingfuzhao@gmail.com
		if(/^[a-zA-z0-9_\-\.]+@[a-zA-z0-9_-]+(\.[a-zA-Z]{2,4}){1,2}$/.test($("#reg form input[name = 'email']").val())){
			$("#reg dl dd span.email_info").hide();
			$("#reg dl dd span.email_error").hide();
			$("#reg dl dd span.email_succ").show();
		}else{
			$("#reg dl dd span.email_info").hide();
			$("#reg dl dd span.email_error").show();
			$("#reg dl dd span.email_succ").hide();
		}
	});
	
	//邮箱自动补齐
	$("#reg dl dd .ul_email li").hover(
		function(){
			$(this).css("background-color","#e3e3e3");
		},
		function(){
			$(this).css("background-color","#fff");
		}
	);
	$("#reg form input[name = 'email']").bind("keyup",function(event){
		
		//判断已经有@字符时隐藏下拉菜单
		if($("#reg form input[name = 'email']").val().indexOf("@") == -1){
			$("#reg dl dd .ul_email li span").html($("#reg form input[name = 'email']").val());
			$("#reg dl dd .ul_email").show();
		}else{
			$("#reg dl dd .ul_email").hide();
		}
		
		//邮箱下拉菜单长度
		var ul_length = $("#reg dl dd .ul_email li span").length;
		
		//初始化下拉菜单的
		$("#reg dl dd .ul_email li").css("background-color","#fff");
		
		//按下向上箭头键
		if(event.keyCode == 40) {
			if(this.index == undefined || this.index >= ul_length-1) {
				this.index = 0;
			} else {
				this.index++;
			}
			$("#reg dl dd .ul_email li").eq(this.index).css("background-color","#e3e3e3");
		}
		
		//按下向下箭头键
		if(event.keyCode == 38){
			if(this.index == undefined || this.index <= 0) {
				this.index = ul_length;
			} else {
				this.index--;
			}
			$("#reg dl dd .ul_email li").eq(this.index).css("background-color","#e3e3e3");
		}
		
		//按下回车键
		if(event.keyCode == 13){
			$(this).val($("#reg dl dd .ul_email li").eq(this.index).text());
			$("#reg dl dd .ul_email").hide();
			this.index = undefined;
		}
		
	});
	//这里不能用click因为click是鼠标按下并松开后触发的那时候已经blur了所以要用mousedown事件来触发
	$("#reg dl dd .ul_email li").bind("mousedown",function(){
		var value_text = $(this).text();
		$("#reg form input[name = 'email']").val(value_text);
	});
	
	
	//年月日
	function add_birthdy(){
		var day30 = [4,6,9,11];
		var day31 = [1,3,5,7,8,10,12];
		//出生年月日
		var year = $("#reg dl dd.dd_birthday select")[0];
		var month = $("#reg dl dd.dd_birthday select")[1];
		var day = $("#reg dl dd.dd_birthday select")[2];
		//添加年
		for(var i=2013;i>=1940;i--){
			year.add(new Option(i,i),undefined);
		}
		//添加月
		for(var j=12;j>=1;j--){
			month.add(new Option(j,j),undefined);
		}
		//添加日
		$(year).bind("change",function(){
			change_day(year,month,day,day30,day31);
		});
		$(month).bind("change",function(){
			change_day(year,month,day,day30,day31);
		});
	}
	add_birthdy();
	
	//初始化年月日
	function init_birth(y,mt,dy){
	
		var yeari = $("#reg dl dd.dd_birthday select")[0];
		var monthi = $("#reg dl dd.dd_birthday select")[1];
		var dayi = $("#reg dl dd.dd_birthday select")[2];
		
		if(y){
			for(var m=0; m <= $(yeari).find("option").length; m++){
				if($(yeari).find("option[index="+m+"]").val() == y){
					$(yeari).find("option[index="+m+"]").attr("selected",true);
				}
			}
		}
		if(mt){
			for(var n=0; n <= $(monthi).find("option").length; n++){
				if($(monthi).find("option[index="+n+"]").val() == mt){
					$(monthi).find("option[index="+n+"]").attr("selected",true);
				}
			}
		}
		if(dy){
			$(monthi).change();
			for(var h=0; h <= $(dayi).find("option").length; h++){
				if($(dayi).find("option[index="+h+"]").val() == dy){
					$(dayi).find("option[index="+h+"]").attr("selected",true);
				}
			}
		}
		
	}
	init_birth(2000,10,11);
	
	//判断还可以输入多少个字
	$("#reg dl dd .texta").bind("keyup",function(){
		re_val();
	});
	//触发粘贴事件
	$("#reg dl dd .texta").bind("paste",function(){
		//因为paste会在粘贴之前就触发所以要延时处理
		setTimeout(re_val,50);
	});
	//计算还可输入多少字符
	function re_val(){
		//var val_t = $("#reg dl dd .texta").val();
		//var val_lnum = 0;
		//var val_l = $("#reg dl dd .texta").val().length;
		var new_num = code_now($("#reg dl dd .texta")).val_lnum;
		//alert(new_num);
		if((200-new_num)>=0){
			$("#reg dl dd.ps1").show();
			$("#reg dl dd.ps2").hide();
			$("#reg dl dd.ps1 strong").html(200-new_num);
		}else{
			$("#reg dl dd.ps1").hide();
			$("#reg dl dd.ps2").show();
			$("#reg dl dd.ps2 strong").html(Math.abs(200-new_num));
		}
	}
	//计算输入的字符数
	function code_now(_this){
		var val_lnuma = 0;
		var val_t = $(_this).val();
		var val_l = $(_this).val().length;
		//alert(val_l);
		//var number_i = 0;
		var arr_num = {
			num:0,
			val_lnum:0
		};
		for(var i=0;i<val_l;i++){
			if(isChinese(val_t.charAt(i)) == true) {
				val_lnuma=val_lnuma+2;//中文
				if(Math.ceil(val_lnuma/2) == 100){
					arr_num.num = i;
				}
			}else{
				val_lnuma=val_lnuma+1;//英文
				if(Math.ceil(val_lnuma/2) == 100){
					arr_num.num = i;
				}
			}
		}
		/*while(Math.ceil(val_lnuma )== 200) {
			arr_num.num = i;
		}*/
		arr_num.val_lnum=val_lnuma;
		return arr_num;
	}
	//点击清尾去除多余字符
	$("#reg dl dd.ps2 span").bind("click",function(){
		//alert(code_now($("#reg dl dd .texta")).num);
		var numb = code_now($("#reg dl dd .texta")).num;
		//var numc = code_now($("#reg dl dd .texta")).val_lnum;
		$("#reg dl dd .texta").val(($("#reg dl dd .texta").val()).substring(0,numb));
		$("#reg dl dd.ps1").show();
		$("#reg dl dd.ps2").hide();
		//截取之后重新获取内容
		var numc = code_now($("#reg dl dd .texta")).val_lnum;
		//alert(code_now($("#reg dl dd .texta")));
		$("#reg dl dd.ps1 strong").html(200-numc);
	});
	//在刷新的时候也执行一次计数函数 re_val();
	//或者 初始化的时候模拟点击键盘，在刷新的时候也执行一次计数函数
	$("#reg dl dd .texta").keyup();
	
	
	// #cop查找关键字标注
	function selcode(){
		
		//存放ask中的关键字
		var arrask = [];
		//存放search中的关键字
		var arrser = [];
		//var arrask1 = [];
		
		//存放在文章中查找到关键字
		//var arrreturn = [];
		
		for(var i=0; i<$(".ask a").length; i++ ){
			var ah = $(".ask a").eq(i);
			arrask.push($(ah).html());
		}
		arrser = $(".search input").val().split(" ");
		$.each(arrser,function(i,p){
			if(!new RegExp(p).test(arrask.join())){
				arrask.push(p);
				$("#cop .ask").append("<a href='javascript:void(0);'>"+p+"</a>");
			}
		});
		//关键字添加颜色
		var oldtext = $("#cop p").text();
		$.each(arrask,function(i,p){
			if(new RegExp(p,"g").test($("#cop p").text())){
				oldtext = oldtext.replace(new RegExp(p,"g"),"<span class='selred'>"+ p +"</span>");
			}
		});
		$("#cop p").html(oldtext);
		
		//删除关键字
		$("#cop .ask a").bind("click",function(){
			var oldtext = $("#cop p").html();
			var delchar = $(this).html();
			//注意单双引号
			var delcolor = '\<span class="selred"\>' + delchar + '\<\/span\>';
			if(new RegExp(delcolor,"g").test(oldtext)){
				oldtext = oldtext.replace(new RegExp(delcolor,"g"),delchar);
			}
			$("#cop p").html(oldtext);
			//移除关闭掉的关键字
			$(this).remove();
		});
	}
	//初始化
	selcode();
	$("#cop .search input").bind("blur",function(){
		selcode();
	});
	$("#cop .search input").bind("keyup",function(e){
		if(e.keyCode == 13){
			selcode();
		}
	});
	
	
	
});
	