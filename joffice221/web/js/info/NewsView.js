/**
 * @author YHZ
 * @class NewsView
 * @extends Ext.Panel
 * @description 新闻管理
 * @company 杭州梦德软件有限公司
 * @createtime 2011-8-19AM
 */
NewsView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				NewsView.superclass.constructor.call(this, {
							id : 'NewsView',
							title : '新闻管理',
							region : 'center',
							iconCls : 'menu-news',
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
							labelWidth : 60,
							items : [{
										fieldLabel : '所属栏目',
										name : 'Q_section.sectionName_S_LK',
										xtype : 'textfield',
										maxLength : 125,
										width : 220
									}, {
										fieldLabel : '创建时间',
										name : 'Q_createtime_D_GE',
										xtype : 'datefield',
										format : 'Y-m-d'
									}, {
										fieldLabel : '至',
										name : 'Q_createtime_D_LE',
										xtype : 'datefield',
										format : 'Y-m-d',
										labelWidth : 27
									}, {
										fieldLabel : '作者',
										name : 'Q_author_S_LK',
										xtype : 'textfield',
										maxLength : 125,
										width : 220
									}, {
										xtype : 'button',
										text : '查询',
										iconCls : 'search',
										scope : this,
										handler : this.search
									}, {
										fieldLabel : '新闻标题',
										name : 'Q_subject_S_LK',
										xtype : 'textfield',
										maxLength : 125,
										width : 220
									}, {
										fieldLabel : '状态',
										hiddenName : 'Q_status_SN_EQ',
										xtype : 'combo',
										mode : 'local',
										triggerAction : 'all',
										editable : false,
										triggerAction : 'all',
										forceSelection : true,
										width : 225,
										store : [['', '全部'], ['0', '禁用'],
												['1', '激活']]
									}, {
										fieldLabel : '发布人',
										name : 'Q_issuer_S_LK',
										xtype : 'textfield',
										maxLength : 125,
										width : 220
									}, {
										xtype : 'button',
										text : '清空',
										iconCls : 'reset',
										scope : this,
										handler : this.reset
									}]
						});

				// 顶端栏目条
				this.topbar = new Ext.Toolbar({
							items : [{
										iconCls : 'btn-add',
										text : '添加新闻',
										xtype : 'button',
										scope : this,
										handler : this.createRs,
										hidden : !isGranted('_NewsAdd')
									}, '-', {
										iconCls : 'btn-del',
										text : '删除新闻',
										xtype : 'button',
										scope : this,
										handler : this.removeSelRs,
										hidden : !isGranted('_NewsDel')
									}]
						});

				// 新闻管理列表
				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					sort : [{field:"newsId",direction:"DESC"}],
					// 使用RowActions
					rowActions : true,
					url : __ctxPath + "/info/listNews.do",
					baseParams : {
						'Q_isNotice_SN_EQ' : 0
					},
					fields : [{
								name : 'newsId',
								type : 'int'
							}, 'sectionId', 'subjectIcon', 'subject', 'author',
							'createtime', 'expTime', 'replyCounts',
							'viewCounts', 'issuer', 'content', 'updateTime',
							'status', 'isDeskImage', 'isNotice', 'sn',
							'section'],
					columns : [{
								header : 'newsId',
								dataIndex : 'newsId',
								hidden : true
							}, {
								header : '所在栏目',
								dataIndex : 'section',
								renderer : function(value) {
									return value.sectionName;
								}
							}, {
								header : '新闻标题',
								dataIndex : 'subject'
							}, {
								header : '作者',
								dataIndex : 'author'
							}, {
								header : '发布人',
								dataIndex : 'issuer'
							}, {
								header : '创建时间',
								dataIndex : 'createtime',
								renderer : function(value) {
									if (value != null) {
										return value.substring(0, 10);
									}
								}
							}, {
								header : '新闻状态',
								dataIndex : 'status',
								renderer : function(value) {
									if (value != null && value == 0) {
										return '<font color="red">禁用</font>';
									} else if (value == 1) {
										return '<font color="green">激活</font>';
									}
								}
							}, new Ext.ux.grid.RowActions({
										header : '管理',
										width : 100,
										actions : [{
													iconCls : 'btn-del',
													qtip : '删除',
													style : 'margin:0 3px 0 3px',
													fn : function(rs) {
														if (isGranted('_NewsDel')) {
															return true;
														} else {
															return false;
														}
													}
												}, {
													iconCls : 'btn-edit',
													qtip : '编辑',
													style : 'margin:0 3px 0 3px',
													fn : function(rs) {
														if (isGranted('_NewsEdit')) {
															return true;
														} else {
															return false;
														}
													}
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});

				this.gridPanel.addListener({
							scope : this,
							'rowdblclick' : this.rowClick
						});

			},// end of the initComponents()
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
				this.editRs.call(this, rec);
			},
			// 创建记录
			createRs : function() {
				new NewsForm({
							scope : this,
							callback : this.reloadType
						}).show();
			},
			// 刷新gridPanel
			reloadType : function() {
				this.gridPanel.getStore().reload();
			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath + '/info/multiDelNews.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath + '/info/multiDelNews.do',
							grid : this.gridPanel,
							idName : 'newsId'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				new NewsForm({
							newsId : record.data.newsId,
							scope : this,
							callback : this.reloadType
						}).show();
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.newsId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
