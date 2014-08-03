function createPlacardPanel(dictTypeName, dictName) {
	var dictId = 0;
	var tree = new Ext.tree.TreePanel({
				renderTo : 'tree',
				title : '页面数据管理',
				flex : 1,
				width : 230,
				useArrows : true,
				autoScroll : true,
				animate : true,
				border : true,
				enableDD : false,
				containerScroll : true,
				rootVisible : false,
				root : {
					nodeType : 'async',
					id : 'root'
				},
				dataUrl : webRoot + '/cms/placard/getTreeBean/'
						+ encodeURI(dictTypeName) + "/" + encodeURI(dictName),

				listeners : {
					'checkchange' : function(node, checked) {
						if (checked) {
							node.getUI().addClass('complete');
						} else {
							node.getUI().removeClass('complete');
						}
					}
				}
			});

	tree.getRootNode().expand(true);
	tree.on('click', function(r) {
				if (tree.getSelectionModel().getSelectedNode().text != dictName) {
					dictId = tree.getSelectionModel().getSelectedNode().id;
					store.removeAll(dictId);
					store.proxy = new Ext.data.HttpProxy({
								url : webRoot
										+ '/cms/placard/list/'
										+ tree.getSelectionModel()
												.getSelectedNode().id
							});
					store.reload();
					panel.addButton.enable();
					panel.batchAddButton.enable();
				} else {
					dictId = 0;
					panel.addButton.disable();
					panel.batchAddButton.disable();
				}
			});
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
							dateFormat : 'Y-m-d H:i:s',
							convert : function(v) {
								if (v != null)
									return (new Date(v)).format("Y-m-d H:i:s");
							}
						}, {
							name : 'modifiedTime',
							type : 'date',
							dateFormat : 'Y-m-d H:i:s',
							convert : function(v) {
								if (v != null)
									return (new Date(v)).format("Y-m-d H:i:s");
							}
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/cms/placard/list/0'
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
		id : 'placardGrid',
		store : store,
		flex : 1,
		border : false,
		cm : new Ext.grid.ColumnModel({
					columns : [sm, {
								id : 'title',
								header : '标题',
								width : 80,
								sortable : true,
								dataIndex : 'title'
							}, {
								id : 'html',
								header : 'HTML代码',
								width : 480,
								sortable : true,
								dataIndex : 'html'
							}, {
								id : 'status',
								header : '状态',
								width : 80,
								sortable : true,
								dataIndex : 'status',
								renderer : function(v) {
									if (v != null && v == 1)
										return "<span style='color:green;'>已审核</span>";
									else
										return "<span style='color:red;'>未审核</span>";
								}
							}, {
								id : 'sort',
								header : '排序',
								width : 80,
								sortable : true,
								dataIndex : 'sort'
							}, {
								id : 'couponId',
								header : '优惠券ID',
								width : 80,
								sortable : true,
								dataIndex : 'couponId'
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
								header : '创建时间',
								width : 130,
								sortable : true,
								dataIndex : 'createTime'
							}, {
								id : 'modifiedTime',
								header : '修改时间',
								width : 130,
								sortable : true,
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
		title : "itv页面数据管理",
		tabTip : "itv页面数据管理",
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [{
					text : '新增',
					iconCls : 'add-icon',
					ref : '../addButton',
					disabled : true,
					handler : function() {
						// createPlacardForm('创建新海报-页面数据');
						createPlacardByFlash("创建新海报-页面数据", "");
					}
				}, {
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的海报-页面数据',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						// createPlacardForm('编辑海报-页面数据',
						// sm.getSelected().data.id);
						createPlacardByFlash('编辑海报-页面数据',
								sm.getSelected().data.id);
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
															+ '/cms/placard/delete/'
															+ ids,
													success : function() {
														store.load();
													}
												});
									}
								});
					}
				}, {
					text : '批量上传数据',
					iconCls : 'add-icon',
					ref : '../batchAddButton',
					disabled : true,
					hidden : true,
					handler : function() {
						var window = new Ext.Window({
							title : "批量上传数据",
							width : 398,
							id : 'uploadW',
							height : 200,
							modal : true,
							resizable : false,
							autoScroll : true,
							layout : 'vbox',
							border : false,
							items : new Ext.form.FormPanel({
								id : 'uploadForm',
								name : 'uploadForm',
								fileUpload : true,
								labelWidth : 60,
								frame : true,
								method : 'post',
								url : webRoot + '/cms/placard/saveByDictId/'
										+ dictId,
								bodyStyle : 'padding:5px 5px 0',
								width : 383,
								enctype : 'multipart/form-data',
								defaults : {
									width : 230
								},
								items : [new Ext.form.TextField({
											xtype : 'fileuploadfield',
											fieldLabel : '选择图片',
											name : 'imgFile',
											id : 'jpegs',
											inputType : 'file'
										})],
								buttons : [{
									text : '上传',
									type : 'submit',
									handler : function() {
										Ext.getCmp("uploadForm").getForm()
												.submit({
													waitMsg : '正在上传...',
													success : function(form,
															action) {
														var msg = action.result.data;
														if (msg == 'success') {
															Ext.MessageBox
																	.alert(
																			'提示',
																			'上传成功',
																			function() {
																				store
																						.reload();
																			});
														} else {
															Ext.MessageBox
																	.alert(
																			'提示',
																			msg);
														}
														Ext.getCmp("uploadW")
																.close();
													},
													failure : function(form,
															action) {
														alert('上传失败'
																+ action.result.msg);
													}
												})
									}
								}]
							})
						});
						window.show();
						store.load();
					}
				}, {
					text : '刷新',
					tooltip : '刷新列表',
					iconCls : 'refresh-icon',
					handler : function() {
						store.reload();
					}
				}, '->',// 开始右对齐按钮
				{
					text : '查询',
					enableToggle : true,
					pressed : false,
					hidden:true,
					iconCls : 'find-icon',
					toggleHandler : function() {
						if (this.pressed) {
							searchForm.show();
							panel.doLayout();
						} else {
							searchForm.hide();
							panel.doLayout();
						}
					}
				}],
		layout : {
			type : 'hbox',
			padding : 0,
			align : 'stretch'
		},
		items : [tree, grid]
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
	function createPlacardByFlash(title, placardId) {
		var w = Ext.getBody().getWidth();
		var h = Ext.getBody().getHeight();
		var window = new Ext.Window({
					title : title,
					width : w,
					id : 'placardbyflashwindow',
					height : h,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : [{
						xtype : 'panel',
						html : '<iframe src="' + webRoot
								+ '/cms/flash?placard__dictId=' + dictId
								+ '&placard__id=' + placardId + '" width="'
								+ (w - 18) + '" height="' + (h - 36)
								+ '"></iframe>'
					}]
				});
		window.show();

	}
	return panel;
}
function reflashPlacardData() {
	Ext.getCmp("placardbyflashwindow").close();
	Ext.getCmp("placardGrid").getStore().reload();
}
