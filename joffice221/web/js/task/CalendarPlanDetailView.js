/**
 * 显示计划任务中的详细信息
 * @param {} planId
 */
var CalendarPlanDetailView=function(planId){
	var detailPanell = new Ext.Panel({
				autoHeight : true,
				autoWidth:true,
				border : false,
				autoLoad : {
					url : __ctxPath
							+ '/pages/task/calendarplandetail.jsp?planId=' + planId
				}
	});
	var win = new Ext.Window({
				title:'任务信息',
				iconCls:'menu-cal-plan',
				id : 'CalendarPlanDetailView',
				width : 560,
				height : 350,
				modal : true,
				autoScroll:true,
				layout : 'form',
				buttonAlign : 'center',
				items : [detailPanell],
				buttons : [{
							text : '关闭',
							iconCls : 'btn-cancel',
							handler : function() {
								win.close();
							}
						}]
	});
	
	$request({
		url:__ctxPath+'/task/getCalendarPlan.do?planId=' + planId,
		method:'post',
		success:function(resp,options){
			var result = Ext.util.JSON.decode(resp.responseText);
			var plan=result.data;
			if(plan.status=='0'){//尚未完成 
				win.addButton(new Ext.Button({
							text : '完成任务',
							iconCls : 'btn-save',
							handler : function() {
								new CalendarPlanFinishForm(planId);
							}
				}));
				win.doLayout();
			}
			win.show();
		},
		failure:function(response,options){
			win.show();
		}
	});

	
};