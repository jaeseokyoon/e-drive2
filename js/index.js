	$('.branch').click(function(){
    $(this).children().toggleClass('on');
		$(this).next().slideToggle();
	});

	$(function(){
		$().each(function(){
			$(this).click(function(){
				var name_var=$(this).attr();
				//$().text()
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

/*업무조직정보 팝업 start*/
$(document).ready(function(){
		// Get the modal
		 var modal = document.getElementById('myModal1');

		 // Get the button that opens the modal
		 var btn = document.getElementById("myBtn1");

		 // Get the <span> element that closes the modal
		 var span = document.getElementsByClassName("close1")[0];
		 var span1 = document.getElementsByClassName("close1_1")[0];

		 // When the user clicks on the button, open the modal
		 btn.onclick = function() {
				 modal.style.display = "block";
		 }

		 // When the user clicks on <span> (x), close the modal
		 span.onclick = function() {
				 modal.style.display = "none";
		 }
		 span1.onclick = function() {
				 modal.style.display = "none";
		 }

		 // When the user clicks anywhere outside of the modal, close it
		 window.onclick = function(event) {
				 if (event.target == modal) {
						 modal.style.display = "none";
				 }
		 }
});
/*업무조직정보 팝업 end*/

/*폴더권한2 팝업 start*/
$(document).ready(function(){
		// Get the modal
		 var modal = document.getElementById('myModal2');

		 // Get the button that opens the modal
		 var btn = document.getElementById("myBtn2");

		 // Get the <span> element that closes the modal
		 var span = document.getElementsByClassName("close2")[0];
		 var span1 = document.getElementsByClassName("close2_1")[0];

		 // When the user clicks on the button, open the modal
		 btn.onclick = function() {
				 modal.style.display = "block";
		 }

		 // When the user clicks on <span> (x), close the modal
		 span.onclick = function() {
				 modal.style.display = "none";
		 }
		 span1.onclick = function() {
				 modal.style.display = "none";
		 }

		 // When the user clicks anywhere outside of the modal, close it
		 window.onclick = function(event) {
				 if (event.target == modal) {
						 modal.style.display = "none";
				 }
		 }
});
/*폴더권한2팝업 end*/


/*폴더권한 팝업 start*/
$(document).ready(function(){
		// Get the modal
		 var modal = document.getElementById('myModal3');

		 // Get the button that opens the modal
		 var btn = document.getElementById("myBtn3");

		 // Get the <span> element that closes the modal
		 var span = document.getElementsByClassName("close3")[0];
		 var span1 = document.getElementsByClassName("close3_1")[0];

		 // When the user clicks on the button, open the modal
		 btn.onclick = function() {
				 modal.style.display = "block";
		 }

		 // When the user clicks on <span> (x), close the modal
		 span.onclick = function() {
				 modal.style.display = "none";
		 }
		 span1.onclick = function() {
				 modal.style.display = "none";
		 }

		 // When the user clicks anywhere outside of the modal, close it
		 window.onclick = function(event) {
				 if (event.target == modal) {
						 modal.style.display = "none";
				 }
		 }
});
/*폴더권한팝업 end*/


/*타이틀 팝업 start*/
$(document).ready(function(){
			// Get the modal
		 var modal = document.getElementById('myModal4');

		 // Get the button that opens the modal
		 var btn = document.getElementById("myBtn4");

		 // Get the <span> element that closes the modal
		 var span = document.getElementsByClassName("close4")[0];
		 var span1 = document.getElementsByClassName("close4_1")[0];

		 // When the user clicks on the button, open the modal
		 btn.onclick = function() {
				 modal.style.display = "block";
		 }

		 // When the user clicks on <span> (x), close the modal
		 span.onclick = function() {
				 modal.style.display = "none";
		 }
		 span1.onclick = function() {
		 		modal.style.display = "none";
		 }

		 // When the user clicks anywhere outside of the modal, close it
		 window.onclick = function(event) {
				 if (event.target == modal) {
						 modal.style.display = "none";
				 }
		 }
});
/*타이틀 팝업 end*/

/*File Upload 팝업 star*/
$(document).ready(function(){
		// Get the modal
		 var modal = document.getElementById('myModal5');

		 // Get the button that opens the modal
		 var btn = document.getElementById("myBtn5");

		 // Get the <span> element that closes the modal
		 var span = document.getElementsByClassName("close5")[0];
		 var span1 = document.getElementsByClassName("close5_1")[0];

		 // When the user clicks on the button, open the modal
		 btn.onclick = function() {
				 modal.style.display = "block";
		 }

		 // When the user clicks on <span> (x), close the modal
		 span.onclick = function() {
				 modal.style.display = "none";
		 }
		 span1.onclick = function() {
		 		modal.style.display = "none";
		 }
		 // When the user clicks anywhere outside of the modal, close it
		 window.onclick = function(event) {
				 if (event.target == modal) {
						 modal.style.display = "none";
				 }
		 }
});
/*File Upload 팝업 end*/

/*시간연장 팝업 start*/
$(document).ready(function(){
		// Get the modal
		 var modal = document.getElementById('myModal6');

		 // Get the button that opens the modal
		 var btn = document.getElementById("myBtn6");

		 // Get the <span> element that closes the modal
		 var span = document.getElementsByClassName("close6")[0];
		 var span1 = document.getElementsByClassName("close6_1")[0];

		 // When the user clicks on the button, open the modal
		 btn.onclick = function() {
				 modal.style.display = "block";
		 }

		 // When the user clicks on <span> (x), close the modal
		 span.onclick = function() {
				 modal.style.display = "none";
		 }
		 span1.onclick = function() {
				 modal.style.display = "none";
		 }

		 // When the user clicks anywhere outside of the modal, close it
		 window.onclick = function(event) {
				 if (event.target == modal) {
						 modal.style.display = "none";
				 }
		 }
});
/*시간연장 팝업 end*/

/*폴더 생성 팝업 start*/
$(document).ready(function(){
		// Get the modal
		 var modal = document.getElementById('myModal7');

		 // Get the button that opens the modal
		 var btn = document.getElementById("myBtn7");

		 // Get the <span> element that closes the modal
		 var span = document.getElementsByClassName("close7")[0];
		 var span1 = document.getElementsByClassName("close7_1")[0];

		 // When the user clicks on the button, open the modal
		 btn.onclick = function() {
				 modal.style.display = "block";
		 }

		 // When the user clicks on <span> (x), close the modal
		 span.onclick = function() {
				 modal.style.display = "none";
		 }
		 span1.onclick = function() {
				 modal.style.display = "none";
		 }

		 // When the user clicks anywhere outside of the modal, close it
		 window.onclick = function(event) {
				 if (event.target == modal) {
						 modal.style.display = "none";
				 }
		 }
});
/*폴더 생성 팝업 end*/

/*문서이력조회 팝업 start*/
$(document).ready(function(){
		// Get the modal
		 var modal = document.getElementById('myModal8');

		 // Get the button that opens the modal
		 var btn = document.getElementById("myBtn8");

		 // Get the <span> element that closes the modal
		 var span = document.getElementsByClassName("close8")[0];
		 var span1 = document.getElementsByClassName("close8_1")[0];

		 // When the user clicks on the button, open the modal
		 btn.onclick = function() {
				 modal.style.display = "block";
		 }

		 // When the user clicks on <span> (x), close the modal
		 span.onclick = function() {
				 modal.style.display = "none";
		 }
		 span1.onclick = function() {
				 modal.style.display = "none";
		 }

		 // When the user clicks anywhere outside of the modal, close it
		 window.onclick = function(event) {
				 if (event.target == modal) {
						 modal.style.display = "none";
				 }
		 }
});
/*문서이력조회 팝업 end*/

/*알림 팝업 start*/
$(document).ready(function(){
		// Get the modal
		 var modal = document.getElementById('myModal9');

		 // Get the button that opens the modal
		 var btn = document.getElementById("myBtn9");

		 // Get the <span> element that closes the modal
		 var span = document.getElementsByClassName("close9")[0];
		 var span1 = document.getElementsByClassName("close9_1")[0];

		 // When the user clicks on the button, open the modal
		 btn.onclick = function() {
				 modal.style.display = "block";
		 }

		 // When the user clicks on <span> (x), close the modal
		 span.onclick = function() {
				 modal.style.display = "none";
		 }
		 span1.onclick = function() {
				 modal.style.display = "none";
		 }

		 // When the user clicks anywhere outside of the modal, close it
		 window.onclick = function(event) {
				 if (event.target == modal) {
						 modal.style.display = "none";
				 }
		 }
});
/*알림 팝업 end*/

/*모달팝업 end*/
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
/*마이페이지*/
/*$(".mymenu_select").click(function(){
	$(".mymenu_popup").addClass("active")
});
$(".mymenu").click(function(){
	$(".mymenu_popup").removeClass("active")
});*/

/*셀렉트 적용
$(document).ready(function(){
				$('select').prettyDropdown();
});*/

/*달력 start*/
$( function() {
	$( "#datepicker" ).datepicker();
	$( "#datepicker2" ).datepicker();
} );
/*달력 end*/

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




/*20181218 탭메뉴 추가 start*/
$(function () {

    $(".tab_content").hide();
    $(".tab_content:first").show();

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#979797");
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
        $(this).addClass("active").css("color", "#4283df");
        $(".tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
});
/*20181218 탭메뉴 추가 end*/

/*20181221 select 추가 start*/
jQuery(document).ready(function(){

    var select = $("select");

    select.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });
});
/*20181221 select 추가 end*/
