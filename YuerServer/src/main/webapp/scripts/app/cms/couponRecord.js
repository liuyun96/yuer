function createCouponRecordPanel(apptitle) {
	// 分页大小。
	var pagesize = 25;

	var sm = new Ext.grid.CheckboxSelectionModel( {
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
	var store = new Ext.data.JsonStore( {
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
			name : 'buyer.loginAccount'
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
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy( {
			method : 'post',
			url : webRootCms + '/couponRecord/list'
		})
	});
	store.setDefaultSort('receiveTime', 'desc');
	store.on("beforeload", function(thiz, options) {
		// 获取查询表单的查询条件。
			this.baseParams = searchForm.getForm().getValues();
			options.params.limit = pagesize;
			// 可以增加其他必要的条件。
			return true;
		});

	var grid = new Ext.grid.GridPanel( {
		store : store,
		flex : 1,
		border : false,
		cm : new Ext.grid.ColumnModel( {
			columns : [
					sm,
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
						width : 150,
						dataIndex : 'coupon',
						renderer : function(v, m, r) {
							if (v != null) {
								var name = v['itemName'];
								if (name == '' || name == null) {
									name = v['name'];
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
						id : 'loginAccount',
						header : '用户名',
						width : 80,
						dataIndex : 'buyer.loginAccount'
					}, {
						id : 'mobile',
						header : '手机号码',
						width : 100,
						dataIndex : 'mobile'
					}, {
						id : 'code',
						header : '编码',
						width : 80,
						hidden : true,
						dataIndex : 'code'
					}, {
						id : 'receiveTime',
						header : '领取时间',
						width : 125,
						sortable : true,
						dataIndex : 'receiveTime',
						renderer : function(v) {
							if (v != null) {
								return new Date(v).format('Y-m-d H:m:s')
							}
						}
					}, {
						id : 'useTime',
						header : '使用时间',
						width : 125,
						sortable : true,
						dataIndex : 'useTime',
						hidden : true,
						renderer : function(v) {
							if (v != null) {
								return new Date(v).format('Y-m-d H:m:s')
							}
						}
					}, {
						id : 'status',
						header : '状态',
						width : 80,
						sortable : true,
						dataIndex : 'status',
						renderer : function(v) {
							if (v == 3) {
								return '下载失败';
							} else if (v == 0) {
								return '已下载';
							} else if (v == 1) {
								return '已 使用';
							} else if (v == 4) {
								return '已领取';
							}
						}
					}, {
						id : 'type',
						header : '类型',
						width : 80,
						sortable : true,
						dataIndex : 'type',
						renderer : function(v) {
							if (v == 3) {
								return '淘宝';
							} else if (v == 4) {
								return '丁丁网';
							} else if (v == 5) {
								return '熊猫券';
							} else if (v == 6) {
								return '京东券';
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
		bbar : new Ext.PagingToolbar( {
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
	var searchForm = new Ext.form.FormPanel( {
		height : 40,
		style : 'border-bottom:1px solid #ddd',
		border : false,
		padding : '4 4 4 4',
		layout : {
			type : 'hbox',
			defaultMargins : '0 5 5 0',
			align : 'left'
		},
		items : [
				{
					xtype : 'label',
					width : 60,
					text : '用户编号'
				},
				{
					xtype : 'textfield',
					width : 100,
					name : 'couponRecord.buyer.id'
				},
				{
					xtype : 'label',
					width : 60,
					text : '用户账号'
				},
				{
					xtype : 'textfield',
					width : 100,
					name : 'couponRecord.loginAccount'
				},
				{
					xtype : 'label',
					style : 'padding:4px 3px 3px 0',
					width : 60,
					text : '领取时间:'
				},
				{
					name : 'couponRecord.receiveTime',
					id : 'receiveTime',
					xtype : 'datefield',
					width : 100
				},
				{
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					hiddenName : 'couponRecord.status',
					id : 'couponRecord.status',
					lazyRender : true,
					editable : false,
					width : 80,
					emptyText : '是否领取',
					mode : 'local',
					store : new Ext.data.ArrayStore( {
						id : 0,
						fields : [ 'label', 'value' ],
						data : [ [ '全部', null ], [ '下载', 0 ], [ '领取', 4 ] ]
					}),
					valueField : 'value',
					displayField : 'label'
				},
				{
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					hiddenName : 'couponRecord.type',
					id : 'couponRecord.type',
					lazyRender : true,
					editable : false,
					width : 80,
					emptyText : '类型',
					mode : 'local',
					store : new Ext.data.ArrayStore( {
						id : 0,
						fields : [ 'label', 'value' ],
						data : [ [ '全部', null ], [ '淘宝', 3 ], [ '丁丁', 4 ],
								[ '熊猫', 5 ], [ '京东券', 6 ] ]
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
	var panel = new Ext.Panel( {
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
					hidden : true,
					handler : function() {
						createCouponRecordForm('创建新优惠券领取记录');
					}
				},
				{
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的优惠券领取记录',
					iconCls : 'edit-icon',
					disabled : true,
					hidden : true,
					handler : function() {
						createCouponRecordForm('编辑优惠券领取记录',
								sm.getSelected().data.id);
					}
				},
				{
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的优惠券领取记录',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的优惠券领取记录吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除优惠券领取记录。
								sm.each(function(r) {
									ids += r.data.id;
									ids += ',';
								});
								Ext.Ajax.request( {
									url : webRootCms + '/couponRecord/delete/'
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

	function createCouponRecordForm(title, id) {
		// 定义编辑表单的界面
		var couponRecordFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'couponRecordform',
			autoWidth : true,
			padding : '10 10 20 10',
			defaults : {
				anchor : '100%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [ {
				name : 'couponRecord.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'couponRecord.code',
				id : 'code',
				fieldLabel : '编码'
			}, {
				name : 'couponRecord.buyer.id',
				id : 'buyerId',
				fieldLabel : '领取买家'
			}, {
				name : 'couponRecord.receiveTime',
				id : 'receiveTime',
				format : 'Y-m-d H:i:s',
				xtype : 'datefield',
				fieldLabel : '领取时间'
			}, {
				name : 'couponRecord.useTime',
				id : 'useTime',
				format : 'Y-m-d H:i:s',
				xtype : 'datefield',
				fieldLabel : '使用时间'
			}, {
				name : 'couponRecord.status',
				value : 1,
				id : 'status',
				xtype : 'checkbox',
				fieldLabel : '状态'
			} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('couponRecordform').getForm()
									.isValid()) {
								Ext
										.getCmp('couponRecordform')
										.getForm()
										.submit(
												{
													url : webRootCms + '/couponRecord/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'couponRecordformwindow')
																.close();
														store.load();
													},
													failure : function(form,
															action) {
														Ext.MessageBox
																.alert(
																		'提示',
																		'保存失败,原因为:' + action.result.msg);
													}
												});
							}
						}
					}, {
						text : '取&nbsp;&nbsp;&nbsp;消',
						handler : function() {
							Ext.getCmp('couponRecordformwindow').close();
						}
					} ]
		};

		var couponRecordForm = new Ext.form.FormPanel(couponRecordFormConfig);
		var window = new Ext.Window( {
			title : title,
			width : 320,
			id : 'couponRecordformwindow',
			height : 260,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : couponRecordForm
		});
		if (id != undefined) {
			couponRecordForm.getForm().load( {
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRootCms + '/couponRecord/load/' + id,
				method : 'GET'
			});
		}
		window.show();

	}
	return panel;
}
