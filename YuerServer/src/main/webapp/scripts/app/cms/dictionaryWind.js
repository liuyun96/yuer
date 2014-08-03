function createDictionaryWindou() {
	// 分页大小。
	var pagesize = 25;
	var status = false;
	var action;

	var dictsByType = new Ext.data.JsonStore({
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}],
				url : webRoot + '/extui/dict/findByType/1',
				id : 'id',
				root : 'data.dictsByType'
			});

	// 类型store
	var typeStore = new Ext.data.JsonStore({

				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}],
				url : webRoot + '/extui/dict/listAllTypes',
				id : 'id',
				root : 'data.types'
			});

	// 定义编辑表单的界面
	var dictFormConfig = {
		frame : true,
		labelWidth : 80,
		autoHeight : true,
		id : 'dictform',
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
			name : 'dict.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			id : 'oldName',
			xtype : 'hidden',
			value : "null"
		}, {
			id : 'oldValue',
			xtype : 'hidden',
			value : "null"
		}, {
			name : 'dict.name',
			id : 'name',
			fieldLabel : '名称',
			allowBlank : false
		}, {
			name : 'dict.value',
			id : 'value',
			fieldLabel : '数据值',
			allowBlank : false
		}, {
			name : 'dict.dictType.id',
			id : 'dictType_id',
			fieldLabel : '数据字典类型',
			xtype : 'combo',
			store : typeStore,
			valueField : 'id',
			displayField : 'name',
			hiddenName : 'dict.dictType.id',
			triggerAction : 'all',
			mode : 'remote',
			emptyText : '请选择',
			editable : false,
			allowBlank : false
		}, {
			name : 'parent.id',
			id : 'parent_id',
			fieldLabel : '父类',
			xtype : 'combo',
			store : dictsByType,
			valueField : 'id',
			displayField : 'name',
			hiddenName : 'parent.id',
			triggerAction : 'all',
			mode : 'remote',
			emptyText : '请选择',
			editable : true
		}, {
			name : 'dict.sort',
			id : 'sort',
			fieldLabel : '排序'
		}],
		buttons : [{
			text : '保&nbsp;&nbsp;&nbsp;存',
			handler : function() {
				if (Ext.getCmp('dictform').getForm().isValid()) {
					Ext.getCmp('dictform').getForm().submit({
						url : webRoot + '/extui/dict/save',
						waitMsg : '正在保存...',
						method : 'post',
						success : function(form, action) {
							Ext.MessageBox.alert('提示', '保存成功');
							Ext.getCmp('dictwindow').close();
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
				Ext.getCmp('dictwindow').close();
			}
		}]
	};

	var sm = new Ext.grid.CheckboxSelectionModel({
				dataIndex : 'id',
				listeners : {
					selectionchange : function(sm) {
						if (sm.getCount()) {
							// panel.removeButton.enable();
							if (sm.getCount() == 1) {
								// panel.editButton.enable();
								// panel.addClassButton.enable();
								panel.saveButton.enable();
							} else {
								panel.saveButton.disable();
								// panel.editButton.disable();
								// panel.addClassButton.disable();
							}
						} else {
							// panel.removeButton.disable();
							// panel.editButton.disable();
							// panel.addClassButton.disable();
							panel.saveButton.disable();
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
				root : 'data.Dicts',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}, {
							name : 'value'
						}, {
							name : 'dictType'
						}, {
							name : 'parent'
						}, {
							name : 'sort',
							type : 'int'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/extui/dict/list'
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
				layout : 'fit',
				border : false,
				cm : new Ext.grid.ColumnModel({
							columns : [sm, {
										id : 'id',
										header : '编号',
										width : 150,
										sortable : true,
										dataIndex : 'id'
									}, {
										id : 'name',
										header : '名称',
										width : 150,
										sortable : true,
										dataIndex : 'name'
									}, {
										id : 'value',
										header : '数据值',
										width : 80,
										sortable : true,
										dataIndex : 'value'
									}, {
										id : 'dictType',
										header : '数据字典类型',
										width : 80,
										sortable : true,
										dataIndex : 'dictType',
										renderer : function(v) {
											if (v != null) {
												return v.name;
											}
										}
									}, {
										id : 'parent',
										header : '父类',
										width : 80,
										sortable : true,
										dataIndex : 'parent',
										renderer : function(v) {
											if (v != null) {
												return v.name;
											}
										}
									}, {
										id : 'sort',
										header : '排序',
										width : 80,
										sortable : true,
										dataIndex : 'sort'
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
							xtype : 'label',
							style : 'padding:4px 3px 3px 0',
							width : 34,
							text : '名称:'
						}, {
							name : 'dict.name',
							xtype : 'textfield',
							width : 150
						}, {
							xtype : 'label',
							style : 'padding:4px 3px 3px 0',
							width : 106,
							text : '数据字典类型:'
						}, {
							name : 'dict.dictType.id',
							id : 'searchForm_dictType_id',
							fieldLabel : '数据字典类型',
							xtype : 'combo',
							store : typeStore,
							valueField : 'id',
							displayField : 'name',
							hiddenName : 'dict.dictType.id',
							triggerAction : 'all',
							mode : 'remote',
							emptyText : '选择字典类型',
							editable : false,
							width : 150
						}, {
							name : 'part.id',
							fieldLabel : '选择父类',
							xtype : 'combo',
							store : dictsByType,
							valueField : 'id',
							displayField : 'name',
							hiddenName : 'part.id',
							triggerAction : 'all',
							mode : 'remote',
							emptyText : '选择父类',
							editable : false,
							width : 150
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
				title : '字典列表',
				tabTip : '字典列表',
				closable : true,
				autoScroll : true,
				height : 475,
				border : true,
				tbar : [{
					text : '确定',
					iconCls : 'save-icon',
					ref : '../saveButton',
					tooltip : '选择一个字典',
					disabled : true,
					handler : function() {
						parent.Ext.getCmp('dictId')
								.setValue(sm.getSelected().data.id);
						windowab.close();
					}
				}, {
					// text : '编辑',
					// ref : '../editButton',
					// tooltip : '编辑选中的数据字典表',
					// iconCls : 'edit-icon',
					// disabled : true,
					// handler : function() {
					// action = "edit";
					// createDictionaryForm('编辑数据字典表',
					// sm.getSelected().data.id);
					// }
					// }, {
					// text : '添加一个子类',
					// ref : '../addClassButton',
					// tooltip : '添加一个子类',
					// iconCls : 'edit-icon',
					// disabled : true,
					// handler : function() {
					// action = "edit";
					// createDictionaryForm('添加一个子类',
					// sm.getSelected().data.id, 'add');
					// }
					// }, {
					// text : '删除',
					// ref : '../removeButton',
					// tooltip : '删除选中的数据字典表',
					// iconCls : 'delete-icon',
					// disabled : true,
					// handler : function() {
					// Ext.MessageBox.confirm('删除确认',
					// '你确定要删除所选中的数据字典表吗？',
					// function(id) {
					// if (id == 'yes') {
					// var ids = '';
					// // 删除数据字典表。
					// sm.each(function(r) {
					// ids += r.data.id;
					// ids += ',';
					// });
					// Ext.Ajax.request({
					// url : webRoot + '/extui/dict/delete/' + ids,
					// success : function() {
					// store.load();
					// }
					// });
					// }
					// });
					// }
					// }, {
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

	function createDictionaryForm(title, id, add) {
		var dictForm = new Ext.form.FormPanel(dictFormConfig);
		var window = new Ext.Window({
					title : title,
					width : 320,
					id : 'dictwindow',
					height : 250,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : dictForm
				});
		if (id != undefined && add == undefined) {
			dictForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRoot + '/extui/dict/load/' + id,
						method : 'GET'
					});
		}
		window.show();
		if (id != undefined && add == undefined) {
			var typeName = sm.getSelected().data.dictType.name;
			var typeId = sm.getSelected().data.dictType.id;
			Ext.getCmp('dictType_id').setValue(typeId);
			Ext.getCmp('dictType_id').setRawValue(typeName);
			var parentName = sm.getSelected().data.parent.name;
			var parentId = sm.getSelected().data.parent.id;
			Ext.getCmp('parent_id').setValue(parentId);
			Ext.getCmp('parent_id').setRawValue(parentName);
		}
		if (add != undefined) {
			var typeName = sm.getSelected().data.dictType.name;
			var typeId = sm.getSelected().data.dictType.id;
			Ext.getCmp('dictType_id').setValue(typeId);
			Ext.getCmp('dictType_id').setRawValue(typeName);

			var id = sm.getSelected().data.id;
			var name = sm.getSelected().data.name;
			Ext.getCmp('parent_id').setValue(id);
			Ext.getCmp('parent_id').setRawValue(name);
		}
	}
	// return panel;
	var windowab = new Ext.Window({
				title : '',
				width : 820,
				id : 'aboutImgformwindow',
				height : 500,
				resizable : false,
				layout : 'vbox',
				modal : true,
				border : false,
				items : panel
			});
	windowab.show();
}
