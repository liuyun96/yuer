function createAboutCouponImgWindow(couponId) {
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
								// panel.editButton.enable();
								panel.setButton.enable();
							} else {
								// panel.editButton.disable();
								panel.setButton.disable();
							}
						} else {
							panel.removeButton.disable();
							// panel.editButton.disable();
							panel.setButton.disable();
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
				root : 'data.couponImgs',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'path'
						}, {
							name : 'status'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/couponImg/list/' + couponId
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
							columns : [sm, {
								id : 'path',
								header : '路径',
								width : 120,
								sortable : true,
								dataIndex : 'path',
								align : 'center',
								renderer : function(v) {
									return '<img style="width:65px;" src="'
											+ webRoot + '/' + v + '"/>';
								}
							}, {
								id : 'status',
								header : '状态',
								width : 80,
								sortable : true,
								dataIndex : 'status',
								align : 'center',
								renderer : function(v) {
									if (v == 1)
										return '有效';
									if (v == 0)
										return '无效';
								}
							}],
							defaults : {
								sortable : true,
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
				hidden : true,
				layout : {
					type : 'hbox',
					defaultMargins : '0 5 5 0',
					align : 'left'
				},
				items : [{
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
						}]
			});

	// 最后组装成的List界面。
	var panel = new Ext.Panel({
		title : '优惠券关联的图片',
		tabTip : '优惠券关联的图片',
		closable : true,
		autoScroll : true,
		width : 707,
		height : 675,
		border : true,
		tbar : [{
					text : '上传图片',
					iconCls : 'add-icon',
					ref : '../addButton',
					handler : function() {
						createCouponImgForm();
					}
				}, {
					// text : '编辑',
					// ref : '../editButton',
					// tooltip : '编辑选中的优惠劵图片',
					// iconCls : 'edit-icon',
					// disabled : true,
					// handler : function() {
					// createCouponImgForm('编辑优惠劵图片', sm.getSelected().data.id);
					// }
					// }, {
					text : '设置为优惠券主图',
					ref : '../setButton',
					tooltip : '设置选中的图片为优惠券主图',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						var mainImg = sm.getSelected().data.path;
						Ext.Ajax.request({
									url : webRoot
											+ '/coupon/setMainImg/?coupon.imgPath='
											+ mainImg + '&&coupon.id='
											+ couponId,
									success : function() {
										Ext.MessageBox.alert('提示', '优惠券主图设置成功');
										windowab.close();
										// parent.store.load();
									}
								});
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的优惠劵图片',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的优惠劵图片吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除优惠劵图片。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRoot
															+ '/couponImg/delete/'
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
					// }, '->',// 开始右对齐按钮
				// {
				// text : '查询',
				// enableToggle : true,
				// pressed : false,
				// iconCls : 'find-icon',
				// toggleHandler : function() {
				// if (this.pressed) {
				// searchForm.show();
				// panel.doLayout();
				// } else {
				// searchForm.hide();
				// panel.doLayout();
				// }
				// }
			}],
		layout : {
			type : 'vbox',
			padding : 0,
			align : 'stretchmax'
		},
		defaults : {
			margins : '0 0 0 0'
		},
		items : [searchForm, grid]
	});

	function createCouponImgForm() {
		var couponImgFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'couponImgform',
			autoWidth : true,
			padding : '10 10 20 10',
			enctype : 'multipart/form-data',
			fileUpload : true,
			defaults : {
				anchor : '100%',
				xtype : 'fileuploadfield',
				selectOnFocus : true
			},
			items : [
					// name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
					new Ext.form.TextField({
								fieldLabel : '关联图片',
								anchor : '45%',
								name : 'imgFile',
								text : '添加图片',
								id : 'pic',
								inputType : 'file'
							}), new Ext.form.TextField({
								anchor : '45%',
								name : 'imgFile1',
								text : '添加图片',
								id : 'pic1',
								inputType : 'file'
							}), new Ext.form.TextField({
								anchor : '45%',
								name : 'imgFile2',
								text : '添加图片',
								id : 'pic2',
								inputType : 'file'
							}), new Ext.form.TextField({
								anchor : '45%',
								name : 'imgFile3',
								text : '添加图片',
								id : 'pic3',
								inputType : 'file'
							}), new Ext.form.TextField({
								anchor : '45%',
								name : 'imgFile4',
								text : '添加图片',
								id : 'pic4',
								inputType : 'file'
							})],
			buttons : [{
				text : '上&nbsp;&nbsp;&nbsp;传',
				handler : function() {
					if (Ext.getCmp('couponImgform').getForm().isValid()) {
						Ext.getCmp('couponImgform').getForm().submit({
							url : webRoot + '/couponImg/uploadImg/' + couponId,
							waitMsg : '正在上传...',
							method : 'post',
							success : function(form, action) {
								Ext.MessageBox.alert('提示', '上传成功');
								Ext.getCmp('couponImgformwindow').close();
							},
							failure : function(form, action) {
								Ext.MessageBox.alert('提示', '上传失败,原因为:'
												+ action.result.msg);
							}
						});
					}
				}
			}, {
				text : '取&nbsp;&nbsp;&nbsp;消',
				handler : function() {
					Ext.getCmp('couponImgformwindow').close();
				}
			}]
		};

		var couponImgForm = new Ext.form.FormPanel(couponImgFormConfig);
		var window = new Ext.Window({
					title : '上传图片',
					width : 320,
					id : 'couponImgformwindow',
					height : 230,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : couponImgForm
				});
		window.show();

	}

	var windowab = new Ext.Window({
				title : '',
				width : 720,
				id : 'aboutImgformwindow',
				height : 600,
				resizable : false,
				layout : 'vbox',
				modal : true,
				border : false,
				items : panel
			});
	windowab.show();
}
