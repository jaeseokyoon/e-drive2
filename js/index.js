// 팝업 start
;(function($) {
    $(function() {
        $('#myBtn1').bind('click', function(e) {
            e.preventDefault();
            $('#myModal1').bPopup({
              follow: [false, false]
            });
        });
				$('#myBtn2').bind('click', function(e) {
            e.preventDefault();
            $('#myModal2').bPopup({
              follow: [false, false]
            });
        });
				$('#myBtn3').bind('click', function(e) {
            e.preventDefault();
            $('#myModal3').bPopup({
              follow: [false, false]
            });
        });
				$('#myBtn4').bind('click', function(e) {
            e.preventDefault();
            $('#myModal4').bPopup({
              follow: [false, false]
            });
        });
				$('#myBtn5').bind('click', function(e) {
            e.preventDefault();
            $('#myModal5').bPopup({
              follow: [false, false]
            });
        });
				$('#myBtn6').bind('click', function(e) {
            e.preventDefault();
            $('#myModal6').bPopup({
              follow: [false, false]
            });
        });
				$('#myBtn7').bind('click', function(e) {
            e.preventDefault();
            $('#myModal7').bPopup({
              follow: [false, false]
            });
        });
				$('#myBtn8').bind('click', function(e) {
            e.preventDefault();
            $('#myModal8').bPopup({
              follow: [false, false]
            });
        });
				$('#myBtn9').bind('click', function(e) {
            e.preventDefault();
            $('#myModal9').bPopup({
              follow: [false, false]
            });
        });
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
/*마이메뉴 팝업 start*/
	$(document).ready(function(){
			// Get the modal
			 var modal = document.getElementById('myModal');

			 // Get the button that opens the modal
			 var btn = document.getElementById("myBtn");

			 // Get the <span> element that closes the modal
			 var span = document.getElementsByClassName("close")[0];

			 // When the user clicks on the button, open the modal
			 btn.onclick = function() {
					 modal.style.display = "block";
			 }

			 // When the user clicks on <span> (x), close the modal
			 span.onclick = function() {
					 modal.style.display = "none";
			 }
			 // When the user clicks anywhere outside of the modal, close it
			 window.onclick = function(event) {
					 if (event.target == modal) {
							 modal.style.display = "none";
					 }
			 }
	});
/*마이메뉴 팝업 end*/

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
