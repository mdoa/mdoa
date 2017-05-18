Ext.ns('WaitCheckConfView');
/**
 * @class WaitCheckConfView
 * @extends Ext.Panel
 * @description 待审核会议查询
 * @company 杭州梦德软件有限公司
 */
WaitCheckConfView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		WaitCheckConfView.superclass.constructor.call(this, {
					id : 'WaitCheckConfView',
					title : '待审批会议查询',
					iconCls : 'menu-waitCheckConf',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		this.searchPanel = new HT.SearchPanel({
					region : 'north',
					layout : 'form',
					colNums : 5,
					keys : [{
								key : Ext.EventObject.ENTER,
								fn : this.search,
								scope : this
							}, {
								key : Ext.EventObject.ESC,
								fn : this.reset,
								scope : this
							}],
					labelWidth : 70,
					items : [{
						fieldLabel : '会议室名称',
						xtype : 'textfield',
						name : 'Q_roomName_S_LK',
						maxLength : 156,
						width : 225
					},{
						fieldLabel : '会议室类型',
						xtype : 'combo',
						hiddenName : 'Q_roomId_L_EQ',
						valueField : 'roomId',
						displayField : 'roomName',
						mode : 'local',
						width : 225,
						editable : false,
						triggerAction : 'all',
						forceSelection : true,
						store : new Ext.data.SimpleStore({
							url : __ctxPath + '/admin/getBoardrooConference.do',
							autoLoad : true,
							fields : ['roomId', 'roomName']
						})
					},{
						fieldLabel : '会议时间',
						xtype : 'datefield',
						name : 'Q_startTime_D_GE',
						format : 'Y-m-d'
					},{
						fieldLabel : '至',
						xtype : 'datefield',
						name : 'Q_endTime_D_LE',
						format : 'Y-m-d',
						labelWidth : 15
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						scope : this,
						handler : this.search
					},{
						fieldLabel : '会议标题',
						xtype : 'textfield',
						name : 'Q_confTopic_S_LK',
						maxLength : 256,
						width : 225
					},{
						xtype : 'combo',
						name : 'Q_confProperty_S_LK',
						fieldLabel : '会议类型',
						valueField : 'typeId',
						displayField : 'typeName',
						mode : 'local',
						editable : false,
						width : 225,
						triggerAction : 'all',
						forceSelection : true,
						store : new Ext.data.SimpleStore({
							url : __ctxPath + '/admin/getTypeAllConference.do',
							autoLoad : true,
							fields : ['typeId', 'typeName']
						})
					},{
						fieldLabel : '会议内容',
						xtype : 'textfield',
						name : 'Q_confContent_S_LK',
						maxLength : 4000,
						width : 225
					},{
						xtype : 'button',
						text : '清空',
						iconCls : 'reset',
						scope : this,
						handler : this.reset
					}]
				});// end of the searchPanel
				
		//顶端栏目条
		this.topbar = new Ext.Toolbar({
			height : 30,
			bodyStyle : 'text-align:left',
			items : [ {
				iconCls : 'btn-del',
				text : '删除',
				xtype : 'button',
				handler : this.removeSelRs,
				scope : this
			} ]
		});
		
		// 待审批会议面板
		this.gridPanel = new HT.GridPanel({
			        id : 'waitCheckConfGrid',
					region : 'center',
					tbar : this.topbar,
					sort : [{field:"confId",direction:"DESC"}],
					// 使用RowActions
					rowActions : true,
					url : __ctxPath + "/admin/waitCheckConfConference.do",
					fields : [ {
						name : 'confId',
						type : 'int'
					}, 'confTopic', 'compereName', 'roomName', 'roomLocation', 'confContent',
						'attendUsersName', 'feeBudget', 'startTime', 'endTime', 'status' ],
					columns : [{
								header : 'confId',
								dataIndex : 'confId',
								hidden : true
							}, {
								header : '会议标题',
								dataIndex : 'confTopic'
							}, {
								header : '主持人',
								dataIndex : 'compereName'
							}, {
								header : '会议室名',
								dataIndex : 'roomName'
							}, {
								header : '会议地址',
								dataIndex : 'roomLocation'
							}, {
								header : '开始时间',
								dataIndex : 'startTime'
							},{
								header : '结束时间',
								dataIndex : 'endTime'
							}, new Ext.ux.grid.RowActions({
										header : '管理',
										width : 100,
										actions : [{
													iconCls : 'btn-del',
													qtip : '删除',
													style : 'margin:0 3px 0 3px',
													fn : function(rs){
														if(isGranted('_ConfApplyDel')){
															return true;
														}else{
															return false;
														}
													}
												},{
													iconCls : 'btn-apply',
													qtip : '审核',
													style : 'margin:0 3px 0 3px'
												},{
													iconCls : 'btn-showDetail',
													qtip : '查看',
													style : 'margin:0 3px 0 3px'
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
							})]
				});
		this.gridPanel.addListener({scope:this,'rowdblclick': this.rowClick});
	},// end of the initUIComponents
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	search : function() {
		$search({
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		var rec = grid.getStore().getAt(rowindex);
		this.showDetail.call(this, rec.data.confId);
		
	},
	// 按ID删除记录
	removeRs : function(record) {
		var dt = new Date();
		gridPanel = this.gridPanel;
		if(record.data.startTime<=dt.format('Y-m-d H:i:s')){
			$postDel({
				url : __ctxPath +'/admin/multiDelConference.do',
				ids : record.data.confId,
				grid : gridPanel
			});
		}else{
			Ext.MessageBox.show({
				title : '操作提示',
				msg : '对不起，该会议记录不能删除(未过期)，请原谅！',
				buttons : Ext.MessageBox.OK,
				icon : 'ext-mb-error'
			});
		}
	},
	// 把选中ID删除
	removeSelRs : function() {
		var gridPanel = this.gridPanel;
		var selectRecords = gridPanel.getSelectionModel().getSelections();
		if (selectRecords.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}
		var ids = Array();
		for ( var i = 0; i < selectRecords.length; i++) {
			ids.push(selectRecords[i].data.confId);
		}
		Ext.Msg.confirm('信息确认', '您确认要删除所选记录吗？', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : __ctxPath
							+ '/admin/multiDelConference.do',
					params : {
						ids : ids
					},
					method : 'POST',
					success : function(response, options) {
						Ext.ux.Toast.msg('操作信息', '成功删除该会议信息！');
						gridPanel.getStore().reload();
					},
					failure : function(response, options) {
						Ext.Msg.alert('操作信息', '操作出错，请联系管理员！');
					}
				});
			}
		});
		
	},
	// 查看详细信息
	showDetail : function(confId) {
		Ext.Ajax.request({
				url : __ctxPath + '/admin/allowViewConfPrivilege.do',
				params : {
					confId : confId
				},
				method : 'post',
				waitMsg : '数据正在提交，请稍候...',
				success : function(response, options) {
					var res = Ext.util.JSON.decode(response.responseText);
					if (res.success)
						new ConferenceDetailForm({
							confId : confId
						}).show();
					else
						Ext.MessageBox.show({
									title : '操作信息',
									msg : res.msg,
									buttons : Ext.MessageBox.OK,
									icon : 'ext-mb-error'
								});
				}
			});
	},
    //审核
	apply : function(record){
		var dt = new Date();
		if(record.data.startTime>dt.format('Y-m-d H:i:s')){ //判断会议是否过期
			new ConfApplyForm({
				confId : record.data.confId,
				confTopic : record.data.confTopic
			}).show();
		}else{
			Ext.MessageBox.show( {
				title : '操作信息',
				msg : '对不起，会议开始时间已失效，不能审核！',
				buttons : Ext.MessageBox.OK,
				icon : 'ext-mb-error'
			});
		}
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-apply':
				this.apply.call(this,record);
				break;
			case 'btn-del':
				this.removeRs.call(this,record);
				break;
			case 'btn-showDetail' :
				this.showDetail.call(this, record.data.confId);
				break;
			default :
				break;
		}
	}

});
