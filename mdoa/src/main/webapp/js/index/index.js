var permissions = [];
var dictionaryData;
$(function(){
	$.ajax({
		url:'../../user/getPermissions.do?getMs='+getMS(),
		success:function(data){
			data = data.substring(1, data.length-1);
			permissions = data.split(',');
			for(var i = 0 ; i < permissions.length ; i++){
				permissions[i] = permissions[i].substring(1, permissions[i].length-1);
			}
			var navarea = '';
			if(existPermission('admin:personnel:staffRecord')){
				navarea += '<div class="navpiece on">';
				navarea += '<h3 ><img class="img_01" src="../../img/index/people.png" alt="图片二" /><span>员工档案</span><img class="img_02" src="../../img/index/draw.png" alt="图片九" /></h3>';
				navarea += '<ul class="navpiece1" title="staffRecord">';
				if(existPermission('admin:personnel:staffRecord:employeeInfo'))
					//navarea += '<li title="employeeInfo"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>创建员工信息</li>';
				if(existPermission('admin:personnel:staffRecord:basisInfo'))
					//navarea += '<li title="basisInfo"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>员工管理</li>';
					navarea += '<li title="userManage"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>员工管理</li>';
				if(existPermission('admin:personnel:staffRecord:userTransfer'))
					navarea += '<li title="userTransfer"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>员工调动记录</li>';
				if(existPermission('admin:personnel:staffRecord:dimission'))
					navarea += '<li title="dimission"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>员工离职记录</li>';				
				navarea += '</ul>';
				navarea += '</div>';
			}
			if(existPermission('admin:personnel:inviteManage')){
				navarea += '<div class="navpiece">';
				navarea += '<h3><img class="img_01" src="../../img/index/icon3.png" alt="图片三" /><span>招聘管理</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
				navarea += '<ul class="navpiece1" title="inviteManage">';
//				if(existPermission('admin:personnel:inviteManage:invite'))
//					navarea += '<li title="invite"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>招聘信息</li>';
//				if(existPermission('admin:personnel:inviteManage:invitelist'))	
//					navarea += '<li title="invitelist"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>我参与的招聘流程</li>';
//				if(existPermission('admin:personnel:inviteManage:inviterecord'))	
//					navarea += '<li title="inviterecord"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>待备案招聘</li>';
				navarea += '<li title="userInviteManage"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>招聘记录管理</li>';
				navarea += '</ul>';
				navarea += '</div>';
			}
			if(existPermission('admin:personnel:pactManage')){
				navarea += '<div class="navpiece">';
				navarea += '<h3 ><img class="img_01" src="../../img/index/icon5.png" alt="图片五" /><span>合同管理</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
				navarea += '<ul class="navpiece1" title="pactManage">';
				if(existPermission('admin:personnel:pactManage:pact'))
					navarea += '<li title="pact"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>合同信息</li>';
				if(existPermission('admin:personnel:pactManage:tryPerson'))	
					navarea += '<li title="tryPerson"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>试用期人员名单</li>';
				if(existPermission('admin:personnel:pactManage'))	
					navarea += '</ul>';
				navarea += '</div>';
			}
			if(existPermission('admin:personnel:socialSecurity')){
				navarea += '<div class="navpiece">';
				navarea += '<h3 ><img class="img_01" src="../../img/index/icon6.png" alt="图片六" /><span>社保福利</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
				navarea += '<ul class="navpiece1" title="socialSecurity">';
				if(existPermission('admin:personnel:socialSecurity:welfare'))
					navarea += '<li title="welfareAdd"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>福利申请登记</li>';
					navarea += '<li title="welfare"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>发起福利计划</li>';
				if(existPermission('admin:personnel:socialSecurity:welfareExamine'))	
					navarea += '<li title="welfareExamine"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>我参与的福利流程</li>';
				if(existPermission('admin:personnel:socialSecurity:welfarerecord'))	
					navarea += '<li title="welfarerecord"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>待备案福利</li>';
				if(existPermission('admin:personnel:socialSecurity:welfarepay'))	
					navarea += '<li title="welfarepay"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>福利发放记录</li>';
				if(existPermission('admin:personnel:socialSecurity:staffBirthday'))	
					navarea += '<li title="staffBirthday"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>员工生日</li>';
				if(existPermission('admin:personnel:socialSecurity:socialSecurity'))	
					navarea += '<li title="socialSecurity"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>社保信息</li>';
				navarea += '</ul>';
				navarea += '</div>';
			}
			if(existPermission('admin:personnel:attendanceManage')){	
				navarea += '<div class="navpiece">';
				navarea += '<h3 ><img class="img_01" src="../../img/index/icon7.png" alt="图片七" /><span>考勤管理</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
				navarea += '<ul class="navpiece1" title="attendanceManage">';
				if(existPermission('admin:personnel:attendanceManage:goout'))
					navarea += '<li title="goout"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>外出信息</li>';
				if(existPermission('admin:personnel:attendanceManage:gooutExamine'))	
					navarea += '<li title="gooutExamine"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>待我审核外出流程</li>';
				if(existPermission('admin:personnel:attendanceManage:gooutRecord'))	
					navarea += '<li title="gooutRecord"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>待我备案外出流程</li>';
				if(existPermission('admin:personnel:attendanceManage:leave'))	
					navarea += '<li title="leave"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>请假信息</li>';
				if(existPermission('admin:personnel:attendanceManage:leaveExamine'))	
					navarea += '<li title="leaveExamine"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>待我审核请假流程</li>';
				if(existPermission('admin:personnel:attendanceManage:leaveRecord'))
					navarea += '<li title="leaveRecord"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>待我备案请假流程</li>';
				navarea += '<li title="myCheckInfo"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>我的考勤信息</li>';
				navarea += '<li title="checkGroupManage"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>考勤组管理</li>';
				navarea += '<li title="checkGroupAllot"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>考勤组人员管理</li>';
				navarea += '<li title="checkInfoQuery"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>考勤信息查询</li>';
				navarea += '</ul>';
				navarea += '</div>';
			}
			if(existPermission('admin:personnel:performanceManage')){	
				navarea += '<div class="navpiece">';
				navarea += '<h3 ><img class="img_01" src="../../img/index/icon8.png" alt="图片八" /></span><span>绩效管理</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
				navarea += '<ul class="navpiece1" title="performanceManage">';
				if(existPermission('admin:personnel:performanceManage:KPIgrade'))
					navarea += '<li title="KPIgrade"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>KPI评分</li>';
				if(existPermission('admin:personnel:performanceManage:KPIstandard'))	
					navarea += '<li title="KPIstandard"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>KPI考核标准</li>';
				if(existPermission('admin:personnel:performanceManage:KPIgroup'))	
					navarea += '<li title="KPIgroup"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>KPI组</li>';
				if(existPermission('admin:personnel:performanceManage:KPIgroupSet'))	
					navarea += '<li title="KPIgroupSet"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>KPI组分配</li>';
				if(existPermission('admin:personnel:performanceManage:rewardPenalties'))	
					navarea += '<li title="rewardPenalties"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>员工奖惩信息</li>';
				if(existPermission('admin:personnel:performanceManage:rewardPunishType'))	
					navarea += '<li title="rewardPunishType"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>员工奖惩类型</li>';
				navarea += '</ul>';
				navarea += '</div>';
			}
			if(existPermission('admin:personnel:trainManage')){	
				navarea += '<div class="navpiece">';
				navarea += '<h3 ><img class="img_01" src="../../img/index/icon4.png" alt="图片四" /><span>培训管理</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
				navarea += '<ul class="navpiece1" title="trainManage">';
				if(existPermission('admin:personnel:trainManage:train'))
					navarea += '<li title="train"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>培训信息</li>';
				if(existPermission('admin:personnel:trainManage:trainDoc'))	
					navarea += '<li title="trainDoc"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>培训记录管理</li>';
				if(existPermission('admin:personnel:trainManage:trainflow'))	
					navarea += '<li title="trainflow"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>培训流程</li>';
				if(existPermission('admin:personnel:trainManage:trainRecord'))	
					navarea += '<li title="trainRecord"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>待备案培训</li>';
				navarea += '</ul>';
				navarea += '</div>';
			}	
			$('#leftbar .navarea').html(navarea);
			changeTreeBg();                     //每一项导航条中的最后一个li的图片变成底部图片
			$('#w').css('text-align','center');
			$('#w').window({
				collapsible:false,
				minimizable:false,
				maximizable:false
			});
			$('#w').window('close');
			$('#main').css('height',(wy-108)+'px');
			$("#loadarea").css("height","100%");
			indexStyle(wx,wy);
		 	includeScriptStyle('../../js/personnel/tablemod.js');
		 	includeScriptStyle('../../js/personnel/flowmod.js');
			/*-------------------------------topbarMenu-----------------------------------------*/
			var personnelDom = $('#leftbar .navarea').html();               //获取personnel部分的 html
			navMove(wy);                                                       //导航条可折叠
			loadHtml('personnel');                                                       //加载html
			/*$('#topbar .topbarMenu li').click(function(){
				$('.now').removeClass('now');
				$(this).addClass('now');
			});*/
			leftResponse(wx); //左边导航栏的适配
			/*-----------------------------------根据topbar的点击加载不同的leftbar---------------------------------------*/
			var module = null;
			$('#topbar .topbarMenu .personnel').click(function(){
				$(this).addClass('now').siblings().removeClass('now');
				$('#leftbar .navarea').html('');
				$('#leftbar .navarea').html(personnelDom);
				module = 'personnel';
				indexStyle(wx,wy);
				navMove(wy);
				loadHtml(module);
			});
			/********添加五金仓库按钮点击事件**********/
			$('#topbar .topbarMenu .repertory').click(function(){
				$(this).addClass('now');
				$(this).siblings().removeClass('now');
				$('#leftbar .navarea').html('');
				var str = '<div class="navpiece on"><h3><img class="img_01" src="../../img/index/cang.png" alt="图片二" /><span>仓库</span><img class="img_02" src="../../img/index/draw.png" alt="图片九" /></h3>'
					      +'<ul class="navpiece1" title="repertoryManage">'
					      +'<li title="findgoods"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>进出库登记</li>'
					      +'<li title="repertoryBatchIn"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>批量入库</li>'
					      +'<li title="repertoryBatchOut"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>批量出库</li>'
					      +'<li title="repertorylist"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>仓位查询</li>'
//					      +'<li title="goodsdetails">仓库物品收付明细</li>'
					      +'<li title="repertoryinout"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>进出库明细</li>'
					      +'<li title="repertoryin"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>入库明细</li>'
					      +'<li title="repertoryout"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>出库明细</li>'
					      +'</ul></div>'
					      +'<div class="navpiece"><h3><img class="img_01" src="../../img/index/report.png" alt="图片二" /><span>报表</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>'
					      +'<ul class="navpiece1" title="reportForm">'
					      //+'<li title="repertoryForm"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>仓库分组报表</li>'
					      +'<li title="goodspriceForm"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>物品价格报表</li>'
					      +'<li title="goodsreceiveForm"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>部门分类领用饼图</li>'
					      +'<li title="goodstypemonthForm"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>物品类别月报表</li>'
					      +'<li title="goodsDeptGetForm"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>部门领用汇总报表</li>'
					      +'<li title="goodsDeptUseGetForm"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>部门领用分类报表</li>'
					      +'<li title="goodsmonthForm"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>物品月报表</li>'
					      +'<li title="goodsVariationForm"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>物品动态报表</li>'
					      +'</ul></div>'
				$('#leftbar .navarea').html(str);
				module = 'repertory';
				indexStyle(wx,wy);
				changeTreeBg();                     //每一项导航条中的最后一个li的图片变成底部图片
				navMove(wy);
				leftResponse(wx); //左边导航栏的适配
				loadHtml(module);
			});
			/*-------------添加系统设置按钮点击事件----------------------*/
			$('#topbar .topbarMenu .systemSet').click(function(){
				$(this).addClass('now');
				$(this).siblings().removeClass('now');
				$('#leftbar .navarea').html('');
				var navarea = '';
				if(existPermission('admin:personnel:framework')){	
					navarea += '<div class="navpiece on">';
					navarea += '<h3 ><img class="img_01" src="../../img/index/icon2.png" alt="图片八" /><span>组织架构</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
					navarea += '<ul class="navpiece1" title="framework">';
					if(existPermission('admin:personnel:framework:department'))
						navarea += '<li title="department"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>部门管理</li>';
					if(existPermission('admin:personnel:framework:lead'))	
						navarea += '<li title="lead"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>上下级管理</li>';
					if(existPermission('admin:personnel:framework:post'))	
						navarea += '<li title="post"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>岗位管理</li>';
					if(existPermission('admin:personnel:framework:role'))	
						navarea += '<li title="role"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>角色管理</li>';
					if(existPermission('admin:personnel:framework:roleGive'))	
						navarea += '<li title="roleGive"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>角色赋予</li>';
					if(existPermission('admin:personnel:framework:resetUserPassword'))	
						navarea += '<li title="resetUserPassword"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>重置员工密码</li>';
					navarea += '</ul>';
					navarea += '</div>';
				}
				navarea += '<div class="navpiece">';
				navarea += '<h3 ><img class="img_01" src="../../img/index/rmb.png" alt="资产" /><span>固定资产管理</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
				navarea += '<ul class="navpiece1" title="assets">';
				navarea += '<li title="depreciationManage"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>折旧类型管理</li>';
				navarea += '<li title="assetsManage"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>固定资产管理</li>';
				navarea += '<li title="depreciationRecord"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>折旧记录管理</li>';
				navarea += '</ul>';
				navarea += '</div>';
				if(existPermission('admin:system:dictionary')){
					navarea += '<div class="navpiece">';
					navarea += '<h3 ><img class="img_01" src="../../img/index/book.png" alt="书" /><span>数据字典</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
					navarea += '<ul class="navpiece1" title="dictionary">';
					navarea += '<li title="dictionary"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>数据字典</li>';
					navarea += '</ul>';
					navarea += '</div>';
				}
				if(existPermission('admin:system:systemLog')){
					navarea += '<div class="navpiece bottom">';
					navarea += '<h3 ><img class="img_01" src="../../img/index/book.png" alt="书" /><span>日志管理</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
					navarea += '<ul class="navpiece1" title="systemLog">';
					navarea += '<li title="systemLog"><div class="systemLog"><img src="../../img/index/listMid.png"/>日志管理</div></li>';
					navarea += '</ul>';
					navarea += '</div>';
				}
				$('#leftbar .navarea').html(navarea);
				module = 'systemSet';
				indexStyle(wx,wy);
				changeTreeBg();                     //每一项导航条中的最后一个li的图片变成底部图片
				navMove(wy);
				leftResponse(wx); //左边导航栏的适配
				loadHtml(module);
			});
			/*--------------------------------个人办公-----------------------------------*/
			$('#topbar .topbarMenu .workOfficeDoc').click(function(){
				$(this).addClass('now');
				$(this).siblings().removeClass('now');
				$('#leftbar .navarea').html('');
				var navarea = '';
				//公文管理
				navarea += '<div class="navpiece on">';
				navarea += '<h3 ><img class="img_01" src="../../img/index/document.png" alt="文件" /><span>公文管理</span><img class="img_02" src="../../img/index/unfold.png" alt="图片九" /></h3>';
				navarea += '<ul class="navpiece1" title="documentManage">';
				navarea += '<li title="documentManage"><div class="treeBg"><img src="../../img/index/listMid.png" /></div>公文处理</li>';
				navarea += '</ul>';
				navarea += '</div>';
				$('#leftbar .navarea').html(navarea);
				module = 'workOfficeDoc';
				indexStyle(wx,wy);
				changeTreeBg();                     //每一项导航条中的最后一个li的图片变成底部图片
				navMove(wy);
				leftResponse(wx); //左边导航栏的适配
				loadHtml(module);
			});
			//修改密码
			$("#updatePassword").click(function(){
				$('#box .updatePasswordWindow').css('display','block');
			})
			//退出登录
			$("#out").click(function(){
				$.ajax({
					url:'../../user/outLogin.do?getMs='+getMS(),
					type:'post',
					success:function(data){
						window.location.href = '../../html/user/login.html';
					},
					error:function(){
						windowControl("退出失败!");
					}
				})
			})
			//确定修改密码
			$("#box .updatePasswordWindow .save").click(function(){
				var oldPassword = $("#box .updatePasswordWindow input[name=oldPassword]").val();
				var newPassword = $("#box .updatePasswordWindow input[name=newPassword]").val();
				var newPasswordAgain = $("#box .updatePasswordWindow input[name=newPasswordAgain]").val();
				if(newPassword != newPasswordAgain){
					windowControl("两次密码不一致!");
				}else{
					$.ajax({
						data:{oldPassword:oldPassword,newPassword:newPassword},
						url:'../../user/updatePassword.do?getMs='+getMS(),
						type:'post',
						success:function(data){
							windowControl(data);
							$('#box .updatePasswordWindow').css('display','none');
							$("#box .updatePasswordWindow input[name=oldPassword]").val(null);
							$("#box .updatePasswordWindow input[name=newPassword]").val(null);
							$("#box .updatePasswordWindow input[name=newPasswordAgain]").val(null);
						}
						
					})
				}
				
			})
			
		/*-----------------------获取当天时间-----------------------*/
			getDate();
			setInterval(function() {
				getDate();
			}, 1000);
		/*-------------------------------欢迎登录人---------------------*/
			$.ajax({
				url:'../../user/getUserInfo.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					var data = eval('(' + data + ')'); 
					$('.topbarRight .userAccount').html(data.userName);
				},
				error:function(error){
					windowControl(error.status);
				}
			});
		/*-------------------------------staffRecord------------------------------------------*/
			$('.basic p label:nth-child(2)').css('float','right');
			$('#staffRecord .basic p').css('line-height',wy*.04+'px');
			$('#staffRecord .experience table').css('height',wy*.2+'px');
			$('#staffRecord input').css('width',wx*0.2+'px');
			$('#staffRecord select').css('width',wx*0.2+2+'px');
			$('#staffRecord .date_picker').css('width','40%');
			$('#staffRecord .add').css({
				'height': '20px',
				'width': '80px',
				'margin-top': '10px',
			})
			/*----弹窗居中----*/
		    center();
			/*---阻止事件冒泡----*/
			//event.stopPropagation();
			stopEvent();
			/***********点击打印按钮以后，进行打印制定的table表格*************/
			$("#print-message .btnarea .print").click(function(){
				$("#print-message table").parent().jqprint();
			});
			/*--------------显示新消息的条数---------------*/
			$.ajax({
				url:'../../system/selectMessageByUser.do?getMs='+getMS(),
				data:{'readFlag':'0'},
				success:function(data){
					var data = $.parseJSON(data);
					$('#bottombar .bottomleft #indexMessage span').html('消息('+data.total+') |');
				}
			});
			/*--------------新信息----------------*/
			$('.indexMessage .popuparea .invitetop .queryMessage').click(function(){
				var readFlag = $('.indexMessage .popuparea select[name=readFlag]').val();
				var sendUserName = $('.indexMessage .popuparea input[name=sendUserName]').val();
				$('#messagedg').datagrid({
					queryParams:{
						readFlag:readFlag,
						sendUserName:sendUserName
					},
					onLoadSuccess:function(){
						$('.indexMessage .popuparea select[name=readFlag]').val(readFlag);
						$('.indexMessage .popuparea input[name=sendUserName]').val(sendUserName);
					}
				});
				$('#messagedg').datagrid('getPager').pagination({
					beforePageText:'',
					afterPageText:'',
					displayMsg:'总共{total}条',
				});
			});
			/*--------------新消息---------------*/
			$('#bottombar #indexMessage').click(function(){
				$('#messagedg').parent().css({'width':'500px','height':'400px'});
				$('#messagedg').datagrid({
					   url:'../../system/selectMessageByUser.do?getMs='+getMS(),
					   rownumbers:"true",
					   singleSelect:true,
					   pagination:true,
					   toolbar:".indexMessage .invitetop",
					   method:"post",
					   queryParams:{
							readFlag:'0',
						},
					   fit: true, 
					   onDblClickRow:function(rowIndex, rowData){
						   var row = $('#messagedg').datagrid('getSelected');
						   var arr =row.url.split("/"); 
						   var titleArr = [['userManage','员工管理'],['userTransfer','员工调动记录'],['dimission','员工离职记录'],
						              ['userInviteManage','招聘记录管理'],['pact','合同信息'],['tryPerson','试用期人员名单'],
						              ['welfareAdd','福利申请登记'],['welfare','发起福利计划'],['welfareExamine','我参与的福利流程'],
						              ['welfarerecord','待备案福利'],['welfarepay','福利发放记录'],['staffBirthday','员工生日'],
						              ['socialSecurity','社保信息'],['goout','外出信息'],['gooutExamine','待我审核外出流程'],
						              ['gooutRecord','待我备案外出流程'],['leave','请假信息'],
						              ['leaveExamine','待我审核请假流程'],['leaveRecord','待我备案请假流程'],
						              ['myCheckInfo','我的考勤信息'],['checkGroupManage','考勤组管理'],
						              ['checkGroupAllot','考勤组人员管理'],['checkInfoQuery','考勤信息查询'],
						              ['KPIgrade','KPI评分'],['KPIstandard','KPI考核标准'],['KPIgroup','KPI组'],
						              ['KPIgroupSet','KPI组分配'],['rewardPenalties','员工奖惩信息'],
						              ['rewardPunishType','员工奖惩类型'],['train','培训信息'],
						              ['trainDoc','培训记录管理'],['trainflow','培训流程'],['trainRecord','待备案培训']];
						   for(var i=0;i<titleArr.length;i++){
							   if(titleArr[i][0] == arr[2]){
								   var title = titleArr[i][1];
								   i = titleArr.length;
							   }
						   }
						   if($('#'+arr[2]).length == 0){
								loadPage(arr[0]+'/'+arr[1],arr[2],title);
						   }else{
							$('#loadarea').tabs('select',title);
						   }
						   $.ajax({
							   url:'../../system/updateMessageRead.do?getMs='+getMS(),
							   data:{messageId:rowData.messageId},
							   success:function(data){
							   },
							   error:function(err){
							   }
						   });
						   $('.indexMessage').css('display','none');
					   },
					   columns:[[
					       {field:"message",title:"信息",resizable:true,align:"center",sortable:true,width:200},
					       {field:"sendUserName",title:"发送人",resizable:true,align:"center",sortable:true,width:60},
					       {field:"sendTime",title:"发送时间",resizable:true,align:"center",sortable:true,width:100},
					       {field:"readFlag",title:"信息状态",width:100,resizable:true,align:"center",width:100,sortable:true,formatter:function(value,row,index){
					    	   if(value == '0'){
					    		   return '<span style="color:green;">未读</span>' ;
					    	   }else{
					    		   return '<span style="color:red;">已读</span>' ;
					    	   }
					       }},
					  ]]
				});
				$('#messagedg').datagrid('getPager').pagination({
					beforePageText:'',
					afterPageText:'',
					displayMsg:'总共{total}条',
				});
				$('.indexMessage').css('display','block');
			});
		},
		error:function(){
			windowControl('从服务器获取权限失败');
		}
	})
	
	/***********************加载数据字典数据******************************************/
	$.ajax({
		url:'../../dictionary/queryDictionary.do?getMs='+getMS(),
		success:function(data){
			//console.log(data);
			$("#saveDictionaryData").val(data);
			//dictionaryData = $.parseJSON(data);
			//console.log("length="+dictionaryData.rows.length);
		}
		
	})
	
})
/*
 * 
	ui.confirm('你确认要删除吗？',function(z){
        if(z){
              // ui.success('删除成功！');   
               // ui.success('欢迎使用易U！',5000); 
               windowControl('ss');
        }else{
               // ui.windowControl('没有删除！',1000);      
        }
	},true);
 * */
/*-----------------------------获取数据字典相应的数据---------------------------------------*/
function getDataBySelectKey(selectKey){
	if(selectKey == null){
		return ;
	}
	var str = "";
	var dictionaryData = $.parseJSON($("#saveDictionaryData").val());
	for(var i=0;i<dictionaryData.rows.length;i++){
		if(dictionaryData.rows[i].isDefault == '1' && dictionaryData.rows[i].selectKey == selectKey){
			str += "<option selected='selected' name='"+selectKey+"Option' value=" + dictionaryData.rows[i].optionKey + ">" + dictionaryData.rows[i].optionValue + "</option>";  
		}else if(dictionaryData.rows[i].selectKey == selectKey){
			str += "<option name='"+selectKey+"Option' value=" + dictionaryData.rows[i].optionKey + ">" + dictionaryData.rows[i].optionValue + "</option>";  
		}
	}
	return str;
}
function getDataBySelectKeyNo(selectKey){
	var str ="<option value=''></option>";
	var dictionaryData = $.parseJSON($("#saveDictionaryData").val());
	for(var i=0;i<dictionaryData.rows.length;i++){
		 if(dictionaryData.rows[i].selectKey == selectKey){
				str += "<option name='"+selectKey+"Option' value=" + dictionaryData.rows[i].optionKey + ">" + dictionaryData.rows[i].optionValue + "</option>";  
			}
	}
	
	return str;
}
function getValueFromKey(selectKey,optionKey){
	
	var dictionaryData = $.parseJSON($("#saveDictionaryData").val());
	for(var i=0;i<dictionaryData.rows.length;i++){
		if(dictionaryData.rows[i].selectKey == selectKey && dictionaryData.rows[i].optionKey == optionKey){
			return dictionaryData.rows[i].optionValue;
		}
	}
	return "";
}
function getKeyFromValue(selectKey,optionValue){
	var dictionaryData = $.parseJSON($("#saveDictionaryData").val());
	for(var i=0;i<dictionaryData.rows.length;i++){
		if(dictionaryData.rows[i].selectKey == selectKey && dictionaryData.rows[i].optionValue == optionValue){
			return dictionaryData.rows[i].optionKey;
		}
	}
}

/*----------------------------------特别的函数--------------------------------*/
var wx = $(window).width();   //获取可视区屏幕的宽度
var wy = $(window).height();  //获取可视区屏幕的高度
var toflow = null;            //流向流程的数据
var allrun = 1;                   //随机数
function includeLinkStyle(url) {                  // 引入css函数
	 var link = document.createElement("link");
	 link.rel = "stylesheet";
	 link.type = "text/css";
	 link.href = url;
	 document.getElementsByTagName("head")[0].appendChild(link);
}
function includeScriptStyle(url) {                  // 引入css函数
	 var script = document.createElement("script");
	 script.type = "text/javascript";
	 script.src = url;
	 document.getElementsByTagName("head")[0].appendChild(script);
}
function testShow(elem){            // jedeta 函数
	$.jeDate(elem,{
		trigger:false,
	    format: 'YYYY-MM-DD',
		minDate: '1917-06-16', // 设定最小日期为当前日期
		festival: false,
		maxDate: '2117-06-16' // 最大日期
	  });
}
function showHms(elem){                            // jedeta 函数 时分秒
	 $.jeDate(elem,{
		trigger:false,
	    format: 'hh:mm:ss',
	  });
}
/*--------------验证时间格式--------------*/
function testDate(ele){
	var value = $(ele).val();
	if(!value){
	}else{
		if(value.length == 8 && value.indexOf("-") == '-1'){
			var regexp1 = /^(?:(?!0000)[0-9]{4}(?:(?:0?[1-9]|1[0-2])(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])(?:29|30)|(?:0?[13578]|1[02])31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)0?229)$/;
			if(regexp1.test(value)){//value.replace(regexp)
				//console.log(regexp.test(value));
				var Year = value.substring(0,4);
				var Month = value.substring(4,6);
				var Date = value.substring(6,8);
				var str = Year+'-'+Month+'-'+Date;
				$(ele).val(str);
			}else{
				$(ele).val('');
				windowControl('请输入正确的时间格式(2000-01-01或20000101)');
			}
		}else if(value.length == 10){
			var regexp2 = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
			if(regexp2.test(value)){//value.replace(regexp)
				//console.log(regexp.test(value));
			}else{
				$(ele).val('');
				windowControl('请输入正确的时间格式(2000-01-01或20000101)');
			}
		}else{
			$(ele).val('');
			windowControl('请输入正确的时间格式(2000-01-01或20000101)');
		}
	}
}
/*----------------获取时间------------------*/
function getDate(){
	var wy = $(window).height();  //获取可视区屏幕的高度
	var time = new Date();
	// 程序计时的月从0开始取值后+1
	var systemH = time.getHours();
	var systemM = time.getMinutes();
	var systemS = time.getSeconds();
	if(systemH < 10){
		systemH = '0'+systemH;
	}
	if(systemM < 10){
		systemM = '0'+systemM;
	}
	if(systemS < 10){
		systemS = '0'+systemS;
	}
	var month = time.getMonth() + 1;
	if(wy<450){
		$('#time').css('padding-top','0px');
		$('#out').css('margin-top','0px');
		var nowTime = time.getFullYear() + "-" + month + "-"+ time.getDate()  
            +" "+ systemH + ":" + systemM + ":" + systemS;
	}else if(wy<645){
		$('#time').css('padding-top','3px');
		$('#out').css('margin-top','2px');
		var nowTime = time.getFullYear() + "-" + month + "-"+ time.getDate()  
            +" "+  systemH + ":" + systemM + ":" + systemS;
	}else{
		$('#time').css('padding-top','0px');
		$('#out').css('margin-top','4px');
		var nowTime = time.getFullYear() + "-" + month + "-"+ time.getDate()  
           + "<br>" + systemH + ":" + systemM + ":" + systemS;
	}
	$('#time').html(nowTime);
}
function YMD(elem){                            // jedeta 函数
	$.jeDate(elem,{
		trigger:false,
		format: 'YYYY-MM-DD',
		minDate: '1917-06-16', // 设定最小日期为当前日期
		festival: false,
		maxDate: '2117-06-16' // 最大日期
	});
}
function YMDHMS(elem){                            // jedeta 函数
	$.jeDate(elem,{
		trigger:false,
		format: 'YYYY-MM-DD hh:mm:ss',
		minDate: '1917-06-16', // 设定最小日期为当前日期
		festival: false,
		maxDate: '2117-06-16' // 最大日期
	});
}
/*---------关闭windowControl-----------*/
function closeWindow(){
	$('#w').window('close');
}
function windowControl(text,Width,Height){                //提示框
	$('#w').window({
		width:Width||250,
		height:Height||150,
		padding:10,
	});
	text +='<div style="position:absolute;bottom:8px;"><input type="button" class="button" style="margin-left:102px;" onclick="closeWindow()" value="确定"/></div>';
	$('#w').html(text);
	$('#w').parents('.panel').css('height','auto');
	$('.window-shadow').css('height',$('#w').parents('.panel').height());
	$('#w').window('open');
}
function isInclude(name){                  // 判断css、js是否重新引入
    var js= /js$/i.test(name);
    var es=document.getElementsByTagName(js?'script':'link');
    for(var i=0;i<es.length;i++) 
    if(es[i][js?'src':'href'].indexOf(name)!=-1)return true;
    return false;
}
/*--------------ie8兼容-------------------------*/
function placeHolder(){
	if( !('placeholder' in document.createElement('input')) ){   
	    $('input[placeholder],textarea[placeholder]').each(function(){    
	      var that = $(this),    
	      text= that.attr('placeholder');    
	      if(that.val()===""){    
	        that.val(text).addClass('placeholder');    
	      }    
	      that.focus(function(){    
	        if(that.val()===text){    
	          that.val("").removeClass('placeholder');    
	        }    
	      })    
	      .blur(function(){    
	        if(that.val()===""){    
	          that.val(text).addClass('placeholder');    
	        }    
	      })    
	      .closest('form').submit(function(){    
	        if(that.val() === text){    
	          that.val(null);    
	        }    
	      });    
	    });    
	 } 
}
/*------------------------------navmove-------------*/
function navMove(wy){	  //导航条的移动
	var acord = true;
	var navNum = $('.navpiece').length;
	var navH = $('.navpiece h3').height()+1;
	$('.navarea .on>ul').css('height',(wy*.891-40-(navH*navNum)+'px'));
	$('.navpiece h3').unbind('click');
	$('.navpiece h3').click(function(){
		if($(this).parent().attr('class') == 'navpiece on'){
			$(this).parent().children('ul').stop().animate({"height":0},500);
			$('.navpiece .img_02').attr('src','../../img/index/unfold.png');
			$('.on .img_02').attr('src','../../img/index/unfold.png');
			$(this).parent().removeClass('on');
			setTimeout(function(){
				$('.on').children('ul').css('overflow-y','auto');
			},500);
		}else if(acord){
			$('.navpiece').stop();
			$('.on').children('ul').stop().animate({'height':0},500);
			$('.navpiece').removeClass('on');
			$(this).parent().children('ul').stop().animate({'height':(wy*.891-40-(navH*navNum)+'px')},500);
			$(this).parent().addClass('on');
			$('.navpiece .img_02').attr('src','../../img/index/unfold.png');
			$('.on .img_02').attr('src','../../img/index/draw.png');
			setTimeout(function(){
				$('.on').children('ul').css('overflow-y','auto');
			},500);
		}
		acord = false;
		setTimeout(function(){acord = true},500);
	});
}
/*
function closeTab(){
	$('.tabs-close').click(function(){
		var index = $(this).index()+10;
	    $('head script').eq(index).remove();
	});
}*/
/*-------------------*/   //设置行高
function LineHeight(ele){
	var liH = ele.height();
	if(liH < 16){
		liH = 16
	}
	ele.css("line-height",liH+"px");
}
/*------------------*/   //js定义一些index的样式
function indexStyle(wx,wy){
	$('#topbar .topbarRight').css({'font-size':(wx/1903)*14+'px',});
	$('.navarea h3').css({'font-size':(wx/1903)*18+'px',});
	var leftFontSize = (wx/1903)*18;
	if(leftFontSize < 12)
		leftFontSize = 12;
	$('.navarea .navpiece .navpiece1').css({'font-size':leftFontSize+'px',});
	$('.showtop').css({'font-size':(wx/1903)*18+'px',});
	$('.navarea h3').css({
		'height':Math.ceil(wy*.04)+'px',
		'padding-left':'3%',
	});
	$('#topbar .topbarMenu').css({
		'font-size':(wx/1903)*18+'px',
		'left':(wx/1903)*160+'px',
		'top':(wy/898)*32+'px',
		'height':(wy/898)*38+'px'
	});
	$('.navarea .navpiece .navpiece1>li').css({
		'height':wy/30+'px',
		'padding-left':Math.round(wy*.022)+Math.floor(wx*.072*.12)-wy/60+'px',
		'text-indent': '3%',
	});
	$('#bottombar').css({'font-size':(wy/900)*12+'px',});
	LineHeight($(".topbarMenu li"));
	LineHeight($('#topbar .topbarRight li'));
	LineHeight($('#message'));
	LineHeight($('.navarea h3'));
	LineHeight($('.showtop'));
	LineHeight($('#bottombar'));
	LineHeight($('.navarea .navpiece .navpiece1>li'));
	$('#topbar .topbarRight p').css({
		'line-height':(wy/898)*22+'px',
	})
	$('#logo img').css({
		'height':wy*.062+'px',
		'width':wx*.0184+'px',
	});
	$('#logo #Mendertext').css({
		'height':wy*.044+'px',
		'width':wx*.04+'px',
		'margin-top':wy/90+'px',
	});
	$('#bottombar .bottomleft>img').css({
		'width':wy*.031-5+'px',
		'height':wy*.031-5+'px',
	});
	$(".navarea h3 .img_01").css({
		'height':Math.round(wy*.022)+'px',
		'width':Math.round(wy*.022)+'px',
		'margin-left':Math.floor(wx*.072*.12)+'px',
		'margin-top':Math.floor(wy*.24*.04)+'px',
	});
	$(".navarea h3 .img_02").css({
		'height':Math.round(wy*.022)+'px',
		'width':Math.round(wy*.022)+'px',
		'margin-right':Math.floor(wx*.096*.12)+'px',
		'margin-top':Math.floor(wy*.24*.04)+'px',
	});
	if(wy/wx > 0.65 ||wx < 860 || wy<400){
		$(".navarea h3 .img_01").css('display','none');
		$(".navarea h3 .img_02").css('display','none');
		$(".navarea h3").css("padding-left","4%");
		$('.navarea .navpiece .navpiece1>li').css({
			'padding-left':'4%',
			'text-indent': '0%',
		});
	}else{
		$(".navarea h3 .img_01").css('display','block');
		$(".navarea h3 .img_02").css('display','block');
	}
	$('#leftbar').css('height',(wy*.891)-10+'px');
	$('#main').css('height',(wy*.891)-10+'px');
	$('.navarea .navpiece ul li .treeBg').css('width',wy/60+'px');
}
$(window).resize(function(){
	var swx = $(window).width();   //获取可视区屏幕的宽度
	var swy = $(window).height();  //获取可视区屏幕的高度
	indexStyle(swx,swy);
	navMove(swy);
	leftResponse(swx);//导航栏的适配
	//adjustsumBar();  //调整sumBer
	if($('.sumBar').get(0)){
		for(var i=0;i<$('#loadarea>.tabs-panels').length;i++){
			var wx = $(window).width();   //获取可视区屏幕的宽度
			var wy = $(window).height();  //获取可视区屏幕的高度
			var left,bottom;
			bottom = (wy*.031)+34;        //据底部距离
			if($('#loadarea>.tabs-panels').eq(i).find('.treearea').get(0)){  //判断是否有树
				left = (wx*.125)+204;
			}else{
				left = (wx*.125)+2;
			}
			$('#loadarea>.tabs-panels').eq(i).find('.sumBar').css({
				'left':left+'px',
				'bottom':bottom+'px',
			});
		}
	}
	//console.log($('#loadarea>.tabs-panels').length);
	/*$('#loadarea>.tabs-panels').css('height',(swy*.891)-42+'px')
	$('.panel-noscroll').css('height',(swy*.891)-72+'px');
	$('.panel-noscroll .panel-body-noheader').css('height',(swy*.891)-72+'px');
	for(var i=0;i<$('.panel-noscroll .panel-body-noheader .datagrid-view').length;i++){
		$('.panel-noscroll .panel-body-noheader .datagrid-view:eq('+i+')').css({
			'height':(swy*.891)-105-$('.invitetop').eq(i).height()+'px',
			'width':(swx*.875)+'px',
		});
		$('.panel-noscroll .panel-body-noheader .datagrid-view .datagrid-view2 .datagrid-body:eq('+i+')').css({
			'height':(swy*.891)-105-$('.invitetop').eq(i).height()-25+'px',
		})
	}
	$('.panel-noscroll .panel-body-noheader .datagrid-view .datagrid-view1').css({
		'height':'100%',
	});
	$('.panel-noscroll .panel-body-noheader .datagrid-view .datagrid-view1 .datagrid-body').css({
		'height':$(this).parent().height()-25+'px',
	});
	$('.panel-noscroll .panel-body-noheader .datagrid-view .datagrid-view2').css({
		'width':(swx*.875)-26+'px',
		'height':'100%',
	});
	if($('.panel-noscroll .panel-body-noheader .datagrid-view .datagrid-view2 .datagrid-header').width() < (swx*.875)-26){
		$('.panel-noscroll .panel-body-noheader .datagrid-view .datagrid-view2 .datagrid-header').css('width','100%');
	}
	if($('.panel-noscroll .panel-body-noheader .datagrid-view .datagrid-view2 .datagrid-body').width() < (swx*.875)-26){
		$('.panel-noscroll .panel-body-noheader .datagrid-view .datagrid-view2 .datagrid-body').css('width','100%');
	}
	
	$('.panel .panel-body-noheader').css('width',(swx*.875)+'px');
	$('.tabs-wrap').css('width',(swx*.875)+'px');
	$('.datagrid').css('width',(swx*.875)+'px');*/
});
/*-------------------*/
function loadPage(way,content,title){                                         //加载main区域页面的函数
 $.get('../'+way+'/'+content+'.html',function(data){
		var arr=[];
		if ($('#loadarea').tabs('exists', title)){                        // 判断是否有重复的tab卡
			$('#loadarea').tabs('select', title);
		} else {
			$('#loadarea').tabs('add',{
			    title:title,
			    content:data,
			    closable:true,
			});
			$('#'+content+'dg').parent().css('height',$('#loadarea').height()-64);
			$('#'+content).css('width','100%');
			$('#'+content).find('.invitetop').children("input[value=清空]").click(function(){
				$(this).parent().find('input').not('input[type=button]').val(null);
				$(this).parent().find('select').children('option:first-child').attr('selected',true);
			});
			if(!isInclude(content+'.css')){
		 		includeLinkStyle('../../css/'+way+'/'+content+'.css');
		 	}
		 	if($('script[src="../../js/'+way+'/'+content+'.js?'+allrun+'"]')){
		 		$('script[src="../../js/'+way+'/'+content+'.js?'+allrun+'"]').remove();
			}
		 	allrun = Math.random();
		 	includeScriptStyle('../../js/'+way+'/'+content+'.js?'+allrun);
		 	/*setTimeout(function(){
		 		$('#'+content+'dg').datagrid('getPager').pagination({
			 		pageList: [10,20,50,100],
			 		pageSize:20,
			 		displayMsg:'当前显示从第{from}条到{to}条 共{total}条记录',
			 	});
		 	},100);*/
		 	//获取最后一个tabs 在新加的选项卡后面添加"关闭全部"
            var li = $(".tabs-wrap ul li:last-child");
            $("#close").remove();
            li.after("<li id='close'><a class='tabs-inner' href='javascript:;' onClick='closeAll()'>关闭全部</a></li>");
			cannel();
			center();
			placeHolder();
		}
	 }); 	
}
/*-------------------*/
function loadHtml(module){                                                  // 加载不同html
	$('.navpiece li').click(function(){
		$(this).parents('navarea').find('li').css("color","#000");
		$(this).css("color","#767D87").siblings().css("color","#000");   //侧边栏二级菜单点击变色
		var way =module+'/'+ $(this).parents('ul').attr("title")
		var content = $(this).attr("title");
		var title = $(this).text();
		if($('#'+content).length == 0){
			loadPage(way,content,title);
		}else{
			$('#loadarea').tabs('select',title);
		}
	})
}
/*------------调整sumBar的位置-------------*/
function adjustsumBar(id){
	if($('.sumBar').get(0)){
		var wx = $(window).width();   //获取可视区屏幕的宽度
		var wy = $(window).height();  //获取可视区屏幕的高度
		var left,bottom,controlBottom;
		if($('#'+id).find('.datagrid-header-inner:eq(1) .datagrid-htable').width() > $('#'+id).find('.datagrid-body:eq(1)').width()){ //据底部距离
			bottom = (wy*.031)+34+16;
			controlBottom = bottom -44;  
		}else{
			bottom = (wy*.031)+34; 
			controlBottom = bottom -28;  //30到底
		}
		if($('#'+id).find('.treearea').get(0)){  //判断是否有树
			left = (wx*.125)+204;
		}else{
			left = (wx*.125)+2;
		}
		
		$('#'+id).find('.sumBar').css({
			'left':left+'px',
			'bottom':bottom+'px',
		});
		$('#'+id).find('.controlSumBar').css({
			'right':'0px',
			'bottom':controlBottom+'px',
		});
		///if(*)   哈哈哈哈哈哈哈啊
	}
}
/*---*/
/*------关闭--------*/
function cannel(){
	$('.btnarea').each(function(){
		$(this).find("input[type=button]").eq(0).click(function(){
			var dom = $(this).parents('.popup');
			var w = dom.width();
			var h = dom.height();
			dom.css({
				'left':(wx-w)/2,
				'top':(wy-h)/2
			});
		});
	})
	$('.turnoff').click(function(){
		var dom = $(this).parent();
		dom.css('display','none');
		dom.find('input').not('.button').val(null);
		dom.find('textarea').val(null);
		dom.find('select').children('option:first-child').attr('selected',true);
		var w = dom.width();
		var h = dom.height();
		dom.css({
			'left':(wx-w)/2,
			'top':(wy-h)/2
		});
	});
	$('.close').click(function(){
		var dom = $(this).parents('.popup');
		var w = dom.width();
		var h = dom.height();
		dom.css({
			'left':(wx-w)/2,
			'top':(wy-h)/2
		});
	})
	$('.cannel').click(function(){
		var dom = $(this).parents('.popup');
		dom.css('display','none');
		dom.find('input').not('.button').val(null);
		dom.find('textarea').val(null);
		dom.find('select').children('option:first-child').attr('selected',true);
		var w = dom.width();
		var h = dom.height();
		dom.css({
			'left':(wx-w)/2,
			'top':(wy-h)/2
		});
	});
}
//导航栏的适配
function leftResponse(wx){
	if(wx<1100){
		$(".show .img_nav").css("width","15px").css("height","15px").css("margin-left","6%").css("margin-top","8%");
	}
	if(1100<wx && wx<1400){
		$(".show .img_nav").css("width","18px").css("height","18px").css("margin-left","6%").css("margin-top","6%");
	}
	if(1400<wx && wx<2000){
		$(".show .img_nav").css("width","25px").css("height","24px").css("margin-left","9%").css("margin-top","2%");
	}
}
/*-----关闭所有-----*/
function closeAll() {
    $(".tabs li").each(function(index, obj) {
        //获取所有可关闭的选项卡
        var tab = $(".tabs-closable", this).text();
        $(".easyui-tabs").tabs('close', tab);
    });
    $("#close").remove();//同时把此按钮关闭
}
/*-----------弹窗拖拽-----------*/
function dragPopup(ele){
	var parent = ele.parent();
	ele.mousedown(function(e){
		var wx = $(window).width();   //获取可视区屏幕的宽度
		var wy = $(window).height();  //获取可视区屏幕的高度
		var interiorLeft=e.offsetX;
   		var interiorTop=e.offsetY;
		$(document).mousemove(function(e){
			e.preventDefault();
			var left = e.pageX;
        	var top = e.pageY;
        	var Top = top - interiorTop;
        	var Left = left - interiorLeft;
        	if (Left < 0) {
				Left = 0;
        	};
        	if (Left > wx - parent.width()) {
				Left = wx - parent.width();
        	};
        	if(Top < 0){
        		Top = 0;
        	}
        	if(Top > wy - parent.height()-12){//12 popup padding
        		Top = wy - parent.height()-12;
        	}
        	parent.css({
        		left:Left+'px',
        		top:Top+'px',
        	});
		});
		$(document).mouseup(function(e){
			$(document).unbind('mousemove');
		});
	});
}
/*-------所有弹窗居中---------*/
function center(){
	for(var i=0;i<$('.popup').length;i++){
		var w = $('.popup').eq(i).width();
		var h = $('.popup').eq(i).height();
		$('.popup').eq(i).css({
			'left':(wx-w)/2,
			'top':(wy-h)/2
		});
		dragPopup($('.popup').eq(i).find('h3'));
	}
}
/*-------弹窗居中不拖动---------*/
function singleCenter(){
	for(var i=0;i<$('.popup').length;i++){
		var w = $('.popup').eq(i).width();
		var h = $('.popup').eq(i).height();
		$('.popup').eq(i).css({
			'left':(wx-w)/2,
			'top':(wy-h)/2
		});
	}
}
/*--------------每一项导航条中的最后一个li的图片变成底部图片-----------*/
function changeTreeBg(){
	for(var i=0;i<$('.navarea .navpiece1').length;i++){
		$('.navarea .navpiece1').eq(i).children("li:last-child").find('img').attr('src','../../img/index/listBot.png');
	}
}
/*---------------------兼容所有浏览器 阻止事件冒泡----------------------------*/
function stopEvent(){
	var e = arguments.callee.caller.arguments[0]||event;
	if(e && e.stopPropagation){
		e.stopPropagation()
	}else if(window.event){
		window.event.cancelBubble = true;
	}
}
/************传入一个清空按钮的dom节点，然后清空同级输入框*************/
function cleanQuery(dom){
	dom.click(function(){
		dom.parent().find('input').not("input[type=button]").val(null);
		dom.parent().find('select').val(null);
	})
}

//=============================选择器开启关闭点击事件=====开始=======================
$(function(){
	//启动按钮，关闭弹窗事件
    cannel();
})
//启动按钮，关闭弹窗事件
cannel();


function existPermission(permission){
	for(var i = 0; i < permissions.length ; i++){
		if(permissions[i] == '')
			continue ;
		if(permissions[i].substring(0, permission.length) == permission){
			return true;
		}else if(permission.substring(0, permissions[i].length) == permissions[i]){
			return true;
		}
	}
	return false;
}


/*********选择用户窗口（单选）*********/
$(function(){
    $('#chooseUser .dept').tree({
	    url:'../../department/getFramework.do?getMs='+getMS(),
		lines:true,
		onDblClick:function(){		
			$('#chooseUser .popuparea .user').datagrid('reload');
		}
    });
    $('#chooseUser .queryForm input[name=query]').click(function(){
    	$('#chooseUser .popuparea .user').datagrid('reload');
    })
})
function chooseUser(){
	$('#chooseUser').css('display','block');
	$('#chooseUser .dept').tree('reload');
	$('#chooseUser .popuparea .user').datagrid({
    	url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
		title:'选择员工',
		pagination:true,
		pageSize:50,
	    method:"post",
	    columns:[[
			{field:'userName',title:'用户名',width:80},
			{field:'userId',title:'Id',width:80,hidden:true},
			{field:'departmentId',title:'Id',width:80,hidden:true},
			{field:'departmentName',title:'Id',width:80,hidden:true}
	    ]],
	   	singleSelect:true,
	   	toolbar:'#chooseUser .queryForm',
	   	queryParams:{
	   		userName:function(){
	   			return $('#chooseUser .queryForm input[name=peopleName]').val();
	   		},
	   		departmentUrl:function(){
	   			if($('#chooseUser .dept').tree('getSelected')){
	   				var url = $('#chooseUser .dept').tree('getSelected').id;
		   			return url;
	   			}else{
	   				return '';
	   			}
	   		},
	   		inviteFlag:'1'
	   	}
    });
    $('#chooseUser .popuparea .user').datagrid('reload');
    $('#chooseUser .popuparea .user').datagrid('getPager').pagination({
		showPageList:false,
		showRefresh:false,
		beforePageText:'',
		afterPageText:'',
		displayMsg:''
	});
}


/*********选择用户窗口（多选）*********/
$(function(){
    $('#chooseUsers .dept').tree({
	    url:'../../department/getFramework.do?getMs='+getMS(),
		lines:true,
		onDblClick:function(){		
			$('#chooseUsers .popuparea .user').datagrid('reload');
		}
    });
    $('#chooseUsers .queryForm input[name=query]').click(function(){
    	$('#chooseUsers .popuparea .user').datagrid('reload');
    })
})
function chooseUsers(){
	$('#chooseUsers').css('display','block');
	$('#chooseUsers .dept').tree('reload');
	$('#chooseUsers .popuparea .user').datagrid({
    	url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
		title:'选择员工',
		pagination:true,
		pageSize:50,
	    method:"post",
	    columns:[[
	        {field:'ck',checkbox:true},
			{field:'userName',title:'用户名',width:80},
			{field:'userId',title:'Id',width:80,hidden:true},
			{field:'departmentId',title:'Id',width:80,hidden:true},
			{field:'departmentName',title:'部门',width:80}
	    ]],
	   	toolbar:'#chooseUsers .queryForm',
	   	queryParams:{
	   		userName:function(){
	   			return $('#chooseUsers .queryForm input[name=peopleName]').val();
	   		},
	   		departmentName:function(){
	   			return $('#chooseUsers .queryForm input[name=departmentName]').val();
	   		},
	   		departmentUrl:function(){
	   			if($('#chooseUsers .dept').tree('getSelected')){
	   				var url = $('#chooseUsers .dept').tree('getSelected').id;
		   			return url;
	   			}else{
	   				return '';
	   			}
	   		},
	   		inviteFlag:'1'
	   	}
    });
    $('#chooseUsers .popuparea .user').datagrid('reload');
    $('#chooseUsers .popuparea .user').datagrid('getPager').pagination({
		showPageList:false,
		showRefresh:false,
		beforePageText:'',
		afterPageText:'of {pages}',
		displayMsg:''
	});
}

/*********选择部门窗口（单选）*********/
$(function(){
    $('#chooseDept .dept').tree({
	    url:'../../department/getFramework.do?getMs='+getMS(),
		lines:true
    });
//    $('#chooseDept .confirm').click(function(){
//    	$('#chooseDept').css('display','none');
//    	chooseDeptObj[0] = $('#chooseDept .dept').tree('getSelected');
//    	chooseDeptObj = null;
//    })
})

function chooseDept(){
	$('#chooseDept .dept').tree('reload');
	$('#chooseDept').css('display','block');
}

/*********选择部门窗口（多选）*********/
$(function(){
	
    $('#chooseDepts .dept').tree({
	    url:'../../department/getFramework.do?getMs='+getMS(),
		lines:true,
		checkbox:true,
		cascadeCheck:false
    });
//    $('#chooseDept .confirm').click(function(){
//    	$('#chooseDept').css('display','none');
//    	chooseDeptObj = $('#chooseDept .dept').tree('getChecked');
//		for(var i = 0 ; i < chooseDeptObj.length ; i++){
//			asd.push(chooseDeptObj[i]);
//		}
//    })
})

function chooseDepts(){
	$('#chooseDepts .dept').tree('reload');
	$('#chooseDepts').css('display','block');
}


/*********选择岗位窗口（单选）*********/
$(function(){
    $('#choosePost .queryForm input[name=query]').click(function(){
    	$('#choosePost .popuparea .post').datagrid('reload');
    })
//    $('#choosePost .confirm').click(function(){
//    	$('#choosePost').css('display','none');
//    	var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
//    	for(var i = 0 ; i<selectPost.length ; i++ ){
//    		choosePostObj.push(selectPost[i]);
//    	}
//    	choosePostObj = null;
//    })
})

function choosePost(){
	$('#choosePost').css('display','block');
	$('#choosePost .popuparea .post').datagrid({
		title:'选择岗位(单选)',
	    url:'../../post/selectPostList.do?getMs='+getMS(),
	    method:"post",
	    columns:[[
			{field:'postName',title:'岗位名',width:80},
			{field:'postId',title:'Id',width:80,hidden:true}
	    ]],
	   	singleSelect:true,
	   	toolbar:'#choosePost .queryForm',
	   	queryParams:{
	   		postName:function(){
	   			return $('#choosePost .queryForm input[name=postName]').val();
	   		},
	   	}
    });
}

/*********选择岗位窗口（单选）*********/
$(function(){
    $('#choosePosts .queryForm input[name=query]').click(function(){
    	$('#choosePosts .popuparea .post').datagrid('reload');
    })
//    $('#choosePosts .confirm').click(function(){
//    	$('#choosePosts').css('display','none');
//    	var selectPosts = $('#choosePosts .popuparea .post').datagrid('getSelections');
//    	for(var i = 0 ; i<selectPosts.length ; i++ ){
//    		choosePostObjs.push(selectPost[i]);
//    	}
//    	choosePostObjs = null;
//    })
})

function choosePosts(){
	$('#choosePosts').css('display','block');
	$('#choosePosts .popuparea .post').datagrid({
		title:'选择岗位(单选)',
	    url:'../../post/selectPostList.do?getMs='+getMS(),
	    method:"post",
	    columns:[[
			{field:'postName',title:'岗位名',width:80},
			{field:'postId',title:'Id',width:80,hidden:true}
	    ]],
	   	singleSelect:false,
	   	toolbar:'#choosePosts .queryForm',
	   	queryParams:{
	   		postName:function(){
	   			return $('#choosePosts .queryForm input[name=postName]').val();
	   		},
	   	}
    });
}



/*********选择角色窗口（单选）*********/

$(function(){
    $('#chooseRole .queryForm input[name=query]').click(function(){
    	$('#chooseRole .popuparea .role').datagrid('reload');
    })
//    $('#chooseRole .confirm').click(function(){
//    	$('#chooseRole').css('display','none');
//    	var selectRole = $('#chooseRole .popuparea .role').datagrid('getSelections');
//    	for(var i = 0 ; i<selectRole.length ; i++ ){
//    		chooseRoleObj.push(selectRole[i]);
//    	}
//    	chooseRoleObj = null;
//    })
})

function chooseRole(){
	$('#chooseRole').css('display','block');
	$('#chooseRole .popuparea .role').datagrid({
		title:'选择角色(单选)',
	    url:'../../role/getRoleList.do?getMs='+getMS(),
	    method:"post",
	    columns:[[
			{field:'roleName',title:'角色名',width:80},
			{field:'roleId',title:'Id',width:80,hidden:true}
	    ]],
	   	singleSelect:true,
	   	toolbar:'#chooseRole .queryForm',
	   	queryParams:{
	   		postName:function(){
	   			return $('#chooseRole .queryForm input[name=roleName]').val();
	   		},
	   	}
    });
}

/*********选择角色窗口（多选）*********/
$(function(){
    $('#chooseRoles .queryForm input[name=query]').click(function(){
    	$('#chooseRoles .popuparea .role').datagrid('reload');
    })
//    $('#chooseRoles .confirm').click(function(){
//    	$('#chooseRoles').css('display','none');
//    	var selectRoles = $('#chooseRoles .popuparea .role').datagrid('getSelections');
//    	for(var i = 0 ; i<selectRoles.length ; i++ ){
//    		chooseRolesObj.push(selectRoles[i]);
//    	}
//    	chooseRolesObj = null;
//    })
})

function chooseRoles(){
	$('#chooseRoles').css('display','block');
	$('#chooseRoles .popuparea .role').datagrid({
		title:'选择角色(多选)',
	    url:'../../role/getRoleList.do?getMs='+getMS(),
	    method:"post",
	    columns:[[
			{field:'roleName',title:'角色名',width:80},
			{field:'roleId',title:'Id',width:80,hidden:true}
	    ]],
	   	singleSelect:false,
	   	toolbar:'#chooseRoles .queryForm',
	   	queryParams:{
	   		postName:function(){
	   			return $('#chooseRoles .queryForm input[name=roleName]').val();
	   		},
	   	}
    });
}

/*********选择权限窗口（多选）*********/
var choosePowersObj = null;

$(function(){
//    $('#choosePowers .confirm').click(function(){
//    	$('#choosePowers').css('display','none');
//    	var selectPowers = $('#choosePowers .power').tree('getChecked');
//    	for(var i = 0 ; i < selectPowers.length ; i++){
//    		choosePowersObj.push(selectPowers[i]);
//    	}
//    	choosePowersObj = null;
//    })

    $('#choosePowers .power').tree({
	    url:'../../power/getFrameWork.do?getMs='+getMS(),
		lines:true,
		checkbox:true,
		cascadeCheck:true
	});
    
})

function choosePowers(){
	$('#choosePowers').css('display','block');
}
//获取毫秒数
function getMS(){
	var date = new Date();
	return date.getTime();
}