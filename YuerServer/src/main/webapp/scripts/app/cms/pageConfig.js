function createPageConfigPanel(apptitle) {
	// 分页大小。
	var pagesize = 25;

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
		root : 'data.pageConfigs',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'type'
		}, {
			name : 'status'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/pageConfig/list'
		})
	});
	store.setDefaultSort('', '');
	store.on("beforeload", function(thiz, options) {
		// 获取查询表单的查询条件。
		options.params.limit = pagesize;
		// 可以增加其他必要的条件。
		return true;
	});

	var grid = new Ext.grid.GridPanel({
		store : store,
		flex : 1,
		border : false,
		cm : new Ext.grid.ColumnModel({
			columns : [ sm, {
				id : 'type',
				header : '分类',
				width : 80,
				sortable : true,
				dataIndex : 'type'
			}, {
				id : 'status',
				header : '状态',
				width : 80,
				sortable : true,
				dataIndex : 'status',
				renderer : function(v) {
					return v==1 ? '可用' : '不可用';
				}
			} ],
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

	// 最后组装成的List界面。
	var panel = new Ext.Panel({
		title : apptitle,
		tabTip : apptitle,
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [
				{
					text : '新增',
					iconCls : 'add-icon',
					ref : '../addButton',
					handler : function() {
						createPageConfigForm('创建新页面配置表');
					}
				},
				{
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的页面配置表',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						createPageConfigForm('编辑页面配置表',
								sm.getSelected().data.id);
					}
				},
				{
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的页面配置表',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的页面配置表吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除页面配置表。
										sm.each(function(r) {
											ids += r.data.id;
											ids += ',';
										});
										Ext.Ajax.request({
											url : webRootCms
													+ '/pageConfig/delete/'
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
				}],
		layout : {
			type : 'vbox',
			padding : 0,
			align : 'stretchmax'
		},
		defaults : {
			margins : '0 0 0 0'
		},
		items : [grid ]
	});

	function createPageConfigForm(title, id) {
		// 定义编辑表单的界面
		var pageConfigFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'pageConfigform',
			autoWidth : true,
			padding : '10 10 20 10',
			defaults : {
				anchor : '100%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [ {
				name : 'pageConfig.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				xtype : 'combo',
				typeAhead : true,
				triggerAction : 'all',
				hiddenName : 'pageConfig.type',
				id : 'type',
				lazyRender : true,
				editable : false,
				emptyText : '请选择类别...',
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'label', 'value' ],
					data : [ [ '过度页', '过度页' ]]
				}),
				valueField : 'value',
				displayField : 'label',
				fieldLabel : '类别'
			}, {
				xtype : 'combo',
				typeAhead : true,
				triggerAction : 'all',
				allowBlank : false,
				hiddenName : 'pageConfig.status',
				id : 'status',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'label', 'value' ],
					data : [ [ '有效', 1 ], [ '无效', 0 ] ]
				}),
				valueField : 'value',
				displayField : 'label',
				fieldLabel : '状态'
			} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('pageConfigform').getForm()
									.isValid()) {
								Ext
										.getCmp('pageConfigform')
										.getForm()
										.submit(
												{
													url : webRootCms
															+ '/pageConfig/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'pageConfigformwindow')
																.close();
														store.load();
													},
													failure : function(form,
															action) {
														Ext.MessageBox
																.alert(
																		'提示',
																		'保存失败,原因为:'
																				+ action.result.msg);
													}
												});
							}
						}
					}, {
						text : '取&nbsp;&nbsp;&nbsp;消',
						handler : function() {
							Ext.getCmp('pageConfigformwindow').close();
						}
					} ]
		};

		var pageConfigForm = new Ext.form.FormPanel(pageConfigFormConfig);

		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'pageConfigformwindow',
			height : 185,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : pageConfigForm
		});
		if (id != undefined) {
			pageConfigForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRootCms + '/pageConfig/load/' + id,
				method : 'GET'
			});
		}
		window.show();

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
