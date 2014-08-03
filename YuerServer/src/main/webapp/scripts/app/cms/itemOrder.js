function createItemOrderPanel(apptitle){
	//分页大小。
	var pagesize=25;
	//定义编辑表单的界面
	var itemOrderFormConfig = {
		frame: true,
		labelWidth:70,
		autoHeight:true,
		id:'itemOrderform',
		autoWidth:true,
		padding:'10 10 20 10',
		defaults:{  
			anchor:'100%',
			xtype:'textfield',
			selectOnFocus: true 
		},
		items:[
		//name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
				{name:'itemOrder.id',id:'id',xtype:'hidden'},
				{name:'itemOrder.price',id:'price',fieldLabel:'商品价格'},
				{name:'itemOrder.num',id:'num',fieldLabel:'商品数量'},
				{name:'itemOrder.fee',id:'fee',fieldLabel:'实付金额'},
				{name:'itemOrder.orderTime',id:'orderTime',format:'Y-m-d',xtype:'datefield',fieldLabel:'下单时间'},
				{name:'itemOrder.sendTime',id:'sendTime',format:'Y-m-d',xtype:'datefield',fieldLabel:'发货时间'},
				{name:'itemOrder.signTime',id:'signTime',format:'Y-m-d',xtype:'datefield',fieldLabel:'收货时间'},
				{name:'itemOrder.signAddress',id:'signAddress',fieldLabel:'收件人地址'},
				{name:'itemOrder.signName',id:'signName',fieldLabel:'收件人姓名'},
				{name:'itemOrder.signTel',id:'signTel',fieldLabel:'收件人联系电话'},
				{name:'itemOrder.zip',id:'zip',fieldLabel:'邮编'},
				{name:'itemOrder.status',value:1,id:'status',xtype:'checkbox',fieldLabel:'状态'}
		],
		buttons:[
			{
				text: '保&nbsp;&nbsp;&nbsp;存',
				handler:function(){
					if(Ext.getCmp('itemOrderform').getForm().isValid()){
						Ext.getCmp('itemOrderform').getForm().submit({
							url:webRoot+'/itemOrder/save',
							waitMsg:'正在保存...',
							method:'post',
							success:function(form, action){
								Ext.MessageBox.alert('提示','保存成功');
								Ext.getCmp('itemOrderformwindow').close();
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
					Ext.getCmp('itemOrderformwindow').close();
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
		root:'data.itemOrders',
		totalProperty:'data.total',
		idProperty:'id',
		fields:[
			{name:'id',type:'int'},
			{name:'price'},
			{name:'num'},
			{name:'fee'},
			{name:'orderTime',type:'date',dateFormat:'Y-m-d'},
			{name:'sendTime',type:'date',dateFormat:'Y-m-d'},
			{name:'signTime',type:'date',dateFormat:'Y-m-d'},
			{name:'signAddress'},
			{name:'signName'},
			{name:'signTel'},
			{name:'zip'},
			{name:'status'}
		],
		remoteSort:true,
        stripeRows: true,		
		proxy: new Ext.data.HttpProxy({
			method:'post',
			url:webRoot+'/itemOrder/list'
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
				{id:'id',header:'订单ID',width:80,sortable:true,dataIndex:'id',renderer:function(v){
					}
				},			
				{id:'price',header:'商品价格',width:80,sortable:true,dataIndex:'price'},
				{id:'num',header:'商品数量',width:80,sortable:true,dataIndex:'num'},
				{id:'fee',header:'实付金额',width:80,sortable:true,dataIndex:'fee'},
				{id:'orderTime',xtype:'datecolumn',header:'下单时间',width:120,sortable:true,format:'Y-m-d',dataIndex:'orderTime'},
				{id:'sendTime',xtype:'datecolumn',header:'发货时间',width:120,sortable:true,format:'Y-m-d',dataIndex:'sendTime'},
				{id:'signTime',xtype:'datecolumn',header:'收货时间',width:120,sortable:true,format:'Y-m-d',dataIndex:'signTime'},
				{id:'signAddress',header:'收件人地址',width:80,sortable:true,dataIndex:'signAddress'},
				{id:'signName',header:'收件人姓名',width:80,sortable:true,dataIndex:'signName'},
				{id:'signTel',header:'收件人联系电话',width:80,sortable:true,dataIndex:'signTel'},
				{id:'zip',header:'邮编',width:80,sortable:true,dataIndex:'zip'},
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
					createItemOrderForm('创建新商品订单信息');
				}
			},
			{
				text:'编辑',ref: '../editButton',tooltip:'编辑选中的商品订单信息',iconCls:'edit-icon',disabled:true,
				handler:function(){
					createItemOrderForm('编辑商品订单信息',sm.getSelected().data.id);
				}
			},			
			{
				text:'删除',ref: '../removeButton',tooltip:'删除选中的商品订单信息',iconCls:'delete-icon',disabled:true,
				handler:function(){
					Ext.MessageBox.confirm('删除确认','你确定要删除所选中的商品订单信息吗？',function(id){
						if(id=='yes'){
							var ids='';
							//删除商品订单信息。
							sm.each(function(r){
								ids+=r.data.id;
								ids+=',';
							});
							Ext.Ajax.request({
								url:webRoot+'/itemOrder/delete/'+ids,
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

	function createItemOrderForm(title,id){
		var itemOrderForm = new Ext.form.FormPanel(itemOrderFormConfig);
		var window = new Ext.Window({
			title:title,
			width:320,
			id:'itemOrderformwindow',
			height:410,
			resizable : false,  			
			layout:'vbox',
			modal : true,
			border:false,
			items:itemOrderForm
		});
		if(id!=undefined){
			itemOrderForm.getForm().load({
				clientValidation: false,
				waitMsg:'加载中...', 
				url:webRoot+'/itemOrder/load/'+id,
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

