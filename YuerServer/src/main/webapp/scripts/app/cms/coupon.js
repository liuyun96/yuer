function createCouponPanel(apptitle) {
	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面

	var sm = new Ext.grid.CheckboxSelectionModel({
		dataIndex : 'id',
		listeners : {
			selectionchange : function(sm) {
				if (sm.getCount()) {
					panel.removeButton.enable();
					if (sm.getCount() == 1) {// 只有选中一个时候才可以编辑。
						panel.editButton.enable();
					} else {
						panel.editButton.disable();
					}
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
		root : 'data.coupons',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'itemId'
		}, {
			name : 'name'
		}, {
			name : 'imgPath'
		}, {
			name : 'shopName'
		}, {
			name : 'denominations'
		}, {
			name : 'endTime',
			type : 'date',
			dateFormat : 'Y-m-d'
		}, {
			name : 'createTime',
			type : 'date',
			dateFormat : 'Y-m-d H:i:s'
		}, {
			name : 'type'
		}, {
			name : 'itemName'
		}, {
			name : 'itemUrl'
		}, {
			name : 'downNum'
		}, {
			name : 'num'
		}, {
			name : 'detail'
		}, {
			name : 'url'
		}, {
			name : 'validMonth'
		}, {
			name : 'free'
		}, {
			name : 'useCondition'
		}, {
			name : 'isuseCondition'
		}, {
			name : 'status'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRoot + '/coupon/list'
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

	var grid = new Ext.grid.GridPanel({
		store : store,
		flex : 1,
		border : false,
		cm : new Ext.grid.ColumnModel({
			columns : [
					sm,
					{
						id : 'name',
						header : '优惠劵名称',
						width : 120,
						sortable : true,
						dataIndex : 'name'
					},
					{
						id : 'shopName',
						header : '店铺名称',
						width : 120,
						sortable : true,
						dataIndex : 'shopName'
					},
					{
						id : 'imgPath',
						header : '图片',
						width : 120,
						sortable : true,
						dataIndex : 'imgPath',
						renderer : function(v) {
							if (v == null)
								return '尚未设置主图';
							else
								return '<img style="width:80px;" src="'
										+ webRoot + '/' + v + '"/>';
						}
					}, {
						id : 'itemId',
						header : '关联的商品ID',
						width : 80,
						sortable : true,
						hidden:true,
						dataIndex : 'itemId'
					}, {
						id : 'itemName',
						header : '商品名称',
						width : 80,
						sortable : true,
						hidden:true,
						dataIndex : 'itemName'
					}, {
						id : 'denominations',
						header : '面值',
						width : 80,
						sortable : true,
						dataIndex : 'denominations'
					}, {
						id : 'type',
						header : '类型',
						width : 80,
						sortable : true,
						dataIndex : 'type',
						renderer : function(v) {
							if (v == 1)
								return '店铺优惠券';
							if (v == 2)
								return '商品优惠券';
						}
					}, {
						id : 'num',
						header : '总领用量',
						width : 80,
						sortable : true,
						hidden:true,
						dataIndex : 'num'
					}, {
						id : 'downNum',
						header : '生成码数量',
						width : 80,
						sortable : true,
						hidden:true,
						dataIndex : 'downNum'
					}, {
						id : 'status',
						header : '状态',
						width : 180,
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
								return '活动已结束(下架)';
							if (v == 5)
								return '已删除';
						}
					} ],
			defaults : {
				sortable : true,
				align:'center',
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
		height : 32,
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
					text : '优惠券名称'
				},
				{
					xtype : 'textfield',
					width : 160,
					name : 'coupon.name'
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
					anchor : '15%',
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
					handler : function() {
						createCouponForm('创建新优惠劵');
						Ext.getCmp('pic').allowBlank = false;
					}
				},
				{
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的优惠劵',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						createCouponForm('编辑优惠劵', sm.getSelected().data.id, sm
								.getSelected().data.free);
						var status = sm.getSelected().data.status;
						var type = sm.getSelected().data.type;
						if (status == 1 || status == 3) {
							Ext.getCmp('baocunBtn').enable();
						} else {
							Ext.getCmp('baocunBtn').disable();
						}
						if (type == 2) {
							Ext.getCmp('itemName').show();
						}
					}
				},
				{
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的优惠劵',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的优惠劵吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除优惠劵。
										sm.each(function(r) {
											ids += r.data.id;
											ids += ',';
										});
										Ext.Ajax.request({
											url : webRoot + '/coupon/delete/'
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

	function createCouponForm(title, id, free) {

		var couponFormConfig = {
			frame : true,
			labelWidth : 90,
			height : bHeight - 30,
			id : 'couponform',
			autoWidth : true,
			padding : '10 10 20 10',
			enctype : 'multipart/form-data',
			fileUpload : true,
			defaults : {
				anchor : '100%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [
					{
						name : 'coupon.id',
						id : 'id',
						xtype : 'hidden'
					},
					{
						name : 'coupon.dictIds',
						id : 'dictIds',
						xtype : 'hidden'
					},
					{
						name : 'coupon.type',
						id : 'type',
						fieldLabel : '选择创建类型',
						xtype : 'radiogroup',
						anchor : '50%',
						items : [ {
							handler : function() {
								if (this.checked) {
									Ext.getCmp('itemName').hide();
								} else {
									Ext.getCmp('itemName').show();
								}
							},
							boxLabel : '店铺优惠券',
							name : 'coupon.type',
							inputValue : '1',
							checked : true
						}, {
							boxLabel : '商品优惠券',
							name : 'coupon.type',
							inputValue : '2'
						} ]
					},
					{
						fieldLabel : '关联的商品id',
						name : 'coupon.itemId',
						id : 'itemId',
						xtype : 'numberfield',
						hidden : true,
						anchor : '45%'
					},
					{
						fieldLabel : '选择关联的商品',
						name : 'coupon.itemName',
						id : 'itemName',
						xtype : 'textfield',
						hidden : true,
						emptyText : '创建商品优惠券，此项必填...',
						anchor : '45%',
						readOnly : true,
						listeners : {
							'focus' : function() {
								var type = Ext.getCmp('type').getValue().inputValue;
								if (type == 1) {
									Ext.getCmp('itemId').setValue('');
									Ext.getCmp('itemName').setValue('');
								} else if (type == 2) {
									createchooseItemWindow();
								} else {
									Ext.getCmp('itemId').setValue('');
									Ext.getCmp('itemName').setValue('');
								}
							}
						}
					},
					{
						name : 'coupon.name',
						id : 'name',
						allowBlank : false,
						fieldLabel : '优惠劵名称',
						anchor : '45%'
					},
					{
						xtype : 'combo',
						typeAhead : true,
						triggerAction : 'all',
						allowBlank : false,
						hiddenName : 'coupon.denominations',
						id : 'denominations',
						lazyRender : true,
						editable : false,
						anchor : '30%',
						emptyText : '请选择面值...',
						mode : 'local',
						store : new Ext.data.ArrayStore({
							id : 0,
							fields : [ 'label', 'value' ],
							data : [ [ '3元', '3' ], [ '5元', '5' ],
									[ '10元', '10' ], [ '20元', '20' ],
									[ '30元', '30' ], [ '50元', '50' ],
									[ '100元', '100' ] ]
						}),
						valueField : 'value',
						displayField : 'label',
						fieldLabel : '面值'
					}, {
						name : 'coupon.url',
						id : 'url',
						allowBlank : false,
						fieldLabel : '领取连接',
						anchor : '100%'
					}, {
						name : 'coupon.endTime',
						id : 'endTime',
						format : 'Y-m-d',
						xtype : 'datefield',
						fieldLabel : '截止时间',
						allowBlank : false,
						anchor : '45%'
					}, {
						name : 'coupon.downNum',
						id : 'downNum',
						fieldLabel : '生成码数量',
						xtype : 'numberfield',
						emptyText : '生成码数量 <= 1000 张',
						allowBlank : false,
						hidden:true,
						value:'1',
						anchor : '45%'
					}, {
						typeAhead : true,
						triggerAction : 'all',
						hiddenName : 'coupon.validMonth',
						name : 'coupon.validMonth',
						id : 'validMonth',
						emptyText : '单位：天',
						xtype : 'numberfield',
						fieldLabel : '有效期',
						hidden:true,
						anchor : '30%'
					}, {
						hidden:true,
						name : 'coupon.free',
						id : 'free',
						xtype : 'checkboxgroup',
						items : [ {
							boxLabel : '永久免费',
							id : 'isfree',
							inputValue : 1
						} ],
						anchor : '23%'
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
						hidden : true,
						anchor : '45%'
					}, {
						name : 'coupon.detail',
						id : 'detail',
						fieldLabel : '简介 (少于70字)',
						xtype : 'textarea',
						allowBlank : false,
						height : 280,
						anchor : '90%'
					} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						id : 'baocunBtn',
						handler : function() {
							if (Ext.getCmp('couponform').getForm().isValid()) {
								var detailLength = Ext.getCmp('detail')
										.getValue().length;// 详情长度
								if (detailLength > 70) {
									Ext.Msg.alert('提示', '简介内容请少于70个字符，当前字符数：'
											+ detailLength, function() {
										Ext.getCmp('detail').focus();
									});
									return;
								}
								/*var checks = ",";
								var size = 0;
								Ext.getCmp('dict_ids').items
										.each(function(item) {
											if (item.checked) {
												checks += item.value + ',';
												++size;
											}
										});
								if (size > 4) {
									Ext.Msg.alert('提示', '最多只能选择4个分类');
									return;
								}
								Ext.getCmp('dictIds').setValue(checks);*/
								Ext
										.getCmp('couponform')
										.getForm()
										.submit(
												{
													url : webRoot
															+ '/coupon/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'couponformwindow')
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
							Ext.getCmp('couponformwindow').close();
						}
					} ]
		};

/*		var url = "";
		if (id != undefined) {
			url = webRoot + '/coupon/getTypes/' + id;
		} else {
			url = webRoot + '/coupon/getTypes/0';
		}
*/
/*		Ext.Ajax.request({
			url : url,
			success : function(resp, opts) {*/
				var couponForm = new Ext.form.FormPanel(couponFormConfig);
				var window = new Ext.Window({
					title : title,
					width : 750,
					id : 'couponformwindow',
					height : bHeight,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : couponForm
				});
				if (id != undefined) {
					couponForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRoot + '/coupon/load/' + id,
						method : 'GET'
					});
					/*if (free == 1) {
						Ext.getCmp('free').setValue({
							'isfree' : true
						});
					}*/
				}
				//var respText = Ext.util.JSON.decode(resp.responseText);
				//Ext.getCmp('dict_ids').items = respText;
				window.show();
/*			}
		});*/
	}

	return panel;
}
