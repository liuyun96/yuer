/* 创建用户关联的店铺 */
function createAssociateShopWindow(userids) {

	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面

	var sms = new Ext.grid.CheckboxSelectionModel({
				dataIndex : 'id',
				listeners : {
					selectionchange : function(sms) {
						if (sms.getCount()) {
							if (sms.getCount() == 1)
								gridd.savesetButton.enable();
							else
								gridd.savesetButton.disable();
						} else {
							gridd.savesetButton.disable();
						}
					}
				}
			});
	var stores = new Ext.data.JsonStore({
				autoLoad : {
					params : {
						limit : pagesize,
						start : 0
					}
				},
				root : 'data.shops',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}, {
							name : 'taobaoUrl'
						}, {
							name : 'mobile'
						}, {
							name : 'email'
						}, {
							name : 'linkMan'
						}, {
							name : 'officialUrl'
						}, {
							name : 'status'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/shop/list'
						})
			});
	stores.setDefaultSort('', '');
	stores.on("beforeload", function(thiz, options) {
				// 获取查询表单的查询条件。
				this.baseParams = searchForms.getForm().getValues();
				options.params.limit = pagesize;
				// 可以增加其他必要的条件。
				return true;
			});

	// 查询表单
	var searchForms = new Ext.form.FormPanel({
				height : 50,
				style : 'border-bottom:1px solid #ddd',
				border : false,
				padding : '4 4 4 4',
				hidden : true,
				layout : {
					type : 'hbox',
					defaultMargins : '0 5 5 0',
					align : 'left'
				},
				items : [{
							xtype : 'label',
							width : 60,
							text : '店铺名称'
						}, {
							xtype : 'textfield',
							width : 160,
							name : 'shop.name'
						}, {
							xtype : 'button',
							width : 60,
							text : '查询',
							handler : function() {
								stores.load();
							}
						}, {
							xtype : 'button',
							width : 60,
							text : '清空',
							handler : function() {
								searchForms.getForm().reset()
							}
						}]
			});

	var gridd = new Ext.grid.GridPanel({
				store : stores,
				flex : 1,
				border : false,
				tbar : [{
					text : '保存',
					tooltip : '保存关联店铺',
					iconCls : 'save-icon',
					ref : '../savesetButton',
					disabled : true,
					handler : function() {
						var shopids = '';
						sms.each(function(r) {
									shopids += r.data.id;
									shopids += ',';
								});
						Ext.Ajax.request({
									url : webRoot + '/shopUserMap/save/'
											+ userids + '/' + shopids,
									waitMsg : '正在保存...',
									method : 'post',
									success : function() {
										Ext.MessageBox.alert('提示', '保存成功');
									},
									failure : function() {
										Ext.MessageBox.alert('提示',
												'操作失败，稍后再试...');
									}
								});
					}
				}, {
					text : '刷新',
					tooltip : '刷新列表',
					iconCls : 'refresh-icon',
					handler : function() {
						stores.reload();
					}
				}, '->',// 开始右对齐按钮
						{
							text : '查询',
							enableToggle : true,
							pressed : false,
							iconCls : 'find-icon',
							toggleHandler : function() {
								if (this.pressed) {
									searchForms.show();
									windows3.doLayout();
								} else {
									searchForms.hide();
									windows3.doLayout();
								}
							}
						}],
				cm : new Ext.grid.ColumnModel({
							columns : [sms, {
										id : 'name',
										header : '店铺名称',
										width : 80,
										sortable : true,
										dataIndex : 'name'
									}, {
										id : 'taobaoUrl',
										header : '淘宝店铺连接',
										width : 80,
										sortable : true,
										dataIndex : 'taobaoUrl'
									}, {
										id : 'mobile',
										header : '手机号',
										width : 80,
										sortable : true,
										dataIndex : 'mobile'
									}, {
										id : 'email',
										header : '邮箱',
										width : 80,
										sortable : true,
										dataIndex : 'email'
									}, {
										id : 'linkMan',
										header : '联系人',
										width : 80,
										sortable : true,
										dataIndex : 'linkMan'
									}, {
										id : 'officialUrl',
										header : '官网店铺链接',
										width : 80,
										sortable : true,
										dataIndex : 'officialUrl'
									}, {
										id : 'status',
										header : '状态',
										width : 80,
										sortable : true,
										dataIndex : 'status',
										renderer : function(v) {
											return v ? '是' : '否';
										}
									}],
							defaults : {
								sortable : true,
								menuDisabled : false,
								width : 100
							}
						}),
				loadMask : false,
				sm : sms,
				// paging bar on the bottom
				bbar : new Ext.PagingToolbar({
							pageSize : pagesize,
							store : stores,
							displayInfo : false,
							emptyMsg : "没有查询到任何记录"
						}),
				bbar : new Ext.PagingToolbar({
							pageSize : pagesize,
							store : stores,
							beforePageText : "当前第",
							afterPageText : "页，共{0}页",
							lastText : "尾页",
							nextText : "下一页",
							prevText : "上一页",
							firstText : "首页",
							refreshText : "刷新页面",
							displayInfo : true,
							displayMsg : "当前显示 {0} - {1}条, 共 {2}",
							emptyMsg : "没有记录"
						}),
				items : searchForms
			});
	var windows3 = new Ext.Window({
				title : '选取用户关联的店铺',
				width : 720,
				id : 'shopformwindows',
				height : 450,
				resizable : false,
				layout : 'vbox',
				modal : true,
				border : false,
				items : [gridd]
			});
	windows3.show();
}