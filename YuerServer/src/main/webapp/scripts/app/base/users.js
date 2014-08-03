function createUserPanel(apptitle) {
	var cpId = "needInit";
	// 自定义密码验证 password为验证函数名
	Ext.apply(Ext.form.VTypes, {
				password : function(val, field) {// val指这里的文本框值，field指这个文本框组件，大家要明白这个意思
					if (field.confirmTo) {// confirmTo是我们自定义的配置参数，一般用来保存另外的组件的id值
						var pwd = Ext.get(field.confirmTo);// 取得confirmTo的那个id的值
						return (val == pwd.getValue());
					}
					return true;
				}
			});

	// 分页大小。
	var status = false;
	var action;
	var pagesize = 25;

	var userName = '';
	// 定义编辑表单的界面
	var userFormConfig = {
		frame : true,
		autoScroll : true,
		labelWidth : 60,
		height : 300,
		id : 'userform',
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
			name : 'user.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			name : 'roleIds',
			id : 'roleIds',
			xtype : 'hidden'
		}, {
			name : 'user.name',
			id : 'name',
			fieldLabel : '姓名',
			allowBlank : false
		}, {
			name : 'user.userName',
			id : 'userName',
			fieldLabel : '登入名',
			allowBlank : false,
			invalidText : "用户名已存在",
			validationEvent : 'blur',
			validator : function(r) {
				r = r.replace(/^\s+|\s+$/g, "");
				if (action == 'edit') {
					r == userName;
					return true;
				}
				if (r.length != 0) {
					Ext.Ajax.request({
								url : webRoot + '/extui/user/queryNameExists/'
										+ r,
								async : true,
								success : function(req) {
									var jsonObj = eval("("
											+ eval("(" + req.responseText + ")").data
											+ ")");
									status = jsonObj.status;
									if (!status) {
										Ext.getCmp('userName').setValue('');
									}
								}
							});
				}
				return true;
			}
		}, {
			name : 'user.email',
			id : 'email',
			fieldLabel : '电子邮件',
			vtype : 'email'

		}, {
			xtype : 'textfield',
			fieldLabel : '新密码',
			name : 'user.password',
			id : 'password',
			width : 150,
			inputType : 'password',
			allowBlank : false
		}, {
			xtype : 'textfield',
			fieldLabel : '确认密码',
			name : 'repassword',
			id : 'repassword',
			width : 150,
			inputType : 'password',
			vtype : 'password',
			vtypeText : "两次密码不一致！",
			confirmTo : 'password',
			allowBlank : false
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
				if (Ext.getCmp('userform').getForm().isValid()) {
					var checks = "";
					Ext.getCmp('check_roles').items.each(function(item) {
								if (item.checked) {
									checks += item.value + ',';
								}
							});
					Ext.getCmp('roleIds').setValue(checks);
					Ext.getCmp('userform').getForm().submit({
						url : webRoot + '/extui/user/save',
						waitMsg : '正在保存...',
						method : 'post',
						success : function(form, action) {
							Ext.MessageBox.alert('提示', '保存成功');
							Ext.getCmp('userformwindow').close();
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
				Ext.getCmp('userformwindow').close();
			}
		}]
	};

	var sm = new Ext.grid.CheckboxSelectionModel({
				dataIndex : 'id',
				listeners : {
					selectionchange : function(sm) {
						if (sm.getCount()) {
							panel.removeButton.enable();
							panel.aboutshopButton.enable();// 添加关联店铺的按钮
							if (sm.getCount() == 1)// 只有选中一个时候才可以编辑。
								panel.editButton.enable();
							else
								panel.editButton.disable();
						} else {
							panel.removeButton.disable();
							panel.editButton.disable();
							panel.aboutshopButton.disable();// 添加关联店铺的按钮
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
							name : 'password'
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
	store.on("beforeload", function(thiz, options) {
				// 获取查询表单的查询条件。
				this.baseParams = searchForm.getForm().getFieldValues();
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
										id : 'id',
										header : '编号',
										width : 100,
										sortable : false,
										dataIndex : 'id'
									}, {
										id : 'userName',
										header : '登入名',
										width : 100,
										sortable : false,
										dataIndex : 'userName'
									}, {
										id : 'name',
										header : '姓名',
										width : 150,
										sortable : false,
										dataIndex : 'name'
									}, {
										id : 'email',
										header : '电子邮件',
										width : 150,
										sortable : false,
										dataIndex : 'email'
									}, {
										id : 'lastLogin',
										xtype : 'datecolumn',
										header : '用户创建时间',
										width : 125,
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
				// paging bar on the bottom
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
				hidden : true,
				layout : {
					type : 'hbox',
					padding : 8,
					defaultMargins : '0 5 5 0',
					align : 'left'
				},
				items : [{
							xtype : 'label',
							width : 35,
							text : '姓名:'
						}, {
							xtype : 'textfield',
							width : 150,
							name : 'user.name'
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
					handler : function() {
						action = "add";
						cpId = "needInit";
						createUserForm('创建新用户');
					}
				}, {
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的用户',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						action = "edit";
						createUserForm('编辑用户', sm.getSelected().data.id);
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的用户',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的用户吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除用户。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRoot
															+ "/cp/deleteUserCp/"
															+ ids
												})
										Ext.Ajax.request({
													url : webRoot
															+ '/extui/user/delete/'
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
				}, {
					text : '添加用户关联的店铺',
					ref : '../aboutshopButton',
					tooltip : '对选中的用户添加关联店铺',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						var ids = '';
						sm.each(function(r) {
									ids += r.data.id;
									ids += ',';
								});
						// 创建一个弹出窗口
						createAssociateShopWindow(ids);
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

	function createUserForm(title, id) {
		var url = "";
		if (id != undefined) {
			url = webRoot + '/extui/user/initRoles/' + id;
		} else {
			url = webRoot + '/extui/user/initRoles/0';
		}
		Ext.Ajax.request({
					url : url,
					success : function(resp, opts) {
						var userForm = new Ext.form.FormPanel(userFormConfig);
						var window = new Ext.Window({
									title : title,
									width : 460,
									id : 'userformwindow',
									height : 330,
									resizable : false,
									layout : 'vbox',
									border : false,
									modal : true,
									items : userForm
								});
						if (id != undefined) {
							userForm.getForm().load({
										clientValidation : false,
										waitMsg : '加载中...',
										url : webRoot + '/extui/user/load/'
												+ id,
										method : 'GET'
									});
							var pwd = sm.getSelected().data.password;
							userName = sm.getSelected().data.userName;
							Ext.getCmp('repassword').setValue(pwd);
						}
						var respText = Ext.util.JSON.decode(resp.responseText);
						if (respText != "") {
							Ext.getCmp('check_roles').items = respText;
							window.show();
						} else {
							Ext.MessageBox.alert("提示", "未找到角色，请先新建角色");
						}
					}
				});
	}
	return panel;
}
