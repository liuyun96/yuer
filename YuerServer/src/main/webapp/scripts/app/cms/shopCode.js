function createShopCodePanel(apptitle){
	//分页大小。
	var pagesize=25;
	//定义编辑表单的界面
	var shopCodeFormConfig = {
		frame: true,
		labelWidth:70,
		autoHeight:true,
		id:'shopCodeform',
		autoWidth:true,
		padding:'10 10 20 10',
		defaults:{  
			anchor:'100%',
			xtype:'textfield',
			selectOnFocus: true 
		},
		items:[
		//name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
				{name:'shopCode.id',id:'id',xtype:'hidden'},
				{name:'shopCode.shopId',id:'shopId',fieldLabel:'店铺编号'},
				{name:'shopCode.receiveTime',id:'receiveTime',format:'Y-m-d',xtype:'datefield',fieldLabel:'领取时间'},
				{name:'shopCode.useTime',id:'useTime',format:'Y-m-d',xtype:'datefield',fieldLabel:'使用时间'},
				{name:'shopCode.receiveBuyer',id:'receiveBuyer',fieldLabel:'领取买家'},
				{name:'shopCode.consumeBuyer',id:'consumeBuyer',fieldLabel:'消费买家'},
				{name:'shopCode.buyerId',id:'buyerId',fieldLabel:'买家编号'},
				{name:'shopCode.status',value:1,id:'status',xtype:'checkbox',fieldLabel:'状态'}
		],
		buttons:[
			{
				text: '保&nbsp;&nbsp;&nbsp;存',
				handler:function(){
					if(Ext.getCmp('shopCodeform').getForm().isValid()){
						Ext.getCmp('shopCodeform').getForm().submit({
							url:webRoot+'/shopCode/save',
							waitMsg:'正在保存...',
							method:'post',
							success:function(form, action){
								Ext.MessageBox.alert('提示','保存成功');
								Ext.getCmp('shopCodeformwindow').close();
								store.load();
							},
							failure:function(form, action){
								Ext.MessageBox.alert('提示','保存失败,原因为:'+action.result.msg);
							}
						});
					}
				}
			},{
				text: '取&nbsp;&nbsp;&nbsp;消',
				handler:function(){
					Ext.getCmp('shopCodeformwindow').close();
				}
			}
		]
	};
		
	var sm = new Ext.grid.CheckboxSelectionModel({
		dataIndex:'id',
        listeners: {
            selectionchange: function(sm) {
                if (sm.getCount()) {
                    panel.removeButton.enable();
					if(sm.getCount()==1)//只有选中一个时候才可以编辑。
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
		autoLoad:{params:{limit:pagesize,start:0}},
		root:'data.shopCodes',
		totalProperty:'data.total',
		idProperty:'id',
		fields:[
			{name:'id',type:'int'},
			{name:'shopId'},
			{name:'receiveTime',type:'date',dateFormat:'Y-m-d'},
			{name:'useTime',type:'date',dateFormat:'Y-m-d'},
			{name:'receiveBuyer'},
			{name:'consumeBuyer'},
			{name:'buyerId'},
			{name:'status'}
		],
		remoteSort:true,
        stripeRows: true,		
		proxy: new Ext.data.HttpProxy({
			method:'post',
			url:webRoot+'/shopCode/list'
		})
	});
	store.setDefaultSort('','');
	store.on("beforeload",function(thiz,options){
		//获取查询表单的查询条件。
		this.baseParams = searchForm.getForm().getValues();
		options.params.limit = pagesize;
		//可以增加其他必要的条件。
		return true;
	});
	
	
	var grid= new Ext.grid.GridPanel({
		store:store,
		flex:1,
		border:false,
		cm:new Ext.grid.ColumnModel({
			columns:[
				sm,
				{id:'shopId',header:'店铺编号',width:80,sortable:true,dataIndex:'shopId'},
				{id:'receiveTime',xtype:'datecolumn',header:'领取时间',width:120,sortable:true,format:'Y-m-d',dataIndex:'receiveTime'},
				{id:'useTime',xtype:'datecolumn',header:'使用时间',width:120,sortable:true,format:'Y-m-d',dataIndex:'useTime'},
				{id:'receiveBuyer',header:'领取买家',width:80,sortable:true,dataIndex:'receiveBuyer'},
				{id:'consumeBuyer',header:'消费买家',width:80,sortable:true,dataIndex:'consumeBuyer'},
				{id:'buyerId',header:'买家编号',width:80,sortable:true,dataIndex:'buyerId'},
				{id:'status',header:'状态',width:80,sortable:true,dataIndex:'status',renderer:function(v){return v?'是':'否';}}			
			],
			defaults: {
				sortable: true,
				menuDisabled:false,
				width: 100
			}
		}),
		loadMask:false,
		sm:sm,
        // paging bar on the bottom
        bbar: new Ext.PagingToolbar({
            pageSize: pagesize,
            store: store,
            displayInfo: false,
            emptyMsg: "没有查询到任何记录"
        })
	});
	//查询表单
	var searchForm = new Ext.form.FormPanel({
		height:50,
		style:'border-bottom:1px solid #ddd',
		border:false,
		padding:'4 4 4 4',
		hidden:true,
		layout:{
			type:'hbox',
			defaultMargins:'0 5 5 0',
			align:'left'
		},
		items:[
			{xtype:'button',width:60,text:'查询',handler:function(){store.load();}},		
			{xtype:'button',width:60,text:'清空',handler:function(){searchForm.getForm().reset()}}		
		]
	});

	//最后组装成的List界面。
	var panel = new Ext.Panel({
		title: apptitle,
		tabTip:apptitle,
		closable:true,
		autoScroll:true,
		border:true,
		tbar:[
			{
				text:'新增',iconCls:'add-icon',ref: '../addButton',
				handler:function(){
					createShopCodeForm('创建新店铺优惠码');
				}
			},
			{
				text:'编辑',ref: '../editButton',tooltip:'编辑选中的店铺优惠码',iconCls:'edit-icon',disabled:true,
				handler:function(){
					createShopCodeForm('编辑店铺优惠码',sm.getSelected().data.id);
				}
			},			
			{
				text:'删除',ref: '../removeButton',tooltip:'删除选中的店铺优惠码',iconCls:'delete-icon',disabled:true,
				handler:function(){
					Ext.MessageBox.confirm('删除确认','你确定要删除所选中的店铺优惠码吗？',function(id){
						if(id=='yes'){
							var ids='';
							//删除店铺优惠码。
							sm.each(function(r){
								ids+=r.data.id;
								ids+=',';
							});
							Ext.Ajax.request({
								url:webRoot+'/shopCode/delete/'+ids,
								success:function(){
									store.load();
								}
							});
						}
					});
				}
			},
			{
				text:'刷新',tooltip:'刷新列表',iconCls:'refresh-icon',
				handler:function(){store.reload();}
			},			
			'->',//开始右对齐按钮
			{
				text:'查询',enableToggle:true,pressed:false,iconCls:'find-icon',
				toggleHandler:function(){
					if(this.pressed){
						searchForm.show();
						panel.doLayout();
					}
					else{
						searchForm.hide();
						panel.doLayout();
					}
				}
			}
		],
		layout:{
			type:'vbox',
			padding:0,
			align:'stretchmax'
		},
		defaults:{margins:'0 0 0 0'},
		items:[searchForm,grid]
	});

	function createShopCodeForm(title,id){
		var shopCodeForm = new Ext.form.FormPanel(shopCodeFormConfig);
		var window = new Ext.Window({
			title:title,
			width:320,
			id:'shopCodeformwindow',
			height:310,
			resizable : false,  			
			layout:'vbox',
			modal : true,
			border:false,
			items:shopCodeForm
		});
		if(id!=undefined){
			shopCodeForm.getForm().load({
				clientValidation: false,
				waitMsg:'加载中...', 
				url:webRoot+'/shopCode/load/'+id,
				method:'GET'
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

