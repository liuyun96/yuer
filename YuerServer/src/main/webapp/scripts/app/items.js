function createItemsPanel(apptitle){
	//分页大小。
	var pagesize=25;
	//定义编辑表单的界面
	var itemsFormConfig = {
		frame: true,
		labelWidth:70,
		autoHeight:true,
		id:'itemsform',
		autoWidth:true,
		padding:'10 10 20 10',
		defaults:{  
			anchor:'100%',
			xtype:'textfield',
			selectOnFocus: true 
		},
		items:[
		//name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
				{name:'items.id',id:'id',xtype:'hidden'},
				{name:'items.name',id:'name',fieldLabel:'商品名称'},
				{name:'items.price',id:'price',fieldLabel:'原价'},
				{name:'items.currentPrice',id:'currentPrice',fieldLabel:'现价'},
				{name:'items.title',id:'title',fieldLabel:'广告标题'},
				{name:'items.subhead',id:'subhead',fieldLabel:'副标题'},
				{name:'items.detail',id:'detail',fieldLabel:'商品宣传文字'},
				{name:'items.img',id:'img',fieldLabel:'商品图片'},
				{name:'items.status',value:1,id:'status',xtype:'checkbox',fieldLabel:'状态'},
				{name:'items.clickNum',id:'clickNum',fieldLabel:'点击量'},
				{name:'items.orderNum',id:'orderNum',fieldLabel:'购买量'},
				{name:'items.createTime',id:'createTime',format:'Y-m-d H:i:s',xtype:'datefield',fieldLabel:'创建时间'},
				{name:'items.updateTime',id:'updateTime',format:'Y-m-d H:i:s',xtype:'datefield',fieldLabel:'修改时间'}
		],
		buttons:[
			{
				text: '保&nbsp;&nbsp;&nbsp;存',
				handler:function(){
					if(Ext.getCmp('itemsform').getForm().isValid()){
						Ext.getCmp('itemsform').getForm().submit({
							url:webRoot+'/items/save',
							waitMsg:'正在保存...',
							method:'post',
							success:function(form, action){
								Ext.MessageBox.alert('提示','保存成功');
								Ext.getCmp('itemsformwindow').close();
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
					Ext.getCmp('itemsformwindow').close();
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
		root:'data.itemss',
		totalProperty:'data.total',
		idProperty:'id',
		fields:[
			{name:'id',type:'int'},
			{name:'name'},
			{name:'price'},
			{name:'currentPrice'},
			{name:'title'},
			{name:'subhead'},
			{name:'detail'},
			{name:'img'},
			{name:'status'},
			{name:'clickNum'},
			{name:'orderNum'},
			{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},
			{name:'updateTime',type:'date',dateFormat:'Y-m-d H:i:s'}
		],
		remoteSort:true,
        stripeRows: true,		
		proxy: new Ext.data.HttpProxy({
			method:'post',
			url:webRoot+'/items/list'
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
				{id:'name',header:'商品名称',width:80,sortable:true,dataIndex:'name'},
				{id:'price',header:'原价',width:80,sortable:true,dataIndex:'price'},
				{id:'currentPrice',header:'现价',width:80,sortable:true,dataIndex:'currentPrice'},
				{id:'title',header:'广告标题',width:80,sortable:true,dataIndex:'title'},
				{id:'subhead',header:'副标题',width:80,sortable:true,dataIndex:'subhead'},
				{id:'detail',header:'商品宣传文字',width:80,sortable:true,dataIndex:'detail'},
				{id:'img',header:'商品图片',width:80,sortable:true,dataIndex:'img'},
				{id:'status',header:'状态',width:80,sortable:true,dataIndex:'status',renderer:function(v){return v?'是':'否';}},			
				{id:'clickNum',header:'点击量',width:80,sortable:true,dataIndex:'clickNum'},
				{id:'orderNum',header:'购买量',width:80,sortable:true,dataIndex:'orderNum'},
				{id:'createTime',xtype:'datecolumn',header:'创建时间',width:120,sortable:true,format:'Y-m-d H:i:s',dataIndex:'createTime'},
				{id:'updateTime',xtype:'datecolumn',header:'修改时间',width:120,sortable:true,format:'Y-m-d H:i:s',dataIndex:'updateTime'}
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
					createItemsForm('创建新商品表');
				}
			},
			{
				text:'编辑',ref: '../editButton',tooltip:'编辑选中的商品表',iconCls:'edit-icon',disabled:true,
				handler:function(){
					createItemsForm('编辑商品表',sm.getSelected().data.id);
				}
			},			
			{
				text:'删除',ref: '../removeButton',tooltip:'删除选中的商品表',iconCls:'delete-icon',disabled:true,
				handler:function(){
					Ext.MessageBox.confirm('删除确认','你确定要删除所选中的商品表吗？',function(id){
						if(id=='yes'){
							var ids='';
							//删除商品表。
							sm.each(function(r){
								ids+=r.data.id;
								ids+=',';
							});
							Ext.Ajax.request({
								url:webRoot+'/items/delete/'+ids,
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

	function createItemsForm(title,id){
		var itemsForm = new Ext.form.FormPanel(itemsFormConfig);
		var window = new Ext.Window({
			title:title,
			width:320,
			id:'itemsformwindow',
			height:435,
			resizable : false,  			
			layout:'vbox',
			modal : true,
			border:false,
			items:itemsForm
		});
		if(id!=undefined){
			itemsForm.getForm().load({
				clientValidation: false,
				waitMsg:'加载中...', 
				url:webRoot+'/items/load/'+id,
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

