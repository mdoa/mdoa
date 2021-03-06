Ext.ns('ProcessRunView');
/**
 * 申请列表
 */
ProcessRunView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ProcessRunView.superclass.constructor.call(this, {
					id : 'ProcessRunView',
					title : '我的申请流程列表',
					iconCls : 'menu-flowMine',
					layout : 'border',
					region : 'center',
					autoScroll : true,
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	/**
	 * 初始化组件
	 */
	initUIComponents : function() {
		this.searchPanel = new HT.SearchPanel({
					region : 'north',
					height : 40,
					frame : false,
					border : false,
					layout : 'hbox',
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						margins : '0 4 4 4'
					},
					items : [{
								text : '请输入查询条件:'
							}, {
								text : '标题'
							}, {
								xtype : 'textfield',
								name : 'Q_subject_S_LK'
							}, {
								text : '时间 从'
							}, {
								xtype : 'datefield',
								name : 'Q_createtime_D_GT',
								format : 'Y-m-d'
							}, {
								text : ' 至 '
							}, {
								xtype : 'datefield',
								name : 'Q_createtime_D_LT',
								format : 'Y-m-d'
							}, {
								text : '状态'
							}, {
								xtype : 'combo',
								width : 80,
								hiddenName : 'Q_runStatus_SN_EQ',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '正在运行'], ['2', '结束']]
							}, {
								xtype : 'button',
								text : '查询',
								iconCls : 'search',
								scope : this,
								handler : this.search
							}]
				});
		// 建立DataGrid
		this.gridPanel = new HT.GridPanel({
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			region : 'center',
			sort : [{
						field : 'runId',
						direction : 'DESC'
					}],
			rowActions : true,
			url : __ctxPath + '/flow/listProcessRun.do',
			tbar : new Ext.Toolbar(),
			fields : [{
						name : 'runId',
						type : 'int'
					}, 'subject', 'createtime', 'defId', 'piId', 'runStatus'],
			columns : [{
						header : 'runId',
						dataIndex : 'runId',
						hidden : true
					}, {
						header : '标题',
						dataIndex : 'subject'
					}, {
						header : '时间',
						sortable : false,
						dataIndex : 'createtime',
						width : 60
					}, {
						header : '流程状态',
						dataIndex : 'runStatus',
						renderer : this.runStatusControl
					}, new Ext.ux.grid.RowActions({
								header : '管理',
								width : 50,
								actions : [{
									iconCls : 'btn-flowView',
									qtip : '审批明细',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										if (record.data.piId != null
												&& record.data.piId != ''
												&& record.data.piId != undefined)
											return true;
										return false;
									}
								}, {
									iconCls : 'btn-edit',
									qtip : '编辑',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										if (record.data.runStatus == 0)
											return true;
										return false;
									}
								}, {
									iconCls : 'btn-del',
									qtip : '删除',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										if (record.data.runStatus == 0)
											return true;
										return false;
									}
								}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})],
			listeners : {
				scope : this,
				'rowdblclick' : this.rowClick
			}
		});
	},// end of the initComponents()
	/**
	 * 列表双击处理
	 */
	rowClick : function(gridPanel, rowindex, e) {
		gridPanel.getSelectionModel().each(function(rec) {
			this.detail(rec.data.runId, rec.data.defId, rec.data.piId,
					rec.data.subject);
		}, this);
	},
	/**
	 * runStatus字段列控制
	 * 
	 * @param {}
	 *            val
	 * @return {String}
	 */
	runStatusControl : function(val) {
		if (val == 0) {
			return '<font color="red">草稿</font>';
		} else if (val == 1) {
			return '<font color="green">正在运行</font>';
		} else if (val == 2) {
			return '<font color="gray">结束</font>';
		}
	},
	/**
	 * 搜索
	 */
	search : function() {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	/**
	 * 显示明细
	 * 
	 * @param {}
	 *            runId
	 * @param {}
	 *            name
	 */
	detail : function(runId, defId, piId, name) {
		var contentPanel = App.getContentPanel();
		var detailView = contentPanel.getItem('ProcessRunDetail' + runId);

		if (detailView == null) {
			detailView = new ProcessRunDetail({
						runId : runId,
						defId : defId,
						piId : piId,
						name : name
					});
			contentPanel.add(detailView);
		}
		contentPanel.activate(detailView);
	},
	/**
	 * 删除单个记录
	 */
	remove : function(id) {
		$postDel({
					url : __ctxPath + '/flow/multiDelProcessRun.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	/**
	 * 编辑
	 */
	edit : function(runId, name) {
		var contentPanel = App.getContentPanel();
		var startForm = contentPanel.getItem('ProcessRunStart' + runId);
		if (startForm == null) {
			startForm = new ProcessRunStart(null, name, runId);
			contentPanel.add(startForm);
		}
		contentPanel.activate(startForm);
	},
	/**
	 * 行的Action
	 */
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-flowView' :
				this.detail.call(this, record.data.runId, record.data.defId,
						record.data.piId, record.data.subject);
				break;
			case 'btn-edit' :
				this.edit.call(this, record.data.runId, record.data.subject);
				break;
			case 'btn-del' :
				this.remove.call(this, record.data.runId);
				break;
			default :
				break;
		}
	}
});