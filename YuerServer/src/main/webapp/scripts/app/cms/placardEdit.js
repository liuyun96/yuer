function createPlacardEdit() {
	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面
	var placardFormConfig = {
		frame : true,
		labelWidth : 70,
		autoHeight : true,
		id : 'placardform',
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
			name : 'placard.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			name : 'placard.dictId',
			id : 'dictId',
			fieldLabel : '数据字典ID',
			xtype : 'hidden',
			allowBlank : false
		}, {
			name : 'placard.modId',
			id : 'modId',
			fieldLabel : '海报模板ID',
			xtype : 'hidden'
		}, {
			name : 'placard.couponId',
			id : 'couponId',
			fieldLabel : '优惠券ID'
		}, {
			name : 'placard.title',
			id : 'title',
			fieldLabel : '标题'
		}, {
			name : 'placard.picPath',
			id : 'picPath',
			fieldLabel : '预览图路径',
			xtype : 'hidden'
		}, {
			name : 'placard.html',
			id : 'html',
			fieldLabel : 'HTML代码',
			xtype : 'textarea'
		}, {
			name : 'placard.xml',
			id : 'xml',
			fieldLabel : '海报XML',
			xtype : 'hidden'
		}, {
			name : 'placard.status',
			id : 'status',
			fieldLabel : '状态'
		}, {
			name : 'placard.sort',
			id : 'sort',
			fieldLabel : '排序'
		}, {
			name : 'placard.width',
			id : 'width',
			fieldLabel : '宽度',
			xtype : 'hidden'
		}, {
			name : 'placard.height',
			id : 'height',
			fieldLabel : '高度',
			xtype : 'hidden'
		}, {
			name : 'placard.createTime',
			id : 'createTime',
			format : 'Y-m-d H:i:s',
			xtype : 'datefield',
			fieldLabel : '创建时间',
			xtype : 'hidden'
		}, {
			name : 'placard.modifiedTime',
			id : 'modifiedTime',
			format : 'Y-m-d H:i:s',
			xtype : 'datefield',
			fieldLabel : '修改时间',
			xtype : 'hidden'
		}],
		buttons : [{
			text : '保&nbsp;&nbsp;&nbsp;存',
			handler : function() {
				if (Ext.getCmp('placardform').getForm().isValid()) {
					Ext.getCmp('placardform').getForm().submit({
						url : webRoot + '/cms/placard/save',
						waitMsg : '正在保存...',
						method : 'post',
						success : function(form, action) {
							Ext.MessageBox.alert('提示', '保存成功');
							Ext.getCmp('placardformwindow').close();
							store.load();
						},
						failure : function(form, action) {
							Ext.MessageBox.alert('提示', '保存失败,原因为:'
											+ action.result.msg);
						}
					});
				}
			}
		}, {
			text : '取&nbsp;&nbsp;&nbsp;消',
			handler : function() {
				Ext.getCmp('placardformwindow').close();
			}
		}]
	};

	var sm = new Ext.grid.CheckboxSelectionModel({
				dataIndex : 'id',
				listeners : {
					selectionchange : function(sm) {
						if (sm.getCount()) {
							panel.removeButton.enable();
							panel.addButton.enable();
							if (sm.getCount() == 1)// 只有选中一个时候才可以编辑。
								panel.editButton.enable();
							else
								panel.editButton.disable();
						} else {
							panel.addButton.disable();
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
				root : 'data.placards',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'dictId'
						}, {
							name : 'modId'
						}, {
							name : 'couponId'
						}, {
							name : 'title'
						}, {
							name : 'picPath'
						}, {
							name : 'html'
						}, {
							name : 'xml'
						}, {
							name : 'status'
						}, {
							name : 'sort'
						}, {
							name : 'width'
						}, {
							name : 'height'
						}, {
							name : 'createTime',
							type : 'date',
							dateFormat : 'Y-m-d H:i:s'
						}, {
							name : 'modifiedTime',
							type : 'date',
							dateFormat : 'Y-m-d H:i:s'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRootCms + '/placard/findByStatus/0'
						})
			});
	store.setDefaultSort('', '');
	store.on("beforeload", function(thiz, options) {
				// 获取查询表单的查询条件。
				// this.baseParams = searchForm.getForm().getValues();
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
								id : 'couponId',
								header : '优惠券ID',
								width : 80,
								sortable : true,
								dataIndex : 'couponId'
							}, {
								id : 'title',
								header : '标题',
								width : 80,
								sortable : true,
								dataIndex : 'title'
							}, {
								id : 'picPath',
								header : '预览图',
								sortable : true,
								dataIndex : 'picPath',
								renderer : function(v) {
									if (v != null && v != "")
										return "<img width='300' height='300' src='"
												+ v + "'/>";
								}
							}, {
								id : 'status',
								header : '状态',
								width : 80,
								sortable : true,
								dataIndex : 'status'
							}, {
								id : 'sort',
								header : '排序',
								width : 80,
								sortable : true,
								dataIndex : 'sort'
							}, {
								id : 'width',
								header : '宽度',
								width : 80,
								sortable : true,
								dataIndex : 'width'
							}, {
								id : 'height',
								header : '高度',
								width : 80,
								sortable : true,
								dataIndex : 'height'
							}, {
								id : 'createTime',
								xtype : 'datecolumn',
								header : '创建时间',
								width : 120,
								sortable : true,
								format : 'Y-m-d H:i:s',
								dataIndex : 'createTime'
							}, {
								id : 'modifiedTime',
								xtype : 'datecolumn',
								header : '修改时间',
								width : 120,
								sortable : true,
								format : 'Y-m-d H:i:s',
								dataIndex : 'modifiedTime'
							}],
					defaults : {
						sortable : true,
						menuDisabled : false,
						width : 100
					}
				}),
		loadMask : false,
		sm : sm,
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
		title : "海报审核编辑",
		tabTip : "海报审核编辑",
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [{
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的海报-页面数据',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						createPlacardForm('编辑海报-页面数据', sm.getSelected().data.id);
					}
				}, {
					text : '标记为审核通过',
					ref : '../addButton',
					tooltip : '编辑选中的海报-页面数据',
					iconCls : 'add-icon',
					disabled : true,
					handler : function() {
						createPlacardForm('编辑海报-页面数据', sm.getSelected().data.id);
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的海报-页面数据',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的海报-页面数据吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除海报-页面数据。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRoot
															+ '/placard/delete/'
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
			type : 'hbox',
			padding : 0,
			align : 'stretch'
		},
		items : [searchForm, grid]
	});

	function createPlacardForm(title, id) {
		var placardForm = new Ext.form.FormPanel(placardFormConfig);
		Ext.getCmp("dictId").setValue(dictId);
		var window = new Ext.Window({
					title : title,
					width : 520,
					id : 'placardformwindow',
					height : 335,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : placardForm
				});
		if (id != undefined) {
			placardForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRoot + '/cms/placard/load/' + id,
						method : 'GET'
					});
		}
		window.show();

	}
	return panel;
}
