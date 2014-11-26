function createSimpleMenusPanel(apptitle) {
	// 分页大小。
	var pagesize = 25;

	var listAll = new Ext.data.JsonStore({
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'title'
						}],
				url : webRoot + '/extui/simpleMenus/listAll',
				id : 'id',
				root : 'data.listAll'
			});
	var reslistAll = new Ext.data.JsonStore({
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}],
				url : webRoot + '/extui/simpleMenus/reslistAll',
				id : 'id',
				root : 'data.listAll'
			});
	// 定义编辑表单的界面
	var simpleMenusFormConfig = {
		frame : true,
		labelWidth : 80,
		autoHeight : true,
		id : 'simpleMenusform',
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
			name : 'simpleMenus.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			name : 'simpleMenus.title',
			id : 'title',
			fieldLabel : '标题',
			allowBlank : false
		}, {
			name : 'simpleMenus.html',
			id : 'html',
			fieldLabel : 'HTML代码'
		}, {
			name : 'simpleMenus.mLevel',
			id : 'mLevel',
			fieldLabel : '级别'
		}, {
			name : 'parent.id',
			id : 'parent_id',
			fieldLabel : '父类',
			xtype : 'combo',
			store : listAll,
			valueField : 'id',
			displayField : 'title',
			hiddenName : 'parent.id',
			triggerAction : 'all',
			mode : 'remote',
			emptyText : '请选择',
			editable : false
		}, {
			name : 'simpleMenus.iconCls',
			id : 'iconCls',
			fieldLabel : '图标样式'
		}, {
			name : 'simpleMenus.position',
			id : 'position',
			fieldLabel : '显示位置'
		}, {
			name : 'simpleMenus.url',
			id : 'url',
			fieldLabel : 'URL',
			xtype : 'textarea'
		}, {
			name : 'resource.id',
			id : 'resourceId',
			fieldLabel : '关联的资源',
			xtype : 'combo',
			store : reslistAll,
			valueField : 'id',
			displayField : 'name',
			hiddenName : 'resource.id',
			triggerAction : 'all',
			mode : 'remote',
			emptyText : '请选择',
			editable : false,
			allowBlank : false
		}],
		buttons : [{
			text : '保&nbsp;&nbsp;&nbsp;存',
			handler : function() {
				if (Ext.getCmp('simpleMenusform').getForm().isValid()) {
					Ext.getCmp('simpleMenusform').getForm().submit({
						url : webRoot + '/extui/simpleMenus/save',
						waitMsg : '正在保存...',
						method : 'post',
						success : function(form, action) {
							Ext.MessageBox.alert('提示', '保存成功');
							Ext.getCmp('simpleMenusformwindow').close();
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
				Ext.getCmp('simpleMenusformwindow').close();
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
				root : 'data.simpleMenuss',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'html'
						}, {
							name : 'mLevel'
						}, {
							name : 'parent'
						}, {
							name : 'position'
						}, {
							name : 'title'
						}, {
							name : 'url'
						}, {
							name : 'resource'
						}, {
							name : 'iconCls'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/extui/simpleMenus/list'
						})
			});
	store.setDefaultSort('id', 'asc');
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
										id : 'title',
										header : '标题',
										width : 160,
										sortable : false,
										dataIndex : 'title'
									}, {
										id : 'url',
										header : 'URL',
										width : 350,
										sortable : false,
										dataIndex : 'url'
									}, {
										id : 'html',
										header : 'HTML代码',
										width : 80,
										sortable : false,
										dataIndex : 'html'
									}, {
										id : 'mLevel',
										header : '级别',
										width : 80,
										sortable : true,
										dataIndex : 'mLevel'
									}, {
										id : 'parent',
										header : '父菜单',
										width : 80,
										sortable : true,
										dataIndex : 'parent',
										renderer : function(v) {
											if (v != null) {
												return v.title;
											}
										}
									}, {
										id : 'position',
										header : '显示位置',
										width : 80,
										sortable : true,
										dataIndex : 'position'
									}, {
										id : 'resourceId',
										header : '关联的资源',
										width : 120,
										sortable : true,
										dataIndex : 'resource',
										renderer : function(v) {
											if (v != null) {
												return v.name;
											}
										}
									}, {
										id : 'iconCls',
										header : '图标样式',
										width : 120,
										sortable : false,
										dataIndex : 'iconCls'
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
							text : '标题:',
							style : 'padding:4px 3px 3px 0'
						}, {
							xtype : 'textfield',
							name : 'simpleMenus.title',
							width : '150'
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
						createSimpleMenusForm('创建新菜单配置表');
					}
				}, {
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的菜单配置表',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						createSimpleMenusForm('编辑菜单配置表',
								sm.getSelected().data.id);
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的菜单配置表',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的菜单配置表吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除菜单配置表。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
											url : webRoot
													+ '/extui/simpleMenus/delete/'
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

	function createSimpleMenusForm(title, id) {
		var simpleMenusForm = new Ext.form.FormPanel(simpleMenusFormConfig);
		var window = new Ext.Window({
					title : title,
					width : 350,
					id : 'simpleMenusformwindow',
					height : 378,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : simpleMenusForm
				});
		if (id != undefined) {
			simpleMenusForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRoot + '/extui/simpleMenus/load/' + id,
						method : 'GET'
					});
		}
		window.show();
		if (id != undefined) {
			var resourceId = sm.getSelected().data.resource.id;
			var resName = sm.getSelected().data.resource.name;
			Ext.getCmp('resourceId').setValue(resourceId);
			Ext.getCmp('resourceId').setRawValue(resName);
			var parentId = sm.getSelected().data.parent.id;
			var parentName = sm.getSelected().data.parent.title;
			Ext.getCmp('parent_id').setValue(parentId);
			Ext.getCmp('parent_id').setRawValue(parentName);
		}
	}
	return panel;
}
