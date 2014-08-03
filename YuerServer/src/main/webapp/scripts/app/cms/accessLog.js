function createAccessLogPanel(apptitle) {
	// 分页大小。
	var pagesize = 25;

	var sm = new Ext.grid.CheckboxSelectionModel({
		dataIndex : 'id',
		listeners : {
			selectionchange : function(sm) {
				if (sm.getCount()) {
					if (sm.getCount() == 1)// 只有选中一个时候才可以编辑。
						panel.editButton.enable();
					else
						panel.editButton.disable();
				} else {
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
		root : 'data.accessLogs',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'userId'
		}, {
			name : 'uri'
		}, {
			name : 'type'
		}, {
			name : 'area'
		}, {
			name : 'couponName'
		}, {
			name : 'logTime'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/accessLog/list'
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
			columns : [
					sm,
					{
						id : 'userId',
						header : '用户编号',
						width : 80,
						sortable : true,
						dataIndex : 'userId'
					},
					{
						id : 'couponId',
						header : '优惠券编号',
						width : 100,
						sortable : true,
						dataIndex : 'type',
						renderer : function(v, m, r) {
							var uri = r.data['uri'];
							var reg = /[1-9][0-9]*/g;
							var numList = uri.match(reg);
							if (numList != null) {
								var num = numList[0];
								if (num > 100 && num < 10000000000000000) {
									var str = '';
									if (uri.indexOf('DD') != -1
											|| uri.indexOf('Dd') != -1) {
										str = '(丁丁券)';
									} else {
										str = '(淘宝券)';
									}
									return num + str;
								}
							}
						}
					}, {
						id : 'couponName',
						header : '优惠券名称',
						width : 100,
						dataIndex : 'couponName'
					}, {
						id : 'type',
						header : '访问类型/代号',
						width : 100,
						sortable : true,
						dataIndex : 'type',
						renderer : function(v) {
							if (v != null) {
								var type = '';
								if (v == 'vitv') {
									type = '首页';
								} else if (v == 'kind') {
									type = '分类页面';
								} else if (v == 'index_h') {
									type = '活动页面';
								} else if (v == 'index_l') {
									type = '首页左侧';
								} else if (v == 'index_p') {
									type = '首页右侧海报';
								} else if (v == 'index_r') {
									type = '首页右下角';
								}else if (v == 'game1') {
									type = '活动页面首页';
								} else if (v == 'tao') {
									type = '淘宝优惠大全';
								} else if (v == 'help') {
									type = '帮助页面';
								} else if (v == 'detail') {
									type = '详情页面';
								} else if (v == 'baoyueSure') {
									type = '包月确认页面';
								} else if (v == 'dianboSure') {
									type = '点播确认页面';
								} else if (v == 'sure') {
									type = '订购页面';
								} else if (v == 'dd') {
									type = '餐饮热券';
								} else if (v == 'sjzg') {
									type = '会员专区';
								} else if (v == 'er') {
									type = '二级菜单';
								} else if (v == 'detailMore') {
									type = '详情页更多';
								} else if (v == 'grzx') {
									type = '个人中心';
								} else if (v == 'dd_ping') {
									type = '品牌特惠';
								} else if (v == 'dd_hot') {
									type = '特价专区';
								} else if (v == 'dd_price') {
									type = '热门优惠';
								} else if (v == 'start') {
									type = '开始抽奖';
								} else if (v == 'explain') {
									type = '奖品说明';
								} else if (v == 'rule') {
									type = '活动规则';
								} else if (v == 'lingDd') {
									type = '领取页面';
								} else if (v == 'lingView') {
									type = '领取页面';
								} else {
									return v;
								}
								return type + ' / ' + v;
							}
						}
					}, {
						id : 'uri',
						header : 'uri',
						width : 350,
						sortable : true,
						dataIndex : 'uri'
					}, {
						id : 'area',
						header : 'area',
						width : 80,
						sortable : true,
						dataIndex : 'area'
					}, {
						id : 'logTime',
						header : '访问时间',
						width : 130,
						sortable : true,
						dataIndex : 'logTime',
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
	// 查询表单
	var searchForm = new Ext.form.FormPanel({
		height : 80,
		style : 'border-bottom:1px solid #ddd;font-size:8px;',
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
			text : '用户编号'
		}, {
			xtype : 'textfield',
			width : 160,
			name : 'accessLog.userId'
		}, {
			xtype : 'label',
			width : 60,
			text : 'itv账号'
		}, {
			xtype : 'textfield',
			width : 160,
			name : 'accessLog.loginAccount'
		}, {
			xtype : 'label',
			width : 60,
			text : '区域'
		}, {
			xtype : 'textfield',
			width : 160,
			name : 'accessLog.area'
		}, {
			xtype : 'label',
			width : 60,
			text : '访问类型代号'
		}, {
			xtype : 'textfield',
			width : 160,
			name : 'accessLog.type'
		}, {
			xtype : 'label',
			width : 60,
			text : 'uri'
		}, {
			xtype : 'textfield',
			width : 160,
			name : 'accessLog.uri'
		}, {
			xtype : 'label',
			width : 60,
			text : '访问时间'
		}, {
			width : 160,
			id : 'logTime',
			xtype : 'datefield',
			name : 'accessLog.logTime'
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
		tbar : [ {
			text : '编辑',
			ref : '../editButton',
			tooltip : '编辑选中的访问日志',
			iconCls : 'edit-icon',
			disabled : true,
			handler : function() {
				createAccessLogForm('编辑访问日志', sm.getSelected().data.id);
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

	function createAccessLogForm(title, id) {

		var accessLogFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'accessLogform',
			autoWidth : true,
			padding : '10 10 20 10',
			defaults : {
				anchor : '100%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [ {
				name : 'accessLog.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'accessLog.couponName',
				id : 'couponName',
				fieldLabel : '优惠券名称'
			} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('accessLogform').getForm().isValid()) {
								Ext
										.getCmp('accessLogform')
										.getForm()
										.submit(
												{
													url : webRootCms
															+ '/accessLog/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'accessLogformwindow')
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
							Ext.getCmp('accessLogformwindow').close();
						}
					} ]
		};

		var accessLogForm = new Ext.form.FormPanel(accessLogFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'accessLogformwindow',
			height : 235,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : accessLogForm
		});
		if (id != undefined) {
			accessLogForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRootCms + '/accessLog/load/' + id,
				method : 'GET'
			});
		}
		window.show();

	}

	if (userName != 'admin') {
		if (!edit_bl) {
			panel.editButton.hide();
		}
	}
	return panel;
}
