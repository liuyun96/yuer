function createCustomLogPanel(apptitle) {
	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面

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
		root : 'data.customLogs',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'mobile'
		}, {
			name : 'startTime'
		}, {
			name : 'problem'
		}, {
			name : 'method'
		}, {
			name : 'zhu'
		}, {
			name : 'talkTime'
		} , {
			name : 'base'
		}],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/customLog/list'
		})
	});
	store.setDefaultSort('startTime', 'desc');
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
				id : 'mobile',
				header : '手机',
				width : 100,
				dataIndex : 'mobile'
			}, {
				id : 'problem',
				header : '投诉及建议',
				width : 200,
				dataIndex : 'problem'
			}, {
				id : 'method',
				header : '处理方法',
				width : 200,
				dataIndex : 'method'
			}, {
				header : '是否处理',
				width : 80,
				dataIndex : 'method',
				renderer:function(v){
					if(v!=''&&v!=null){
						return '已处理';
					}
					return '';
				}
			}, {
				id : 'base',
				header : '基本概况',
				width : 200,
				dataIndex : 'base'
			}, {
				id : 'zhu',
				header : '是否主叫',
				width : 80,
				sortable : true,
				dataIndex : 'zhu',
				renderer : function(v) {
					return v ? '是' : '否';
				}
			}, {
				id : 'talkTime',
				header : '通话时间',
				width : 80,
				sortable : true,
				dataIndex : 'talkTime',
				renderer : function(v) {
					if (v != '' && v != null) {
						return v + '秒';
					}
				}
			}, {
				header : '呼入时间',
				width : 130,
				sortable : true,
				dataIndex : 'startTime',
				renderer : function(v) {
					if (v != null) {
						return new Date(v).format('Y-m-d H:m:s')
					}
				}
			} ],
			defaults : {
				sortable : true,
				align : 'center',
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
	
	var searchForm = new Ext.form.FormPanel({
		height : 40,
		enctype : 'multipart/form-data',
		fileUpload : true,
		style : 'border-bottom:1px solid #ddd',
		border : false,
		padding : '4 4 4 4',
		layout : {
			type : 'hbox',
			defaultMargins : '0 5 5 0',
			align : 'left'
		},
		items : [{
			xtype : 'label',
			width : 45,
			defaultMargins : '5 5 5 5',
			text : '手机号:'
		}, {
			name : 'customLog.mobile',
			width : 160,
			xtype : 'textfield'
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
		}, new Ext.form.TextField({
			xtype : 'fileuploadfield',
			fieldLabel : '图片上传',
			anchor : '45%',
			name : 'file',
			text : '添加图片',
			inputType : 'file'
		}), {
			xtype : 'button',
			width : 60,
			text : '导入',
			handler : function() {
				searchForm.getForm().submit({
					url : webRootCms + '/customLog/upload',
					waitMsg : '加载中...',
					success : function(form, action) {
						Ext.MessageBox.alert('提示', '导入成功');
					}
				});
			}
		} ]
	});

	// 最后组装成的List界面。
	var panel = new Ext.Panel(
			{
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
								createCustomLogForm('创建新客服日志');
							}
						},
						{
							text : '编辑',
							ref : '../editButton',
							tooltip : '编辑选中的客服日志',
							iconCls : 'edit-icon',
							disabled : true,
							handler : function() {
								createCustomLogForm('编辑客服日志',
										sm.getSelected().data.id);
							}
						},
						{
							text : '删除',
							ref : '../removeButton',
							tooltip : '删除选中的客服日志',
							iconCls : 'delete-icon',
							disabled : true,
							handler : function() {
								Ext.MessageBox
										.confirm(
												'删除确认',
												'你确定要删除所选中的客服日志吗？',
												function(id) {
													if (id == 'yes') {
														var ids = '';
														// 删除客服日志。
														sm.each(function(r) {
															ids += r.data.id;
															ids += ',';
														});
														Ext.Ajax
																.request({
																	url : webRootCms
																			+ '/customLog/delete/'
																			+ ids,
																	success : function() {
																		store
																				.load();
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

	function createCustomLogForm(title, id) {

		var customLogFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'customLogform',
			autoWidth : true,
			padding : '10 10 20 10',
			defaults : {
				anchor : '100%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [ {
				name : 'customLog.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'customLog.mobile',
				id : 'mobile',
				anchor : '60%',
				fieldLabel : '手机'
			}, {
				name : 'customLog.startTime',
				id : 'startTimeLog',
				anchor : '60%',
				fieldLabel : '呼入时间',
				format:'H:i',
				xtype:'datetimefield'
			}, {
				name : 'customLog.problem',
				id : 'problem',
				xtype : 'textarea',
				height : 100,
				fieldLabel : '投诉及建议'
			}, {
				name : 'customLog.method',
				id : 'method',
				xtype : 'textarea',
				height : 100,
				fieldLabel : '处理方法'
			}, {
				name : 'customLog.base',
				id : 'base',
				xtype : 'textarea',
				height : 100,
				fieldLabel : '基本概况'
			}, {
				name : 'customLog.zhu',
				value : 1,
				id : 'zhu',
				xtype : 'checkbox',
				hidden : true,
				fieldLabel : '是否主叫'
			}, {
				name : 'customLog.talkTime',
				id : 'talkTime',
				hidden : true,
				fieldLabel : '通话时间'
			} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('customLogform').getForm().isValid()) {
								Ext
										.getCmp('customLogform')
										.getForm()
										.submit(
												{
													url : webRootCms
															+ '/customLog/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'customLogformwindow')
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
							Ext.getCmp('customLogformwindow').close();
						}
					} ]
		};

		var customLogForm = new Ext.form.FormPanel(customLogFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 500,
			id : 'customLogformwindow',
			height : 500,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : customLogForm
		});
		if (id != undefined) {
			customLogForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRootCms + '/customLog/load/' + id,
				method : 'GET',
				success : function() {
					var startTime = sm.getSelected().data.startTime;
					if(startTime!=''){
						startTime = new Date(startTime).format('Y-m-d H:i:s');
						Ext.getCmp('startTimeLog').setValue(startTime);
					}
				}
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
