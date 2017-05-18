$(function(){
	if(existPermission('admin:personnel:attendanceManage:leave:add'))
		$('#leave .maintop').append('<div><span class="maintopicon mainicon2"></span> <span class="add">添加</span></div>');

	$('#leave .flow').css('height',$('#loadarea').height()-$('.tabs-header').height()-34+'px');
	$('#leavedg').datagrid({
		 //  url:'../../leave/findApplyByCondition.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#leave .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		      // {field:"ck",checkbox:true },
		       {field:"userName",title:"姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"applyTimeStr",title:"申请时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"leaveType",title:"请假类型",fitColumns:true,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   return getValueFromKey('leave_type',value);
		       }},
		       {field:"reason",title:"请假缘由",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"startTimeStr",title:"开始时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"overTimeStr",title:"结束时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"recordUserName",title:"备案人姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"recordNote",title:"备案意见",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"recordTimeStr",title:"备案时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"examineStatus",title:"审核状态",fitColumns:true,resizable:true,align:"center",sortable:true,width:60,formatter:function(value,row,index){
		    	   if(row.examineStatus == '1'){
		    		   return "待审";
		    	   }else if(row.examineStatus == '2'){
		    		   return "撤回";
		    	   }else if(row.examineStatus == '3'){
		    		   return "通过";
		    	   }else if(row.examineStatus == '4'){
		    		   return "驳回";
		    	   }else if(row.examineStatus == '5'){
		    		   return "备案";
		    	   }
		    	   
		       }},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",width:100,sortable:true,formatter:function(value,row,index){
		    	   var id="'"+row.leaveApplyId+"'";
		    	   return'<span class="small-button lookflow" onclick="leaveUpdata('+id+')" ></span>';
		       }},
		  ]]
	}); 
	//添加请假申请点击事件
	$('#leave .maintop .add').click(function(){
		$('#leave .popups .savegoout').css('display','block');
		getDocumentMaker();
	});
	//查询
	$('#leave .invitetop .query').click(function(){
		var userName = $("#leave .invitetop .userName").val();
		var examineStatus=$("#leave .invitetop .examineStatus").val();
		if(examineStatus == "审批中")
			examineStatus = 1;
		if(examineStatus == "撤回")
			examineStatus = 2;
		if(examineStatus == "通过")
			examineStatus = 3;
		if(examineStatus == "驳回")
			examineStatus = 4;
		var inviteQueryInfo = {
				userName : userName,
				examineStatus : examineStatus
		}
		$('#leavedg').datagrid({
			url:'../../leave/findApplyByCondition.do?getMs='+getMS(),
			queryParams:inviteQueryInfo
		})
		
	});
	//选择审批人员
	$('#leave .popups .savegoout .chooseUser').click(function(){
		chooseUser();
		$('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#leave .popups .savegoout input[name=examineUserName]').val(selectUser[0].userName);
	    	$('#leave .popups .savegoout input[name=examineUserId]').val(selectUser[0].userId);
	    })	
	})
	//保存员工请假申请
	$('#leave .popups .savegoout .confirm').click(function(){
		var dom = $(this).parent().parent();
		var userId = $.trim(dom.find('input[name=leaveUserId]').val());
		var userName = $.trim(dom.find('input[name=leaveUserName]').val());
		var leaveType = $.trim(dom.find('select[name=leaveType]').val());
		var reason = $.trim(dom.find('input[name=leaveReason]').val());
		var starttime = $.trim(dom.find('input[name=leaveStartTime]').val());
		var overtime = $.trim(dom.find('input[name=leaveOverTime]').val());
		var examineUserName = $.trim(dom.find('input[name=examineUserName]').val());
		var examineUserId = $.trim(dom.find('input[name=examineUserId]').val());
		if(reason == null || reason == ''){
			windowControl("理由不能为空");
		}else if(starttime == null || starttime == ''){
			windowControl("起始时间不能为空");
		}else if(overtime == null || overtime == ''){
			windowControl("结束时间不能为空");
		}else if(examineUserId == null || examineUserId == ''){
			windowControl("审核人id不能为空");
		}else if(examineUserName == null || examineUserName == ''){
			windowControl("审核人姓名不能为空");
		}else{
			$.ajax({
				data:{
					reason:reason,
					userId:userId,
					leaveType:leaveType,
					userName:userName,
					startTimeStr:starttime,
					overTimeStr:overtime,
					examineUserId:examineUserId,
					examineUserName:examineUserName
				},
				url:"../../leave/applyForLeave.do?getMs="+getMS(),
				success:function(data){
					if(data != 200){
						windowControl('添加员工请假记录失败');
						return ;
					}else{
						$('#leave .popups .savegoout .confirm').removeAttr('clicked');
						$('#leave .popups').css('display', 'none');
						$('#leave .popups input').val(null);
						$('#leave .popups textarea').val(null);
						$('#leavedg').datagrid('reload');
						windowControl('添加员工请假记录成功');
					}
				},
				fail:function(){
					windowControl(err.status);
				}
			})
		}
	});
});
/*添加请假类型*/
$('#userManage .staffRecord select[name=leaveType]').html(getDataBySelectKey("leave_type"));
$('#userManage .invitetop select[name=leaveType]').html(getDataBySelectKeyNo("leave_type"));
/**/
function leaveUpdata(id){
	$('#leave .list').css('display','none');
	$('#leave .flow').css('display','block');
	$.ajax({
		data:{leaveApplyId:id},
		url:'../../leave/findStreamByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			console.log(data);
			var obj = eval('(' + data + ')').rows;
			var html = '';
			for(var i = 0; i<obj.length ; i++){
				html = html + '<div class="process"><div class="processbox">'
				+ '<p><span class="jiachu expeop" style="margin-left: 2px;">&ensp;&nbsp;审批人：'+obj[i].examineUserName+'</span>'
				+ '<span class="righttime">&ensp;&ensp;&ensp;&nbsp;审批时间：'+obj[i].examineTimeStr+'</span></p>'
				+ '<p><span class="expeop">审批类型：';
				if(obj[i].streamType == '1'){
					html = html + "审批";
				}else if(obj[i].streamType == '2'){
					html = html + "备案";
				}
				html = html +'</span><span class="righttime">下一级审批人：'+obj[i].nextExamineUserName+'</span></p>'
				+ '<div class="opinionbox"><div class="opiniontit">审批意见：'+obj[i].examineIdea+'</div>'
				+ '<div class="opinionarea"></div></div>'
				+ '</div></div><div class="arrdown"><span></span></div>'
			}
			$('#leave .flow .showView').html(html);
		}
	})
/**/	
	$.ajax({
		data:{leaveApplyId:id},
		url:'../../leave/findApplyByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			console.log(data);
			var obj = eval('(' + data + ')').rows;
			$('#leave .flow .flowplan .createUserName').val(obj[0].userName);
			$('#leave .flow .flowplan .createTimeStr').val(obj[0].startTimeStr);
			if(obj[0].examineStatus == 1)
				$('#leave .flow .flowplan .inviteStatus').val('审批中');
			else if(obj[0].examineStatus == 2)
				$('#leave .flow .flowplan .inviteStatus').val('撤回');
			else if(obj[0].examineStatus == 3)
				$('#leave .flow .flowplan .inviteStatus').val('招聘中');
			else if(obj[0].examineStatus == 4)
				$('#leave .flow .flowplan .inviteStatus').val('驳回');
			else if(obj[0].examineStatus == 5)
				$('#leave .flow .flowplan .inviteStatus').val('招满');
			$('#leave .flow .flowplan .text').html(obj[0].text);
			$('#leave .flow .flowplan .reason').html(obj[0].reason);
		},
		error:function(err){
			windowControl(err.status);
		}
	})
}
/*********如果点击了返回按钮，则返回到列表********/
$('#leave .flow .flowbar .back').click(function(){
	$('#leave .list').css('display','block');
	$('#leave .flow').css('display','none');
});
/*************************当前请假申请人********************************/
function getDocumentMaker(){
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var str = '';
			var data = eval('(' + data + ')');
			$('#leave .popups .savegoout input[name=leaveUserName]').val(data.userName);
			$('#leave .popups .savegoout input[name=leaveUserId]').val(data.userId);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}