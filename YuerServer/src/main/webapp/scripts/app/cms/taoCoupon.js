function createTaoCouponPanel(apptitle) {
	
	
	var dictsByType = new Ext.data.JsonStore({
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name'
		} ],
		url : webRoot + '/coupon/findByParentId/24',
		id : 'id',
		root : 'data.Dicts'
	});
	
	// 分页大小。
	var pagesize = 18;
	// 定义编辑表单的界面

	var sm = new Ext.grid.CheckboxSelectionModel({
		dataIndex : 'id',
		listeners : {
			selectionchange : function(sm) {
				if (sm.getCount()) {
					panel.auditButton.enable();
					panel.basketButton.enable();
					panel.removeButton.enable();
					if (sm.getCount() == 1)// 只有选中一个时候才可以编辑。
						panel.editButton.enable();
					else
						panel.editButton.disable();
				} else {
					panel.auditButton.disable();
					panel.basketButton.disable();
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
		root : 'data.coupons',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'couponId'
		}, {
			name : 'shopName'
		}, {
			name : 'keyword'
		}, {
			name : 'denominations'
		}, {
			name : 'useCondition'
		}, {
			name : 'limitNum'
		}, {
			name : 'endTime',
			type : 'date',
			dateFormat : 'Y-m-d'
		}, {
			name : 'downNum'
		}, {
			name : 'num'
		}, {
			name : 'sellerType'
		}, {
			name : 'url'
		}, {
			name : 'name'
		}, {
			name : 'name'
		}, {
			name : 'itemPrice'
		}, {
			name : 'imgPath'
		}, {
			name : 'detail'
		}, {
			name : 'limitNum'
		}, {
			name : 'createTime',
			type : 'date',
			dateFormat : 'Y-m-d'
		}, {
			name : 'dict'
		}, {
			name : 'type'
		}, {
			name : 'status'
		}, {
			name : 'shopUrl'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRoot + '/coupon/list?coupon.type=3'
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
										dataIndex : 'imgPath',
										renderer : function(v) {
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
									},
									{
										id : 'id',
										header : '优惠券ID',
										width : 80,
										sortable : true,
										dataIndex : 'id'
									},
									{
										id : 'shopName',
										header : '店铺名称',
										width : 120,
										dataIndex : 'shopName',
										renderer : function(v, m, r) {
											var shopUrl = r.data['shopUrl'];
											return '<a href="' + shopUrl
													+ '" target="_blank">' + v
													+ '</a>';
										}
									},
									{
										id : 'name',
										header : '商品名称',
										width : 80,
										sortable : true,
										dataIndex : 'name'
									},
									{
										id : 'itemPrice',
										header : '商品价格',
										width : 80,
										sortable : true,
										dataIndex : 'itemPrice'
									},
									{
										id : 'denominations',
										header : '优惠金额',
										width : 80,
										sortable : true,
										dataIndex : 'denominations',
										renderer : function(v) {
											return v + '元';
										}
									},
									{
										id : 'useCondition',
										header : '使用条件',
										width : 80,
										sortable : true,
										dataIndex : 'useCondition',
										renderer : function(v) {
											return '满' + v + '元';
										}
									},
									{
										id : 'limitNum',
										header : '用户限领',
										width : 80,
										sortable : true,
										hidden : true,
										dataIndex : 'limitNum'
									},
									{
										id : 'downNum',
										header : '发行张数',
										width : 80,
										sortable : true,
										hidden : true,
										dataIndex : 'downNum'
									},
									{
										header : '关键字',
										width : 80,
										dataIndex : 'keyword'
									},
									{
										id : 'num',
										header : '领取张数',
										width : 80,
										sortable : true,
										dataIndex : 'num',
										renderer : function(v) {
											return v + '张';
										}
									},
									{
										id : 'sellerType',
										header : '商家类型',
										width : 80,
										sortable : true,
										dataIndex : 'sellerType',
										hidden : true,
										renderer : function(v) {
											if (v == 1) {
												return '天猫';
											}
											if (v == 0) {
												return 'C点';
											}
											if (v == 2) {
												return '手动添加';
											}
										}
									},
									{
										id : 'endTime',
										xtype : 'datecolumn',
										header : '有效时间',
										width : 80,
										sortable : true,
										format : 'Y-m-d',
										dataIndex : 'endTime'
									},
									{
										id : 'status',
										header : '状态',
										width : 60,
										sortable : true,
										dataIndex : 'status',
										renderer : function(v) {
											if (v == 1)
												return '审核中';
											if (v == 2)
												return '活动中';
											if (v == 3)
												return '审核未通过';
											if (v == 4)
												return '已下架';
											if (v == 5)
												return '已删除';
										}
									},
									{
										id : 'createTime',
										header : '同步时间',
										width : 120,
										sortable : true,
										xtype : 'datecolumn',
										dataIndex : 'createTime',
										format : 'Y-m-d'
									},
									{
										header : '操作',
										width : 120,
										renderer : function(v, m, r) {
											var couponId = r.data['id'];
											return String
													.format('<a href="'
															+ webRoot
															+ '/vitv/detail/'+couponId+'" target="_blank" >预览</a>');
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
		height : 50,
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
					hidden:true,
					text : '优惠券id'
				},
				{
					xtype : 'textfield',
					width : 100,
					hidden:true,
					name : 'coupon.id'
				},
				{
					xtype : 'label',
					width : 60,
					text : '店铺名称'
				},
				{
					xtype : 'textfield',
					width : 160,
					name : 'coupon.shopName'
				},
				{
					xtype : 'label',
					width : 50,
					text : '关键字'
				},
				{
					xtype : 'textfield',
					width : 100,
					name : 'coupon.keyword'
				},
				{
					xtype : 'label',
					width : 60,
					text : '审核状态:'
				},
				{
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					hiddenName : 'coupon.status',
					lazyRender : true,
					editable : false,
					anchor : '10%',
					emptyText : '选择审核状态',
					mode : 'local',
					store : new Ext.data.ArrayStore({
						id : 0,
						fields : [ 'label', 'value' ],
						data : [ [ '全部', -1 ], [ '审核中', 1 ], [ '活动中', 2 ],
								[ '审核失败', 3 ], [ '活动结束', 4 ], [ '已删除', 5 ] ]
					}),
					valueField : 'value',
					displayField : 'label'
				}, {
					name : 'coupon.createTime',
					id : 'createDate',
					xtype : 'datefield',
					width : 100
				}, {
					xtype : 'label',
					style : 'padding:4px 3px 3px 0',
					width : 10,
					text : '-'
				}, {
					name : 'coupon.endTime',
					xtype : 'datefield',
					width : 100
				}, {
					name : 'dict.id',
					fieldLabel : '选择类目',
					xtype : 'combo',
					store : dictsByType,
					valueField : 'id',
					displayField : 'name',
					hiddenName : 'dict.id',
					triggerAction : 'all',
					mode : 'remote',
					emptyText : '选择类目',
					editable : false,
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

	function updateStatus(status) {
		var ids = '';
		// 删除优惠劵。
		sm.each(function(r) {
			ids += r.data.id;
			ids += ',';
		});
		Ext.Ajax.request({
			url : webRoot + '/coupon/updateStatus/' + ids,
			method : 'post',
			params : {
				status : status,
				tName : 'COUPON'
			},
			success : function() {
				store.load();
			}
		});
	}

	// 最后组装成的List界面。
	var panel = new Ext.Panel({
		title : apptitle,
		tabTip : apptitle,
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [ {
			text : '审核通过',
			iconCls : 'add-icon',
			ref : '../auditButton',
			disabled : true,
			handler : function() {
				updateStatus(2);
			}
		}, {
			text : '下架',
			iconCls : 'basket-icon',
			ref : '../basketButton',
			disabled : true,
			handler : function() {
				updateStatus(4);
			}
		}, {
			text : '添加',
			iconCls : 'add-icon',
			ref : '../addButton',
			handler : function() {
				createcouponTaoForm('新增优惠劵');
			}
		}, {
			text : '编辑',
			ref : '../editButton',
			tooltip : '编辑选中的优惠劵',
			iconCls : 'edit-icon',
			disabled : true,
			handler : function() {
				createcouponTaoForm('编辑优惠劵', sm.getSelected().data.id);
			}
		}, {
			text : '删除',
			ref : '../removeButton',
			tooltip : '删除选中的优惠劵',
			iconCls : 'delete-icon',
			disabled : true,
			handler : function() {
				Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的优惠劵吗？', function(id) {
					if (id == 'yes') {
						var ids = '';
						// 删除优惠劵。
						sm.each(function(r) {
							ids += r.data.id;
							ids += ',';
						});
						Ext.Ajax.request({
							url : webRoot + '/coupon/delete/' + ids,
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

	function createcouponTaoForm(title, id) {
		var couponTaoFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'couponTaoForm',
			enctype : 'multipart/form-data',
			fileUpload : true,
			autoWidth : true,
			padding : '10 10 20 10',
			defaults : {
				anchor : '100%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [ {
				name : 'coupon.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'coupon.couponId',
				id : 'couponId',
				fieldLabel : '优惠券ID',
				xtype : 'hidden'
			}, {
				name : 'coupon.limitNum',
				id : 'limitNum',
				fieldLabel : '用户限领',
				xtype : 'hidden'
			}, {
				name : 'coupon.downNum',
				id : 'downNum',
				fieldLabel : '发行张数/下载码的数量',
				allowBlank : false,
				xtype : 'hidden'
			}, {
				name : 'coupon.num',
				id : 'num',
				fieldLabel : '剩余张数/领码的数量',
				xtype : 'hidden'
			}, {
				name : 'coupon.sellerType',
				id : 'sellerType',
				fieldLabel : '商家类型',
				xtype : 'hidden'
			}, {
				name : 'coupon.url',
				id : 'url',
				fieldLabel : '领取链接',
				xtype : 'hidden'
			}, {
				name : 'coupon.shopName',
				id : 'shopName',
				allowBlank : false,
				fieldLabel : '店铺名称'
			}, {
				name : 'coupon.name',
				id : 'name',
				fieldLabel : '商品名称'
			}, {
				name : 'coupon.itemPrice',
				id : 'itemPrice',
				fieldLabel : '商品价格'
			}, {
				name : 'coupon.keyword',
				id : 'keyword',
				fieldLabel : '关键字'
			}, {
				name : 'coupon.denominations',
				id : 'denominations',
				allowBlank : false,
				fieldLabel : '优惠金额'
			}, {
				name : 'coupon.useCondition',
				id : 'useCondition',
				fieldLabel : '使用条件',
				allowBlank : false
			}, {
				name : 'coupon.endTime',
				id : 'endTime',
				format : 'Y-m-d',
				xtype : 'datefield',
				allowBlank : false,
				fieldLabel : '有效时间'
			}, {
				name : 'dict.id',
				id:'dict_id',
				fieldLabel : '类目',
				xtype : 'combo',
				store : dictsByType,
				valueField : 'id',
				displayField : 'name',
				hiddenName : 'dict.id',
				triggerAction : 'all',
				mode : 'remote',
				emptyText : '请选择',
				editable : true
			}, new Ext.form.TextField({
				xtype : 'fileuploadfield',
				fieldLabel : '图片上传 (标准尺寸140*117)',
				anchor : '45%',
				name : 'imgFile',
				text : '添加图片',
				id : 'pic',
				inputType : 'file'
			}), {
				name : 'coupon.imgPath',
				id : 'imgPath',
				hidden : true
			}, {
				name : 'coupon.createTime',
				id : 'createTime',
				xtype : 'hidden',
				fieldLabel : '创建时间'
			}, {
				name : 'coupon.dictIds',
				id : 'dictIds',
				fieldLabel : '关联的字典id',
				allowBlank : false,
				xtype : 'hidden'
			}, {
				name : 'coupon.type',
				id : 'type',
				fieldLabel : '类型',
				xtype : 'hidden'
			}, {
				name : 'coupon.status',
				id : 'status',
				fieldLabel : '状态',
				xtype : 'hidden'
			}, {
				name : 'coupon.shopUrl',
				id : 'shopUrl',
				fieldLabel : '店铺链接',
				xtype : 'hidden'
			} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('couponTaoForm').getForm().isValid()) {
								Ext
										.getCmp('couponTaoForm')
										.getForm()
										.submit(
												{
													url : webRoot
															+ '/coupon/update',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'couponTaoFormwindow')
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
							Ext.getCmp('couponTaoFormwindow').close();
						}
					} ]
		};
		var couponTaoForm = new Ext.form.FormPanel(couponTaoFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'couponTaoFormwindow',
			height : 400,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : couponTaoForm
		});
		if (id != undefined) {
			couponTaoForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRoot + '/coupon/load/' + id,
				method : 'GET'
			});
		}
		window.show();
		if(sm.getSelected().data.dict!=null){
			var dictId = sm.getSelected().data.dict.id;
			var dictName = sm.getSelected().data.dict.name;
			Ext.getCmp('dict_id').setValue(dictId);
			Ext.getCmp('dict_id').setRawValue(dictName);
		}
	}
	if (userName != 'admin') {
		/*
		 * if (!del_bl) { panel.removeButton.hide(); } if (!add_bl) {
		 * panel.addButton.hide(); } if (!edit_bl) { panel.editButton.hide(); }
		 */
	}
	return panel;
}
