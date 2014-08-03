function createPlacardModelPanel(dictTypeName, dictName) {
	var dictId = 0;
	var tree = new Ext.tree.TreePanel({
				renderTo : 'tree',
				title : '海报模版管理',
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
										+ '/cms/placardModel/list/'
										+ tree.getSelectionModel()
												.getSelectedNode().id
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
	var store = new Ext.data.JsonStore({
				autoLoad : {
					params : {
						limit : pagesize,
						start : 0
					}
				},
				root : 'data.placardModels',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}, {
							name : 'xml'
						}, {
							name : 'pic'
						}, {
							name : 'width'
						}, {
							name : 'height'
						}, {
							name : 'status'
						}, {
							name : 'dict'
						}, {
							name : 'dict.name'
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
							url : webRootCms + '/placardModel/list/0'
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
				id : 'placardModelGrid',
				store : store,
				flex : 1,
				border : false,
				cm : new Ext.grid.ColumnModel({
							columns : [sm, {
										id : 'name',
										header : '模板名称',
										width : 80,
										sortable : true,
										dataIndex : 'name'
									}, {
										id : 'pic',
										header : '模板图片',
										width : 480,
										sortable : true,
										dataIndex : 'pic',
										renderer : function(v) {
											return "<img src='" + webRoot + "/"
													+ v + "'/>";
										}
									}, {
										id : 'width',
										header : '宽',
										width : 80,
										sortable : true,
										dataIndex : 'width'
									}, {
										id : 'height',
										header : '高',
										width : 80,
										sortable : true,
										dataIndex : 'height'
									}, {
										id : 'dict.name',
										header : '字典名称',
										width : 160,
										sortable : true,
										dataIndex : 'dict.name'
									}, {
										id : 'status',
										header : '状态',
										width : 80,
										sortable : true,
										dataIndex : 'status'
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
		title : "海报模版管理",
		tabTip : "海报模版管理",
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [{
					text : '新增',
					iconCls : 'add-icon',
					ref : '../addButton',
					disabled : true,
					handler : function() {
						// createPlacardModelForm('创建新海报模板');
						createPlacardModelByFlash('创建新海报模板');
					}
				}, {
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的海报模板',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						// createPlacardModelForm('编辑海报模板',sm.getSelected().data.id);
						createPlacardModelByFlash('编辑海报模板',
								sm.getSelected().data.id);
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的海报模板',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的海报模板吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除海报模板。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRootCms
															+ '/placardModel/delete/'
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
				}, '->',// 开始右对齐按钮
				{
					text : '查询',
					enableToggle : true,
					hidden:true,
					pressed : false,
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

	function createPlacardModelForm(title, id) {

		var placardModelFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'placardModelform',
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
					// name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
					{
				name : 'placardModel.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'placardModel.name',
				id : 'name',
				fieldLabel : '模板名称',
				allowBlank : false
			}, {
				name : 'placardModel.xml',
				id : 'xml',
				fieldLabel : '模板xml',
				xtype : 'textarea',
				allowBlank : false
			}, {
				name : 'placardModel.pic',
				id : 'pic',
				xtype : 'hidden',
				fieldLabel : '模板图片'
			}, new Ext.form.TextField({
						xtype : 'fileuploadfield',
						fieldLabel : '商品图片',
						anchor : '45%',
						name : 'imgFile',
						text : '添加图片',
						id : 'imgfile',
						inputType : 'file'
					}), {
				name : 'placardModel.width',
				id : 'width',
				fieldLabel : '宽',
				allowBlank : false
			}, {
				name : 'placardModel.height',
				id : 'height',
				fieldLabel : '高',
				allowBlank : false
			}, {
				name : 'placardModel.dict.id',
				id : 'dictId',
				fieldLabel : '字典ID',
				allowBlank : false,
				hiddenName : 'placardModel.dict.id',
				listeners : {
					'focus' : function() {
						createDictionaryWindou('字典列表');
					}
				}
			}],
			buttons : [{
				text : '保&nbsp;&nbsp;&nbsp;存',
				handler : function() {
					if (Ext.getCmp('placardModelform').getForm().isValid()) {
						Ext.getCmp('placardModelform').getForm().submit({
							url : webRootCms + '/placardModel/save',
							waitMsg : '正在保存...',
							method : 'post',
							success : function(form, action) {
								Ext.MessageBox.alert('提示', '保存成功');
								Ext.getCmp('placardModelformwindow').close();
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
					Ext.getCmp('placardModelformwindow').close();
				}
			}]
		};

		var placardModelForm = new Ext.form.FormPanel(placardModelFormConfig);
		var window = new Ext.Window({
					title : title,
					width : 520,
					id : 'placardModelformwindow',
					height : 435,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : placardModelForm
				});
		if (id != undefined) {
			placardModelForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRootCms + '/placardModel/load/' + id,
						method : 'GET'
					});
			var dictId = sm.getSelected().data.dict.id;
			Ext.getCmp('dictId').setValue(dictId);
		}
		window.show();

	}
	function createPlacardModelByFlash(title, modId) {
		var w = Ext.getBody().getWidth();
		var h = Ext.getBody().getHeight();
		var window = new Ext.Window({
					title : title,
					width : w,
					id : 'placardmodelbyflashwindow',
					height : h,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : [{
						xtype : 'panel',
						html : '<iframe src="' + webRoot
								+ '/cms/flash?placard__dictId=' + dictId
								+ '&placard__modId=' + modId
								+ '&isAdmin=true" width="' + (w - 18)
								+ '" height="' + (h - 36) + '"></iframe>'
					}]
				});
		window.show();

	}
	return panel;
}
function reflashPlacardModelData() {
	Ext.getCmp("placardmodelbyflashwindow").close();
	Ext.getCmp("placardModelGrid").getStore().reload();
}