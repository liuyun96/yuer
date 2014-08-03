﻿function createItemAuditPanel(apptitle) {
	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面
	var sm = new Ext.grid.CheckboxSelectionModel({
				dataIndex : 'id',
				listeners : {
					selectionchange : function(sm) {
						if (sm.getCount()) {
							panel.removeButton.enable();
							panel.auditButton.enable();
							panel.rejectButton.enable();
							if (sm.getCount() == 1) {// 只有选中一个时候才可以编辑。
								panel.editButton.enable();
								panel.seachImgButton.enable();
							} else {
								panel.editButton.disable();
								panel.seachImgButton.disable();
							}
						} else {
							panel.removeButton.disable();
							panel.editButton.disable();
							panel.auditButton.enable();
							panel.rejectButton.enable();
							panel.seachImgButton.disable();
						}
					}
				}
			});
	var store = new Ext.data.JsonStore({
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
							name : 'detail'
						}, {
							name : 'status'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/item/list'// 1-审核中
						})
			});
	store.setDefaultSort('', '');
	store.on("beforeload", function(thiz, options) {
				// 获取查询表单的查询条件。
				this.baseParams = searchForm.getForm().getValues();
				options.params.limit = pagesize;
				// 可以增加其他必要的条件。
				return true;
			});

	var grid = new Ext.grid.GridPanel({
				store : store,
				flex : 1,
				border : false,
				cm : new Ext.grid.ColumnModel({
							columns : [sm, {
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
											if (v == 1)
												return '未审核';
											if (v == 2)
												return '审核通过';
											if (v == 3)
												return '审核失败';
											if (v == 4)
												return '已删除';
										}
									}],
							defaults : {
								sortable : true,
								menuDisabled : false,
								width : 100
							}
						}),
				loadMask : false,
				sm : sm,
				// paging bar on the bottom
				bbar : new Ext.PagingToolbar({
							pageSize : pagesize,
							store : store,
							displayInfo : false,
							emptyMsg : "没有查询到任何记录"
						})
			});
	// 查询表单
	var searchForm = new Ext.form.FormPanel({
				height : 32,
				style : 'border-bottom:1px solid #ddd',
				border : false,
				padding : '4 4 4 4',
				labelWidth : 75,
				layout : {
					type : 'hbox',
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
							xtype : 'label',
							width : 35,
							defaultMargins : '5 5 5 5',
							text : '状态:'
						}, {
							xtype : 'combo',
							typeAhead : true,
							triggerAction : 'all',
							hiddenName : 'item.status',
							lazyRender : true,
							editable : false,
							anchor : '15%',
							emptyText : '选择审核状态',
							mode : 'local',
							store : new Ext.data.ArrayStore({
										id : 0,
										fields : ['label', 'value'],
										data : [['全部', -1], ['未审核', 1],
												['审核通过', 2], ['审核失败', 3],
												['已删除', 4]]
									}),
							valueField : 'value',
							displayField : 'label'
						}, {
							xtype : 'button',
							width : 60,
							text : '查询',
							handler : function() {
								store.load();
							}
						}, {
							xtype : 'button',
							width : 60,
							text : '清空',
							handler : function() {
								searchForm.getForm().reset()
							}
						}]
			});

	// 最后组装成的List界面。
	var panel = new Ext.Panel({
				title : apptitle,
				tabTip : apptitle,
				closable : true,
				autoScroll : true,
				border : true,
				tbar : [{
							// text : '新增',
							// iconCls : 'add-icon',
							// ref : '../addButton',
							// handler : function() {
							// createItemForm('创建新商品表');
							// }
							// }, {
							text : '编辑',
							ref : '../editButton',
							tooltip : '编辑选中的商品表',
							iconCls : 'edit-icon',
							disabled : true,
							handler : function() {
								createItemForm('编辑商品表',
										sm.getSelected().data.id);
							}
						}, {
							text : '删除',
							ref : '../removeButton',
							tooltip : '删除选中的商品表',
							iconCls : 'delete-icon',
							disabled : true,
							handler : function() {
								Ext.MessageBox.confirm('删除确认',
										'你确定要删除所选中的商品表吗？', function(id) {
											if (id == 'yes') {
												var ids = '';
												// 删除商品表。
												sm.each(function(r) {
															ids += r.data.id;
															ids += ',';
														});
												Ext.Ajax.request({
															url : webRoot
																	+ '/item/delete/'
																	+ ids,
															success : function() {
																store.load();
															}
														});
											}
										});
							}
						}, {
							text : '标记为审核通过',
							ref : '../auditButton',
							tooltip : '删除选中的商品表',
							iconCls : 'edit-icon',
							disabled : true,
							handler : function() {
								Ext.MessageBox.confirm('审核确认',
										'你确定允许所选中的商品通过审核吗？', function(id) {
											if (id == 'yes') {
												var ids = '';
												// 删除商品表。
												sm.each(function(r) {
															ids += r.data.id;
															ids += ',';
														});
												Ext.Ajax.request({
															url : webRoot
																	+ '/item/audit/'
																	+ ids
																	+ '/OK',
															success : function() {
																store.load();
															}
														});
											}
										});
							}
						}, {
							text : '标记为驳回',
							ref : '../rejectButton',
							tooltip : '审核驳回',
							iconCls : 'edit-icon',
							disabled : true,
							handler : function() {
								Ext.MessageBox.confirm('驳回确认',
										'你确定要驳回所选中的优惠劵吗？', function(id) {
											if (id == 'yes') {
												var ids = '';
												// 删除商品表。
												sm.each(function(r) {
															ids += r.data.id;
															ids += ',';
														});
												Ext.Ajax.request({
															url : webRoot
																	+ '/item/audit/'
																	+ ids
																	+ '/NO',
															success : function() {
																store.load();
															}
														});
											}
										});
							}
						}, {
							text : '刷新',
							tooltip : '刷新列表',
							iconCls : 'refresh-icon',
							handler : function() {
								store.reload();
							}
						}, {
							text : '查看商品的关联图片',
							ref : '../seachImgButton',
							tooltip : '查看商品的关联图片',
							iconCls : 'edit-icon',
							disabled : true,
							handler : function() {
								createAboutitemImgWindow(sm.getSelected().data.id);
							}
						}],
				layout : {
					type : 'vbox',
					padding : 0,
					align : 'stretchmax'
				},
				defaults : {
					margins : '0 0 0 0'
				},
				items : [searchForm, grid]
			});

	function createItemForm(title, id) {
		var addItemConfig = {
			frame : true,
			labelWidth : 75,
			autoHeight : true,
			id : 'itemform',
			autoWidth : true,
			padding : '10 10 0 10',
			enctype : 'multipart/form-data',
			fileUpload : true,
			defaults : {
				anchor : '100%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [
					// name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
					{
				name : 'item.id',
				xtype : 'hidden',
				id : 'id',
				allowBlank : false,
				anchor : '45%'
			}, {
				name : 'item.name',
				id : 'name',
				anchor : '45%',
				allowBlank : false,
				fieldLabel : '商品名称'
			}, {
				name : 'item.num',
				xtype : 'numberfield',
				id : 'num',
				anchor : '45%',
				allowBlank : false,
				fieldLabel : '库存数量'
			}, {
				name : 'item.code',
				id : 'code',
				anchor : '45%',
				allowBlank : false,
				fieldLabel : '商品信息码'
			}, {
				name : 'item.price',
				xtype : 'numberfield',
				id : 'price',
				anchor : '45%',
				allowBlank : false,
				fieldLabel : '商品价格'
			}, {
				name : 'item.detail',
				id : 'detail',
				fieldLabel : '简介',
				xtype : 'textarea',
				allowBlank : false,
				height : 250,
				anchor : '90%'
			}],
			// }, new Ext.form.HtmlEditor({
			// name : 'item.detail',
			// id : 'detail',
			// width : 500,
			// height : 230,
			// fieldLabel : '商品详情'
			// })],
			buttons : [{
				text : '保&nbsp;&nbsp;&nbsp;存',
				handler : function() {
					if (Ext.getCmp('itemform').getForm().isValid()) {
						Ext.getCmp('itemform').getForm().submit({
							url : webRoot + '/item/save',
							waitMsg : '正在保存...',
							method : 'post',
							success : function(form, action) {
								Ext.MessageBox.alert('提示', '保存成功');
								Ext.getCmp('itemformwindow').close();
								store.load();
							},
							failure : function(form, action) {
								Ext.MessageBox.alert('提示', '保存失败,原因为:'
												+ action.result.msg);
							}
						});
					} else {
						Ext.MessageBox.alert('提示', '保存失败，请将信息填写完整......');
					}
				}
			}, {
				text : '取&nbsp;&nbsp;&nbsp;消',
				handler : function() {
					Ext.getCmp('itemformwindow').close();
				}
			}]
		};

		var itemForm = new Ext.form.FormPanel(addItemConfig);

		var window = new Ext.Window({
					title : title,
					width : 750,
					id : 'itemformwindow',
					height : 550,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : [itemForm]
				});
		if (id != undefined) {
			itemForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRoot + '/item/load/' + id,
						method : 'GET'
					});
		}
		window.show();

	}
	return panel;
}
