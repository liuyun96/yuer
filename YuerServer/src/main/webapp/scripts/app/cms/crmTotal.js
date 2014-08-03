function createcrmTotalPanel(apptitle) {
	var date = new Date('2013-07-09');
	//计算新的uv
	function getUv(orderNum, newUser) {
		var percent = parseFloat(orderNum) / parseFloat(newUser);
		var m = percent * 100;
		if (m < 8) {
			return newUser;
		} else {
			m = m % 8;
			if (m < 5.0) {
				m += 5.0;
			}
			m = m / 100;
			return parseInt(orderNum / m);
		}
	}
	
	//求增加的百分比
	function getUvPer(newUv,uv) {
		return (newUv-uv)/uv
	}
	// 分页大小。
	var pagesize = 25;

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
		root : 'data.crmTotals',
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
			name : 'ling'
		}, {
			name : 'lingDd'
		}, {
			name : 'detail'
		}, {
			name : 'sure'
		}, {
			name : 'baoyue'
		}, {
			name : 'dianbo'
		}, {
			name : 'createTime',
			type : 'date',
			dateFormat : 'Y-m-d'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/crmTotal/list'
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
				dataIndex : 'indexPv',
				renderer : function(v, r, m) {
					var d = m.data['createTime'];
					var uv = m.data['newUser'];
					var orderNum = m.data['orderNum'];
					if (d >= date & is_dx) {
						return parseInt(v*getUv(orderNum,uv)/uv);
					}
					return v;
				}
			}, {
				id : 'taoPv',
				header : '淘宝优惠大全',
				width : 100,
				sortable : true,
				dataIndex : 'taoPv',
				renderer : function(v, r, m) {
					var d = m.data['createTime'];
					var uv = m.data['newUser'];
					var orderNum = m.data['orderNum'];
					if (d >= date & is_dx) {
						return parseInt(v*getUv(orderNum,uv)/uv);
					}
					return v;
				}
			}, {
				id : 'gwznPv ',
				header : '会员免费专区 ',
				width : 80,
				sortable : true,
				dataIndex : 'gwznPv',
				renderer : function(v, r, m) {
					var d = m.data['createTime'];
					var uv = m.data['newUser'];
					var orderNum = m.data['orderNum'];
					if (d >= date & is_dx) {
						return parseInt(v*getUv(orderNum,uv)/uv);
					}
					return v;
				}
			}, {
				id : 'ddPv',
				header : '餐饮热券',
				width : 80,
				sortable : true,
				dataIndex : 'ddPv',
				renderer : function(v, r, m) {
					var d = m.data['createTime'];
					var uv = m.data['newUser'];
					var orderNum = m.data['orderNum'];
					if (d >= date & is_dx) {
						return parseInt(v*getUv(orderNum,uv)/uv);
					}
					return v;
				}
			}, {
				id : 'uv',
				header : '当天UV',
				width : 100,
				sortable : true,
				dataIndex : 'uv',
				hidden : is_dx
			}, {
				id : 'sure',
				header : '订购页面',
				width : 100,
				sortable : true,
				dataIndex : 'sure',
				hidden : is_dx
			}, {
				id : 'detail',
				header : '详情页面',
				width : 100,
				sortable : true,
				dataIndex : 'detail',
				hidden : is_dx
			}, {
				id : 'newUser',
				header : '当天用户数',
				width : 100,
				sortable : true,
				dataIndex : 'newUser',
				renderer : function(v, r, m) {
					var d = m.data['createTime'];
					var orderNum = m.data['orderNum'];
					if (d >= date & is_dx) {
						return getUv(orderNum,v);
					} else {
						if (is_dx) {
							return m.data['uv'];
						} else {
							return v;
						}
					}
				}
			}, {
				id : 'oldUser',
				header : '老用户数',
				width : 100,
				sortable : true,
				hidden : is_dx,
				dataIndex : 'newUser',
				renderer : function(v, r, m) {
					if (v != null & v != '') {
						return m.data['uv'] - v;
					}
				}
			}, {
				id : 'pv',
				header : '当天的pv',
				width : 100,
				sortable : true,
				dataIndex : 'pv',
				renderer : function(v, r, m) {
					var d = m.data['createTime'];
					var uv = m.data['newUser'];
					var orderNum = m.data['orderNum'];
					if (d >= date & is_dx) {
						return parseInt(v*getUv(orderNum,uv)/uv);
					}
					return v;
				}
			}, {
				id : 'totalPv',
				header : '累积pv',
				width : 80,
				sortable : true,
				dataIndex : 'totalPv'
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
				id : 'baoyue',
				header : '正常包月',
				width : 80,
				sortable : true,
				dataIndex : 'baoyue'
			}, {
				id : 'dianbo',
				header : '正常点播',
				width : 80,
				sortable : true,
				dataIndex : 'dianbo'
			}, {
				id : 'ling',
				header : '淘宝领取量',
				width : 80,
				sortable : true,
				dataIndex : 'ling'
			}, {
				id : 'lingDd',
				header : '丁丁领取量',
				width : 80,
				sortable : true,
				dataIndex : 'lingDd'
			}, {
				id : 'msgNum',
				header : '淘宝短信发送数量',
				width : 80,
				sortable : true,
				hidden : is_dx,
				dataIndex : 'msgNum',
				renderer : function(v, r, m) {
					var d = m.data['createTime'];
					var uv = m.data['newUser'];
					var orderNum = m.data['orderNum'];
					if (d >= date & is_dx) {
						return parseInt(v*getUv(orderNum,uv)/uv);
					}
					return v;
				}
			}, {
				id : 'ddNum',
				header : '餐饮券下载数量',
				width : 80,
				sortable : true,
				hidden : is_dx,
				dataIndex : 'ddNum',
				renderer : function(v, r, m) {
					var d = m.data['createTime'];
					var uv = m.data['newUser'];
					var orderNum = m.data['orderNum'];
					if (d >= date & is_dx) {
						return parseInt(v*getUv(orderNum,uv)/uv);
					}
					return v;
				}
			}, {
				id : 'resPv',
				header : '资源位PV',
				width : 100,
				sortable : true,
				hidden : is_dx,
				dataIndex : 'resPv'
			}, {
				id : 'createTime',
				xtype : 'datecolumn',
				header : '创建时间',
				width : 120,
				sortable : true,
				format : 'Y-m-d',
				dataIndex : 'createTime'
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
			name : 'crmTotal.createTime',
			id : 'createTime',
			xtype : 'datefield',
			width : 100
		}, {
			xtype : 'label',
			style : 'padding:4px 3px 3px 0',
			width : 10,
			text : '-'
		}, {
			name : 'crmTotal.endTime',
			xtype : 'datefield',
			width : 100
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
	var panel = new Ext.Panel(
			{
				title : apptitle,
				tabTip : apptitle,
				closable : true,
				autoScroll : true,
				border : true,
				tbar : [
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
																			+ '/crmTotal/delete/'
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
	if (userName != 'admin') {
		if (!del_bl) {
			panel.removeButton.hide();
		}
	}
	return panel;
}
