function createBuyerPanel(apptitle) {
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
		root : 'data.buyers',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name'
		}, {
			name : 'userType'
		}, {
			name : 'address'
		}, {
			name : 'boxCode'
		}, {
			name : 'tel'
		}, {
			name : 'mobile'
		}, {
			name : 'loginAccount'
		}, {
			name : 'area'
		}, {
			name : 'visitTime'
		}, {
			name : 'loginTimes'
		}, {
			name : 'info'
		}, {
			name : 'status'
		}, {
			name : 'city'
		}, {
			name : 'cityNo'
		}, {
			name : 'condition'
		}, {
			name : 'remark'
		},{
			name:'isOrder'
		},{
			name:'isAutoOrder'
		}],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRoot + '/buyer/list'
		})
	});
	store.setDefaultSort('visitTime', 'desc');
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
						id : 'id',
						header : '买家编号',
						width : 80,
						dataIndex : 'id'
					},
					{
						id : 'loginAccount',
						header : 'ITV账号',
						width : 80,
						sortable : true,
						dataIndex : 'loginAccount'
					},
					{
						id : 'name',
						header : '买家姓名',
						width : 80,
						sortable : true,
						hidden : true,
						dataIndex : 'name'
					},
					{
						id : 'address',
						header : '收货地址',
						width : 80,
						sortable : true,
						hidden : true,
						dataIndex : 'address'
					},
					{
						id : 'boxCode',
						header : '机顶盒编码',
						width : 250,
						sortable : true,
						dataIndex : 'boxCode'
					},
					{
						id : 'tel',
						header : '固定电话',
						width : 80,
						hidden : true,
						sortable : true,
						dataIndex : 'tel'
					},
					{
						id : 'mobile',
						header : '手机号码',
						width : 120,
						hidden : is_dx,
						sortable : true,
						dataIndex : 'mobile'
					},
					{
						id : 'mobile1',
						header : '手机号码1',
						width : 80,
						sortable : true,
						hidden : true,
						dataIndex : 'mobile1'
					},
					{
						id : 'mobile2',
						header : '手机号码2',
						width : 80,
						sortable : true,
						hidden : true,
						dataIndex : 'mobile2'
					},
					{
						id : 'area',
						header : '地级市',
						width : 80,
						dataIndex : 'area'
					},
					{
						id : 'loginTimes',
						header : '登入次数',
						hidden : is_dx,
						width : 80,
						dataIndex : 'loginTimes'
					},
					{
						id : 'visitTime',
						header : '访问时间',
						width : 125,
						sortable : true,
						dataIndex : 'visitTime',
						renderer : function(v) {
							if (v != null) {
								return new Date(v).format('Y-m-d H:m:s')
							}
						}
					},
					{
						id : 'status',
						header : '状态',
						hidden : is_dx,
						width : 80,
						dataIndex : 'status',
						renderer : function(v) {
							if (v == 1) {
								return '正常';
							} else if (v == 2) {
								return '测试';
							} else if (v == 3) {
								return '黑名单';
							} else if (v == 4) {
								return 'VIP';
							}
						}
					},
					{
						id : 'condition',
						header : '是否符合条件',
						hidden : is_dx,
						width : 80,
						dataIndex : 'condition',
						renderer : function(v) {
							if (v == 1) {
								return '符合';
							} else if (v == 0) {
								return '不符合';
							}
						}
					},
					{
						id : 'remark',
						header : '备注',
						hidden : is_dx,
						width : 80,
						dataIndex : 'remark'
					},
					{
						id : 'isOrder',
						header : '是否订购',
						hidden : is_dx,
						width : 80,
						dataIndex : 'isOrder',
						renderer:function(v){
							if(v){
								return '已订购';
							}
							return '未订购';
						}
					},
					{
						id : 'isAutoOrder',
						header : '是否自动订购',
						hidden : is_dx,
						width : 80,
						dataIndex : 'isAutoOrder',
						renderer:function(v){
							if(v){
								return '已自动订购';
							}
							return '未订购';
						}
					},
					{
						id : 'info',
						header : '操作',
						width : 125,
						sortable : true,
						dataIndex : 'id',
						hidden : is_dx,
						renderer : function(v) {
							return String.format('<a target="_blank" href="'
									+ webRoot + '/itv/num/' + v + '">登入</a> | <a target="_blank" href="'
									+ webRoot + '/itv/order/' + v + '/baoyue">包月</a> | <a target="_blank" href="'
									+ webRoot + '/itv/order/' + v + '/dianbo">点播</a>');
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
		height : 55,
		style : 'border-bottom:1px solid #ddd',
		border : false,
		padding : '4 4 4 4',
		id : 'buyer_form',
		name : 'buyer_form',
		layout : {
			type : 'table',
			columns : 10,
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
					name : 'buyerBean.id'
				},
				{
					xtype : 'label',
					width : 60,
					text : '账号名称'
				},
				{
					xtype : 'textfield',
					width : 160,
					name : 'buyerBean.loginAccount'
				},
				{
					xtype : 'label',
					width : 50,
					text : '手机号码'
				},
				{
					xtype : 'textfield',
					width : 100,
					name : 'buyerBean.mobile'
				},
				{
					xtype : 'label',
					width : 50,
					hidden : is_dx,
					text : '状态'
				},
				{
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					hiddenName : 'buyerBean.status',
					lazyRender : true,
					editable : false,
					hidden : is_dx,
					width : 80,
					emptyText : '状态',
					mode : 'local',
					store : new Ext.data.ArrayStore({
						id : 0,
						fields : [ 'label', 'value' ],
						data : [ [ '全部', null ], [ '正常', 1 ], [ '测试', 2 ],
								[ '黑名单', 3 ], [ 'VIP', 4 ] ]
					}),
					valueField : 'value',
					displayField : 'label'
				},
				{
					xtype : 'label',
					width : 50,
					hidden : is_dx,
					text : '是否符合'
				},
				{
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					hiddenName : 'buyerBean.condition',
					lazyRender : true,
					editable : false,
					hidden : is_dx,
					width : 80,
					emptyText : '条件',
					mode : 'local',
					store : new Ext.data.ArrayStore({
						id : 0,
						fields : [ 'label', 'value' ],
						data : [ [ '全部', null ], [ '符合', 1 ], [ '不符合', 0 ] ]
					}),
					valueField : 'value',
					displayField : 'label'
				},
				{
					xtype : 'label',
					style : 'padding:4px 3px 3px 0',
					width : 60,
					text : '访问时间:'
				},
				{
					name : 'buyerBean.startTime',
					xtype : 'datefield',
					width : 100
				},
				{
					xtype : 'label',
					style : 'padding:4px 3px 3px 0',
					width : 10,
					text : '-'
				},
				{
					name : 'buyerBean.endTime',
					xtype : 'datefield',
					width : 100
				},
				{
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
						var id = Ext.getCmp('buyer_form').form.id;
						window.location.href = webRoot + '/buyer/export?'
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
					hidden : true,
					handler : function() {
						createBuyerForm('创建新买家信息表');
					}
				},
				{
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的买家信息表',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						createBuyerForm('编辑买家信息表', sm.getSelected().data.id);
					}
				},
				{
					text : '删除',
					hidden : true,
					ref : '../removeButton',
					tooltip : '删除选中的买家信息表',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的买家信息表吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除买家信息表。
										sm.each(function(r) {
											ids += r.data.id;
											ids += ',';
										});
										Ext.Ajax.request({
											url : webRoot + '/buyer/delete/'
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

	function createBuyerForm(title, id) {

		var buyerFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'buyerform',
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
						name : 'buyer.id',
						id : 'id',
						xtype : 'hidden'
					},
					{
						name : 'buyer.quota',
						id : 'quota',
						xtype : 'hidden'
					},
					{
						name : 'buyer.cityNo',
						id : 'cityNo',
						xtype : 'hidden'
					},
					{
						name : 'buyer.info',
						id : 'info',
						fieldLabel : 'INFO',
						xtype : 'textarea'
					},
					{
						name : 'buyer.loginTimes',
						id : 'loginTimes',
						xtype : 'hidden'
					},
					{
						name : 'buyer.usertoken',
						id : 'usertoken',
						xtype : 'hidden'
					},
					{
						name : 'buyer.visitTime',
						id : 'visitTime',
						xtype : 'hidden'
					},
					{
						name : 'buyer.isOrder',
						id : 'isOrder',
						xtype : 'hidden'
					},
					{
						name : 'buyer.loginAccount',
						id : 'loginAccount',
						xtype : 'hidden'
					},
					{
						name : 'buyer.name',
						id : 'name',
						hidden : true,
						fieldLabel : '买家姓名'
					},
					{
						name : 'buyer.userType',
						id : 'userType',
						hidden : true,
						fieldLabel : '用户类型'
					},
					{
						name : 'buyer.address',
						id : 'address',
						hidden : true,
						fieldLabel : '收货地址'
					},
					{
						name : 'buyer.boxCode',
						id : 'boxCode',
						hidden : true,
						fieldLabel : '机顶盒编码'
					},
					{
						name : 'buyer.tel',
						id : 'tel',
						hidden : true,
						fieldLabel : '固定电话'
					},
					{
						name : 'buyer.mobile',
						id : 'mobile',
						hidden : true,
						fieldLabel : '手机号码'
					},
					{
						name : 'buyer.area',
						id : 'area',
						fieldLabel : '地级市'
					},
					{
						name : 'buyer.city',
						id : 'city',
						fieldLabel : '城市编号'
					},
					{
						xtype : 'combo',
						typeAhead : true,
						triggerAction : 'all',
						hiddenName : 'buyer.status',
						lazyRender : true,
						editable : false,
						id : 'status',
						anchor : '100%',
						emptyText : '选择状态',
						mode : 'local',
						store : new Ext.data.ArrayStore({
							id : 0,
							fields : [ 'label', 'value' ],
							data : [ [ '正常', 1 ], [ '测试', 2 ], [ '黑名单', 3 ],
									[ 'VIP', 4 ] ]
						}),
						valueField : 'value',
						displayField : 'label'
					} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('buyerform').getForm().isValid()) {
								Ext
										.getCmp('buyerform')
										.getForm()
										.submit(
												{
													url : webRoot
															+ '/buyer/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'buyerformwindow')
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
							Ext.getCmp('buyerformwindow').close();
						}
					} ]
		};

		var buyerForm = new Ext.form.FormPanel(buyerFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'buyerformwindow',
			height : 385,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : buyerForm
		});
		if (id != undefined) {
			buyerForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRoot + '/buyer/load/' + id,
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
