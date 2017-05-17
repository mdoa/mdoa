/**
 * @author:
 * @class SelectFileWindow
 * @extends Ext.Panel
 * @description [RollFile]管理
 * @company 杭州梦德软件有限公司
 * @createtime:
 */
SelectFileWindow = Ext
		.extend(
				Ext.Window,
				{
					viewConfig : [],
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 初始化组件
						this.initUIComponents();
						// 调用父类构造
						SelectFileWindow.superclass.constructor.call(this, {
							id : 'SelectFileWindow',
							title : '文件',
							region : 'center',
							layout : 'border',
							modal : true,
							width : 800,
							height : 600,
							buttonAlign : 'center',
							buttons : [ {
								text : '选择',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : '重置',
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}, {
								text : '关闭',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							} ],
							items : [ this.searchPanel, this.leftPanel,
									this.gridPanel ]

						});
					},// end of constructor
					// 初始化组件
					initUIComponents : function() {
						// 初始化搜索条件Panel
						this.searchPanel = new HT.SearchPanel(
								{
									id : 'SelectFileWindowSearchPanel',
									layout : 'form',
									region : 'north',
									colNums : 3,
									items : [
											{
												fieldLabel : '全宗号',
												hiddenName : 'Q_archRoll.archFondId_L_EQ',
												flex : 1,
												xtype : 'combo',
												mode : 'local',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												triggerAction : 'all',
												store : new Ext.data.JsonStore(
														{
															url : __ctxPath
																	+ "/arch/listArchFond.do",
															autoLoad : true,
															autoShow : true,
															root : 'result',
															fields : [
																	'archFondId',
																	'afNo' ]
														}),
												valueField : 'archFondId',
												displayField : 'afNo',
												listeners : {
													scope : this,
													'select' : function(combo,record, index) {
														Ext.getCmp('SelectFileWindow.Q_rollNo_S_EQ').getStore()
																.load({params : {
																				'Q_archFond.archFondId_L_EQ' : record.data.archFondId
																			}
																		});
														Ext.getCmp('SelectFileWindow.Q_rollNo_S_EQ').reset();
													}
												}
											},
											{
												fieldLabel : '案卷号',
												id : 'SelectFileWindow.Q_rollNo_S_EQ',
												name : 'Q_rollNo_S_EQ',
												allowBlank : true,
												flex : 1,
												xtype : 'combo',
												mode : 'local',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												triggerAction : 'all',
												store : new Ext.data.JsonStore(
														{
															url : __ctxPath
																	+ "/arch/listArchRoll.do",
															autoLoad : true,
															autoShow : true,
															root : 'result',
															idProperty : 'rollId',
															fields : [
																	'rollId',
																	'rollNo',
																	'afNo' ]
														}),
												valueField : 'rollId',
												displayField : 'rollNo',
												listeners : {}
											},
											{
												fieldLabel : '文件编号',
												name : 'Q_fileNo_S_EQ',
												flex : 1,
												xtype : 'textfield'
											},
											{
												fieldLabel : '文件题名',
												name : 'Q_fileName_S_EQ',
												flex : 1,
												xtype : 'textfield'
											}

											,
											{
												fieldLabel : '目录号',
												name : 'Q_catNo_S_EQ',
												flex : 1,
												xtype : 'textfield'
											},
											{
												fieldLabel : '密级',
												name : 'Q_secretLevel_S_LK',
												flex : 1,
												editable : true,
												lazyInit : false,
												forceSelection : false,
												xtype : 'diccombo',
												nodeKey : 'file_security'
											},
											{
												fieldLabel : '保管期限',
												name : 'Q_timeLimit_S_LK',
												flex : 1,
												editable : true,
												lazyInit : false,
												forceSelection : false,
												xtype : 'diccombo',
												nodeKey : 'file_time_limit'
											},
											{
												fieldLabel : '开放形式',
												name : 'Q_openStyle_S_LK',
												flex : 1,
												editable : true,
												lazyInit : false,
												forceSelection : false,
												xtype : 'diccombo',
												nodeKey : 'file_open_form'
											},
											{
												fieldLabel : '归档状态',
												hiddenName : 'Q_archStatus_SN_EQ',
												flex : 1,
												xtype : 'combo',
												mode : 'local',
												editable : false,
												triggerAction : 'all',
												store : [ [ '', '全部' ],
														[ '0', '未归档' ],
														[ '1', '已归档' ] ]
											},

											{
												fieldLabel : '分类Id',
												id : 'SelectFileWindow.proTypeId',
												name : 'Q_globalType.proTypeId_L_EQ',
												flex : 1,
												xtype : 'hidden'
											},
											{
												fieldLabel : '分类Name',
												id : 'SelectFileWindow.typeName',
												name : 'Q_typeName_S_EQ',
												flex : 1,
												xtype : 'hidden'
											}

									],
									buttons : [ {
										text : '查询',
										scope : this,
										iconCls : 'btn-search',
										handler : this.search
									}, {
										text : '重置',
										scope : this,
										iconCls : 'btn-reset',
										handler : this.reset
									} ]
								});// end of searchPanel

						this.leftPanel = new Ext.Panel(
								{
									region : 'west',
									layout : 'fit',
									collapsible : true,
									split : true,
									frame : false,
									width : 200,
									border : true,
									items : [{
										xtype : 'treePanelEditor',
										id : 'SelectFileWindowGlobalTypeTree',
										split : true,
										rootVisible : false,
										border : false,
										frame : false,
										autoScroll : true,
										scope : this,
										url : __ctxPath
												+ '/system/treeGlobalType.do?catKey=AR_RLF',
										onclick : function(node) {
											var proTypeId = node.id;
											if (proTypeId == '0') {
												Ext.getCmp('SelectFileWindowSearchPanel').getForm()
														.findField('SelectFileWindow.proTypeId')
														.setValue('');

											} else {
												Ext.getCmp('SelectFileWindowSearchPanel').getForm()
														.findField('SelectFileWindow.proTypeId')
														.setValue(proTypeId);
											}
											Ext.getCmp('SelectFileWindow').search();
										}
									} ]
								}

						);
						this.store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
								url : __ctxPath + "/arch/listRollFile.do",
								method : 'GET'
							}),
							root : 'result',
							reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								remoteSort : false,
								fields : [ {
									name : 'rollFileId',
									type : 'int'
								}, 'afNo', 'createTime', 'creatorName',
										'creatorId', 'archStatus', 'proTypeId',
										'typeName', 'openStyle', 'archRoll',
										'rollNo', 'fileName', 'fileNo',
										'fileNo', 'catNo', 'seqNo', 'pageNo',
										'pageNums', 'secretLevel', 'timeLimit',
										'keyWords', 'keyWords', 'content',
										'fileTime', 'notes', 'dutyPerson' ]
							})

						});

						this.store.load();
						var sm = new Ext.grid.CheckboxSelectionModel();
						this.gridPanel = new Ext.grid.GridPanel({
							region : 'center',
							height : 200,
							id : 'SelectRollFileWindowGrid',
							defaults : {
								anchor : '96%'
							},
							viewConfig : {
								forceFit : true,
								autoFill : true
							},
							sm : sm,
							store : this.store,
							bbar : new HT.PagingBar({
								store : this.store
							}),
							columns : [ sm, {
								header : 'rollFileId',
								dataIndex : 'rollFileId',
								hidden : true
							}, {
								header : '全宗号',
								dataIndex : 'archRoll',
								renderer : function(archRoll) {
									if (archRoll)
										return archRoll.archFond.afNo;
								}
							}, {
								header : '案卷号',
								dataIndex : 'archRoll',
								renderer : function(archRoll) {
									if (archRoll)
										return archRoll.rollNo;
								}
							}, {
								header : '文件编号',
								dataIndex : 'fileNo'
							}, {
								header : '文件题名',
								dataIndex : 'fileName'
							} ]
						// end of columns
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
					cancel : function() {
						this.close();
					},
					save : function() {

						var selectRecords = this.gridPanel.getSelectionModel()
								.getSelections();
						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择记录！");
							return;
						}

						if (this.callBack != null) {
							this.close();
							this.callBack.call(this, selectRecords);
						}

					}

				});
