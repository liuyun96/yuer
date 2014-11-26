function createDictTypePanel(apptitle) {
	// 分页大小。
	var pagesize = 25;
	var status = false;
	var action;
	// 定义编辑表单的界面
	var dictTypeFormConfig = {
		frame : true,
		labelWidth : 70,
		autoHeight : true,
		id : 'dictTypeform',
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
			name : 'dictType.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			name : 'dictType.name',
			id : 'name',
			fieldLabel : '名称',
			allowBlank : false
		}, {
			name : 'dictType.description',
			id : 'description',
			fieldLabel : '描述'
		}],
		buttons : [{
			text : '保&nbsp;&nbsp;&nbsp;存',
			handler : function() {
				if (Ext.getCmp('dictTypeform').getForm().isValid()) {
					Ext.getCmp('dictTypeform').getForm().submit({
						url : webRoot + '/extui/dictType/save',
						waitMsg : '正在保存...',
						method : 'post',
						success : function(form, action) {
							Ext.MessageBox.alert('提示', '保存成功');
							Ext.getCmp('dictTypewindow').close();
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
				Ext.getCmp('dictTypewindow').close();
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
				root : 'data.dictTypes',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'name'
						}, {
							name : 'description'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/extui/dictType/list'
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
										id : 'name',
										header : '名称',
										width : 80,
										sortable : true,
										dataIndex : 'name'
									}, {
										id : 'description',
										header : '描述',
										width : 80,
										sortable : true,
										dataIndex : 'description'
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
							name : 'dictType.name',
							xtype : 'textfield',
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
		title : apptitle,
		tabTip : apptitle,
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [{
					text : '新增',
					iconCls : 'add-icon',
					ref : '../addButton',
					handler : function() {
						action = "add";
						createDictTypeForm('创建新数据字典类型');
					}
				}, {
					text : '编辑',
					ref : '../editButton',
					tooltip : '编辑选中的数据字典类型',
					iconCls : 'edit-icon',
					disabled : true,
					handler : function() {
						action = "edit";
						createDictTypeForm('编辑数据字典类型', sm.getSelected().data.id);
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的数据字典类型',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的数据字典类型吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除数据字典类型。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRoot
															+ '/extui/dictType/delete/'
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

	function createDictTypeForm(title, id) {
		var dictTypeForm = new Ext.form.FormPanel(dictTypeFormConfig);
		var window = new Ext.Window({
					title : title,
					width : 320,
					id : 'dictTypewindow',
					height : 185,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : dictTypeForm
				});
		if (id != undefined) {
			dictTypeForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRoot + '/extui/dictType/load/' + id,
						method : 'GET'
					});
		}
		window.show();

	}
	return panel;
}
