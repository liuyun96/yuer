function createMessagePanel(apptitle) {
	// 分页大小。
	var pagesize = 25;
	// 定义编辑表单的界面
	var messageFormConfig = {
		frame : true,
		labelWidth : 70,
		autoHeight : true,
		id : 'messageform',
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
			name : 'message.id',
			id : 'id',
			xtype : 'hidden'
		}, {
			name : 'message.mobile',
			id : 'mobile',
			fieldLabel : '手机号码'
		}, {
			name : 'message.content',
			id : 'content',
			fieldLabel : '发送的内容'
		}, {
			name : 'message.status',
			value : 1,
			id : 'status',
			xtype : 'checkbox',
			fieldLabel : '状态'
		}, {
			name : 'message.sendTime',
			id : 'sendTime',
			format : 'Y-m-d H:i:s',
			xtype : 'datefield',
			fieldLabel : '修改时间',
			xtype : 'hidden'
		}, {
			name : 'message.messageid',
			id : 'messageid',
			fieldLabel : '失败的信息id'
		}, {
			name : 'message.msg',
			id : 'msg',
			fieldLabel : '文本信息'
		}],
		buttons : [{
			text : '保&nbsp;&nbsp;&nbsp;存',
			handler : function() {
				if (Ext.getCmp('messageform').getForm().isValid()) {
					Ext.getCmp('messageform').getForm().submit({
						url : webRoot + '/message/save',
						waitMsg : '正在保存...',
						method : 'post',
						success : function(form, action) {
							Ext.MessageBox.alert('提示', '保存成功');
							Ext.getCmp('messageformwindow').close();
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
				Ext.getCmp('messageformwindow').close();
			}
		}]
	};

	var sm = new Ext.grid.CheckboxSelectionModel({
				dataIndex : 'id',
				listeners : {
					selectionchange : function(sm) {
						if (sm.getCount()) {
							panel.removeButton.enable();
							// if(sm.getCount()==1)//只有选中一个时候才可以编辑。
							// panel.editButton.enable();
							// else
							// panel.editButton.disable();
						} else {
							panel.removeButton.disable();
							// panel.editButton.disable();
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
				root : 'data.messages',
				totalProperty : 'data.total',
				idProperty : 'id',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'mobile'
						}, {
							name : 'content'
						}, {
							name : 'status'
						}, {
							name : 'messageid'
						}, {
							name : 'msg'
						}, {
							name : 'sendTime',
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
							url : webRoot + '/message/list'
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
										id : 'mobile',
										header : '手机号码',
										width : 100,
										sortable : true,
										dataIndex : 'mobile'
									}, {
										id : 'content',
										header : '发送的内容',
										width : 220,
										sortable : true,
										dataIndex : 'content'
									}, {
										id : 'status',
										header : '状态',
										width : 65,
										sortable : true,
										dataIndex : 'status',
										renderer : function(v) {
											return v == 1 ? '发送成功' : '发送失败';
										}
									}, {
										id : 'sendTime',
										header : '发送时间',
										width : 135,
										dataIndex : 'sendTime'
									}, {
										id : 'messageid',
										header : '公共异常id',
										width : 90,
										sortable : true,
										dataIndex : 'messageid'
									}, {
										id : 'msg',
										header : '公共异常信息',
										width : 180,
										sortable : true,
										dataIndex : 'msg'
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
							width : 45,
							defaultMargins : '5 5 5 5',
							text : '手机号:'
						}, {
							name : 'message.mobile',
							width : 160,
							xtype : 'textfield'
						}, {
							xtype : 'label',
							width : 35,
							defaultMargins : '5 5 5 5',
							text : '状态:'
						}, {
							xtype : 'combo',
							typeAhead : true,
							triggerAction : 'all',
							hiddenName : 'message.status',
							lazyRender : true,
							editable : false,
							anchor : '15%',
							emptyText : '选择发送状态',
							mode : 'local',
							store : new Ext.data.ArrayStore({
										id : 0,
										fields : ['label', 'value'],
										data : [['全部', -1], ['发送成功', 1],
												['发送失败', 0]]
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
				tbar : [
						// {
						// text:'新增',iconCls:'add-icon',ref: '../addButton',
						// handler:function(){
						// createMessageForm('创建新短信发送记录表');
						// }
						// },
						// {
						// text:'编辑',ref:
						// '../editButton',tooltip:'编辑选中的短信发送记录表',iconCls:'edit-icon',disabled:true,
						// handler:function(){
						// createMessageForm('编辑短信发送记录表',sm.getSelected().data.id);
						// }
						// },
						{
					text : '删除',
					ref : '../removeButton',
					tooltip : '删除选中的短信发送记录表',
					iconCls : 'delete-icon',
					disabled : true,
					handler : function() {
						Ext.MessageBox.confirm('删除确认', '你确定要删除所选中的短信发送记录表吗？',
								function(id) {
									if (id == 'yes') {
										var ids = '';
										// 删除短信发送记录表。
										sm.each(function(r) {
													ids += r.data.id;
													ids += ',';
												});
										Ext.Ajax.request({
													url : webRoot
															+ '/message/delete/'
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

	function createMessageForm(title, id) {
		var messageForm = new Ext.form.FormPanel(messageFormConfig);
		var window = new Ext.Window({
					title : title,
					width : 320,
					id : 'messageformwindow',
					height : 260,
					resizable : false,
					layout : 'vbox',
					modal : true,
					border : false,
					items : messageForm
				});
		if (id != undefined) {
			messageForm.getForm().load({
						clientValidation : false,
						waitMsg : '加载中...',
						url : webRoot + '/message/load/' + id,
						method : 'GET'
					});
		}
		window.show();

	}
	return panel;
}
