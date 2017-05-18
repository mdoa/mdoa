$(function(){
	/*设置页面高100%*/
	$('#goodsVariationForm').css('height',$('#loadarea').height()-31+'px');
	/*设置list的宽度*/
	$('#goodsVariationForm .listForm').css('width',$('#loadarea').width()-202+'px');
	$('#goodsVariationForm .listForm').css('height',$('#loadarea').height()-31+'px');
	/*设置chart的宽度*/
	$('#goodsVariationForm .chartArea').css({
		'width':$('#loadarea').width()+'px',
		'height':$('#loadarea').height()-31+'px'
	});
	/*设置表格的高度*/
	$('#goodsVariationFormdg').css('height',$('#loadarea').height()-61+'px');
	$(window).resize(function() {
		$('#goodsVariationForm').css('height',$('#loadarea').height()-31+'px');
		$('#goodsVariationForm .listForm').css('width',$('#loadarea').width()-202+'px');
	});	
	/*网格数据加载*/
	$('#goodsVariationFormdg').datagrid({
		//url:'../../reportForms/findDynamicBalance.do?getMs='+getMS(),
		pagination:true,
		toolbar:'#goodsVariationForm .queryForm',
		onLoadSuccess:function(data){
			var goodsName = $.trim($('#goodsVariationForm .queryForm .goodsName').val());
			var goodsSize = $.trim($('#goodsVariationForm .queryForm .goodsSize').val());
			var startTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceStartTime]').val());
			var endTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceEndTime]').val());
			var urls = goodsTypeIds;
			var goodsTypeUrls = "";
			for(var i=0;i<urls.length;i++){
				if(i == urls.length-1){
					goodsTypeUrls += "'"+urls[i]+"'";
				}else{
					goodsTypeUrls = goodsTypeUrls + "'" + urls[i] + "',"
				}
			}
			goodsTypeUrls = $.trim(goodsTypeUrls);
			if(startTime == '' || endTime == ''){
				windowControl("请确认已选择结算起止时间");
			}else if(startTime.replace('-','/')>endTime.replace('-','/')){
				windowControl("结算开始时间应不大于结束时间");
			}else{
				var info = {
						goodsName:goodsName,
						goodsSize:goodsSize,
						startTime:startTime,
						endTime:endTime,
						goodsTypeUrls:goodsTypeUrls
					};
			}
			$.ajax({
				url:'../../reportForms/findSumDynamicBalance.do?getMs='+getMS(),
				data:info,
				success:function(data){
					adjustsumBar('goodsVariationForm');
					addsumBerVariationForm('goodsVariationForm',data);
				},
				error:function(err){
				}
			})
		},
		columns:[[
	       {
	    	   field:"goodsName",
	    	   title:"物品名称",
	    	   fitColumns:true,
	    	   resizable:true,
	    	   align:"center",
	    	   width:100
	       },
	       {
	    		field:"goodsSize",
	    		title:"物品规格",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:100
	    	},
	    	{
	    		field:"movingAverPrice",
	    		title:"移动平均价",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"lastBalanceNumber",
	    		title:"上期余量",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"lastBalanceAmount",
	    		title:"上期余额",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"currentOutNumber",
	    		title:"本期出库数量",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"currentOutAmount",
	    		title:"本期出库金额",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"currentInNumber",
	    		title:"本期入库数量",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"currentInAmount",
	    		title:"本期入库金额",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"weightedAverPrice ",
	    		title:"加权平均价",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"currentBalanceNumber",
	    		title:"本期余量",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"currentBalanceAmount",
	    		title:"本期余额",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	}
	    ]]
	});
	/*--------------------------------tree------------------------------*/
	var goodsTypeIds=[];//存放多个url的数组
	$('#goodsVariationFormtg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
       // checkbox : true,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	$("#goodsVariationForm .goodsTypeUrl").val(node.id);
        },
        onCollapse:function(node){
        	$("#goodsVariationForm .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onCollapse"},
    			url:"../../treeController/updateTreeState?getMs="+getMS(),
    			method:"post"
    		})
        },
        onExpand:function(node){
        	$("#goodsVariationForm .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onExpand"},
    			url:"../../treeController/updateTreeState?getMs="+getMS(),
    			method:"post"
    		})
        },
        onDrop: function(target,source,point){
        	var targetUrl = $('#goodsVariationFormtg').tree('getNode', target).id;
        	var targetName = $('#goodsVariationFormtg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
    			url:"../../treeController/dragRepertoryType?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#goodsVariationFormtg').tree('reload');
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
       /* onContextMenu : function(e,node){
        	e.preventDefault();
        	var goodsTypeUrl = $('#goodsVariationForm .goodsTypeUrl').val(node.id);
        	$('#goodsVariationFormtg').tree('select', node.target);
    		$('#ggoodsVariationFormmm').menu('show', {
    			left: e.pageX,
    			top: e.pageY
    		});
		}*/
    });
	/*查询*/
	$('#goodsVariationForm .queryForm .query').click(function(){
		var goodsName = $.trim($('#goodsVariationForm .queryForm .goodsName').val());
		var goodsSize = $.trim($('#goodsVariationForm .queryForm .goodsSize').val());
		var startTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceStartTime]').val());
		var endTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceEndTime]').val());
		var urls = goodsTypeIds;
		var goodsTypeUrls = "";
		for(var i=0;i<urls.length;i++){
			if(i == urls.length-1){
				goodsTypeUrls += "'"+urls[i]+"'";
			}else{
				goodsTypeUrls = goodsTypeUrls + "'" + urls[i] + "',"
			}
		}
		goodsTypeUrls = $.trim(goodsTypeUrls);
		if(startTime == '' || endTime == ''){
			windowControl("请确认已选择结算起止时间");
		}else if(startTime.replace('-','/')>endTime.replace('-','/')){
			windowControl("结算开始时间应不大于结束时间");
		}else{
			var info = {
					goodsName:goodsName,
					goodsSize:goodsSize,
					startTime:startTime,
					endTime:endTime,
					goodsTypeUrls:goodsTypeUrls
				};
			$('#goodsVariationFormdg').datagrid({
				url:'../../reportForms/findDynamicBalance.do?getMs='+getMS(),
				queryParams:info
			})
		}
	});
});
/*--------汇总---------*/
function addsumBerVariationForm(id,data){
	$('#'+id).find('.sumBar').css({
		'width':$('#'+id).find('.datagrid-header-inner:eq(1) .datagrid-htable').width()+'px',
	});
	var node = $('#goodsVariationFormtg').tree('getSelected');
	data = $.parseJSON(data);
	var str = '';
	str +='<td style="width:100px">物品类别：</td>';
	str +='<td style="width:100px">'+node.text+'</td>';
	str +='<td style="width:100px">上期余量：</td>';
	str +='<td style="width:100px">'+data.lastBalanceNumber+'</td>';
	str +='<td style="width:100px">上期余额：</td>';
	str +='<td style="width:100px">'+data.lastBalanceAmount+'</td>';
	str +='<td style="width:100px">本期出库数量：</td>';
	str +='<td style="width:100px">'+data.currentOutNumber+'</td>';
	str +='<td style="width:100px">本期出库金额：</td>';
	str +='<td style="width:100px">'+data.currentOutAmount+'</td>';
	str +='<td style="width:100px">本期入库数量：</td>';
	str +='<td style="width:100px">'+data.currentInNumber+'</td>';
	str +='<td style="width:100px">本期入库金额：</td>';
	str +='<td style="width:100px">'+data.currentInAmount+'</td>';
	str +='<td style="width:100px">本期余量：</td>';
	str +='<td style="width:100px">'+data.currentBalanceNumber+'</td>';
	str +='<td style="width:100px">本期余额：</td>';
	str +='<td style="width:100px">'+data.currentBalanceAmount+'</td>';
	str += '</tr></table>';
	$('#'+id).find('.sumBar').html(str);
}