function createCouponEffectPanel(apptitle) {
	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面
	var couponEffectFormConfig = {
		frame : true,
		labelWidth : 70,
		autoHeight : true,
		id : 'couponEffectform',
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
			name : 'couponEffect.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			name : 'couponEffect.shopId',
			id : 'shopId',
			fieldLabel : '店铺编号'
		}, {
			name : 'couponEffect.cover',
			id : 'cover',
			fieldLabel : '覆盖人群'
		}, {
			name : 'couponEffect.send',
			id : 'send',
			fieldLabel : '优惠劵发放总量'
		}, {
			name : 'couponEffect.load',
			id : 'load',
			fieldLabel : '下载量'
		}, {
			name : 'couponEffect.use',
			id : 'use',
			fieldLabel : '使用量'
		}, {
			name : 'couponEffect.volume',
			id : 'volume',
			fieldLabel : '成交量'
		} ],
		buttons : [
				{
					text : '保&nbsp;&nbsp;&nbsp;存',
					handler : function() {
						if (Ext.getCmp('couponEffectform').getForm().isValid()) {
							Ext
									.getCmp('couponEffectform')
									.getForm()
									.submit(
											{
												url : webRoot
														+ '/couponEffect/save',
												waitMsg : '正在保存...',
												method : 'post',
												success : function(form, action) {
													Ext.MessageBox.alert('提示',
															'保存成功');
													Ext
															.getCmp(
																	'couponEffectformwindow')
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
						Ext.getCmp('couponEffectformwindow').close();
					}
				} ]
	};

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
		root : 'data.couponEffects',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'down'
		}, {
			name : 'use'
		}, {
			name : 'click'
		}, {
			name : 'coupon'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRoot + '/couponEffect/list'
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

	var grid = new Ext.grid.GridPanel(
			{
				store : store,
				flex : 1,
				border : false,
				cm : new Ext.grid.ColumnModel(
						{
							columns : [
									sm,
									{
										id : 'imgPath',
										header : '图片',
										width : 80,
										dataIndex : 'coupon',
										renderer : function(v) {
											v = v['imgPath'];
											if (v == null || v == '')
												return '';
											else
												return '<img onmouseOver=MsgBox.showImg(this,"/'
														+ v
														+ '") style="width:65px;" src="'
														+ webRoot
														+ '/'
														+ v
														+ '"/>';
										}
									}, {
										id : 'couponId',
										header : '优惠券ID',
										width : 150,
										dataIndex : 'coupon',
										renderer : function(v) {
											return v = v['id'];
										}
									}, {
										id : 'couponName',
										header : '优惠券名称',
										width : 150,
										dataIndex : 'coupon',
										renderer : function(v) {
											name = v['name'];
											if (name != '') {
												return v['name'];
											} else {
												return v['itemName'];
											}
										}
									}, {
										id : 'click',
										header : '用户点击量',
										width : 80,
										sortable : true,
										dataIndex : 'click'
									}, {
										id : 'down',
										header : '用户下载量',
										width : 80,
										sortable : true,
										dataIndex : 'down'
									}, {
										id : 'use',
										header : '用户领取量',
										width : 80,
										sortable : true,
										dataIndex : 'use'
									}, {
										id : 'type',
										header : '优惠券类型',
										width : 80,
										sortable : true,
										dataIndex : 'coupon',
										renderer : function(v) {
											v = v['type'];
											if (v == 1)
												return '店铺优惠券';
											if (v == 2)
												return '商品优惠券';
											if (v == 3)
												return '淘宝优惠券';
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
			text : '优惠券id'
		}, {
			xtype : 'textfield',
			width : 100,
			name : 'coupon.id'
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
					text : '新增',
					iconCls : 'add-icon',
					ref : '../addButton',
					hidden : true,
					handler : function() {
						createCouponEffectForm('创建新优惠劵效果表');
					}
				},
				{
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的优惠劵效果表',
					iconCls : 'edit-icon',
					hidden : true,
					disabled : true,
					handler : function() {
						createCouponEffectForm('编辑优惠劵效果表',
								sm.getSelected().data.id);
					}
				},
				{
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的优惠劵效果表',
					iconCls : 'delete-icon',
					disabled : true,
					hidden : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的优惠劵效果表吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除优惠劵效果表。
										sm.each(function(r) {
											ids += r.data.id;
											ids += ',';
										});
										Ext.Ajax.request({
											url : webRoot
													+ '/couponEffect/delete/'
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

	function createCouponEffectForm(title, id) {
		var couponEffectForm = new Ext.form.FormPanel(couponEffectFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'couponEffectformwindow',
			height : 285,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : couponEffectForm
		});
		if (id != undefined) {
			couponEffectForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRoot + '/couponEffect/load/' + id,
				method : 'GET'
			});
		}
		window.show();

	}
	return panel;
}
