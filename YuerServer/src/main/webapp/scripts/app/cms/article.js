function createArticlePanel(apptitle) {

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

	var subjects = new Ext.data.JsonStore({
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'subjectName'
		} ],
		url : webRoot + '/subjects/findByColumnId/1',
		id : 'id',
		root : 'data.subjects'
	});

	// 分页大小。
	var pagesize = 25;

	var sm = new Ext.grid.CheckboxSelectionModel({
		dataIndex : 'id',
		listeners : {
			selectionchange : function(sm) {
				if (sm.getCount()) {
					panel.removeButton.enable();
					if (sm.getCount() == 1) {
						panel.editButton.enable();
						panel.editContentButton.enable();
					} else {
						panel.editButton.disable();
						panel.editContentButton.disable();
					}
				} else {
					panel.removeButton.disable();
					panel.editButton.disable();
					panel.editContentButton.disable();
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
			name : 'createTime'
		}, {
			name : 'updateTime'
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
		}, {
			name : 'columnName'
		}, {
			name : 'subjectName'
		}, {
			name : 'source'
		}, {
			name : 'url'
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
			columns : [
					sm,
					{
						id : 'yulan',
						header : '预览',
						width : 80,
						sortable : true,
						dataIndex : 'id',
						renderer : function(v) {
							return '<a href="/web/article/' + v
									+ '" target="_blank">查看文章</a>';
						}
					}, {
						id : 'url',
						header : '链接地址',
						width : 80,
						sortable : true,
						dataIndex : 'id',
						renderer : function(v) {
							return 'web/article/' + v;
						}
					}, {
						id : 'id',
						header : '文章编号',
						width : 80,
						hidden : true,
						sortable : true,
						dataIndex : 'id'
					}, {
						id : 'columnName',
						header : '栏目',
						width : 80,
						sortable : true,
						dataIndex : 'columnName'
					}, {
						id : 'subjectName',
						header : '专题名称',
						sortable : true,
						dataIndex : 'subjectName'
					}, {
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
						id : 'img',
						header : '图片',
						width : 80,
						sortable : true,
						dataIndex : 'img'
					}, {
						id : 'status',
						header : '状态',
						width : 80,
						sortable : true,
						dataIndex : 'status',
						renderer : function(v) {
							return v ? '上线' : '待审核';
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
					}, {
						id : 'createTime',
						header : '创建时间',
						width : 120,
						sortable : true,
						dataIndex : 'createTime',
						renderer : function(v) {
							if (v != null) {
								return new Date(v).format('Y-m-d')
							}
						}
					}, {
						id : 'updateTime',
						header : '修改时间',
						width : 120,
						sortable : true,
						dataIndex : 'updateTime',
						renderer : function(v) {
							if (v != null) {
								return new Date(v).format('Y-m-d')
							}
						}
					} ],
			defaults : {
				sortable : true,
				menuDisabled : false,
				align : 'center',
				width : 100
			}
		}),
		loadMask : false,
		sm : sm,
		// paging bar on the bottom
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
		width : bWidth,
		height : 50,
		style : 'border-bottom:1px solid #ddd',
		border : false,
		padding : '4 4 4 4',
		layout : {
			type : 'hbox',
			defaultMargins : '0 5 5 0',
			align : 'left'
		},
		items : [ {
			xtype : 'label',
			width : 40,
			text : '标题'
		}, {
			xtype : 'textfield',
			width : 130,
			name : 'article.title'
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
				createArticleForm('编辑文章表', false, sm.getSelected().data.id);
			}
		}, {
			text : '直接编辑内容',
			ref : '../editContentButton',
			tooltip : '直接编辑内容',
			iconCls : 'edit-icon',
			disabled : true,
			handler : function() {
				createArticleForm('直接编辑内容', true, sm.getSelected().data.id);
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
		} ],
		layout : {
			type : 'vbox',
			padding : 0,
		},
		defaults : {
			margins : '0 0 0 0'
		},
		items : [ searchForm, grid ]
	});

	function createArticleForm(title, isEditContent, id) {
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
				anchor : '50%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [
					// name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
					{
						name : 'article.id',
						id : 'id',
						xtype : 'hidden'
					},
					{
						name : 'article.columnName',
						id : 'columnName',
						fieldLabel : '栏目名称',
						xtype : 'combo',
						store : columns,
						valueField : 'id',
						displayField : 'columnName',
						triggerAction : 'all',
						mode : 'remote',
						emptyText : '请选择',
						editable : false,
						listeners : {
							select : function(combo, record, index) {
								Ext.getCmp("subjectName").clearValue();
								subjects.proxy = new Ext.data.HttpProxy({
									url : webRoot + '/subjects/findByColumnId/'
											+ combo.getValue()
								});
								subjects.load();
							}
						}
					}, {
						name : 'article.subjectName',
						id : 'subjectName',
						fieldLabel : '专题名称',
						xtype : 'combo',
						store : subjects,
						valueField : 'id',
						displayField : 'subjectName',
						triggerAction : 'all',
						mode : 'remote',
						emptyText : '请选择',
						editable : false
					// 不允许输入
					}, {
						name : 'article.title',
						id : 'title',
						anchor : '100%',
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
						hidden : true,
						xtype : 'datefield',
						fieldLabel : '创建时间'
					}, {
						name : 'article.updateTime',
						id : 'updateTime',
						hidden : true,
						format : 'Y-m-d H:i:s',
						xtype : 'datefield',
						fieldLabel : '修改时间'
					}, {
						xtype : 'combo',
						typeAhead : true,
						triggerAction : 'all',
						allowBlank : false,
						hiddenName : 'article.status',
						id : 'status',
						lazyRender : true,
						editable : false,
						mode : 'local',
						store : new Ext.data.ArrayStore({
							id : 0,
							fields : [ 'label', 'value' ],
							data : [ [ '上线', 1 ], [ '待审核', 0 ] ]
						}),
						valueField : 'value',
						displayField : 'label',
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
						anchor : '100%',
						fieldLabel : '关键字'
					}, {
						name : 'article.source',
						id : 'source',
						fieldLabel : '来源'
					}, {
						name : 'article.url',
						id : 'url',
						anchor : '100%',
						fieldLabel : '原链接'
					}, {
						name : 'article.content',
						id : 'content',
						height : bHeight / 3,
						xtype : 'textarea',
						hidden : false,
						fieldLabel : '文章正文'
					} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('articleform').getForm().isValid()) {
								Ext.getCmp('content').setValue(editor.html());
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
		if (isEditContent) {
			// 定义编辑表单的界面
			articleFormConfig = {
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
					name : 'article.content',
					id : 'content',
					height : bHeight - 120,
					xtype : 'textarea',
					// anchor : '90%',
					width : 500,
					hidden : false,
					fieldLabel : '文章正文'
				} ],
				buttons : [
						{
							text : '保&nbsp;&nbsp;&nbsp;存',
							handler : function() {
								if (Ext.getCmp('articleform').getForm()
										.isValid()) {
									Ext.getCmp('content').setValue(
											editor.html());
									Ext
											.getCmp('articleform')
											.getForm()
											.submit(
													{
														url : webRoot
																+ '/article/editContent',
														waitMsg : '正在保存...',
														method : 'post',
														success : function(
																form, action) {
															Ext.MessageBox
																	.alert(
																			'提示',
																			'保存成功');
															Ext
																	.getCmp(
																			'articleformwindow')
																	.close();
															store.load();
														},
														failure : function(
																form, action) {
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

		}

		var articleForm = new Ext.form.FormPanel(articleFormConfig);

		var window = new Ext.Window({
			title : title,
			width : 750,
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
						editor = KindEditor.create('#content', {
							resizeType : 1,
							allowPreviewEmoticons : false,
							allowImageUpload : false,
							items : [ 'fontname', 'fontsize', '|', 'forecolor',
									'hilitecolor', 'bold', 'italic',
									'underline', 'removeformat', '|',
									'justifyleft', 'justifycenter',
									'justifyright', 'insertorderedlist',
									'insertunorderedlist', '|', 'emoticons',
									'image', 'link', "source" ]
						});
					}, 300);
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
