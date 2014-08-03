function createVideoPanel(apptitle) {
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
		root : 'data.videos',
		totalProperty : 'data.total',
		idProperty : 'id',
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name'
		}, {
			name : 'path'
		}, {
			name : 'type'
		}, {
			name : 'status'
		}, {
			name : 'playId'
		} , {
			name : 'playAction'
		}, {
			name : 'playArea'
		}, {
			name : 'playMode'
		}, {
			name : 'backVasUrl'
		} ],
		remoteSort : true,
		stripeRows : true,
		proxy : new Ext.data.HttpProxy({
			method : 'post',
			url : webRootCms + '/video/list'
		})
	});
	store.setDefaultSort('', '');
	store.on("beforeload", function(thiz, options) {
		// 获取查询表单的查询条件。
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
				id : 'name',
				header : '名称',
				width : 80,
				sortable : true,
				dataIndex : 'name'
			}, {
				id : 'type',
				header : '类别',
				width : 80,
				dataIndex : 'type'
			}, {
				id : 'playId',
				header : '视频ID',
				width : 80,
				sortable : true,
				dataIndex : 'playId'
			}, {
				id : 'playAction',
				header : '播放动作',
				width : 80,
				dataIndex : 'playAction',
				renderer : function(v) {
					//vod:播放Vod内容;
					//channel:播放频道;
					//tvod:播放回看;
					if(v=='vod'){
						return '播放Vod内容';
					}
					if(v=='channel'){
						return '播放频道';
					}
					if(v=='tvod'){
						return '播放回看';
					}
				}
			}, {
				id : 'playMode',
				header : '播放模式',
				width : 80,
				dataIndex : 'playMode',
				renderer : function(v) {
					if(v=='small'){
						return '小窗口';
					}else{
						return '全屏';
					}
				}
			}, {
				id : 'status',
				header : '状态',
				width : 80,
				sortable : true,
				dataIndex : 'status',
				renderer : function(v) {
					return v == 1 ? '可用' : '不可用';
				}
			} ],
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
				createVideoForm('创建新视频表');
			}
		}, {
			text : '编辑',
			ref : '../editButton',
			tooltip : '编辑选中的视频表',
			iconCls : 'edit-icon',
			disabled : true,
			handler : function() {
				createVideoForm('编辑视频表', sm.getSelected().data.id);
			}
		}, {
			text : '删除',
			ref : '../removeButton',
			tooltip : '删除选中的视频表',
			iconCls : 'delete-icon',
			disabled : true,
			handler : function() {
				Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的视频表吗？', function(id) {
					if (id == 'yes') {
						var ids = '';
						// 删除视频表。
						sm.each(function(r) {
							ids += r.data.id;
							ids += ',';
						});
						Ext.Ajax.request({
							url : webRootCms + '/video/delete/' + ids,
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
		items : [grid ]
	});

	function createVideoForm(title, id) {

		// 定义编辑表单的界面
		var videoFormConfig = {
			frame : true,
			labelWidth : 70,
			autoHeight : true,
			id : 'videoform',
			autoWidth : true,
			enctype : 'multipart/form-data',
			padding : '10 10 20 10',
			defaults : {
				anchor : '100%',
				xtype : 'textfield',
				selectOnFocus : true
			},
			items : [ {
				name : 'video.id',
				id : 'id',
				xtype : 'hidden'
			}, {
				name : 'video.playId',
				id : 'playId',
				fieldLabel :'视频ID'
			}, {
				name : 'video.name',
				id : 'name',
				fieldLabel : '视频名称'
			}, {
				name : 'video.playArea',
				id : 'playArea',
				fieldLabel : '播放时窗口大小'
			}, {
				xtype : 'combo',
				typeAhead : true,
				triggerAction : 'all',
				allowBlank : false,
				hiddenName : 'video.playAction',
				id : 'playAction',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'label', 'value' ],
					data : [ [ 'Vod内容', 'vod' ], [ '播放频道', '其他' ] , [ '播放回看', 'tvod' ]]
				}),
				valueField : 'value',
				displayField : 'label',
				fieldLabel : '播放动作'
			}, {
				xtype : 'combo',
				typeAhead : true,
				triggerAction : 'all',
				allowBlank : false,
				hiddenName : 'video.playMode',
				id : 'playMode',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'label', 'value' ],
					data : [ [ '小窗口播放', 'small' ], [ '全屏播放', 'full' ]]
				}),
				valueField : 'value',
				displayField : 'label',
				fieldLabel : '播放动作'
			}, {
				xtype : 'combo',
				typeAhead : true,
				triggerAction : 'all',
				allowBlank : false,
				hiddenName : 'video.type',
				id : 'type',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'label', 'value' ],
					data : [ [ '首页', '首页' ], [ '其他', '其他' ] ]
				}),
				valueField : 'value',
				displayField : 'label',
				fieldLabel : '类别'
			}, {
				xtype : 'combo',
				typeAhead : true,
				triggerAction : 'all',
				allowBlank : false,
				hiddenName : 'video.status',
				id : 'status',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'label', 'value' ],
					data : [ [ '有效', 1 ], [ '无效', 0 ] ]
				}),
				valueField : 'value',
				displayField : 'label',
				fieldLabel : '状态'
			} ],
			buttons : [
					{
						text : '保&nbsp;&nbsp;&nbsp;存',
						handler : function() {
							if (Ext.getCmp('videoform').getForm().isValid()) {
								Ext
										.getCmp('videoform')
										.getForm()
										.submit(
												{
													url : webRootCms
															+ '/video/save',
													waitMsg : '正在保存...',
													method : 'post',
													success : function(form,
															action) {
														Ext.MessageBox.alert(
																'提示', '保存成功');
														Ext
																.getCmp(
																		'videoformwindow')
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
							Ext.getCmp('videoformwindow').close();
						}
					} ]
		};

		var videoForm = new Ext.form.FormPanel(videoFormConfig);
		var window = new Ext.Window({
			title : title,
			width : 320,
			id : 'videoformwindow',
			height : 335,
			resizable : false,
			layout : 'vbox',
			modal : true,
			border : false,
			items : videoForm
		});
		if (id != undefined) {
			videoForm.getForm().load({
				clientValidation : false,
				waitMsg : '加载中...',
				url : webRootCms + '/video/load/' + id,
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
