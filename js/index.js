$(function() {
  $(".mymenu_select_btn").focus(function () {
      $(".mymenu_select").addClass("active");
  });
  $(".mymenu_close_focus").blur(function () {
      $(".mymenu_select").removeClass("active");
  });
  $(".mymenu_close_focus_sub").focus(function () {
      $(".mymenu_select").removeClass("active");
  });
  $(window).click(function () {
      $(".mymenu_select").removeClass("active");
  });
});

$(function () {
	$(".mymenu_close").click(
		function(){
		  $(".mymenu_select").removeClass("active");
	});
  $('.mymenu_close').on("click",function(){
    $('.mymenu_select').focus();
  });
});


//마이메뉴 end

// 팝업 start
;(function($){
  $(function(){
    for (var i = 1; i <= 10; i++){

			$("#myBtn"+i).data({pop:$("#myModal"+i)});
			$("#myBtn"+i).on("click",function(e){
				e.preventDefault();
				$(this).data("pop").bPopup({
					// follow: [false, false]
				});
        $(".default_cursor").focus();
			});

      //웹접근성:팝업클로즈 버튼 누르면, 포커스가 그전에 눌렀던 팝업 버튼으로 감
      for (var d = 1; d <= 10; d++){
        $('.b-close'+d).data({pop_focus:$('.popupfocus'+d)});
				$('.b-close'+d).on("click",function(){
					$(this).data("pop_focus").focus();
				});
      }
      // $('.b-close1').on("click",function(){
      //   $('.popupfocus1').focus();
      // });
      $('.close').on("click",function(){
        $('.mymenu_select').focus();
      });


		};
  });
})(jQuery);
// 팝업 end

$(".branch").click(function(){
  $(this).children().toggleClass("on");
	$(this).next().slideToggle()
});

$(function(){
	$().each(function(){
		$(this).click(function(){
			var name_var=$(this).attr();
		});
	});
});

/*모달팝업 start*/


/*메인메뉴*/
$("a").click(function(){
	$("a").removeClass("active")
	$(this).addClass("active")
});

/*페이지 버튼*/
$(".page_num").click(function(){
	$(".page_num").removeClass("active")
	$(this).addClass("active")
});
$(".page_num2").click(function(){
	$(".page_num2").removeClass("active")
	$(this).addClass("active")
});


/*file 인풋*/
var uploadFile = $('.fileBox .uploadBtn');
uploadFile.on('change', function(){
	if(window.FileReader){
		var filename = $(this)[0].files[0].name;
	} else {
		var filename = $(this).val().split('/').pop().split('\\').pop();
	}
	$(this).siblings('.fileName').val(filename);
});


/*탭메뉴 추가 start*/
$(function () {

  $(".tab_content").hide();
  $(".tab_content:first").show();

  $("ul.tabs li").click(function () {
    $("ul.tabs li").removeClass("active").css("color", "#979797");
    //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
    $(this).addClass("active").css("color", "#4283df");
    $(".tab_content").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();
  });
});
/*탭메뉴 추가 end*/

/*select 추가 start*/
jQuery(document).ready(function(){

  var select = $("select");

  select.change(function(){
    var select_name = $(this).children("option:selected").text();
    $(this).siblings("label").text(select_name);
  });
});
/*select 추가 end*/
