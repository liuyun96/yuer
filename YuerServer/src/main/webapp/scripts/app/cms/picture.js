function createPicturePanel(apptitle) {
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
				root : 'data.pictures',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'path'
						}, {
							name : 'status'
						}, {
							name : 'type'
						}, {
							name : 'dict'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/cms/picture/list'
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
								header : '图片',
								width : 80,
								sortable : true,
								dataIndex : 'path',
								renderer : function(v) {
									return '<img onmouseOver=MsgBox.showImg(this,"/'
											+ v
											+ '") style="width:65px;" src="'
											+ webRoot + '/' + v + '"/>';
								}
							}, {
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
								id : 'type',
								header : '类型',
								width : 180,
								sortable : true,
								dataIndex : 'type',
								renderer : function(v) {
									if (v == 1)
										return 'logo';
									if (v == 2)
										return '舌尖上中国gif';
								}
							}, {
								id : 'dict',
								header : '字典id',
								dataIndex : 'dict',
								width : 180,
								renderer : function(v) {
									if (v != null)
										return v.name;
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
				height : 35,
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
							xtype : 'label',
							width : 32,
							text : '状态:'
						}, {
							xtype : 'combo',
							typeAhead : true,
							triggerAction : 'all',
							hiddenName : 'picture.status',
							lazyRender : true,
							editable : false,
							mode : 'local',
							store : new Ext.data.ArrayStore({
										id : 0,
										fields : ['label', 'value'],
										data : [['有效', 1], ['无效', 0]]
									}),
							valueField : 'value',
							displayField : 'label'
						}, {
							xtype : 'label',
							width : 32,
							text : '类型:'
						}, {
							xtype : 'combo',
							typeAhead : true,
							triggerAction : 'all',
							hiddenName : 'picture.type',
							lazyRender : true,
							editable : false,
							mode : 'local',
							store : new Ext.data.ArrayStore({
										id : 0,
										fields : ['label', 'value'],
										data : [['全部'], ['logo', 1],
												['舌尖上中国gif', 2]]
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
						createPictureForm('创建新图片表');
						Ext.getCmp('pic').allowBlank = false;
					}
				}, {
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的图片表',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						createPictureForm('编辑图片表', sm.getSelected().data.id,
								'edit');
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的图片表',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的图片表吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除图片表。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRoot
															+ '/cms/picture/delete/'
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
			type : 'vbox',
			padding : 0,
			align : 'stretchmax'
		},
		defaults : {
			margins : '0 0 0 0'
		},
		items : [searchForm, grid]
	});

	// 类型store
	var typeStore = new Ext.data.JsonStore({

				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}],
				url : webRoot + '/coupon/getYhjzy',
				id : 'id',
				root : 'data'
			});
	function createPictureForm(title, id, add) {
		var pictureFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'pictureform',
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
				name : 'picture.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'picture.path',
				id : 'path',
				xtype : 'hidden',
				fieldLabel : '路径'
			}, new Ext.form.TextField({
						xtype : 'fileuploadfield',
						anchor : '90%',
						fieldLabel : '图片上传',
						name : 'imgFile',
						text : '添加图片',
						id : 'pic',
						inputType : 'file'
					}), {
				xtype : 'combo',
				anchor : '90%',
				typeAhead : true,
				triggerAction : 'all',
				allowBlank : false,
				hiddenName : 'picture.status',
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
			}, {
				xtype : 'combo',
				anchor : '90%',
				typeAhead : true,
				triggerAction : 'all',
				allowBlank : false,
				hiddenName : 'picture.type',
				id : 'type',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
							id : 0,
							fields : ['label', 'value'],
							data : [['logo', 1], ['舌尖上中国gif', 2]]
						}),
				valueField : 'value',
				displayField : 'label',
				fieldLabel : '类型'
			}, {
				xtype : 'combo',
				anchor : '90%',
				name : 'picture.dict.id',
				fieldLabel : '优惠专区分类',
				store : typeStore,
				valueField : 'id',
				displayField : 'name',
				hiddenName : 'picture.dict.id',
				id : 'dict_id',
				triggerAction : 'all',
				mode : 'remote',
				emptyText : '请选择',
				editable : false,
				allowBlank : false
			}],
			buttons : [{
				text : '保&nbsp;&nbsp;&nbsp;存',
				handler : function() {
					if (Ext.getCmp('pictureform').getForm().isValid()) {
						Ext.getCmp('pictureform').getForm().submit({
							url : webRoot + '/cms/picture/save',
							waitMsg : '正在保存...',
							method : 'post',
							success : function(form, action) {
								Ext.MessageBox.alert('提示', '保存成功');
								Ext.getCmp('pictureformwindow').close();
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
					Ext.getCmp('pictureformwindow').close();
				}
			}]
		};
		var pictureForm = new Ext.form.FormPanel(pictureFormConfig);
		var window = new Ext.Window({
					title : title,
					width : 320,
					id : 'pictureformwindow',
					height : 250,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : pictureForm
				});
		if (id != undefined) {
			pictureForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRoot + '/cms/picture/load/' + id,
						method : 'GET'
					});
		}
		window.show();
		if (id != undefined && add != undefined) {
			var dictName = sm.getSelected().data.dict.name;
			var dictId = sm.getSelected().data.dict.id;
			Ext.getCmp('dict_id').setValue(dictId);
			Ext.getCmp('dict_id').setRawValue(dictName);
		}

	}
	return panel;
}
