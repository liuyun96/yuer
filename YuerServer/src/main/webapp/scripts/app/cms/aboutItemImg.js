/**
 * 创建商品关联的图片窗口
 */
function createAboutitemImgWindow(itemid) {

	function createItemImgForm() {

		var uploadImgFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'uploadImgform',
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
					new Ext.form.TextField({
								xtype : 'fileuploadfield',
								fieldLabel : '商品图片',
								anchor : '45%',
								name : 'imgFile',
								text : '添加图片',
								id : 'pic',
								inputType : 'file'
							}), new Ext.form.TextField({
								xtype : 'fileuploadfield',
								anchor : '45%',
								name : 'imgFile1',
								text : '添加图片',
								id : 'pic1',
								inputType : 'file'
							}), new Ext.form.TextField({
								xtype : 'fileuploadfield',
								anchor : '45%',
								name : 'imgFile2',
								text : '添加图片',
								id : 'pic2',
								inputType : 'file'
							}), new Ext.form.TextField({
								xtype : 'fileuploadfield',
								anchor : '45%',
								name : 'imgFile3',
								text : '添加图片',
								id : 'pic3',
								inputType : 'file'
							}), new Ext.form.TextField({
								xtype : 'fileuploadfield',
								anchor : '45%',
								name : 'imgFile4',
								text : '添加图片',
								id : 'pic4',
								inputType : 'file'
							})],
			buttons : [{
				text : '上&nbsp;&nbsp;&nbsp;传',
				handler : function() {
					if (Ext.getCmp('uploadImgform').getForm().isValid()) {
						Ext.getCmp('uploadImgform').getForm().submit({
							url : webRoot + '/itemImg/save/' + itemid,
							waitMsg : '正在上传...',
							method : 'post',
							success : function(form, action) {
								Ext.MessageBox.alert('提示', '上传成功');
								Ext.getCmp('uploadImgformwindow').close();
								store.load();
							},
							failure : function(form, action) {
								Ext.MessageBox.alert('提示', '上传失败失败,原因为:'
												+ action.result.msg);
							}
						});
					}
				}
			}, {
				text : '取&nbsp;&nbsp;&nbsp;消',
				handler : function() {
					Ext.getCmp('uploadImgformwindow').close();
				}
			}]
		};

		var uplaodImgForm = new Ext.form.FormPanel(uploadImgFormConfig);
		var windowss = new Ext.Window({
					title : '上传商品图',
					width : 320,
					id : 'uploadImgformwindow',
					height : 230,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : uplaodImgForm
				});
		windowss.show();

	}

	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面

	var sma = new Ext.grid.CheckboxSelectionModel({
				dataIndex : 'id',
				listeners : {
					selectionchange : function(sma) {
						if (sma.getCount()) {
							grid.removeButton.enable();
						} else {
							grid.removeButton.disable();
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
				root : 'data.itemImgs',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'path'
						}, {
							name : 'status'
						}],
				remoteSort : true,
				stripeRows : true,
				proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : webRoot + '/itemImg/list/' + itemid
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

	var grid = new Ext.grid.GridPanel({
		store : store,
		flex : 1,
		border : false,
		tbar : [{
					text : '上传图片',
					ref : '../uploadButton',
					tooltip : '编辑选中的商品图片',
					iconCls : 'add-icon',
					handler : function() {
						createItemImgForm();
					}
				}, {
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的商品图片',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的商品图片吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除商品图片。
										sma.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRoot
															+ '/itemImg/delete/'
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
		cm : new Ext.grid.ColumnModel({
					columns : [sma, {
						id : 'path',
						header : '图片',
						width : 320,
						sortable : true,
						dataIndex : 'path',
						align : 'center',
						renderer : function(v) {
							return '<img style="width:65px;" src="' + webRoot
									+ '/' + v + '"/>';
						}
					}, {
						id : 'status',
						header : '状态',
						width : 80,
						sortable : true,
						dataIndex : 'status',
						align : 'center',
						renderer : function(v) {
							if (v == 1)
								return '有效';
							if (v == 0)
								return '无效';
						}
					}],
					defaults : {
						sortable : true,
						menuDisabled : false,
						width : 100
					}
				}),
		loadMask : false,
		sm : sma,
		// paging bar on the bottom
		bbar : new Ext.PagingToolbar({
					pageSize : pagesize,
					store : store,
					displayInfo : false,
					emptyMsg : "没有查询到任何记录"
				}),
		items : searchForm
	});

	var window = new Ext.Window({
				title : '图片列表',
				width : 720,
				id : 'itemImgformwindow',
				height : 600,
				resizable : false,
				layout : 'vbox',
				modal : true,
				border : false,
				items : [grid]
			});
	window.show();

	// return panel;
}