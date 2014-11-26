function createGroupsPanel(apptitle) {
	var pagesize = 10;
	// 上级部门store
	var gStore = new Ext.data.JsonStore({
				remoteSort : true,
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}],
				url : webRoot + '/extui/group/list/-1',
				root : 'data.groups',
				totalProperty : 'data.total'
			});

	// 定义编辑表单的界面
	var groupFormConfig = {
		frame : true,
		labelWidth : 70,
		height:280,
		id : 'groupform',
		autoScroll : true,
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
			name : 'group.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			name : 'roleIds',
			id : 'roleIds',
			xtype : 'hidden'
		}, {
			name : 'group.description',
			id : 'description',
			fieldLabel : '描述'
		}, {
			name : 'group.name',
			id : 'name',
			fieldLabel : '名称'
		}, {
			name : 'group.position',
			id : 'position',
			fieldLabel : '显示位置'
		}, {
			name : 'parentId',
			id : 'parent_id',
			fieldLabel : '上级部门',
			xtype : 'combo',
			store : gStore,
			valueField : 'id',
			displayField : 'name',
			hiddenName : 'parentId',
			triggerAction : 'all',
			mode : 'remote',
			allowBlank : false,
			emptyText : '请选择',
			editable : false
		}, {
			name : 'check_roles',
			id : 'check_roles',
			fieldLabel : '添加角色',
			// itemCls: 'x-check-group-alt',
			columns : 2,
			xtype : 'checkboxgroup',
			items : []
		}],
		buttons : [{
			text : '保&nbsp;&nbsp;&nbsp;存',
			handler : function() {
				if (Ext.getCmp('groupform').getForm().isValid()) {
					var checks = "";
					Ext.getCmp('check_roles').items.each(function(item) {
								if (item.checked) {
									checks += item.value + ',';
								}
							});
					Ext.getCmp('roleIds').setValue(checks);
					Ext.getCmp('groupform').getForm().submit({
						url : webRoot + '/extui/group/save',
						waitMsg : '正在保存...',
						method : 'post',
						success : function(form, action) {
							Ext.MessageBox.alert('提示', '保存成功', function() {
										tree.root.reload();
										tree.expandAll(true);
									});
							Ext.getCmp('groupformwindow').close();
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
				Ext.getCmp('groupformwindow').close();
			}
		}]
	};

	// 部门树
	var tree = new Ext.tree.TreePanel({
				renderTo : 'tree',
				title : '部门结构树',
				flex : 1,
				useArrows : true,
				autoScroll : true,
				animate : true,
				border : false,
				enableDD : false,
				containerScroll : true,
				rootVisible : false,
				root : {
					nodeType : 'async',
					id : 'root'
				},
				dataUrl : webRoot + '/extui/group/listGroups/0',

				listeners : {
					'checkchange' : function(node, checked) {
						if (checked) {
							node.getUI().addClass('complete');
						} else {
							node.getUI().removeClass('complete');
						}
					}
				}
			});

	tree.getRootNode().expand(true);
	tree.on('click', function(r) {
				panel.deleteEmployee.enable();
				panel.addEmployee.enable();
				panel.addButton.enable();
				panel.removeButton.enable();
				panel.editButton.enable();
				if (tree.getSelectionModel().getSelectedNode().id == '1') {
					panel.editButton.disable();
					panel.removeButton.disable();
				}
				store.removeAll();
				store.proxy = new Ext.data.HttpProxy({
							url : webRoot
									+ '/extui/group/getListByGroup/'
									+ tree.getSelectionModel()
											.getSelectedNode().id
						});
				store.reload();
			});
	// 最后组装成的List界面。
	var store = new Ext.data.JsonStore({
				autoLoad : {
					params : {
						limit : pagesize,
						start : 0
					}
				},
				root : 'data.users',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'email'
						}, {
							name : 'name'
						}, {
							name : 'userName'
						}, {
							name : 'lastLogin',
							type : 'date',
							dateFormat : 'Y-m-d H:i:s'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/extui/user/list'
						})
			});
	store.setDefaultSort('', '');
	var grid = new Ext.grid.GridPanel({
				title : '部门员工',
				store : store,
				border : false,
				flex : 2,
				cm : new Ext.grid.ColumnModel({
							columns : [{
										id : 'name',
										header : '姓名',
										width : 80,
										sortable : false,
										dataIndex : 'name'
									}, {
										id : 'userName',
										header : '用户名',
										width : 80,
										sortable : false,
										dataIndex : 'userName'
									}, {
										id : 'email',
										header : '电子邮件',
										width : 120,
										sortable : false,
										dataIndex : 'email'
									}, {
										id : 'lastLogin',
										xtype : 'datecolumn',
										header : '上次登录时间',
										width : 140,
										sortable : true,
										format : 'Y-m-d H:i:s',
										dataIndex : 'lastLogin'
									}],
							defaults : {
								sortable : true,
								menuDisabled : false,
								width : 100
							}
						}),
				loadMask : true,
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

	// center上的 内容
	var panel = new Ext.Panel({
		title : apptitle,
		tabTip : apptitle,
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [{
					text : '新增部门',
					ref : '../addButton',
					tooltip : '新增加一个部门 ',
					iconCls : 'add-icon',
					disabled : true,
					handler : function() {
						creategroupForm('创建新部门信息表');
						// tree.getSelectionModel().getSelectedNode().id;
					}
				}, {
					text : '编辑部门',
					ref : '../editButton',
					tooltip : '编辑选中的部门信息表',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						creategroupForm('编辑部门信息表', tree.getSelectionModel()
										.getSelectedNode().id, "update");
					}
				}, {
					text : '删除部门',
					ref : '../removeButton',
					tooltip : '删除选中的部门信息表',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的部门信息表吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除部门信息表。
										ids = tree.getSelectionModel()
												.getSelectedNode().id;
										Ext.Ajax.request({
											url : webRoot
													+ '/extui/group/delete/'
													+ ids,
											success : function() {
												Ext.MessageBox.alert('提示',
														'删除成功', function() {
															tree.root.reload();
															tree
																	.expandAll(true);
														});
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
					text : '部门添加员工',
					ref : '../addEmployee',
					tooltip : '部门添加员工',
					iconCls : 'add-icon',
					disabled : true,
					handler : function() {
						updateGroup('部门添加员工', tree.getSelectionModel()
										.getSelectedNode().id, 'update');

					}
				}, {
					text : '部门删除员工',
					ref : '../deleteEmployee',
					tooltip : '部门删除员工',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						updateGroup('部门删除员工', tree.getSelectionModel()
										.getSelectedNode().id, 'remove');
					}
				}],
		layout : {
			type : 'hbox',
			padding : 0,
			align : 'stretch'
		},
		items : [tree, grid]
	});
	var sm;
	var employeeStore = new Ext.data.JsonStore({
				autoLoad : {
					params : {
						limit : pagesize,
						start : 0
					}
				},
				root : 'data.users',
				totalProperty : 'data.total',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'email'
						}, {
							name : 'name'
						}, {
							name : 'userName'
						}, {
							name : 'lastLogin',
							type : 'date',
							dateFormat : 'Y-m-d H:i:s'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/extui/user/getTargetList/1'
						})

			});
	var updateBustton;
	function updateGroup(title, groupid, action) {
		sm = new Ext.grid.CheckboxSelectionModel({
					dataIndex : 'id',
					listeners : {
						selectionchange : function(sm) {
							if (sm.getCount() > 0) {
								updateBustton.enable();
							} else {
								updateBustton.disable();
							}

						}
					}
				});
		updateBustton = new Ext.Button({
					text : '添&nbsp;&nbsp;&nbsp;加',
					ref : '../updateButton',
					disabled : true
				});
		var strurl;
		if (action == "update") {
			title = '向' + tree.getSelectionModel().getSelectedNode().text
					+ title;
			strurl = webRoot + '/extui/user/getTargetList/'
					+ tree.getSelectionModel().getSelectedNode().id;
			updateBustton.setHandler(function() {
						var ids = "";
						sm.each(function(r) {
									ids += r.data.id + ",";
								});
						Ext.getCmp('groupform').getForm().submit({
							url : webRoot
									+ '/extui/group/updateGroup/'
									+ ids
									+ "/"
									+ tree.getSelectionModel()
											.getSelectedNode().id + "/update",
							waitMsg : '正在保存...',
							method : 'post',
							success : function(form, action) {
								Ext.MessageBox.alert('提示', '添加成功', function() {

										});
								Ext.getCmp('updateGroupwin').close();
								store.reload();
							},
							failure : function(form, action) {
								Ext.MessageBox.alert('提示', '添加失败,原因为:'
												+ action.result.msg);
							}
						});

					})
		} else if (action == "remove") {
			title = '从' + tree.getSelectionModel().getSelectedNode().text
					+ title;
			updateBustton.setText("删除员工");
			updateBustton.setHandler(function() {
						var ids = "";
						sm.each(function(r) {
									ids += r.data.id + ",";
								});
						Ext.getCmp('groupform').getForm().submit({
							url : webRoot
									+ '/extui/group/updateGroup/'
									+ ids
									+ "/"
									+ tree.getSelectionModel()
											.getSelectedNode().id + "/remove",
							waitMsg : '正在删除...',
							method : 'post',
							success : function(form, action) {
								Ext.MessageBox.alert('提示', '删除成功', function() {

										});
								Ext.getCmp('updateGroupwin').close();
								employeeStore.removeAll();
								store.reload();
							},
							failure : function(form, action) {
								Ext.MessageBox.alert('提示', '删除失败,原因为:'
												+ action.result.msg);
							}
						});
					});
			strurl = webRoot + '/extui/group/getListByGroup/'
					+ tree.getSelectionModel().getSelectedNode().id;
		}
		employeeStore.proxy = new Ext.data.HttpProxy({
					url : strurl
				});
		employeeStore.reload();
		var gpanelForm = new Ext.FormPanel({
					frame : true,
					labelWidth : 70,
					autoHeight : true,
					id : 'groupform',
					autoWidth : true,
					padding : '10 10 20 10',
					buttons : [updateBustton, {
								text : '取&nbsp;&nbsp;&nbsp;消',
								handler : function() {
									Ext.getCmp('updateGroupwin').close();
								}
							}]
				});
		var employee = new Ext.grid.GridPanel({
					store : employeeStore,
					flex : 1,
					border : false,
					height : 300,
					cm : new Ext.grid.ColumnModel({
								columns : [sm, {
											id : 'email',
											header : '电子邮件',
											width : 150,
											sortable : false,
											dataIndex : 'email'
										}, {
											id : 'name',
											header : '姓名',
											width : 150,
											sortable : false,
											dataIndex : 'name'
										}, {
											id : 'userName',
											header : '用户名',
											width : 100,
											sortable : false,
											dataIndex : 'userName'
										}, {
											id : 'lastLogin',
											xtype : 'datecolumn',
											header : '上次登录时间',
											width : 150,
											sortable : true,
											format : 'Y-m-d H:i:s',
											dataIndex : 'lastLogin'
										}],
								defaults : {
									sortable : true,
									menuDisabled : false,
									width : 100
								}
							}),
					loadMask : true,
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
		var windows = new Ext.Window({
					width : 560,
					id : 'updateGroupwin',
					modal : true,
					items : [employee, gpanelForm]

				});
		windows.setTitle(title);
		windows.show();
	}
	function creategroupForm(title, id) {
		var url = "";
		if (id != undefined) {
			url = webRoot + '/extui/group/initRoles/' + id;
			gStore.proxy = new Ext.data.HttpProxy({
						url : webRoot + '/extui/group/list/' + id
					});
		} else {
			gStore.proxy = new Ext.data.HttpProxy({
						url : webRoot + '/extui/group/list/-1'
					});
			url = webRoot + '/extui/group/initRoles/0';
		}
		Ext.Ajax.request({
					url : url,
					success : function(resp, opts) {
						var groupForm = new Ext.form.FormPanel(groupFormConfig);
						var window = new Ext.Window({
									title : title,
									width : 380,
									id : 'groupformwindow',
									autoScroll : true,
									height : 310,
									resizable : false,
									layout : 'vbox',
									border : false,
									modal : true,
									items : groupForm
								});
						if (id != undefined) {
							groupForm.getForm().load({
										clientValidation : false,
										waitMsg : '加载中...',
										url : webRoot + '/extui/group/load/'
												+ id,
										method : 'GET'
									});
						}
						var respText = Ext.util.JSON.decode(resp.responseText);
						Ext.getCmp('check_roles').items = respText;
						window.show();
						if (id != undefined) {
							// 编辑的时候将上级部门内容带到form
							var currId = tree.getSelectionModel()
									.getSelectedNode().id;
							var pId = tree.getNodeById(currId).parentNode.id;
							var pName = tree.getNodeById(currId).parentNode.text;
							if (pId != 'root') {
								Ext.getCmp('parent_id').setValue(pId);
								Ext.getCmp('parent_id').setRawValue(pName);
							}
						}
					}
				});

	}
	if(userName != 'admin'){
		if (!del_bl) {
			panel.removeButton.hide();
			panel.deleteEmployee.hide();
		}
		if (!add_bl) {
			panel.addButton.hide();
			panel.addEmployee.hide();
		}
		if (!edit_bl) {
			panel.editButton.hide();
		}
	}
	return panel;
}
