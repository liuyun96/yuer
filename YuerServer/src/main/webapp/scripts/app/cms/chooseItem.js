function createchooseItemWindow() {
	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面
	var smc = new Ext.grid.CheckboxSelectionModel({
				dataIndex : 'id',
				listeners : {
					selectionchange : function(smc) {
						if (smc.getCount()) {
							if (smc.getCount() == 1)
								gridc.savesetButton.enable();
							else
								gridc.savesetButton.disable();
						} else {
							gridc.savesetButton.disable();
						}
					}
				}
			});
	var storec = new Ext.data.JsonStore({
				autoLoad : {
					params : {
						limit : pagesize,
						start : 0
					}
				},
				root : 'data.items',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}, {
							name : 'num'
						}, {
							name : 'code'
						}, {
							name : 'price'
						}, {
							name : 'img'
						}, {
							name : 'detail'
						}, {
							name : 'status'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/item/list'
						})
			});
	storec.setDefaultSort('', '');
	storec.on("beforeload", function(thiz, options) {
				// 获取查询表单的查询条件。
				this.baseParams = searchFormc.getForm().getValues();
				options.params.limit = pagesize;
				// 可以增加其他必要的条件。
				return true;
			});

	var gridc = new Ext.grid.GridPanel({
				store : storec,
				flex : 1,
				border : false,
				tbar : [{
							text : '确定',
							tooltip : '保存关联店铺',
							iconCls : 'save-icon',
							ref : '../savesetButton',
							disabled : true,
							handler : function() {
								var itemName = smc.getSelected().data.name;
								parent.Ext.getCmp('itemName')
										.setValue(itemName);
								var itemId = smc.getSelected().data.id;
								parent.Ext.getCmp('itemId').setValue(itemId);
								windowc.close();
							}
						}, {
							text : '刷新',
							tooltip : '刷新列表',
							iconCls : 'refresh-icon',
							handler : function() {
								storec.reload();
							}
						}, '->',// 开始右对齐按钮
						{
							text : '查询',
							enableToggle : true,
							pressed : false,
							iconCls : 'find-icon',
							toggleHandler : function() {
								if (this.pressed) {
									searchFormc.show();
									windowc.doLayout();
								} else {
									searchFormc.hide();
									windowc.doLayout();
								}
							}
						}],
				cm : new Ext.grid.ColumnModel({
							columns : [smc, {
										id : 'name',
										header : '名称',
										width : 180,
										sortable : true,
										dataIndex : 'name'
									}, {
										id : 'num',
										header : '库存',
										width : 80,
										sortable : true,
										dataIndex : 'num'
									}, {
										id : 'code',
										header : '商品信息编码',
										width : 180,
										sortable : true,
										dataIndex : 'code'
									}, {
										id : 'price',
										header : '商品价格',
										width : 80,
										sortable : true,
										dataIndex : 'price'
									}, {
										id : 'img',
										header : '图片',
										width : 180,
										sortable : true,
										dataIndex : 'img',
										renderer : function(v) {
											// return String
											// .format('<img
											// style="width:45px;height:45px;"
											// src="'
											// + webRoot + '//' + v + '"/>');

										}
									}, {
										id : 'detail',
										header : '详情',
										width : 180,
										sortable : true,
										dataIndex : 'detail'
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
				sm : smc,
				// paging bar on the bottom
				bbar : new Ext.PagingToolbar({
							pageSize : pagesize,
							store : storec,
							displayInfo : false,
							emptyMsg : "没有查询到任何记录"
						})
			});
	// 查询表单
	var searchFormc = new Ext.form.FormPanel({
				height : 45,
				style : 'border-bottom:1px solid #ddd',
				border : false,
				padding : '4 4 4 4',
				hidden : true,
				labelWidth : 75,
				layout : {
					type : 'vbox',
					defaultMargins : '0 5 5 0',
					align : 'left'
				},
				items : [{
							xtype : 'label',
							width : 35,
							defaultMargins : '5 5 5 5',
							text : '名称:'
						}, {
							name : 'item.name',
							width : 160,
							xtype : 'textfield'
						}, {
							xtype : 'button',
							width : 60,
							text : '查询',
							handler : function() {
								storec.load();
							}
						}, {
							xtype : 'button',
							width : 60,
							text : '清空',
							handler : function() {
								searchFormc.getForm().reset()
							}
						}]
			});

	var windowc = new Ext.Window({
				title : '卖家商品列表',
				width : 550,
				id : 'itemformwindowc',
				height : 450,
				resizable : false,
				layout : 'vbox',
				modal : true,
				border : false,
				items : [searchFormc, gridc]
			});
	windowc.show();
}
