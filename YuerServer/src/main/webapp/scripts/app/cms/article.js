﻿function createArticlePanel(apptitle) {
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
		root : 'data.articles',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'title'
		}, {
			name : 'author'
		}, {
			name : 'content'
		}, {
			name : 'img'
		}, {
			name : 'createTime',
			type : 'date',
			dateFormat : 'Y-m-d H:i:s'
		}, {
			name : 'updateTime',
			type : 'date',
			dateFormat : 'Y-m-d H:i:s'
		}, {
			name : 'status'
		}, {
			name : 'clickTimes'
		}, {
			name : 'shareTimes'
		}, {
			name : 'favTimes'
		}, {
			name : 'keyword'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRoot + '/article/list'
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
				id : 'title',
				header : '文章标题',
				width : 80,
				sortable : true,
				dataIndex : 'title'
			}, {
				id : 'author',
				header : '作者',
				width : 80,
				sortable : true,
				dataIndex : 'author'
			}, {
				id : 'content',
				header : '文章正文',
				width : 300,
				height:300,
				sortable : true,
				dataIndex : 'content'
			}, {
				id : 'img',
				header : '图片',
				width : 80,
				sortable : true,
				dataIndex : 'img'
			}, {
				id : 'createTime',
				xtype : 'datecolumn',
				header : '创建时间',
				width : 120,
				sortable : true,
				format : 'Y-m-d H:i:s',
				dataIndex : 'createTime'
			}, {
				id : 'updateTime',
				xtype : 'datecolumn',
				header : '修改时间',
				width : 120,
				sortable : true,
				format : 'Y-m-d H:i:s',
				dataIndex : 'updateTime'
			}, {
				id : 'status',
				header : '状态',
				width : 80,
				sortable : true,
				dataIndex : 'status',
				renderer : function(v) {
					return v ? '是' : '否';
				}
			}, {
				id : 'clickTimes',
				header : '点击次数',
				width : 80,
				sortable : true,
				dataIndex : 'clickTimes'
			}, {
				id : 'shareTimes',
				header : '分享次数',
				width : 80,
				sortable : true,
				dataIndex : 'shareTimes'
			}, {
				id : 'favTimes',
				header : '收藏次数',
				width : 80,
				sortable : true,
				dataIndex : 'favTimes'
			}, {
				id : 'keyword',
				header : '关键字',
				width : 80,
				sortable : true,
				dataIndex : 'keyword'
			} ],
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
				createArticleForm('创建新文章表');
			}
		}, {
			text : '编辑',
			ref : '../editButton',
			tooltip : '编辑选中的文章表',
			iconCls : 'edit-icon',
			disabled : true,
			handler : function() {
				createArticleForm('编辑文章表', sm.getSelected().data.id);
			}
		}, {
			text : '删除',
			ref : '../removeButton',
			tooltip : '删除选中的文章表',
			iconCls : 'delete-icon',
			disabled : true,
			handler : function() {
				Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的文章表吗？', function(id) {
					if (id == 'yes') {
						var ids = '';
						// 删除文章表。
						sm.each(function(r) {
							ids += r.data.id;
							ids += ',';
						});
						Ext.Ajax.request({
							url : webRoot + '/article/delete/' + ids,
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

	function createArticleForm(title, id) {
		var editor;
		// 定义编辑表单的界面
		var articleFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'articleform',
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
				name : 'article.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'article.title',
				id : 'title',
				fieldLabel : '文章标题'
			}, {
				name : 'article.author',
				id : 'author',
				fieldLabel : '作者'
			}, {
				name : 'article.img',
				id : 'img',
				fieldLabel : '图片'
			}, {
				name : 'article.createTime',
				id : 'createTime',
				format : 'Y-m-d H:i:s',
				xtype : 'datefield',
				fieldLabel : '创建时间'
			}, {
				name : 'article.updateTime',
				id : 'updateTime',
				format : 'Y-m-d H:i:s',
				xtype : 'datefield',
				fieldLabel : '修改时间'
			}, {
				name : 'article.status',
				value : 1,
				id : 'status',
				xtype : 'checkbox',
				fieldLabel : '状态'
			}, {
				name : 'article.clickTimes',
				id : 'clickTimes',
				fieldLabel : '点击次数'
			}, {
				name : 'article.shareTimes',
				id : 'shareTimes',
				fieldLabel : '分享次数'
			}, {
				name : 'article.favTimes',
				id : 'favTimes',
				fieldLabel : '收藏次数'
			}, {
				name : 'article.keyword',
				id : 'keyword',
				fieldLabel : '关键字'
			}, {
				name : 'article.content',
				id : 'content',
				height:300,
				xtype : 'textarea',
				hidden : false,
				fieldLabel : '文章正文'
			} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('articleform').getForm().isValid()) {
								Ext.getCmp('content').setValue(editor.text());
								Ext
										.getCmp('articleform')
										.getForm()
										.submit(
												{
													url : webRoot
															+ '/article/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'articleformwindow')
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
							Ext.getCmp('articleformwindow').close();
						}
					} ]
		};

		var articleForm = new Ext.form.FormPanel(articleFormConfig);

		var window = new Ext.Window({
			title : title,
			width : 600,
			id : 'articleformwindow',
			height : bHeight,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : articleForm,
			listeners : {
				render : function() {
					setTimeout(function() {
						editor =KindEditor.create('#content');
						//editor = K.create('#content', {
							//allowFileManager : true
						//});
					}, 1000);
				}

			}
		});
		if (id != undefined) {
			articleForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRoot + '/article/load/' + id,
				method : 'GET'
			});
		}
		window.show();

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
