$(function(){
	/*设置页面高100%*/
	$('#repertoryout').css('height',$('#loadarea').height()-31+'px');
	/*设置list的宽度*/
	$('#repertoryout .listForm').css('width',$('#loadarea').width()-202+'px');
	/*设置表格的高度*/
	$('#repertoryoutdg').css('height',$('#repertoryout .listForm').height()-31+'px');
	$(window).resize(function() {
		$('#repertoryout').css('height',$('#loadarea').height()-31+'px');
		$('#repertoryout .listForm').css('width',$('#loadarea').width()-202+'px');
	});
	/*表格数据的加载*/
	$('#repertoryoutdg').datagrid({
		//url:'../../repertory/selectGoodsOutRecord.do?getMs='+getMS(),
		onLoadSuccess:function(data){
			$.ajax({
				url:'../../repertory/findSumInRecord.do?getMs='+getMS(),
				data:{goodsTypeUrl:$("#repertoryout .goodsTypeUrl").val()},
				success:function(data){
					adjustsumBar('repertoryout');
					addsumBarIn('repertoryout',data);
				},
				error:function(err){
				}
			})
		},
		columns:[[
 	        {checkbox:true},
 	        {field:'goodsName',title:'物品名称',align:'center',width:100},
	        {field:'goodsSize',title:'物品规格',align:'center',width:100},
	        {field:'unit',title:'单位',align:'center',width:50},
	        {field:'goodsPositionName',title:'仓位',align:'center',width:100},
	        {field:'outNumber',title:'领用数量',align:'center',width:100},
			{field:'taxAmount',title:'无税领用金额(元)',align:'center',width:100},
			{field:'getUserName',title:'领用人',align:'center',width:100},
			{field:'getDepartmentName',title:'领用的部门',align:'center',width:80},
			{field:'useType',title:'物品用途',align:'center',width:100,
				formatter:function(value,row,index){
					return getValueFromKey('use_type',value);
			}},
			{field:'outTimeStr',title:'出库时间',align:'center',width:140},
			{field:'record',title:'备注',align:'center',width:140},
			{field:'_op',title:'操作',width:100,align:'center',
				formatter:function(value,row,index){
					var id = "'"+row.outRecordId+"'";
					return '<span class="small-button edit" title="修改出库记录" onclick="repertoryoutupDate('+id+')"></span>'
						+'<span class="small-button delete" title="删除出库记录" onclick="repertoryoutDel('+id+')" delId="'+id+'"></span>';
			}}
	    ]],
	    toolbar:'#repertoryout .queryForm',
	    pagination:true
	});
	/*条件查询*/
	$('#repertoryout .query').click(function(){
		var goodsName = $.trim($('#repertoryout .queryForm .goodsName').val());
		var goodsSize = $.trim($('#repertoryout .queryForm .goodsSize').val());
		var useType = ($('#repertoryout .queryForm select[name=useType]').val());
		var beginOutNumber = $.trim($('#repertoryout .queryForm .goodsNumSm').val());
		var outNumber = $.trim($('#repertoryout .queryForm .goodsNumBg').val());
		var goodsPositionName = $.trim($('#repertoryout .queryForm .goodsPosition').val());
		var getUserName = $.trim($('#repertoryout .queryForm .getUserName').val());
		var getDepartmentId = $('#repertoryout .queryForm .departmentName').val();
		//var getDepartmentName = $('#repertoryout .listForm .departmentName').text();
		var repertoryId =$('#repertoryout .queryForm .repertoryName').val();
		var beginTime = $.trim($('#repertoryout .queryForm .startTime').val());
		var endTime = $.trim($('#repertoryout .queryForm .endTime').val());
		var goodsTypeUrl = $("#repertoryout .goodsTypeUrl").val();
		var dataInfo = {
				goodsName:goodsName,
				goodsSize:goodsSize,
				useType:useType,
				beginNumber:beginOutNumber,
				endNumber:outNumber,
				goodsPositionName:goodsPositionName,
				getUserName:getUserName,
				getDepartmentId:getDepartmentId,
				repertoryId:repertoryId,
				beginTime:beginTime,
				endTime:endTime,
				goodsTypeUrl:goodsTypeUrl||'0',
			};
		$('#repertoryoutdg').datagrid({
			url:"../../repertory/selectGoodsOutRecord?getMs="+getMS(),
			queryParams:dataInfo
		});
	});
	/*修改出库明细*/
	$('#repertoryout .popups .update .confirm').click(function (){
		var outRecordId = $('#repertoryout .update .repertoryName').attr('outRecordId');
		var repertoryName = $.trim($('#repertoryout .update .repertoryName').val());
		var repertoryId = $('#repertoryout .update .repertoryName').attr('repertoryId');
		var goodsPositionId = $('#repertoryout .update .goodsPositionName').attr('goodsPositionId');
		var goodsPositionName = $.trim($('#repertoryout .update .goodsPositionName').val());
		var getUserName = $.trim($('#repertoryout .update .getUserName').val());
		var getDepartmentName = $('#repertoryout .update .getDepartmentName option:selected').text();
		var getDepartmentId = $('#repertoryout .update .getDepartmentName option:selected').val();
		var outNumber = $.trim($('#repertoryout .update .outNumber').val());
		var taxAmount = $.trim($('#repertoryout .update .taxAmount').val());
		var useType = $.trim($('#repertoryout .update .useType option:selected').val());
		alert(useType);
		var record = $.trim($('#repertoryout .update .record').val());
		var goodsId = $.trim($('#repertoryout .update .goodsId').val());
		if(getUserName == null||getUserName == ''){
			windowControl('领取人不能为空');
			return false;
		}else if(outNumber == null||outNumber == ''){
			windowControl('领取数量不能为空');
			return false;
		}/*else if(useType == null||useType == ''){
			windowControl('领取用途不能为空');
			return false;
		}*/else if(record == null||record == ''){
			windowControl('备注不能为空');
			return false;
		}else{
			var info = {
				outRecordId:outRecordId,
				outNumber:outNumber,
				goodsId:goodsId,
				repertoryId:repertoryId,
				repertoryName:repertoryName,
				getDepartmentId:getDepartmentId,
				getDepartmentName:getDepartmentName,
				goodsPositionName:goodsPositionName,
				goodsPositionId:goodsPositionId,
				getUserName:getUserName,
				taxAmount:taxAmount,
				useType:useType,
				record:record,
			}
			$.ajax({
				data:info,
				url:'../../repertory/editGoodsOutRecord.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data==500){
						windowControl('服务器异常');
						
					}else if(data==400){
						windowControl('修改出库失败');
					}else{
						windowControl('修改出库成功');
						$('#repertoryout .popups .update').css('display','none');
						$('#repertoryout .popups .update .popuparea input').val('');
						$('#repertoryout .popups .update .popuparea textarea').val('');
						$('#repertoryoutdg').datagrid("reload");
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
	/*刷新*/
	$('#repertoryout .refresh').click(function(){
		$('#repertoryoutdg').datagrid({
			url:"../../repertory/selectGoodsOutRecord?getMs="+getMS(),
		});
		$('#repertoryout .queryForm input').val('');
		$('#repertoryout .query').val('查询');
		$('#repertoryout .queryForm select option:eq(0)').attr('selected',true);
	});
	/*批量删除*/
	$('#repertoryout .batchRemove').click(function(){
		var selRow = $('#repertoryoutdg').datagrid("getSelections");//返回选中多行 
		if(selRow.length == 0){
			windowControl('请至少选择一行数据!');
			return false;
		}
		var ids = [];
		for (var i = 0;i < selRow.length;i++){
			var id = $('#repertoryout .delete').eq(i).attr('delId');
			ids.push(id);
		}
		repertoryoutDel(ids);
	});
	/*删除弹窗*/
	$('#repertoryout .popups .del .confirm').click(function(){
		var outRecordId = $('#repertoryout .popups .del').attr('delId');
		$.ajax({
			data:{json:dataInfo},
			url:'../../repertory/deleteGoodsOutRecord.do?getMs='+getMS(),
			type:'post',
			success:function(data){
				$('#repertoryoutdg').datagrid("reload");
				dataInfo = [];
				$('#repertoryout .popups .del').css('display','none');
			},
			error:function(err){
				windowControl(err.status);
			}
		});
	});
	/*--------------------------------tree------------------------------*/
	var goodsTypeIds=[];
	$('#repertoryouttg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : false,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	$("#repertoryout .goodsTypeUrl").val(node.id);
        	/*var goodsTypeUrl = node.id;
        	$('#repertoryoutdg').datagrid({
        		url:'../../repertory/selectGoodsOutRecord.do?getMs='+getMS(),
        		queryParams:{goodsTypeUrl:goodsTypeUrl},
        	});*/
        },
        onCollapse:function(node){
        	$("#repertoryout .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onCollapse"},
    			url:"../../treeController/updateTreeState?getMs="+getMS(),
    			method:"post"
    		})
        },
        onExpand:function(node){
        	$("#repertoryout .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onExpand"},
    			url:"../../treeController/updateTreeState?getMs="+getMS(),
    			method:"post"
    		})
        },
        onDrop: function(target,source,point){
        	var targetUrl = $('#repertoryouttg').tree('getNode', target).id;
        	var targetName = $('#repertoryouttg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
    			url:"../../treeController/dragRepertoryType?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#repertoryouttg').tree('reload');
    			}
    		})
        },
        onCheck: function(node,checked){
        	if(checked == true){
        		goodsTypeIds.push(node.id);
        	}else if(checked == false){
        		for(var i=0;i<goodsTypeIds.length;i++){
        			if(goodsTypeIds[i] == node.id){
        				goodsTypeIds.splice(i,1);
        			}
        		}
        	}
        },
      /*  onContextMenu : function(e,node){
        	e.preventDefault();
        	var goodsTypeUrl = $('#repertoryout .goodsTypeUrl').val(node.id);
        	$('#repertoryouttg').tree('select', node.target);
    		$('#repertoryoutmm').menu('show', {
    			left: e.pageX,
    			top: e.pageY
    		});
		}*/
    });
	//显示隐藏汇总bar
	$('#repertoryout .controlSumBar').click(function(){
		if($(this).val() == '隐藏'){
			$('#repertoryout .sumBar').animate({
				'bottom':'-=30px',
				'opacity':0,
			},500,function(){
				$('#repertoryout .controlSumBar').val('显示');
			});
		}else{
			$('#repertoryout .sumBar').animate({
				'bottom':'+=30px',
				'opacity':1,
			},500,function(){
				$('#repertoryout .controlSumBar').val('隐藏');
			});
		}
	});
});
$('#repertoryout .update .useType').html(getDataBySelectKeyNo("use_type"));
$('#repertoryout .queryForm select[name=useType]').html(getDataBySelectKeyNo("use_type"));
/*************************下拉框选择部门信息********************************/
$.ajax({
	url:'../../repertory/selectGetDepartment.do?getMs='+getMS(),
	type:'post',
	success:function(data){
		var str = "<option value=''></option>";
		var data = eval('(' + data + ')'); 
		for(var i=0;i<data.length;i++){
			str += "<option class='departmentName' value=" + data[i].departmentId + ">" + data[i].departmentName + "</option>";  
		}
	$('#repertoryout .listForm .departmentName').html(str);
	},
	error:function(error){
		windowControl(error.status);
	}
})
/*************************下拉框选择仓库信息********************************/
$.ajax({
	url:'../../repertory/selectRepertoryType.do?getMs='+getMS(),
	type:'post',
	success:function(data){
		var str = "<option value=''></option>";
		var data = eval('(' + data + ')'); 
		for(var i=0;i<data.length;i++){
			str += "<option class='repertoryName' value=" + data[i].repertoryId + ">" + data[i].repertoryName + "</option>";  
		}
	$('#repertoryout .listForm .repertoryName').html(str);
	},
	error:function(error){
		windowControl(error.status);
	}
})
/*---------------------------------tree函数-----------------------------------*/
/*function add(){
	$('#repertoryout .addWindow').css('display','block');
}
function remove(){
	$('#repertoryout .removeWindow').css('display','block');
}
function edit(){
	$('#repertoryout .editWindow').css('display','block');
}*/
/*加载部门*/
$.ajax({
	data:{},
	url:'../../repertory/selectGetDepartment.do?getMs='+getMS(),
	type:'post',
	success:function(data){
		data = $.parseJSON(data);
		var str = '<option></option>';
		for(var i = 0;i<data.length;i++){
			str +='<option departmentId="'+data[i].departmentId+'">'+data[i].departmentName+'</option>'
		}
		$('#repertoryout .update .getDepartmentName').append(str);
	},
	error:function(err){
		windowControl(err.status);
	}
});
var dataInfo = []; //定义一个批量删除的数组接受id
/*----------操作函数----------*/
/*修改出库记录*/
function repertoryoutupDate(id){
	$('#repertoryout .popups .update').css('display','block');
	$.ajax({
		data:{},
		url:'../../repertory/selectGoodsOutRecord.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var data = $.parseJSON(data);
			for(var i=0;i<data.rows.length;i++){
				if(data.rows[i].outRecordId == id){
					$('#repertoryout .update .repertoryName').attr('outRecordId',id);
					$('#repertoryout .update .repertoryName').val(data.rows[i].repertoryName);
					$('#repertoryout .update .goodsPositionName').attr('goodsPositionId',data.rows[i].goodsPositionId);
					$('#repertoryout .update .goodsPositionName').val(data.rows[i].goodsPositionName);
					$('#repertoryout .update .getUserName').val(data.rows[i].getUserName);
					$('#repertoryout .update .outNumber').val(data.rows[i].outNumber);
					$('#repertoryout .update .goodsId').val(data.rows[i].goodsId);
					$('#repertoryout .update .taxAmount').val(data.rows[i].taxAmount);
					$('#repertoryout .update .taxRate').val(data.rows[i].taxRate);
					$('#repertoryout .update .record').val(data.rows[i].record);
					var department = $('#repertoryout .update .getDepartmentName');
					var name = data.rows[i].getDepartmentName;
					if(data.rows[i].getDepartmentName){
						for(var i=0;i < department.find('option').length;i++){
							if(department.find('option').eq(i).val() == name){
								department.find('option').eq(i).attr('selected','true');
								return false;
							}
						}
						return false;
					}
					return false;
				}
			}
		},
		error:function(err){
			windowControl(err.status);
		}
	});
}
/*删除出库记录*/
function repertoryoutDel(id){
	$('#repertoryout .popups .del').css('display','block');
	if(typeof(id) == "object"){
		$('#repertoryout .popups .del h3').text('批量删除提示');
		$('#repertoryout .popups .del .delarea').text('确定要批量删除所选的信息吗？');
		for(var i = 0;i < id.length ;i++){
			var info = {outRecordId:id[i]};
			dataInfo.push(info);
		}
	}else{
		$('#repertoryout .popups .del h3').text('删除出库明细信息');
		$('#repertoryout .popups .del .delarea').text('确定要删除这条出库明细信息吗？');
		var info = {outRecordId:id};
		dataInfo.push(info);
	}
	dataInfo = JSON.stringify(dataInfo);
}
/*------汇总--------*/
function addsumBarInOut(id,data){
	$('#'+id).find('.sumBar').css({
		'width':$('#'+id).find('.datagrid-header-inner:eq(1) .datagrid-htable').width()+'px',
	});
	var node = $('#repertoryouttg').tree('getSelected');
	var str = '<table><tr>';
	data = $.parseJSON(data);
	str +='<td style="width:100px">物品类别：</td>';
	str +='<td style="width:100px">'+node.text+'</td>';
	str +='<td style="width:100px">入库数量：</td>';
	str +='<td style="width:100px">'+data.inTotalNumber+'</td>';
	str +='<td style="width:100px">入库金额(无税)：</td>';
	str +='<td style="width:100px">'+data.inTotalPretaxAmount+'</td>';
	str +='<td style="width:100px">入库金额(税后)：</td>';
	str +='<td style="width:100px">'+data.inTotalTaxAmount+'</td>';
	str +='<td style="width:100px">出库数量：</td>';
	str +='<td style="width:100px">'+data.outTotalNumber+'</td>';
	str +='<td style="width:100px">出库金额：</td>';
	str +='<td style="width:100px">'+data.outTotalTaxAmount+'</td>';
	str += '</tr></table>';
	$('#'+id).find('.sumBar').html(str);
}