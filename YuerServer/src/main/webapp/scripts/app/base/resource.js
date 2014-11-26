function createResourcePanel(apptitle) {
	// 分页大小。
	var pagesize = 25;

	// 类型store
	var pStore = new Ext.data.JsonStore({
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}],
				url : webRoot + '/extui/resource/listAll',
				id : 'id',
				root : 'data.ress'
			});

	// 定义编辑表单的界面
	var resourcesFormConfig = {
		frame : true,
		labelWidth : 70,
		autoHeight : true,
		id : 'resourcesform',
		autoWidth : true,
		padding : '10 10 20 10',
		defaults : {
			anchor : '100%',
			xtype : 'textfield',
			selectOnFocus : true
		},
		items : [
				// name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
				{
			name : 'resource.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			name : 'resource.name',
			id : 'name',
			fieldLabel : '名称',
			allowBlank : false
		}, {
			name : 'resource.url',
			id : 'url',
			fieldLabel : 'URL'
		},
				// {name:'resource.parent.id',id:'parentId',fieldLabel:'上级资源'},
				{
					name : 'parent.id',
					id : 'parent_id',
					fieldLabel : '上级资源',
					xtype : 'combo',
					store : pStore,
					valueField : 'id',
					displayField : 'name',
					hiddenName : 'parent.id',
					triggerAction : 'all',
					mode : 'remote',
					emptyText : '请选择',
					editable : false
				}, {
					name : 'resource.action',
					id : 'action',
					fieldLabel : '操作'
				}],
		buttons : [{
			text : '保&nbsp;&nbsp;&nbsp;存',
			handler : function() {
				if (Ext.getCmp('resourcesform').getForm().isValid()) {
					Ext.getCmp('resourcesform').getForm().submit({
						url : webRoot + '/extui/resource/save',
						waitMsg : '正在保存...',
						method : 'post',
						success : function(form, action) {
							Ext.MessageBox.alert('提示', '保存成功');
							Ext.getCmp('resourcesformwindow').close();
							store.load();
						},
						failure : function(form, action) {
							Ext.MessageBox.alert('提示', '保存失败,原因为:'
											+ action.result.msg);
						}
					});
				}
			}
		}, {
			text : '取&nbsp;&nbsp;&nbsp;消',
			handler : function() {
				Ext.getCmp('resourcesformwindow').close();
			}
		}]
	};

	var sm = new Ext.grid.CheckboxSelectionModel({
				dataIndex : 'id',
				listeners : {
					selectionchange : function(sm) {
						if (sm.getCount()) {
							panel.removeButton.enable();
							if (sm.getCount() == 1)// 只有选中一个时候才可以编辑。
								panel.editButton.enable();
							else
								panel.editButton.disable();
						} else {
							panel.removeButton.disable();
							panel.editButton.disable();
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
				root : 'data.resources',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}, {
							name : 'url'
						}, {
							name : 'parent'
						}, {
							name : 'action'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/extui/resource/list'
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
										sortable : false,
										dataIndex : 'name'
									}, {
										id : 'url',
										header : 'URL',
										width : 80,
										sortable : false,
										dataIndex : 'url'
									}, {
										id : 'parent',
										header : '上级资源',
										width : 80,
										sortable : false,
										dataIndex : 'parent',
										renderer : function(v) {
											if (v != null)
												return v.name;
										}
									}, {
										id : 'action',
										header : '操作',
										width : 80,
										sortable : false,
										dataIndex : 'action'
									}],
							defaults : {
								sortable : true,
								menuDisabled : false,
								width : 100
							}
						}),
				loadMask : false,
				sm : sm,
				bbar : new Ext.PagingToolbar({
							pageSize : pagesize,
							store : store,
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
						})
			});
	// 查询表单
	var searchForm = new Ext.form.FormPanel({
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
							style : 'padding:4px 3px 3px 0',
							width : 34,
							text : '名称:'
						}, {
							name : 'resource.name',
							xtype : 'textfield',
							width : 150
						}, {
							name : 'par.id',
							id : 'par_id',
							fieldLabel : '上级资源',
							xtype : 'combo',
							store : pStore,
							valueField : 'id',
							displayField : 'name',
							hiddenName : 'par.id',
							triggerAction : 'all',
							mode : 'remote',
							emptyText : '选择上级资源',
							editable : false
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
					text : '新增',
					iconCls : 'add-icon',
					ref : '../addButton',
					handler : function() {
						createResourcesForm('创建新权限资源表');
					}
				}, {
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的权限资源表',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						createResourcesForm('编辑权限资源表', sm.getSelected().data.id);
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的权限资源表',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的权限资源表吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除权限资源表。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRoot
															+ '/extui/resource/delete/'
															+ ids,
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
				}, '->',// 开始右对齐按钮
				{
					text : '查询',
					enableToggle : true,
					pressed : false,
					iconCls : 'find-icon',
					toggleHandler : function() {
						if (this.pressed) {
							searchForm.show();
							panel.doLayout();
						} else {
							searchForm.hide();
							panel.doLayout();
						}
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

	function createResourcesForm(title, id) {
		var resourcesForm = new Ext.form.FormPanel(resourcesFormConfig);
		var window = new Ext.Window({
					title : title,
					width : 320,
					id : 'resourcesformwindow',
					height : 235,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : resourcesForm
				});
		if (id != undefined) {
			resourcesForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRoot + '/extui/resource/load/' + id,
						method : 'GET'
					});
		}
		window.show();
		if (id != undefined) {
			var name = sm.getSelected().data.parent.name;
			var id = sm.getSelected().data.parent.id;
			Ext.getCmp('parent_id').setValue(id);
			Ext.getCmp('parent_id').setRawValue(name);
		}
	}
	if (userName != 'admin') {
		if (!del_bl) {
			panel.removeButton.hide();
		}
		if (!add_bl) {
			panel.addButton.hide();
		}
		if (!edit_bl) {
			panel.editButton.hide();
		}
	}
	return panel;
}
