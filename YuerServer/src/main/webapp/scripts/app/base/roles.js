function createRolesPanel(apptitle) {
	var height = Ext.getBody().getHeight(); // 768 42
	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面
	var roleFormConfig = {
		frame : true,
		labelWidth : 70,
		height : height-30,
		id : 'roleform',
		autoWidth : true,
		autoScroll : true,
		padding : '10 10 20 10',
		defaults : {
			anchor : '100%',
			xtype : 'textfield',
			selectOnFocus : true
		},
		items : [
				// name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
				{
			name : 'role.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			name : 'checkedIds',
			id : 'checkedIds',
			xtype : 'hidden'
		}, {
			name : 'role.name',
			id : 'name',
			allowBlank : false,
			fieldLabel : '名称'
		}, {
			name : 'role.description',
			id : 'description',
			fieldLabel : '描述'
		}, {
			name : 'role.position',
			id : 'position',
			allowBlank : false,
			fieldLabel : '显示位置'
		}, {
			name : 'check_resources',
			id : 'check_resources',
			fieldLabel : '添加资源',
			// itemCls: 'x-check-group-alt',
			columns : 2,
			xtype : 'checkboxgroup',
			items : []
		}],
		buttons : [{
			text : '保&nbsp;&nbsp;&nbsp;存',
			handler : function() {
				if (Ext.getCmp('roleform').getForm().isValid()) {
					var checks = "";
					Ext.getCmp('check_resources').items.each(function(item) {
								if (item.checked) {
									checks += item.value + ',';
								}
							});
					Ext.getCmp('checkedIds').setValue(checks);
					Ext.getCmp('roleform').getForm().submit({
						url : webRoot + '/extui/role/save',
						waitMsg : '正在保存...',
						method : 'post',
						success : function(form, action) {
							Ext.MessageBox.alert('提示', '保存成功');
							Ext.getCmp('roleformwindow').close();
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
				Ext.getCmp('roleformwindow').close();
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
				root : 'data.roles',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'description'
						}, {
							name : 'name'
						}, {
							name : 'position'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/extui/role/list'
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
										id : 'description',
										header : '描述',
										width : 280,
										sortable : false,
										dataIndex : 'description'
									}, {
										id : 'position',
										header : '显示位置',
										width : 80,
										sortable : true,
										dataIndex : 'position'
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
							style : 'padding:4px 3px 3px 0',
							width : 34,
							text : '名称:'
						}, {
							name : 'role.name',
							xtype : 'textfield',
							width : 150
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
						createroleForm('创建新用户角色表');
					}
				}, {
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的用户角色表',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						createroleForm('编辑用户角色表', sm.getSelected().data.id);
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的用户角色表',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的用户角色表吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除用户角色表。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRoot
															+ '/extui/role/delete/'
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

	function createroleForm(title, id) {
		var url = "";
		if (id != undefined) {
			url = webRoot + '/extui/role/initResources/' + id;
		} else {
			url = webRoot + '/extui/role/initResources/0';
		}
		Ext.Ajax.request({
					url : url,
					success : function(resp, opts) {
						var roleForm = new Ext.form.FormPanel(roleFormConfig);
						var window = new Ext.Window({
									title : title,
									width : 460,
									id : 'roleformwindow',
									autoScroll : true,
									height : height,
									resizable : false,
									layout : 'vbox',
									border : false,
									modal : true,
									items : roleForm
								});
						if (id != undefined) {
							roleForm.getForm().load({
										clientValidation : false,
										waitMsg : '加载中...',
										url : webRoot + '/extui/role/load/'
												+ id,
										method : 'GET'
									});
						}
						var respText = Ext.util.JSON.decode(resp.responseText);
						Ext.getCmp('check_resources').items = respText;
						window.show();
					}
				});

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
