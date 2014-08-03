function createShopImgPanel(apptitle) {
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
				root : 'data.shopImgs',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'path'
						}, {
							name : 'type'
						}, {
							name : 'mapId'
						}, {
							name : 'status'
						}, {
							name : 'updateTime',
							type : 'date',
							dateFormat : 'Y-m-d H:i:s'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/cms/shopImg/list'
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
								header : '图片路径',
								width : 120,
								sortable : true,
								dataIndex : 'path',
								renderer : function(v) {
									return '<img style="width:65px;" src="'
											+ webRoot + '/' + v + '"/>';
								}

							}, {
								id : 'type',
								header : '类型',
								width : 80,
								sortable : true,
								dataIndex : 'type',
								renderer : function(v) {
									if (v == 1)
										return '店铺详情图';
									if (v == 2)
										return '店章';
								}
							}, {
								// id : 'mapId',
								// header : 'mapid',
								// width : 80,
								// sortable : true,
								// dataIndex : 'mapId'
								// }, {
								id : 'status',
								header : '状态',
								width : 80,
								sortable : true,
								dataIndex : 'status',
								renderer : function(v) {
									if (v == 1)
										return '有效';
									if (v == 0)
										return '无效';
								}
							}, {
								id : 'updateTime',
								xtype : 'datecolumn',
								header : '修改时间',
								width : 120,
								sortable : true,
								format : 'Y-m-d H:i:s',
								dataIndex : 'updateTime'
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
		title : apptitle,
		tabTip : apptitle,
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [{
					text : '上传',
					iconCls : 'add-icon',
					ref : '../addButton',
					handler : function() {
						createShopImgForm('创建新店铺图片');
						Ext.getCmp('pic').allowBlank = false;
					}
				}, {
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的店铺图片',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						createShopImgForm('编辑店铺图片', sm.getSelected().data.id);
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的店铺图片',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的店铺图片吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除店铺图片。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRoot
															+ '/cms/shopImg/delete/'
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
		items : [searchForm, grid]
	});

	function createShopImgForm(title, id) {

		var shopImgFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'shopImgform',
			autoWidth : true,
			padding : '10 10 20 10',
			enctype : 'multipart/form-data',
			fileUpload : true,
			defaults : {
				anchor : '90%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [
					// name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
					{
				name : 'shopImg.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'shopImg.path',
				id : 'path',
				xtype : 'hidden',
				fieldLabel : '图片路径'
			}, new Ext.form.TextField({
						xtype : 'fileuploadfield',
						fieldLabel : '图片上传',
						anchor : '45%',
						name : 'imgFile',
						text : '添加图片',
						id : 'pic',
						inputType : 'file'
					}), {
				// name : 'shopImg.type',
				// value : 1,
				// id : 'type',
				// xtype : 'checkbox',
				// fieldLabel : '类型'
				// }, {
				xtype : 'combo',
				typeAhead : true,
				triggerAction : 'all',
				allowBlank : false,
				hiddenName : 'shopImg.type',
				id : 'type',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
							id : 0,
							fields : ['label', 'value'],
							data : [['店铺详情图', 1], ['店章', 2]]
						}),
				valueField : 'value',
				displayField : 'label',
				fieldLabel : '类型'
			}, {
				// name : 'shopImg.mapId',
				// id : 'mapId',
				// xtype : 'textfield',
				// fieldLabel : 'mapid'
				// }, {
				xtype : 'combo',
				typeAhead : true,
				triggerAction : 'all',
				allowBlank : false,
				hiddenName : 'shopImg.status',
				id : 'status',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
							id : 0,
							fields : ['label', 'value'],
							data : [['有效', 1], ['无效', 0]]
						}),
				valueField : 'value',
				displayField : 'label',
				fieldLabel : '状态'
					// }, {
					// name : 'shopImg.status',
					// value : 1,
					// id : 'status',
					// xtype : 'checkbox',
					// fieldLabel : '状态'

					// }, {
					// name : 'shopImg.updateTime',
					// id : 'updateTime',
					// format : 'Y-m-d H:i:s',
					// xtype : 'datefield',
					// fieldLabel : '修改时间'
				}],
			buttons : [{
				text : '保&nbsp;&nbsp;&nbsp;存',
				handler : function() {
					if (Ext.getCmp('shopImgform').getForm().isValid()) {
						Ext.getCmp('shopImgform').getForm().submit({
							url : webRoot + '/cms/shopImg/save',
							waitMsg : '正在保存...',
							method : 'post',
							success : function(form, action) {
								Ext.MessageBox.alert('提示', '保存成功');
								Ext.getCmp('shopImgformwindow').close();
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
					Ext.getCmp('shopImgformwindow').close();
				}
			}]
		};

		var shopImgForm = new Ext.form.FormPanel(shopImgFormConfig);
		var window = new Ext.Window({
					title : title,
					width : 320,
					id : 'shopImgformwindow',
					height : 235,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : shopImgForm
				});
		if (id != undefined) {
			shopImgForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRoot + '/cms/shopImg/load/' + id,
						method : 'GET'
					});
			Ext.getCmp('pic').allowBlank = true;
		}
		window.show();

	}
	return panel;
}
