/* **********************************************************************************************************************
 * 스크립트명 	: 	main.js
 * 작성일		:   2018.09.28
 * 작성자		:   jws
 * 설명         :   메인 화면에서 사용하는 자바스크립트
 * 메서드 종류	: 	$.validator.addMethod('dupCheck', function (value, element) {}			: 	사용자 아이디 중복 체크
 * 				  	$.validator.addMethod('idIsValid', function (value, element) {}			: 	사용자 아이디 유효성 체크
 * 				  	$.validator.addMethod('nameIsValid', function (value, element) {}		: 	사용자 이름 유효성 체크
 * 				  	$.validator.addMethod('passIsValid', function (value, element) {}		: 	사용자 비밀번호 유효성 체크
 * 				  	$.validator.addMethod('passLevCheck1', function (value, element) {}		: 	사용자 비밀번호 보안레벨 체크1
 * 				  	$.validator.addMethod('passLevCheck2', function (value, element) {}		: 	사용자 비밀번호 보안레벨 체크2
 * 					$.validator.addMethod('passLevCheck3', function (value, element) {}		: 	사용자 비밀번호 보안레벨 체크3
 * 					$.validator.addMethod('passLevCheck4', function (value, element) {}		: 	사용자 비밀번호 보안레벨 체크4
 *************************************************************************************************************************/

/*********************************************************
 * 전역 변수 선언
 *********************************************************/
var key 			= '';	
var zTree 			= '';
var rMenu 			= '';
var addCount 		=  1;
var timeoutId 		= '';

/*********************************************************
 * zTree 설정
 *********************************************************/
var setting = {
    data: {	    
        simpleData: {
            enable: true
        }
    },
    view: {
    	nameIsHTML: true, //allow html in node name for highlight use				
		selectedMulti: false
	},
    callback: {
        onClick: onClick,
        beforeExpand: beforeExpand,
        onRightClick: onRightClick,
        onRename: onRename,
        onRemove: onRemove,
    }
}


/*********************************************************
 * zTree 초기화
 *********************************************************/
$(document).ready(function() {
	$.fn.zTree.init($("#treeDemo"), setting, treeData);
	fuzzySearch('treeDemo','#key',null,true); //initialize fuzzysearch function
	zTree = $.fn.zTree.getZTreeObj("treeDemo");
	rMenu = $("#rMenu");
	
	/** GNB 메뉴 링크 처리 */
	$(".nav a").on( 'click', function() {
		
		var gnbName = $(this).text();
		var link='';
		
		if(gnbName == '사용자 관리') {
			link = '/manage/user/selectUserList';
		} else if(gnbName == '대시보드') {
			link = '/dashBoard/selectDashboardList'; 
		} else if(gnbName == '환경설정') {
			link = '/manage/config/selectServerInfoList'; 
		} else if(gnbName == '웹파일매니저') {
			link = '/webfilemanager/webfilemanagerDoclist?userId=apiadmin'; 
		}
		
		location.href = link;
		//href에 공통 컨트롤러 호출하 매개변수에 따른 페이지 호출방식으로 변경할지 고민중..
	});
	
	/** 로그아웃 */
	$("#logOut").on( 'click', function(event) {
		location.href = "/acnt/logut";
	});
	 
});

/*********************************************************
 * 퍼지검색
 *********************************************************/
function fuzzySearch(zTreeId, searchField, isHighLight, isExpand){
	var zTreeObj = $.fn.zTree.getZTreeObj(zTreeId);//get the ztree object by ztree id
	if(!zTreeObj){
		alter("fail to get ztree object");
	}
	var nameKey = zTreeObj.setting.data.key.name; //get the key of the node name
	isHighLight = isHighLight===false?false:true;//default true, only use false to disable highlight
	isExpand = isExpand?true:false; // not to expand in default
	zTreeObj.setting.view.nameIsHTML = isHighLight; //allow use html in node name for highlight use
	
	var metaChar = '[\\[\\]\\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]'; //js meta characters
	var rexMeta = new RegExp(metaChar, 'gi');//regular expression to match meta characters
	
	// keywords filter function 
	function ztreeFilter(zTreeObj,_keywords,callBackFunc) {
		if(!_keywords){
			_keywords =''; //default blank for _keywords 
		}
		
		// function to find the matching node
		function filterFunc(node) {
			if(node && node.oldname && node.oldname.length>0){
				node[nameKey] = node.oldname; //recover oldname of the node if exist
			}
			zTreeObj.updateNode(node); //update node to for modifications take effect
			if (_keywords.length == 0) {
				//return true to show all nodes if the keyword is blank
				zTreeObj.showNode(node);
				zTreeObj.expandNode(node,isExpand);
				return true;
			}
			//transform node name and keywords to lowercase
			if (node[nameKey] && node[nameKey].toLowerCase().indexOf(_keywords.toLowerCase())!=-1) {
				if(isHighLight){ //highlight process
					//a new variable 'newKeywords' created to store the keywords information 
					//keep the parameter '_keywords' as initial and it will be used in next node
					//process the meta characters in _keywords thus the RegExp can be correctly used in str.replace
					var newKeywords = _keywords.replace(rexMeta,function(matchStr){
						//add escape character before meta characters
						return '\\' + matchStr;
					});
					node.oldname = node[nameKey]; //store the old name  
					var rexGlobal = new RegExp(newKeywords, 'gi');//'g' for global,'i' for ignore case
					//use replace(RegExp,replacement) since replace(/substr/g,replacement) cannot be used here
					node[nameKey] = node.oldname.replace(rexGlobal, function(originalText){
						//highlight the matching words in node name
						var highLightText =
							'<span style="color: whitesmoke;background-color: darkred;">'
							+ originalText
							+'</span>';
						return 	highLightText;					
					});
					zTreeObj.updateNode(node); //update node for modifications take effect
				}
				zTreeObj.showNode(node);//show node with matching keywords
				return true; //return true and show this node
			}
			
			zTreeObj.hideNode(node); // hide node that not matched
			return false; //return false for node not matched
		}
	
		var nodesShow = zTreeObj.getNodesByFilter(filterFunc); //get all nodes that would be shown
		processShowNodes(nodesShow, _keywords);//nodes should be reprocessed to show correctly
	}
	
	/**
	 * reprocess of nodes before showing
	 */
	function processShowNodes(nodesShow,_keywords){
		if(nodesShow && nodesShow.length>0){
			//process the ancient nodes if _keywords is not blank
			if(_keywords.length>0){ 
				$.each(nodesShow, function(n,obj){
					var pathOfOne = obj.getPath();//get all the ancient nodes including current node
					if(pathOfOne && pathOfOne.length>0){ 
						//i < pathOfOne.length-1 process every node in path except self
						for(var i=0;i<pathOfOne.length-1;i++){
							zTreeObj.showNode(pathOfOne[i]); //show node 
							zTreeObj.expandNode(pathOfOne[i],true); //expand node
						}
					}
				});	
			}else{ //show all nodes when _keywords is blank and expand the root nodes
				$.fn.zTree.init($("#treeDemo"), setting, treeData); /** 검색값이 빈값일때 처리하는 부분(2018.09.07)*/
				/*var rootNodes = zTreeObj.getNodesByParam('level','0');//get all root nodes
				$.each(rootNodes,function(n,obj){
					zTreeObj.expandNode(obj.children[n],false); //expand all root nodes
				});*/
			}
		}
	}
	
	//listen to change in input element
	$(searchField).bind('input propertychange', function() {
		var _keywords = $(this).val();
		searchNodeLazy(_keywords); //call lazy load
	});


	// excute lazy load once after input change, the last pending task will be cancled  
	function searchNodeLazy(_keywords) {
		if (timeoutId) { 
			//clear pending task
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(function() {
			ztreeFilter(zTreeObj,_keywords); //lazy load ztreeFilter function 
			$(searchField).focus();//focus input field again after filtering
		}, 500);
	}
}

/*********************************************************
 * callback - zTree 노드 확정전
 *********************************************************/
var curExpandNode = null;
function beforeExpand(treeId, treeNode){
	
	var pNode = curExpandNode ? curExpandNode.getParentNode():null;
 	var treeNodeP = treeNode.parentTId ? treeNode.getParentNode():null;
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	
	for(var i=0, l=!treeNodeP ? 0:treeNodeP.children.length; i<l; i++ ) {
		if (treeNode !== treeNodeP.children[i]) {
			zTree.expandNode(treeNodeP.children[i], false);
		}
	}
	
	while (pNode) {
		if (pNode === treeNode) {
			break;
		}
		pNode = pNode.getParentNode();
	}
	
	if (!pNode) {
		singlePath(treeNode);
	}
}

/*********************************************************
 * zTree 싱글패스(선택 노드만 확장)
 *********************************************************/
function singlePath(newNode) {
	
	if (newNode === curExpandNode) return;
	
	if (curExpandNode && curExpandNode.open==true) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		
		if (newNode.parentTId === curExpandNode.parentTId) {
			zTree.expandNode(curExpandNode, false);
		} else {
			var newParents = [];
			while (newNode) {
				newNode = newNode.getParentNode();
				if (newNode === curExpandNode) {
					newParents = null;
					break;
				} else if (newNode) {
					newParents.push(newNode);
				}
			}
			if (newParents!=null) {
				var oldNode = curExpandNode;
				var oldParents = [];
				
				while (oldNode) {
					oldNode = oldNode.getParentNode();
					if (oldNode) {
						oldParents.push(oldNode);
					}
				}
				if (newParents.length>0) {
					zTree.expandNode(oldParents[Math.abs(oldParents.length-newParents.length)-1], false);
				} else {
					zTree.expandNode(oldParents[oldParents.length-1], false);
				}
			}
		}
	}
	curExpandNode = newNode;
}

/*********************************************************
 * callback - 트리 클릭시 상세정보 조회
 *********************************************************/
function onClick(event, treeId, treeNode) {
	var id = treeNode.id;
	var pId = treeNode.pId;
	var name = treeNode.name;
	var type = treeNode.linkType;
	
	var url = "/main/selectTreeDetail";
	var params={deptNo:id, deptParent:pId, deptName:name, linkType:type};

	$.get(url, params, function(data) {	     
		console.log(data);
   		var dataCode = data.code;
   		var linkType = data.linkType;
   		var policyType = data.policyType;
   		
   		if(dataCode == "Y"){
   			
   			/** 정책 삽입전 정책타입, 링크타입, 정책명 지정 */
   			$("#policyType").val(policyType);
   			$("#linkType").val(linkType);   			
   			
   			if(linkType == 'U'){
   				var userName = data.userInfo.userName;
   				$("#policyUserName").val(userName);
   			} else {
   				var deptName = data.deptInfo.deptName;
   				$("#policyDeptName").val(deptName);
   			}
			
   			//트리 타입에 따라 유저, 부서 분기 처리
   			if(linkType == "U"){
   				fn_userInfo(data);
   				$("#userInfo").show();	
   				$("#deptInfo").hide();	
   				$("#policyInfo table:eq(1)").show();
   				$("#aclInfo").show();
   			} else {
   				fn_deptInfo(data);
   				$("#userInfo").hide();	
   				$("#deptInfo").show();	
   				$("#policyInfo table:eq(1)").hide();
   				$("#aclInfo").hide();
   			}
   				       	
   			//정책 타입에 따라 유저, 부서, 전사 분기 처리
   			if(policyType == "U"){	 
   				fn_userPolicyInfo(data);
   			} else if(policyType == "D"){
   				fn_deptPolicyInfo(data);
   			} else {
   				fn_allPolicyInfo(data);			
   			}			
			
		} else {
			alert("데이터 처리 중 오류가 발생했습니다.");
		}
  		
   	}, "JSON"); 
}

/*********************************************************
 * callback - 오른쪽 마우스 클릭시
 *********************************************************/
function onRightClick(event, treeId, treeNode) {
	var type = treeNode.linkType;

	if(type == 'D'){
		if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
			zTree.cancelSelectedNode();
			showRMenu("root", event.clientX, event.clientY);
		} else if (treeNode && !treeNode.noR) {
			zTree.selectNode(treeNode);
			showRMenu("node", event.clientX, event.clientY);
		}			
	}
}

/*********************************************************
 * 오른쪽 메뉴 보임
 *********************************************************/
function showRMenu(type, x, y) {
	$("#rMenu ul").show();
	if (type=="root") {
		$("#m_del").hide();
	} else {
		$("#m_del").show();
	}

    y += document.body.scrollTop;
    x += document.body.scrollLeft;
    rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});

    $("body").bind("mousedown", onBodyMouseDown);
}

/*********************************************************
 * 오른쪽 메뉴 숨김
 *********************************************************/
function hideRMenu() {
	if (rMenu) rMenu.css({"visibility": "hidden"});
	$("body").unbind("mousedown", onBodyMouseDown);
}

/*********************************************************
 * 트리영역이 아닌 곳에서 오른쪽 메뉴 숨김
 *********************************************************/
function onBodyMouseDown(event){
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
		rMenu.css({"visibility" : "hidden"});
	}
}

/*********************************************************
 * 오른쪽메뉴 - 부서 추가
 *********************************************************/
function addTreeNode() {
	hideRMenu();		
	
	var url = "/manage/dept/createDeptNo";
   	
	$.get(url, function(data) {	     
   		if(data.code == "Y"){
   			var deptNo = data.deptNo;
   			var newDept = zTree.getSelectedNodes()[0];
   			var newNode = { id:deptNo, pId:newDept.id, isParent:true, name:"신규부서" + (addCount++),  linkType:"D"};
   			
   			if (newDept) {
   				newDept = zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
   			}
   			
   			if (newDept) {			
   				zTree.editName(newDept[0]);
   			} 
		} else {
			alert("데이터 처리 중 오류가 발생했습니다.");
		}
	}, "JSON");
}

/*********************************************************
 * 오른쪽메뉴 - 부서 삭제
 *********************************************************/
function removeTreeNode() {
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	if (nodes && nodes.length>0) {
		if (nodes[0].children && nodes[0].children.length > 0) {
			var msg = "하위부서가 포함되어있습니다. 삭제 하시겠습니까?";
			if (confirm(msg)==true){
				zTree.removeNode(nodes[0], "true");
			}
		} else {
			zTree.removeNode(nodes[0], "true"); // true:콜백사용, false:콜백미사용
		}
	}
}

/*********************************************************
 * 오른쪽메뉴 - 부서 수정
 *********************************************************/
function modifyTreeNode() {
	hideRMenu();
	var nodes = zTree.getSelectedNodes()[0];
	
	zTree.editName(nodes);
	
}

/*********************************************************
 * 오른쪽메뉴 - 부서 체크(미사용)
 *********************************************************/
function checkTreeNode(checked) {
	var nodes = zTree.getSelectedNodes();
	if (nodes && nodes.length>0) {
		zTree.checkNode(nodes[0], checked, true);
	}
	hideRMenu();
}

/*********************************************************
 * 오른쪽메뉴 - 부서 새로고침(미사용)
 *********************************************************/
function resetTree() {
	hideRMenu();
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
}

/*********************************************************
 * callback - 노드 이름 변경 후 호출
 *********************************************************/
function onRename(event, treeId, treeNode, isCancel) {
	
	var id = treeNode.id;
	var pId = treeNode.pId;
	var name = treeNode.name;
	var type = treeNode.linkType;
	
	var url = "/manage/dept/createDept";
   	var params = {deptNo:id, deptParent:pId, deptName:name, linkType:type};
   	
	$.post(url, params, function(data) {	     
   		if(data.code == "C"){
			alert("부서가 등록 되었습니다.");
		} else if(data.code == "M"){
			alert("부서명이 수정 되었습니다.");
		} else {
			alert("데이터 처리 중 오류가 발생했습니다.");
		}
	}, "JSON");

}

/*********************************************************
 * callback - 노드 삭제 후 호출
 *********************************************************/
function onRemove(event, treeId, treeNode) {
	
	var id = treeNode.id;
	var pId = treeNode.pId;
	var name = treeNode.name;
	var type = treeNode.linkType;
	
	var url = "/manage/dept/deleteDept";
   	var params = {deptNo:id, deptParent:pId, deptName:name, linkType:type};
   	
	$.post(url, params, function(data) {	     
   		if(data.code == "Y"){
			alert("부서가 삭제 되었습니다.");
		} else {
			alert("데이터 처리 중 오류가 발생했습니다.");
		}
	}, "JSON");

}

/*********************************************************
 * 사용자 정보
 ******************************************************** */
function fn_userInfo(data){
	
	// 실제 데이터 변수
	var userId = data.userInfo.userId;
	var userName = data.userInfo.userName;
	var mailAddress = data.userInfo.mailAddress;
	var position = "";
	var deptName = data.userInfo.deptName;
	var deptNo = data.userInfo.deptNo;
	var mobilePhone = data.userInfo.mobilePhone;
	var officeTel = data.userInfo.officeTel;
	var officeTelext = data.userInfo.officeTelext;
	var isDeleted = data.userInfo.isDeleted;
	var driveSize = data.userInfo.driveSize;
	var deptDriveSize = data.userInfo.deptDriveSize;
	
	$("#userId").val(userId);
	$("#policyUserId").val(userId);
	
	$("#userInfo tbody").html("");
	
	// 태그 랜더링 변수
	var out = "";   

	out +="<tr>";
	out +=		"<th scope='row' class='required'>" + "아이디" + "</th>"; 
 	out +=		"<td>" + userId + "</td>"; 
 	out +=		"<th scope='row' class='required'>" + "이름" + "</th>"; 
 	out +=		"<td>" + userName + "</td>";
 	out +="</tr>";
 	out +="<tr>";
 	out +=		"<th scope='row' class='required'>" + "메일주소" + "</th>"; 
 	out +=		"<td>" + mailAddress + "</td>";
	out +=		"<th scope='row'>" + "부서" + "</th>"; 
	out +=		"<td>" + deptName + "</td>";
	out +="</tr>";
	out +="<tr>";
 	out +=		"<th scope='row'>" + "직급" + "</th>"; 
 	out +=		"<td>" + position + "</td>";
	out +=		"<th scope='row'>" + "휴대폰 번호" + "</th>"; 
	out +=		"<td>" + mobilePhone + "</td>";
	out +="</tr>";
	out +="<tr>";
 	out +=		"<th scope='row'>" + "전화 번호" + "</th>"; 
 	out +=		"<td>" + officeTel + "</td>";
	out +=		"<th scope='row'>" + "사용 여부" + "</th>"; 
	out +=		"<td>" + isDeleted + "</td>";
	out +="</tr>";
	out +="<tr>";
 	out +=		"<th scope='row'>" + "개인 드라이브 용량" + "</th>"; 
 	out +=		"<td>" + driveSize + "</td>";
	out +=		"<th scope='row'></th>"; 
	out +=		"<td></td>";
	out +="</tr>";
	
	$("#userInfo tbody").html(out);
	
} 

/*********************************************************
 * 부서 정보
 ******************************************************** */
function fn_deptInfo(data){
	
	// 실제 데이터 변수
	var deptName = data.deptInfo.deptName;
	var deptNo = data.deptInfo.deptNo;
	var deptParent = data.deptInfo.deptParent;
	var deptPath = data.deptInfo.deptPath;
	var isDeleted = data.deptInfo.isDeleted;
	var driveSize = data.deptInfo.driveSize;
	var deptDriveSize = data.deptInfo.deptDriveSize;
	
	$("#deptNo").val(deptNo);
	$("#policyDeptNo").val(deptNo);
	
	$("#deptInfo tbody").html("");
	
	// 태그 랜더링 변수
	var out = "";   

	out +="<tr>";
	out +=		"<th scope='row' class='bl_0'>부서ID</th>"; 
 	out +=		"<td>" + deptNo + "</td>"; 
 	out +="</tr>";
 	out +="<tr>";
 	out +=		"<th scope='row' class='bl_0'>부서명</th>"; 
 	out +=		"<td>" + deptName + "</td>";
	out +="</tr>";
	out +="<tr>";
 	out +=		"<th scope='row' class='bl_0'>부서 드라이브 용량</th>"; 
 	out +=		"<td>" + deptDriveSize + "</td>";
	out +="</tr>";
		
	$("#deptInfo tbody").html(out);
	
}

/*********************************************************
 * 사용자 정책 정보
 ******************************************************** */
function fn_userPolicyInfo(data){
	
	var idNm = data.userPolicyInfo.userPolicyIdNm;
	var linkType = data.linkType;
	var drvPolId = data.userPolicyInfo.drvPolId;
	var policyId = data.userPolicyInfo.policyId;
	var userPolicyId = data.userPolicyInfo.userPolicyId;
	
	/** 드라이브 수정시 필요한 기본키 */
	$("#drvPolId").val(drvPolId);
	$("#policyId").val(policyId);
	
	/** 부서 또는 사용자가 어떤 정책을 상속 받는지 */
	$("#policyNm").val(idNm);	
	
	var keys = Object.keys(data.userPolicyInfo);
	var data = data.userPolicyInfo;
	
	/** 배열에서 특정 키 삭제(ID, ID명) */
	keys.splice(0, 4);
	
	/** 테이블 헤더 변경 시작 */
	$("#policyInfo thead:eq(0)").html("");	
	var out = "";   
	out +="<tr>";
	out +=		"<th scope='col' colspan='4' class='align_left'>상속정책 > 사용자(" + idNm + ")</th>"; 
 	out +="</tr>"; 	
 	
 	$("#policyInfo thead:eq(0)").html(out);
 	 	
 	/** 테이블 바디 변경 */
	$("#policyInfo tbody tr td").html("");
	for(var i in keys){
		var out = "";  
		out +="<input type='text' id='drivePolicyVO."+ keys[i] + "' name='drivePolicyVO." + keys[i] +"' value='" + data[keys[i]] +"'>";
		
	    $("#policyInfo tbody tr td:eq("+i+")").html(out);
	}  
	
	
}

/*********************************************************
 * 부서 정책 정보
 ******************************************************** */
function fn_deptPolicyInfo(data){
	
	var idNm = data.deptPolicyInfo.deptPolicyIdNm;
	var linkType = data.linkType;
	var drvPolId = data.deptPolicyInfo.drvPolId;
	var policyId = data.deptPolicyInfo.policyId;
	
	/** 드라이브 수정시 필요한 기본키 */
	$("#drvPolId").val(drvPolId);
	$("#policyId").val(policyId);
	
	/** 부서 또는 사용자가 어떤 정책을 상속 받는지 */
	$("#policyNm").val(idNm);	
	
	var keys = Object.keys(data.deptPolicyInfo);
	var data = data.deptPolicyInfo;
	
	/** 배열에서 특정 키 삭제(ID, ID명) */
	keys.splice(0, 4);
	
	/** 테이블 헤더 변경 시작 */
	$("#policyInfo thead:eq(0)").html("");	
	var out = "";   
	out +="<tr>";
	out +=		"<th scope='col' colspan='4' class='align_left'>상속정책 > 부서(" + idNm + ")</th>"; 
 	out +="</tr>"; 	
 	
 	$("#policyInfo thead:eq(0)").html(out);
 	 	
 	/** 테이블 바디 변경 */
	$("#policyInfo tbody tr td").html("");
	for(var i in keys){
		var out = "";  
		out +="<input type='text' id='drivePolicyVO."+ keys[i] + "' name='drivePolicyVO." + keys[i] +"' value='" + data[keys[i]] +"'>";
		
	    $("#policyInfo tbody tr td:eq("+i+")").html(out);
	}  
	
}

/*********************************************************
 * 전사 정책 정보
 ******************************************************** */
function fn_allPolicyInfo(data){
	var idNm = data.allPolicyInfo.idNm;
	var linkType = data.linkType;
	var drvPolId = data.allPolicyInfo.drvPolId;
	
	/** 드라이브 수정시 필요한 기본키 */
	$("#drvPolId").val(drvPolId);
	
	/** 부서 또는 사용자가 어떤 정책을 상속 받는지 */
	$("#policyNm").val(idNm);	
	
	var keys = Object.keys(data.allPolicyInfo);
	var data = data.allPolicyInfo;
	
	/** 배열에서 특정 키 삭제(ID, ID명) */
	keys.splice(0, 4);
	
	/** 테이블 헤더 변경 시작 */
	$("#policyInfo thead:eq(0)").html("");	
	var out = "";   
	out +="<tr>";
	out +=		"<th scope='col' colspan='4' class='align_left'>상속정책 > " + idNm + "</th>"; 
 	out +="</tr>"; 	
 	
 	$("#policyInfo thead:eq(0)").html(out);
 	 	
 	/** 테이블 바디 변경 */
	$("#policyInfo tbody tr td").html("");
	for(var i in keys){
		var out = "";  
		out +="<input type='text' id='drivePolicyVO."+ keys[i] + "' name='drivePolicyVO." + keys[i] +"' value='" + data[keys[i]] +"'>";
		
	    $("#policyInfo tbody tr td:eq("+i+")").html(out);
	}  
}

/*********************************************************
 * 사용자 및 부서 정보 수정
 *********************************************************/
 function fn_user_dept_modify(){
	
	var linkType = $("#linkType").val();
	var url = "";
	var params = "";
	
	if(linkType == "U"){
		url = "/manage/user/updateUser";
       	params = $("#userFrm").serialize();
       	
	} else {
		url = "/manage/user/updateDept";
       	params = $("#deptFrm").serialize();				
	}
   	
	$.post(url, params, function(data) {	     
   		if(data.result == "Y"){
			alert("수정 되었습니다.");
		} else {
			alert("데이터 처리 중 오류가 발생했습니다.");
		}
	}, "JSON");
}
 
/*********************************************************
 * 정책설정 수정 및 저장
 *********************************************************/
function fn_policy_save(){
	
	var policyType = $("#policyType").val();
	var url = "";
 	var params = $("#policyFrm").serialize();
 	
	if(policyType == "A"){
		url = "/manage/policy/policyInsert";
	} else {
		url = "/manage/policy/policyUpdate";
	}
   	
	$.post(url, params, function(data) {	     
   		if(data.result == "Y"){
			alert("수정 되었습니다.");
		} else {
			alert("데이터 처리 중 오류가 발생했습니다.");
		}
	}, "JSON");
}

/*********************************************************
 * 정책설정 삭제(기본정책으로 부여)
 *********************************************************/
function fn_policy_del(){
   	
	var url = "/manage/policy/policyDelete";
	var params = $("#policyFrm").serialize();
	
	$.post(url, params, function(data) {	     
   		if(data.result == "Y"){
			alert("삭제 되었습니다.");
		} else {
			alert("데이터 처리 중 오류가 발생했습니다.");
		}
	}, "JSON");
}

