function createCouponRecordPanelDX(apptitle, buyerId) {
	// 分页大小。
	var pagesize = 25;

	var store = new Ext.data.JsonStore({
		autoLoad : {
			params : {
				limit : pagesize,
				start : 0
			}
		},
		root : 'data.couponRecords',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'code'
		}, {
			name : 'buyerId'
		}, {
			name : 'coupon'
		}, {
			name : 'receiveTime'
		}, {
			name : 'useTime'
		}, {
			name : 'mobile'
		}, {
			name : 'status'
		}, {
			name : 'dd'
		}, {
			name : 'xmShop'
		}, {
			name : 'type'
		}],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/couponRecord/list?couponRecord.orderType=baoyue&couponRecord.buyer.id='+buyerId
		})
	});
	store.setDefaultSort('receiveTime', 'desc');
	store.on("beforeload", function(thiz, options) {
		// 获取查询表单的查询条件。
		//this.baseParams = searchForm.getForm().getValues();
		options.params.limit = pagesize;
		// 可以增加其他必要的条件。
		return true;
	});

	var grid = new Ext.grid.GridPanel({
		store : store,
		flex : 1,
		border : false,
		cm : new Ext.grid.ColumnModel({
			columns : [
					{
						id : 'couponId',
						header : '优惠劵Id',
						width : 80,
						dataIndex : 'coupon',
						renderer : function(v, m, r) {
							if (v != null) {
								return v['id'];
							} else {
								if (r.data['dd'] != null) {
									return r.data['dd']['dis_id'];
								}
								if (r.data['xmShop'] != null) {
									return r.data['xmShop']['shopID'];
								}
							}
						}
					},
					{
						id : 'couponName',
						header : '优惠劵名称',
						width : 200,
						dataIndex : 'coupon',
						renderer : function(v, m, r) {
							if (v != null) {
								var name = v['itemName'];
								if (name == '' || name == null) {
									name = v['shopName'];
								}
								return name;
							} else {
								if (r.data['dd'] != null) {
									return r.data['dd']['dis_title'];
								}
								if (r.data['xmShop'] != null) {
									return r.data['xmShop']['shopName'];
								}
							}
						}
					},
					{
						id : 'imgPath',
						header : '优惠劵图片',
						width : 220,
						dataIndex : 'coupon',
						renderer : function(v, m, r) {
							if (v != null) {
								v = v['imgPath'];
								if (v == null)
									return '尚未设置主图';
								else
									return '<img style="width:80px;" src="'
											+ itvIp + '/' + v + '"/>';
							} else {
								if (r.data['dd'] != null) {
									return '<img src="' + itvIp
											+ '/path/dd_coupon/'
											+ r.data['dd']['dis_id']
											+ '.jpg" width="220" />';
								}
								if (r.data['xmShop'] != null) {
									return '<img src="' + itvIp
											+ '/path/xm_img/'
											+ r.data['xmShop']['shopID']
											+ '.jpg" width="220" />';
									// return r.data['xmShop']['shopName'];
								}
							}
						}
					}, {
						id : 'receiveTime',
						header : '领取时间',
						width : 125,
						sortable : true,
						dataIndex : 'receiveTime',
						renderer : function(v) {
							if (v != null) {
								return new Date(v).format('Y-m-d')
							}
						}
					}, {
						id : 'type',
						header : '类型',
						width : 80,
						sortable : true,
						hidden:true,
						dataIndex : 'type',
						renderer : function(v) {
							if (v == 3) {
								return '淘宝';
							} else if (v == 4) {
								return '丁丁网';
							} else if (v == 5) {
								return '熊猫券';
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

	var window = new Ext.Window({
		title : '优惠券关联图片',
		width : 760,
		height : 600,
		resizable : false,
		layout : 'vbox',
		modal : true,
		border : false,
		items : [ grid ]
	});
	window.show();
}

function createBuyerLogPanel(apptitle) {
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
		root : 'data.buyerLogs',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'loginAccount'
		}, {
			name : 'pages'
		}, {
			name : 'couponType'
		}, {
			name : 'couponNum'
		}, {
			name : 'loginTimes'
		}, {
			name : 'area'
		}, {
			name : 'buyerId'
		}, {
			name : 'status'
		}, {
			name : 'createTime',
			type : 'date',
			dateFormat : 'Y-m-d'
		}, {
			name : 'isActivity'
		}  ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/buyerLog/list'
		})
	});
	store.setDefaultSort('id', 'desc');
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
				id : 'loginAccount',
				header : 'itv账号',
				width : 120,
				sortable : true,
				dataIndex : 'loginAccount'
			}, {
				id : 'pages',
				header : '访问页面',
				width : 300,
				sortable : true,
				dataIndex : 'pages'
			}, {
				id : 'isActivity',
				header : '是否参加活动',
				width : 80,
				dataIndex : 'isActivity'
			}, {
				id : 'couponType',
				header : '优惠券类型',
				width : 100,
				sortable : true,
				dataIndex : 'couponType'
			}, {
				id : 'couponNum',
				header : '优惠券数量',
				width : 80,
				sortable : true,
				dataIndex : 'couponNum'
			}, {
				id : 'loginTimes',
				header : '登入次数',
				width : 80,
				sortable : true,
				dataIndex : 'loginTimes'
			}, {
				id : 'area',
				header : '地区',
				width : 80,
				sortable : true,
				dataIndex : 'area'
			}, {
				id : 'createTime',
				xtype : 'datecolumn',
				hidden:is_dx,
				header : '操作时间',
				width : 120,
				sortable : true,
				format : 'Y-m-d',
				dataIndex : 'createTime'
			}, {
				id : 'status',
				header : '状态',
				width : 80,
				sortable : true,
				hidden:is_dx,
				dataIndex : 'status'
			}, {
				id : 'buyerId',
				header : '优惠券领取详情',
				width : 80,
				sortable : true,
				dataIndex : 'buyerId',
				renderer:function(v){
					return "<a href=javascript:createCouponRecordPanelDX('ddd','"+v+"') >查看详情</a>";
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
		layout : {
			type : 'hbox',
			defaultMargins : '0 5 5 0',
			align : 'left'
		},
		items : [ {
			xtype : 'label',
			width : 60,
			text : 'itv账号'
		}, {
			xtype : 'textfield',
			width : 160,
			name : 'buyerLog.loginAccount'
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
							text : '新增',
							iconCls : 'add-icon',
							ref : '../addButton',
							handler : function() {
								createBuyerLogForm('创建新买家操作日志');
							}
						},
						{
							text : '编辑',
							ref : '../editButton',
							tooltip : '编辑选中的买家操作日志',
							iconCls : 'edit-icon',
							disabled : true,
							handler : function() {
								createBuyerLogForm('编辑买家操作日志',
										sm.getSelected().data.id);
							}
						},
						{
							text : '删除',
							ref : '../removeButton',
							tooltip : '删除选中的买家操作日志',
							iconCls : 'delete-icon',
							disabled : true,
							handler : function() {
								Ext.MessageBox
										.confirm(
												'删除确认',
												'你确定要删除所选中的买家操作日志吗？',
												function(id) {
													if (id == 'yes') {
														var ids = '';
														// 删除买家操作日志。
														sm.each(function(r) {
															ids += r.data.id;
															ids += ',';
														});
														Ext.Ajax
																.request({
																	url : webRootCms
																			+ '/buyerLog/delete/'
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
						}],
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

	function createBuyerLogForm(title, id) {
		var buyerLogFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'buyerLogform',
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
				name : 'buyerLog.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'buyerLog.loginAccount',
				id : 'loginAccount',
				fieldLabel : 'itv账号'
			}, {
				name : 'buyerLog.buyerId',
				id : 'buyerId',
				fieldLabel : '用户编号'
			}, {
				name : 'buyerLog.pages',
				id : 'pages',
				xtype : 'textarea',
				fieldLabel : '访问页面'
			}, {
				name : 'buyerLog.couponType',
				id : 'couponType',
				// xtype:'textarea',
				fieldLabel : '优惠券'
			}, {
				name : 'buyerLog.couponNum',
				id : 'couponNum',
				// xtype:'textarea',
				fieldLabel : '优惠券数量'
			}, {
				name : 'buyerLog.loginTimes',
				id : 'loginTimes',
				fieldLabel : '登入次数'
			}, {
				name : 'buyerLog.area',
				id : 'area',
				fieldLabel : '地区'
			}, {
				name : 'buyerLog.createTime',
				id : 'createTime',
				format : 'Y-m-d',
				xtype : 'datefield',
				fieldLabel : '时间'
			} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('buyerLogform').getForm().isValid()) {
								Ext
										.getCmp('buyerLogform')
										.getForm()
										.submit(
												{
													url : webRootCms
															+ '/buyerLog/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'buyerLogformwindow')
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
							Ext.getCmp('buyerLogformwindow').close();
						}
					} ]
		};
		var buyerLogForm = new Ext.form.FormPanel(buyerLogFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'buyerLogformwindow',
			height : 350,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : buyerLogForm
		});
		if (id != undefined) {
			buyerLogForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRootCms + '/buyerLog/load/' + id,
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
