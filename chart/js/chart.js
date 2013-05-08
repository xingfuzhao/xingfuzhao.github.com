/*        
 * Histogram
 * 柱状图
 * 
 */

(function(){
	
	var dataArr = {
		"data":[
			{"id":1,"name":"百度","per":"10"},
			{"id":2,"name":"腾讯","per":"20"},
			{"id":3,"name":"新浪","per":"10"},
			{"id":4,"name":"网易","per":"44"},
			{"id":5,"name":"搜狐","per":"50"},
			{"id":5,"name":"小虾虎鱼","per":"69"},
			{"id":5,"name":"人人网","per":"72"},
			{"id":5,"name":"爱奇异","per":"88"},
			{"id":5,"name":"奇虎360","per":"92"},
			{"id":5,"name":"阿里巴巴","per":"15"},
			{"id":5,"name":"阿里巴巴","per":"10"}
		]
	};
	
	var bgColor = new Array("#666666","#21AA7C","#2277BB","#dc7644","#BBAA22","#AA22AA","#338800","#1099EE","#ffcc33","#ED3810");
	var num = [100,80,60,40,20,0];
	
	function chart_Histogram(dataArr,bgColor,num,chart){
		
		var l = dataArr.data.length;
		var ln = num.length;
		//alert(chart);
		$(chart).append("<div class='chartcont'></div>");
		$(chart).append("<div class='chart_num'></div>");
		$(chart).append("<div class='chart_Histogram'></div>");
		
		//在页面中添加方格
		for(var r=0; r<ln-1; r++){
			$(".chartcont").append("<ul></ul>");
			for(var t=0;t<l;t++){
				$(".chartcont ul").eq(r).append("<li></li>");
				var wid = parseInt(1000/l)-1 + "px";
				var heiall = parseInt(150/(ln-1)) +"px";
				$(".chartcont ul").css({height:heiall});
				$(".chartcont ul li").css({width:wid,height:heiall});
			}
		}
		
		
		//用于存放高度百分比值
		var arrh = [];
		var all_num = 0;
		var hei = 0;
		var arrt = [];
		for(var n=0; n<l; n++){
			hei = parseInt( (parseInt(dataArr.data[n].per) /(100)) * 150  ) + "px";
			arrh.push(hei);
			arrt.push(dataArr.data[n].name);
		}
		
		
		//在页面中添加百分比分割
		$(".chart_num").append("<ul></ul>");
		for(var w=0; w<=ln-1;w++){
			$(".chart_num ul").append("<li>"+ num[w] +"</li>");
			var hei = parseInt(150/(ln-1)) + "px";
			$(".chart_num ul li").css({height:hei,"line-height":hei});
		}
		
		//在页面中添加柱形图
		$(".chart_Histogram").append("<ul></ul>");
		for(var i = 0; i<= l; i++){
			$(".chart_Histogram ul").append("<li><a href='javascript:void(0);'></a><span></span></li>");
			var wid1 = parseInt(1000/l)-1 + "px";
			var rig = (parseInt(1000/l)-1) * 33.5/100 +"px"; 
			var wida = (parseInt(1000/l)-1) * 25/100 +"px";
			$(".chart_Histogram ul li").css({width:wid1});
			$(".chart_Histogram ul li").eq(i).find("a").css({ height:arrh[i],background:bgColor[parseInt(10*Math.random())],right:rig,width:wida});
			$(".chart_Histogram ul li").eq(i).find("span").html(arrt[i]);
		}
	}
	chart_Histogram(dataArr,bgColor,num,"#chart");
})();