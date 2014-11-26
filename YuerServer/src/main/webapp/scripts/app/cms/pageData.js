function createPageData(dictTypeName, dictName) {
	var dictId = 0;
	var store = new Ext.data.JsonStore({
		autoLoad : {
			params : {
				limit : pagesize,
				start : 0
			}
		},
		root : 'data.pageDatas',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'dictId'
		}, {
			name : 'title'
		}, {
			name : 'url'
		}, {
			name : 'img'
		}, {
			name : 'position'
		}, {
			name : 'detail'
		}, {
			name : 'status'
		}, {
			name : 'isSycn'
		}, {
			name : 'uniqueId'
		}, {
			name : 'endTime',
			type : 'date',
			dateFormat : 'Y-m-d'
		}, {
			name : 'area'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRoot + '/pageData/list'
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
		dataUrl : webRoot + '/pageData/getTreeBean/'
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
				url : webRoot + '/pageData/list?pageData.dictId='
						+ tree.getSelectionModel().getSelectedNode().id
			});
			store.reload();
			panel.addButton.enable();
		} else {
			dictId = 0;
			panel.addButton.disable();
		}
	});
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

	var grid = new Ext.grid.GridPanel({
		store : store,
		flex : 1,
		border : false,
		cm : new Ext.grid.ColumnModel({
			columns : [
					sm,
					{
						id : 'title',
						header : '标题',
						width : 150,
						sortable : true,
						dataIndex : 'title'
					},
					{
						id : 'url',
						header : '链接',
						width : 80,
						sortable : true,
						dataIndex : 'url'
					},
					{
						header : '图片',
						width : 80,
						sortable : true,
						dataIndex : 'img',
						renderer : function(v) {
							if (v != null && v != '') {
								return '<img style="width:65px;" src="' + itvIp
										+ '/' + v + '"/>';
							}
						}
					}, {
						id : 'position',
						header : '位置',
						width : 80,
						sortable : true,
						dataIndex : 'position'
					}, {
						id : 'endTime',
						xtype : 'datecolumn',
						header : '过期时间',
						width : 120,
						sortable : true,
						format : 'Y-m-d',
						dataIndex : 'endTime'
					}, {
						id : 'status',
						header : '状态',
						width : 80,
						sortable : true,
						dataIndex : 'status',
						renderer : function(v) {
							if (v == 1) {
								return '上线';
							} else if (v == 2) {
								return '下架';
							} else if (v == 0) {
								return '无效';
							} else if (v == 4) {
								return '测试';
							}
						}
					}, {
						id : 'isSycn',
						header : '是否同步到甘肃平台',
						width : 80,
						sortable : true,
						dataIndex : 'isSycn',
						renderer : function(v) {
							if (v == 0) {
								return '不同步';
							} else if (v == 1) {
								return '同步';
							}
						}
					} , {
						id : 'uniqueId',
						header : '唯一编号',
						width : 80,
						sortable : true,
						dataIndex : 'uniqueId'
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
		height : 32,
		style : 'border-bottom:1px solid #ddd',
		border : false,
		padding : '4 4 4 4',
		layout : {
			type : 'hbox',
			defaultMargins : '0 5 5 0',
			align : 'left'
		},
		items : [ {
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
		title : "itv页面数据管理",
		tabTip : "itv页面数据管理",
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [
				{
					text : '新增',
					iconCls : 'add-icon',
					ref : '../addButton',
					handler : function() {
						createPageDataForm('创建新页面数据');
					}
				},
				{
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的页面数据',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						createPageDataForm('编辑页面数据', sm.getSelected().data.id);
					}
				},
				{
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的页面数据',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的页面数据吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除页面数据。
										sm.each(function(r) {
											ids += r.data.id;
											ids += ',';
										});
										Ext.Ajax.request({
											url : webRoot + '/pageData/delete/'
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
			type : 'hbox',
			padding : 0,
			align : 'stretch'
		},
		items : [ tree, grid ]
	});

	function createPageDataForm(title, id) {
		var pageDataFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'pageDataform',
			enctype : 'multipart/form-data',
			fileUpload : true,
			autoWidth : true,
			padding : '10 10 20 10',
			defaults : {
				anchor : '100%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [
					{
						name : 'pageData.id',
						id : 'id',
						xtype : 'hidden'
					},
					{
						name : 'pageData.uniqueId',
						id : 'uniqueId',
						xtype : 'hidden'
					},
					{
						name : 'pageData.dictId',
						id : 'dictId',
						hidden : true,
						value : dictId,
						fieldLabel : '字典id'
					},
					{
						name : 'pageData.title',
						id : 'title',
						fieldLabel : '标题',
						xtype : 'textarea',
						allowBlank : false,
						height : 100,
						anchor : '90%'
					},
					{
						name : 'pageData.url',
						id : 'url',
						fieldLabel : '链接'
					},
					{
						name : 'pageData.img',
						id : 'img',
						hidden : false,
						fieldLabel : '图片'
					},
					new Ext.form.TextField({
						xtype : 'fileuploadfield',
						fieldLabel : '图片上传 ',
						anchor : '45%',
						name : 'imgFile',
						text : '添加图片',
						inputType : 'file'
					}),
					{
						name : 'pageData.position',
						id : 'position',
						fieldLabel : '位置'
					},
					{
						name : 'pageData.endTime',
						id : 'endTime',
						format : 'Y-m-d',
						xtype : 'datefield',
						fieldLabel : '过期时间'
					},
					{
						xtype : 'combo',
						typeAhead : true,
						triggerAction : 'all',
						allowBlank : false,
						hiddenName : 'pageData.status',
						id : 'status',
						lazyRender : true,
						editable : false,
						mode : 'local',
						store : new Ext.data.ArrayStore({
							id : 0,
							fields : [ 'label', 'value' ],
							data : [ [ '上线', 1 ], [ '无效', 0 ]]
						}),
						valueField : 'value',
						displayField : 'label',
						fieldLabel : '状态'
					}],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('pageDataform').getForm().isValid()) {
								Ext
										.getCmp('pageDataform')
										.getForm()
										.submit(
												{
													url : webRoot
															+ '/pageData/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'pageDataformwindow')
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
							Ext.getCmp('pageDataformwindow').close();
						}
					} ]
		};

		var pageDataForm = new Ext.form.FormPanel(pageDataFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 450,
			id : 'pageDataformwindow',
			height : 600,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : pageDataForm
		});
		if (id != undefined) {
			pageDataForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRoot + '/pageData/load/' + id,
				method : 'GET'
			});
		}
		window.show();
	}
	return panel;
}
