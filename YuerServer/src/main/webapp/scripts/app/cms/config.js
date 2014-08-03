function createConfigPanel(apptitle) {
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
		root : 'data.configs',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'orderNum'
		}, {
			name : 'orderPercent'
		}, {
			name : 'dianboNum'
		}, {
			name : 'area'
		}, {
			name : 'page'
		}, {
			name : 'status'
		}, {
			name : 'dianboPercent'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/config/list'
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
			columns : [ sm, {
				id : 'orderNum',
				header : '订购数量',
				width : 80,
				sortable : true,
				dataIndex : 'orderNum'
			}, {
				id : 'dianboNum',
				header : '点播数量',
				width : 80,
				sortable : true,
				dataIndex : 'dianboNum'
			}, {
				id : 'orderPercent',
				header : '订购百分比',
				width : 80,
				sortable : true,
				dataIndex : 'orderPercent'
			}, {
				id : 'dianboPercent',
				header : '点播百分比',
				width : 80,
				sortable : true,
				dataIndex : 'dianboPercent'
			}, {
				id : 'area',
				header : '地区',
				width : 400,
				dataIndex : 'area'
			}, {
				id : 'page',
				header : '页面',
				width : 80,
				dataIndex : 'page'
			}, {
				id : 'status',
				header : '状态',
				width : 80,
				sortable : true,
				dataIndex : 'status',
				renderer : function(v) {
					if (v == 1)
						return '有效';
					if (v == 0)
						return '无效';
				}
			} ],
			defaults : {
				sortable : true,
				align:'center',
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
		items : [ {
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
		} ]
	});

	// 最后组装成的List界面。
	var panel = new Ext.Panel({
		title : apptitle,
		tabTip : apptitle,
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [ {
			text : '新增',
			iconCls : 'add-icon',
			ref : '../addButton',
			handler : function() {
				createConfigForm('创建新配置表');
			}
		}, {
			text : '编辑',
			ref : '../editButton',
			tooltip : '编辑选中的配置表',
			iconCls : 'edit-icon',
			disabled : true,
			handler : function() {
				createConfigForm('编辑配置表', sm.getSelected().data.id);
			}
		}, {
			text : '删除',
			ref : '../removeButton',
			tooltip : '删除选中的配置表',
			iconCls : 'delete-icon',
			disabled : true,
			handler : function() {
				Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的配置表吗？', function(id) {
					if (id == 'yes') {
						var ids = '';
						// 删除配置表。
						sm.each(function(r) {
							ids += r.data.id;
							ids += ',';
						});
						Ext.Ajax.request({
							url : webRootCms + '/config/delete/' + ids,
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
		} ],
		layout : {
			type : 'vbox',
			padding : 0,
			align : 'stretchmax'
		},
		defaults : {
			margins : '0 0 0 0'
		},
		items : [ searchForm, grid ]
	});

	function createConfigForm(title, id) {
		// 定义编辑表单的界面
		var configFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'configform',
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
						name : 'config.id',
						id : 'id',
						xtype : 'hidden'
					},
					{
						name : 'config.orderNum',
						id : 'orderNum',
						fieldLabel : '订购数量'
					},
					{
						name : 'config.dianboNum',
						id : 'dianboNum',
						fieldLabel : '点播数量'
					},
					{
						name : 'config.orderPercent',
						id : 'orderPercent',
						fieldLabel : '订购百分比'
					},
					{
						name : 'config.dianboPercent',
						id : 'dianboPercent',
						fieldLabel : '点播百分比'
					},
					{
						name : 'config.area',
						xtype:'textarea',
						id : 'area',
						fieldLabel : '地区'
					},
					{
						xtype : 'combo',
						typeAhead : true,
						triggerAction : 'all',
						allowBlank : false,
						hiddenName : 'config.page',
						id : 'page',
						lazyRender : true,
						editable : false,
						mode : 'local',
						store : new Ext.data.ArrayStore(
								{
									id : 0,
									fields : [ 'label', 'value' ],
									data : [ [ '首页', '首页' ], [ '详情页', '详情页' ],
											[ '个人中心', '个人中心' ],
											[ '淘宝优惠大全', '淘宝优惠大全' ],
											[ '餐饮热券', '餐饮热券' ],
											[ '会员专区', '会员专区' ],
											[ '活动页面', '活动页面' ],
											[ '会员专区', '会员专区' ],
											[ '帮助页面', '帮助页面' ], [ '分类', '分类' ],
											[ '包月确认页', '包月确认页' ],
											[ '点播确认页', '点播确认页' ] ]
								}),
						allowBlank : false,
						valueField : 'value',
						displayField : 'label',
						fieldLabel : '页面'
					}, {
						xtype : 'combo',
						typeAhead : true,
						triggerAction : 'all',
						allowBlank : false,
						hiddenName : 'config.status',
						id : 'status',
						lazyRender : true,
						editable : false,
						mode : 'local',
						store : new Ext.data.ArrayStore({
							id : 0,
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
							if (Ext.getCmp('configform').getForm().isValid()) {
								Ext
										.getCmp('configform')
										.getForm()
										.submit(
												{
													url : webRootCms
															+ '/config/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'configformwindow')
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
							Ext.getCmp('configformwindow').close();
						}
					} ]
		};

		var configForm = new Ext.form.FormPanel(configFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'configformwindow',
			height : 335,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : configForm
		});
		if (id != undefined) {
			configForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRootCms + '/config/load/' + id,
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
