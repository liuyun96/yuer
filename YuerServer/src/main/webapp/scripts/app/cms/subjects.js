﻿function createSubjectPanel(apptitle) {
	var columns = new Ext.data.JsonStore({
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'columnName'
		} ],
		url : webRoot + '/columns/findAllColumn',
		id : 'id',
		root : 'data.columns'
	});
	// 分页大小。
	var pagesize = 25;

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
		root : 'data.subjectss',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'subjectName'
		}, {
			name : 'status'
		}, {
			name : 'position'
		}  , {
			name : 'columns'
		} , {
			name : 'columns.columnName'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRoot + '/subjects/list'
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
			columns : [ sm, {
				id : 'subjectName',
				header : '专题名称',
				width : 80,
				sortable : true,
				dataIndex : 'subjectName'
			}, {
				id : 'columnName',
				header : '栏目名称',
				width : 100,
				dataIndex : 'columns.columnName'
			}, {
				id : 'position',
				header : '位置',
				width : 100,
				dataIndex : 'position'
			}, {
				id : 'status',
				header : '状态',
				width : 80,
				sortable : true,
				dataIndex : 'status',
				renderer : function(v) {
					return v ? '有效' : '无效';
				}
			} ],
			defaults : {
				sortable : true,
				align:'center',
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
		title : apptitle,
		tabTip : apptitle,
		closable : true,
		autoScroll : true,
		border : true,
		tbar : [ {
			text : '新增',
			iconCls : 'add-icon',
			ref : '../addButton',
			handler : function() {
				createSubjectsForm('创建新专题表');
			}
		}, {
			text : '编辑',
			ref : '../editButton',
			tooltip : '编辑选中的专题表',
			iconCls : 'edit-icon',
			disabled : true,
			handler : function() {
				createSubjectsForm('编辑专题表', sm.getSelected().data.id);
			}
		}, {
			text : '删除',
			ref : '../removeButton',
			tooltip : '删除选中的专题表',
			iconCls : 'delete-icon',
			disabled : true,
			handler : function() {
				Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的专题表吗？', function(id) {
					if (id == 'yes') {
						var ids = '';
						// 删除专题表。
						sm.each(function(r) {
							ids += r.data.id;
							ids += ',';
						});
						Ext.Ajax.request({
							url : webRoot + '/subjects/delete/' + ids,
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
		} ],
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

	function createSubjectsForm(title, id) {
		// 定义编辑表单的界面
		var subjectsFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'subjectsform',
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
				name : 'subjects.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				id : 'columns_id',
				fieldLabel : '栏目名称',
				xtype : 'combo',
				store : columns,
				valueField : 'id',
				displayField : 'columnName',
				hiddenName : 'columns.id',
				triggerAction : 'all',
				mode : 'remote',
				emptyText : '请选择',
				editable : false
			}, {
				name : 'subjects.subjectName',
				id : 'subjectName',
				fieldLabel : '专题名称'
			}, {
				name : 'subjects.position',
				id : 'position',
				fieldLabel : '位置'
			}, {
				name : 'subjects.status',
				value : 1,
				id : 'status',
				xtype : 'checkbox',
				fieldLabel : '状态'
			} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('subjectsform').getForm().isValid()) {
								Ext
										.getCmp('subjectsform')
										.getForm()
										.submit(
												{
													url : webRoot
															+ '/subjects/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'subjectsformwindow')
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
							Ext.getCmp('subjectsformwindow').close();
						}
					} ]
		};
		var subjectsForm = new Ext.form.FormPanel(subjectsFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'subjectsformwindow',
			height : 250,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : subjectsForm
		});
		if (id != undefined) {
			subjectsForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRoot + '/subjects/load/' + id,
				method : 'GET'
			});
		}
		window.show();
		if (sm.getSelected().data.columns != null) {
			var dictId = sm.getSelected().data.columns.id;
			var dictName = sm.getSelected().data.columns.columnName;
			Ext.getCmp('columns_id').setValue(dictId);
			Ext.getCmp('columns_id').setRawValue(dictName);
		}
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
