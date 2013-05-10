/*
 * 
 * 轮播器
 * 
 */

function banner_turn(){
	
	//初始化轮播器默认状态
	$("#banner .banner_a").hide();
	$("#banner .banner_a").eq(0).show();
	var banner_text = $("#banner .banner_a").eq(0).find("img").attr("alt");
	$("#banner .banner_st a").html(banner_text);
	$("#banner ul li").removeClass("onnow");
	$("#banner ul li").eq(0).addClass("onnow");
	
	//伦博计数器
	var banner_index_auto = 1;
	//轮播方式
	var banner_type = "default";
	
	$(".banner_t a").click(function(){
		//alert($("#banner ul li.onnow").index());
		//clearInterval(banner_timer);
		banner_type = $(this).attr("rel");
////		alert(banner_index_auto);
////		banner_index_auto = $("#banner ul li.onnow").index();
//		banner_timer = setInterval(banner_fn,5000);
	});
	
	//自动执行
	var banner_timer = setInterval(banner_fn,5000);
	
	//手动执行
	$("#banner ul li").hover(
		function(){
			
			clearInterval(banner_timer);
			
			//判断如果已经是当前图片则不用执行重复的，如果之前的不是hover上去想要执行的再执行
			if(!($(this).attr("class") == "onnow")){
				//注意hover这里得pre参数也必须是banner_index_auto == 0 ? $("#banner ul li").length-1 : banner_index_auto-1
				//因为这个是纪录hover之前得那张正在运行得图片得
				banner(this,banner_index_auto == 0 ? $("#banner ul li").length-1 : banner_index_auto-1,banner_type);
			}
		},
		function(){
			
			banner_index_auto = $(this).index() + 1;
			banner_timer = setInterval(banner_fn,5000);
			
		}
	);
	
	//整合重复代码并且解决自动伦博和手动伦博的传值冲突
	function banner(obj,pre,banner_type){
		
		if(banner_type == "default"){
			$("#banner .banner_a").css({opacity:1,fliter:"alpha:('opacity:100')",left:"0px",top:"0px"});
			//直接切换
			$("#banner .banner_a").hide();
			$("#banner .banner_a").eq($(obj).index()).show();
			
		} else if(banner_type == "opa"){
			$("#banner .banner_a").css({top:"0px",left:"0px"});
			//透明过渡切换
			//$("#banner .banner_a").css({opacity:0,fliter:"alpha:('opacity:0')"});
			//让透明效果有一个很好得渐变得显示与隐藏所以要让前一张也慢慢得以藏掉而不是直接把所有得都直接透明度设置为0
			$("#banner .banner_a").eq(pre).fadeTo("slow",0);
			$("#banner .banner_a").eq($(obj).index()).fadeTo("slow",1);
			
		} else if(banner_type == "utod"){
			$("#banner .banner_a").css({opacity:1,fliter:"alpha:('opacity:100')",left:"0px"});
			//图片从上往下执行
			$("#banner .banner_a").eq(pre).css({"z-index":1,"display":"block"}).animate({
				top:"250px"
			},800);
			$("#banner .banner_a").eq($(obj).index()).css({top:"-250px","z-index":2,"display":"block"}).animate({
				top:"0px"
			},800);
		} else if(banner_type == "ltor"){
			$("#banner .banner_a").css({opacity:1,fliter:"alpha:('opacity:100')",top:"0px"});
			//图片从左往右执行
			$("#banner .banner_a").eq(pre).css({"z-index":1,"display":"block"}).animate({
				left:"400px"
			},800);
			$("#banner .banner_a").eq($(obj).index()).css({left:"-400px","z-index":2,"display":"block"}).animate({
				left:"0px"
			},800);
		}
		
		var banner_text = $("#banner .banner_a").eq($(obj).index()).find("img").attr("alt");
		$("#banner .banner_st a").html(banner_text);
		$("#banner ul li").removeClass("onnow");
		$(obj).addClass("onnow");
	}
	
	function banner_fn(){
		if(banner_index_auto >= $("#banner ul li").length){
			banner_index_auto = 0;
		}
		banner($("#banner ul li").eq(banner_index_auto),banner_index_auto == 0 ? $("#banner ul li").length-1 : banner_index_auto-1,banner_type);
		banner_index_auto++;
	}
	
}
banner_turn();