/*
 * 
 * �ֲ���
 * 
 */

function banner_turn(){
	
	//��ʼ���ֲ���Ĭ��״̬
	$("#banner .banner_a").hide();
	$("#banner .banner_a").eq(0).show();
	var banner_text = $("#banner .banner_a").eq(0).find("img").attr("alt");
	$("#banner .banner_st a").html(banner_text);
	$("#banner ul li").removeClass("onnow");
	$("#banner ul li").eq(0).addClass("onnow");
	
	//�ײ�������
	var banner_index_auto = 1;
	//�ֲ���ʽ
	var banner_type = "default";
	
	$(".banner_t a").click(function(){
		//alert($("#banner ul li.onnow").index());
		//clearInterval(banner_timer);
		banner_type = $(this).attr("rel");
////		alert(banner_index_auto);
////		banner_index_auto = $("#banner ul li.onnow").index();
//		banner_timer = setInterval(banner_fn,5000);
	});
	
	//�Զ�ִ��
	var banner_timer = setInterval(banner_fn,5000);
	
	//�ֶ�ִ��
	$("#banner ul li").hover(
		function(){
			
			clearInterval(banner_timer);
			
			//�ж�����Ѿ��ǵ�ǰͼƬ����ִ���ظ��ģ����֮ǰ�Ĳ���hover��ȥ��Ҫִ�е���ִ��
			if(!($(this).attr("class") == "onnow")){
				//ע��hover�����pre����Ҳ������banner_index_auto == 0 ? $("#banner ul li").length-1 : banner_index_auto-1
				//��Ϊ����Ǽ�¼hover֮ǰ�������������е�ͼƬ��
				banner(this,banner_index_auto == 0 ? $("#banner ul li").length-1 : banner_index_auto-1,banner_type);
			}
		},
		function(){
			
			banner_index_auto = $(this).index() + 1;
			banner_timer = setInterval(banner_fn,5000);
			
		}
	);
	
	//�����ظ����벢�ҽ���Զ��ײ����ֶ��ײ��Ĵ�ֵ��ͻ
	function banner(obj,pre,banner_type){
		
		if(banner_type == "default"){
			$("#banner .banner_a").css({opacity:1,fliter:"alpha:('opacity:100')",left:"0px",top:"0px"});
			//ֱ���л�
			$("#banner .banner_a").hide();
			$("#banner .banner_a").eq($(obj).index()).show();
			
		} else if(banner_type == "opa"){
			$("#banner .banner_a").css({top:"0px",left:"0px"});
			//͸�������л�
			//$("#banner .banner_a").css({opacity:0,fliter:"alpha:('opacity:0')"});
			//��͸��Ч����һ���ܺõý������ʾ����������Ҫ��ǰһ��Ҳ�������Բص�������ֱ�Ӱ����еö�ֱ��͸��������Ϊ0
			$("#banner .banner_a").eq(pre).fadeTo("slow",0);
			$("#banner .banner_a").eq($(obj).index()).fadeTo("slow",1);
			
		} else if(banner_type == "utod"){
			$("#banner .banner_a").css({opacity:1,fliter:"alpha:('opacity:100')",left:"0px"});
			//ͼƬ��������ִ��
			$("#banner .banner_a").eq(pre).css({"z-index":1,"display":"block"}).animate({
				top:"250px"
			},800);
			$("#banner .banner_a").eq($(obj).index()).css({top:"-250px","z-index":2,"display":"block"}).animate({
				top:"0px"
			},800);
		} else if(banner_type == "ltor"){
			$("#banner .banner_a").css({opacity:1,fliter:"alpha:('opacity:100')",top:"0px"});
			//ͼƬ��������ִ��
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