function createCouponRecordPanelJD(apptitle, couponId) {
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
			url : webRootCms + '/couponRecord/list?coupon.id=' + couponId
					+ '&couponRecord.status=4'
		})
	});
	store.setDefaultSort('receiveTime', 'desc');
	store.on("beforeload", function(thiz, options) {
		// 获取查询表单的查询条件。
			// this.baseParams = searchForm.getForm().getValues();
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
	var window = new Ext.Window( {
		title : '优惠券领取记录',
		width : 800,
		height : bHeight,
		resizable : false,
		layout : 'vbox',
		modal : true,
		border : false,
		items : [ grid ]
	});
	window.show();
}
