function createPromptTextPanel(apptitle){
	//分页大小。
	var pagesize=25;
	
		
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
		root:'data.promptTexts',
		totalProperty:'data.total',
		idProperty:'id',
		fields:[
			{name:'id',type:'int'},
			{name:'content'},
			{name:'status'},
			{name:'type'}
		],
		remoteSort:true,
        stripeRows: true,		
		proxy: new Ext.data.HttpProxy({
			method:'post',
			url:webRoot+'/cms/promptText/list'
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
				{id:'content',header:'文本内容',width:280,sortable:true,dataIndex:'content'},
				{id:'status',header:'状态',width:80,sortable:true,dataIndex:'status',renderer:function(v){if(v==2) return '不显示';if(v==1) return '显示';}},			
				{id:'type',header:'类型',width:80,sortable:true,dataIndex:'type',renderer:function(v){if(v==1) return '收视提示';if(v==2) return '购买提示';}}			
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
		height:35,
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
			{xtype:'label',width:32,text:'状态:'},
			{xtype:'combo',typeAhead:true,triggerAction:'all',hiddenName:'promptText.status',lazyRender:true,editable:false,mode:'local',store:new Ext.data.ArrayStore({id:0,fields:['label','value'],data:[['全部'],['显示',1],['不显示',2]]}),valueField:'value',displayField:'label'},
			{xtype:'label',width:32,text:'类型:'},
			{xtype:'combo',typeAhead:true,triggerAction:'all',hiddenName:'promptText.type',lazyRender:true,editable:false,mode:'local',store:new Ext.data.ArrayStore({id:0,fields:['label','value'],data:[['全部'],['收视提示',1],['购买提示',2]]}),valueField:'value',displayField:'label'},
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
					createPromptTextForm('创建新提示文本表');
				}
			},
			{
				text:'编辑',ref: '../editButton',tooltip:'编辑选中的提示文本表',iconCls:'edit-icon',disabled:true,
				handler:function(){
					createPromptTextForm('编辑提示文本表',sm.getSelected().data.id);
				}
			},			
			{
				text:'删除',ref: '../removeButton',tooltip:'删除选中的提示文本表',iconCls:'delete-icon',disabled:true,
				handler:function(){
					Ext.MessageBox.confirm('删除确认','你确定要删除所选中的提示文本表吗？',function(id){
						if(id=='yes'){
							var ids='';
							//删除提示文本表。
							sm.each(function(r){
								ids+=r.data.id;
								ids+=',';
							});
							Ext.Ajax.request({
								url:webRoot+'/cms/promptText/delete/'+ids,
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

	function createPromptTextForm(title,id){
		//定义编辑表单的界面
		var promptTextFormConfig = {
			frame: true,
			labelWidth:70,
			autoHeight:true,
			id:'promptTextform',
			autoWidth:true,
			padding:'10 10 20 10',
			defaults:{  
				anchor:'100%',
				xtype:'textfield',
				selectOnFocus: true 
			},
			items:[
			//name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
					{name:'promptText.id',id:'id',xtype:'hidden'},
					{name:'promptText.content',allowBlank : false,height:'110',id:'content',fieldLabel:'文本内容',xtype:'textarea'},
					//{name:'promptText.status',value:1,id:'status',xtype:'checkbox',fieldLabel:'状态'},
					{xtype:'combo',typeAhead:true,triggerAction:'all',allowBlank:false,hiddenName:'promptText.status',id:'status',lazyRender:true,editable:false,mode:'local',store:new Ext.data.ArrayStore({id:0,fields:['label','value'],data:[['显示',1],['不显示',2]]}),valueField:'value',displayField:'label',fieldLabel:'状态'},
					{xtype:'combo',typeAhead:true,triggerAction:'all',allowBlank:false,hiddenName:'promptText.type',id:'type',lazyRender:true,editable:false,mode:'local',store:new Ext.data.ArrayStore({id:0,fields:['label','value'],data:[['收视提示',1],['购买提示',2]]}),valueField:'value',displayField:'label',fieldLabel:'类型'} 
					//{name:'promptText.type',value:1,id:'type',xtype:'checkbox',fieldLabel:'类型'}
			],
			buttons:[
				{
					text: '保&nbsp;&nbsp;&nbsp;存',
					handler:function(){
						if(Ext.getCmp('promptTextform').getForm().isValid()){
							Ext.getCmp('promptTextform').getForm().submit({
								url:webRoot+'/cms/promptText/save',
								waitMsg:'正在保存...',
								method:'post',
								success:function(form, action){
									Ext.MessageBox.alert('提示','保存成功');
									Ext.getCmp('promptTextformwindow').close();
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
						Ext.getCmp('promptTextformwindow').close();
					}
				}
			]
		};
		
		var promptTextForm = new Ext.form.FormPanel(promptTextFormConfig);
		var window = new Ext.Window({
			title:title,
			width:380,
			id:'promptTextformwindow',
			height:300,
			resizable : false,  			
			layout:'vbox',
			modal : true,
			border:false,
			items:promptTextForm
		});
		if(id!=undefined){
			promptTextForm.getForm().load({
				clientValidation: false,
				waitMsg:'加载中...', 
				url:webRoot+'/cms/promptText/load/'+id,
				method:'GET'
			});
		}
		window.show();
		
	}	
	return panel;
}

