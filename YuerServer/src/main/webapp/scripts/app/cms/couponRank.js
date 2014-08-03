function createCouponRankPanel(apptitle) {
	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面
	var couponRankFormConfig = {
		frame : true,
		labelWidth : 70,
		autoHeight : true,
		id : 'couponRankform',
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
			name : 'couponRank.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			name : 'couponRank.lingNum',
			id : 'lingNum',
			fieldLabel : '领取量'
		}, {
			name : 'couponRank.lingTime',
			id : 'lingTime',
			format : 'Y-m-d',
			xtype : 'datefield',
			fieldLabel : '领取时间'
		} ],
		buttons : [
				{
					text : '保&nbsp;&nbsp;&nbsp;存',
					handler : function() {
						if (Ext.getCmp('couponRankform').getForm().isValid()) {
							Ext
									.getCmp('couponRankform')
									.getForm()
									.submit(
											{
												url : webRootCms
														+ '/couponRank/save',
												waitMsg : '正在保存...',
												method : 'post',
												success : function(form, action) {
													Ext.MessageBox.alert('提示',
															'保存成功');
													Ext
															.getCmp(
																	'couponRankformwindow')
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
						Ext.getCmp('couponRankformwindow').close();
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
		root : 'data.couponRanks',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'lingNum'
		}, {
			name : 'coupon'
		}, {
			name : 'type'
		}, {
			name : 'lingTime',
			type : 'date',
			dateFormat : 'Y-m-d'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/couponRank/list'
		})
	});
	store.setDefaultSort('lingNum', 'desc');
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
							}
						}
					}, {
						id : 'lingNum',
						header : '是否发送短信量',
						width : 150,
						sortable : true,
						dataIndex : 'lingNum'
					}, {
						id : 'type',
						header : '是否领取',
						width : 80,
						sortable : true,
						dataIndex : 'type',
						renderer:function(v){
							if(v==2){
								return '领取';
							}else{
								return '下载';
							}
						}
					}, {
						id : 'lingTime',
						xtype : 'datecolumn',
						header : '下载时间',
						width : 120,
						sortable : true,
						format : 'Y-m-d',
						dataIndex : 'lingTime'
					} ],
			defaults : {
				sortable : true,
				menuDisabled : false,
				align:'center',
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
			text : '下载时间:'
		}, {
			name : 'couponRank.lingTime',
			id : 'lingTime',
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
					hidden:true,
					handler : function() {
						createCouponRankForm('创建新优惠券排名');
					}
				},
				{
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的优惠券排名',
					iconCls : 'edit-icon',
					disabled : true,
					hidden:true,
					handler : function() {
						createCouponRankForm('编辑优惠券排名',
								sm.getSelected().data.id);
					}
				},
				{
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的优惠券排名',
					iconCls : 'delete-icon',
					disabled : true,
					hidden:true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的优惠券排名吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除优惠券排名。
										sm.each(function(r) {
											ids += r.data.id;
											ids += ',';
										});
										Ext.Ajax.request({
											url : webRootCms
													+ '/couponRank/delete/'
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

	function createCouponRankForm(title, id) {
		var couponRankForm = new Ext.form.FormPanel(couponRankFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'couponRankformwindow',
			height : 185,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : couponRankForm
		});
		if (id != undefined) {
			couponRankForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRootCms + '/couponRank/load/' + id,
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
