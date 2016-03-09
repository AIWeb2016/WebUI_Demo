$(function() {

	$("#div_a li").bind("click", function() {
		$(this).addClass("ext").siblings().removeClass("ext");
		var _address = $(this).attr("value");
		$("#ifr_m").attr("src", _address);
		var _htm = "";
		var intervalIframe = setInterval(function() {
			_htm = $("#ifr_m").contents().find("body").html();
		
			if (_htm != "") {
				$("#div_code").text(_htm);
				clearInterval(intervalIframe);
			}
		}, 100);
        
	});
	
//	$("#ifr_m").mouseover(function(){
//		$(this).attr("scrolling","yes");
//	
//	});
//	$("#ifr_m").mouseout(function(){
//		$(this).attr("scrolling","no");
//		
//	});
	
});