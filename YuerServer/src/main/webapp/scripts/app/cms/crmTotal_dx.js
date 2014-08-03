function createcrmTotalDX(apptitle) {
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
		root : 'data.crmTotalDXs',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'indexPv'
		}, {
			name : 'gwznPv'
		}, {
			name : 'ddNum'
		}, {
			name : 'dianboNum'
		}, {
			name : 'taoPv'
		}, {
			name : 'uv'
		}, {
			name : 'pv'
		}, {
			name : 'totalPv'
		}, {
			name : 'ddPv'
		}, {
			name : 'orderNum'
		}, {
			name : 'couponNum'
		}, {
			name : 'msgNum'
		}, {
			name : 'resPv'
		}, {
			name : 'newUser'
		}, {
			name : 'status'
		}, {
			name : 'createTime',
			type : 'date',
			dateFormat : 'Y-m-d'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/crmTotalDX/list'
		})
	});
	store.setDefaultSort('createTime', 'desc');
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
				id : 'indexPv',
				header : '首页pv',
				width : 80,
				sortable : true,
				dataIndex : 'indexPv'
			}, {
				id : 'taoPv',
				header : '淘宝优惠券',
				width : 100,
				sortable : true,
				dataIndex : 'taoPv'
			}, {
				id : 'gwznPv ',
				header : '专区',
				width : 80,
				sortable : true,
				dataIndex : 'gwznPv'
			}, {
				id : 'ddPv',
				header : '餐饮热券',
				width : 80,
				sortable : true,
				dataIndex : 'ddPv'
			}, {
				id : 'uv',
				header : '当天UV',
				width : 100,
				sortable : true,
				dataIndex : 'uv'
			}, {
				id : 'pv',
				header : '当天的pv',
				width : 100,
				sortable : true,
				dataIndex : 'pv'
			}, {
				id : 'orderNum',
				header : '当天订购数',
				width : 100,
				sortable : true,
				dataIndex : 'orderNum'
			}, {
				id : 'dianboNum',
				header : '当天点播数量',
				width : 100,
				sortable : true,
				dataIndex : 'dianboNum'
			}, {
				id : 'createTime',
				xtype : 'datecolumn',
				header : '创建时间',
				width : 120,
				sortable : true,
				format : 'Y-m-d',
				dataIndex : 'createTime'
			} , {
				id : 'status',
				header : '状态',
				width : 120,
				sortable : true,
				dataIndex : 'status',
				hidden:is_dx,
				renderer:function(v){
					if(v==0){
						return '未审核';
					}else if(v==1){
						return '已审核';
					}
				}
			} ],
			defaults : {
				sortable : true,
				menuDisabled : false,
				align : 'center',
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
		height : 40,
		style : 'border-bottom:1px solid #ddd',
		border : false,
		id : 'total_dx_form',
		name : 'total_dx_form',
		padding : '4 4 4 4',
		layout : {
			type : 'hbox',
			defaultMargins : '0 5 5 0',
			align : 'left'
		},
		items : [ {
			xtype : 'label',
			style : 'padding:4px 3px 3px 0',
			width : 60,
			text : '创建时间:'
		}, {
			name : 'crmTotalDX.createTime',
			xtype : 'datefield',
			width : 100
		}, {
			xtype : 'label',
			style : 'padding:4px 3px 3px 0',
			width : 10,
			text : '-'
		}, {
			name : 'crmTotalDX.endTime',
			xtype : 'datefield',
			width : 100
		}, {
			xtype : 'button',
			width : 60,
			text : '查询',
			handler : function() {
				store.load();
			}
		},
		{
			xtype : 'button',
			width : 60,
			text : '导出',
			handler : function() {
				var id = Ext.getCmp('total_dx_form').form.id;
				window.location.href = webRootCms + '/crmTotalDX/export?'
						+ $('#' + id).serialize();
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
	var panel = new Ext.Panel(
			{
				title : apptitle,
				tabTip : apptitle,
				closable : true,
				autoScroll : true,
				border : true,
				tbar : [
						{
							text : '添加',
							ref : '../addButton',
							tooltip : '编辑选中的店铺表',
							iconCls : 'add-icon',
							handler : function() {
								createcrmTotalDXForm('添加');
							}
						},{
							text : '编辑',
							ref : '../editButton',
							tooltip : '编辑选中的店铺表',
							iconCls : 'edit-icon',
							disabled : true,
							handler : function() {
								createcrmTotalDXForm('编辑',
										sm.getSelected().data.id);
							}
						},
						{
							text : '删除',
							ref : '../removeButton',
							tooltip : '删除选中的营销数据统计',
							iconCls : 'delete-icon',
							disabled : true,
							handler : function() {
								Ext.MessageBox
										.confirm(
												'删除确认',
												'你确定要删除所选中的营销数据统计吗？',
												function(id) {
													if (id == 'yes') {
														var ids = '';
														// 删除营销数据统计。
														sm.each(function(r) {
															ids += r.data.id;
															ids += ',';
														});
														Ext.Ajax
																.request({
																	url : webRootCms
																			+ '/crmTotalDX/delete/'
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

	function createcrmTotalDXForm(title, id) {
		// 定义编辑表单的界面
		var crmTotalDXFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'crmTotalDXform',
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
				name : 'crmTotalDX.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'crmTotalDX.ratio',
				id : 'ratio',
				allowBlank : false,
				fieldLabel : '比例'
			}, {
				name : 'crmTotalDX.indexPv',
				id : 'indexPv',
				allowBlank : false,
				fieldLabel : '首页pv'
			}, {
				name : 'crmTotalDX.gwznPv',
				id : 'gwznPv',
				allowBlank : false,
				fieldLabel : '专区'
			}, {
				name : 'crmTotalDX.ddPv',
				id : 'ddPv',
				allowBlank : false,
				fieldLabel : '餐饮热券'
			}, {
				name : 'crmTotalDX.taoPv',
				id : 'taoPv',
				allowBlank : false,
				fieldLabel : '淘宝优惠券'
			}, {
				name : 'crmTotalDX.uv',
				id : 'uv',
				allowBlank : false,
				fieldLabel : '当天的用户数'
			}, {
				name : 'crmTotalDX.pv',
				id : 'pv',
				allowBlank : false,
				fieldLabel : '当天的pv'
			}, {
				name : 'crmTotalDX.orderNum',
				id : 'orderNum',
				allowBlank : false,
				fieldLabel : '当天订购数'
			}, {
				name : 'crmTotalDX.dianboNum',
				id : 'dianboNum',
				allowBlank : false,
				fieldLabel : '点播数量'
			}, {
				name : 'crmTotalDX.createTime',
				id : 'createTime',
				format : 'Y-m-d',
				allowBlank : false,
				xtype : 'datefield',
				fieldLabel : '创建时间'
			}, {
				xtype : 'combo',
				typeAhead : true,
				id : 'status',
				triggerAction : 'all',
				hiddenName : 'crmTotalDX.status',
				lazyRender : true,
				editable : false,
				allowBlank : false,
				width : 80,
				emptyText : '选择状态',
				mode : 'local',
				store : new Ext.data.ArrayStore({
					id : 0,
					fields : [ 'label', 'value' ],
					data : [ [ '审核通过', 1 ], [ '不展示', 0 ] ]
				}),
				valueField : 'value',
				displayField : 'label'
			} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('crmTotalDXform').getForm().isValid()) {
								Ext
										.getCmp('crmTotalDXform')
										.getForm()
										.submit(
												{
													url : webRootCms
															+ '/crmTotalDX/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form, action) {
														Ext.MessageBox.alert('提示',
																'保存成功');
														Ext
																.getCmp(
																		'crmTotalDXformwindow')
																.close();
														store.load();
													},
													failure : function(form, action) {
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
							Ext.getCmp('crmTotalDXformwindow').close();
						}
					} ]
		};
		var crmTotalDXForm = new Ext.form.FormPanel(crmTotalDXFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'crmTotalDXformwindow',
			height : 450,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : crmTotalDXForm
		});
		if (id != undefined) {
			crmTotalDXForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRootCms + '/crmTotalDX/load/' + id,
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
