function createBuyerOrderPanel(apptitle) {
	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面

	var sm = new Ext.grid.CheckboxSelectionModel({
		dataIndex : 'id',
		listeners : {
			selectionchange : function(sm) {
				if (sm.getCount()) {
					panel.removeButton.enable();
				} else {
					panel.removeButton.disable();
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
		root : 'data.buyerOrders',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'productId'
		}, {
			name : 'buyer'
		}, {
			name : 'fee'
		}, {
			name : 'startTime'
		}, {
			name : 'isSuccess'
		}, {
			name : 'msg'
		}, {
			name : 'auto'
		}, {
			name : 'source'
		}, {
			name : 'loginAccount'
		}, {
			name : 'endTime',
			type : 'date',
			dateFormat : 'Y-m-d'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/buyerOrder/list'
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
				id : 'buyer_id',
				header : '用户编号',
				width : 120,
				sortable : true,
				dataIndex : 'buyer',
				renderer : function(v) {
					if (v != null) {
						return v['id'];
					}
				}
			}, {
				id : 'loginAccount',
				header : 'ITV账号',
				width : 120,
				sortable : true,
				dataIndex : 'loginAccount'
			}, {
				id : 'area',
				header : '城市',
				width : 80,
				hidden : is_dx,
				sortable : true,
				dataIndex : 'buyer',
				renderer : function(v) {
					if (v != null) {
						return v['area'];
					}
				}
			}, {
				id : 'loginTimes',
				header : '登入次数',
				hidden : is_dx,
				width : 100,
				sortable : true,
				dataIndex : 'buyer',
				renderer : function(v) {
					if (v != null) {
						return v['loginTimes'];
					}
				}
			}, {
				header : '',
				width : 60,
				sortable : true,
				hidden : is_dx,
				dataIndex : 'buyer',
				renderer : function(v) {
					if (v != null) {
						var status = v['status'];
						if (status == 1) {
							return '正常 用户';
						} else if (status == 3) {
							return '黑名单';
						}
					}
				}
			}, {
				id : 'fee',
				header : '价格',
				width : 80,
				sortable : true,
				dataIndex : 'fee',
				renderer : function(v) {
					return v / 100;
				}
			}, {
				id : 'productId',
				header : '产品编号',
				width : 100,
				sortable : true,
				dataIndex : 'productId'
			}, {
				id : 'startTime',
				header : '订购时间',
				width : 130,
				sortable : true,
				dataIndex : 'startTime',
				renderer : function(v) {
					if (v != null) {
						return new Date(v).format('Y-m-d H:m:s')
					}
				}
			}, {
				id : 'isSuccess',
				header : '是否订购成功',
				width : 80,
				sortable : true,
				dataIndex : 'isSuccess',
				renderer : function(v) {
					if (v == 1) {
						return '成功';
					} else {
						return '失败';
					}
				}
			}, {
				id : 'auto ',
				header : '',
				width : 80,
				sortable : true,
				dataIndex : 'auto',
				hidden : is_dx,
				renderer : function(v) {
					if (v == 1) {
						return '自动';
					} else {
						return '正常包月';
					}
				}
			}, {
				id : 'source',
				header : '来源',
				hidden : is_dx,
				width : 100,
				dataIndex : 'source'
			}, {
				id : 'msg',
				header : '订购失败原因',
				width : 200,
				dataIndex : 'msg'
			}, {
				id : 'endTime',
				xtype : 'datecolumn',
				header : '结束时间',
				width : 125,
				sortable : true,
				hidden : true,
				dataIndex : 'endTime'
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
		height : 60,
		style : 'border-bottom:1px solid #ddd',
		border : false,
		padding : '4 4 4 4',
		layout : {
			type : 'table',
			columns : 10,
			defaultMargins : '0 5 5 0',
			align : 'left'
		},
		items : [ {
			xtype : 'label',
			width : 60,
			text : 'itv账号'
		}, {
			xtype : 'textfield',
			width : 150,
			name : 'buyerOrder.loginAccount'
		},{
			xtype : 'label',
			width : 60,
			text : '来源'
		}, {
			xtype : 'textfield',
			width : 150,
			name : 'buyerOrder.source'
		}, {
			xtype : 'label',
			width : 60,
			text : '用户编号'
		}, {
			xtype : 'textfield',
			width : 100,
			name : 'buyerOrder.buyer.id'
		}, {
			xtype : 'label',
			style : 'padding:4px 3px 3px 0',
			width : 60,
			text : '订购时间:'
		}, {
			name : 'buyerOrder.startTime',
			id : 'startTime',
			xtype : 'datefield',
			width : 100
		}, {
			xtype : 'label',
			style : 'padding:4px 3px 3px 0',
			width : 10,
			text : '-'
		}, {
			name : 'buyerOrder.endTime',
			xtype : 'datefield',
			width : 100
		}, {
			xtype : 'combo',
			typeAhead : true,
			triggerAction : 'all',
			hiddenName : 'buyerOrder.success',
			lazyRender : true,
			editable : false,
			width : 80,
			emptyText : '是否成功订购',
			mode : 'local',
			store : new Ext.data.ArrayStore({
				id : 0,
				fields : [ 'label', 'value' ],
				data : [ [ '全部', null ], [ '成功订购', 11 ], [ '订购失败', 10 ] ]
			}),
			valueField : 'value',
			displayField : 'label'
		}, {
			xtype : 'combo',
			typeAhead : true,
			triggerAction : 'all',
			hiddenName : 'buyerOrder.fee',
			lazyRender : true,
			editable : false,
			width : 80,
			emptyText : '是否包月',
			mode : 'local',
			store : new Ext.data.ArrayStore({
				id : 0,
				fields : [ 'label', 'value' ],
				data : [ [ '全部', null ], [ '包月', 500 ], [ '点播', 100 ] ]
			}),
			valueField : 'value',
			displayField : 'label'
		}, {
			xtype : 'combo',
			typeAhead : true,
			triggerAction : 'all',
			hiddenName : 'buyerOrder.auto',
			lazyRender : true,
			editable : false,
			hidden : is_dx,
			width : 80,
			emptyText : '是否自动订购',
			mode : 'local',
			store : new Ext.data.ArrayStore({
				id : 0,
				fields : [ 'label', 'value' ],
				data : [ [ '全部', null ], [ '是', 1 ], [ '否', 0 ] ]
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
		} ]
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
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的买家订购记录表',
					iconCls : 'delete-icon',
					disabled : true,
					hidden : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的买家订购记录表吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除买家订购记录表。
										sm.each(function(r) {
											ids += r.data.id;
											ids += ',';
										});
										Ext.Ajax.request({
											url : webRootCms
													+ '/buyerOrder/delete/'
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

	return panel;
}
