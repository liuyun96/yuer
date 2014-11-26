function create${className}Panel(apptitle){
	//分页大小。
	var pagesize=25;
	//定义编辑表单的界面
	var ${javaName}FormConfig = {
		frame: true,
		labelWidth:70,
		autoHeight:true,
		id:'${javaName}form',
		autoWidth:true,
		padding:'10 10 20 10',
		defaults:{  
			anchor:'100%',
			xtype:'textfield',
			selectOnFocus: true 
		},
		items:[
		//name是form提交是用到的名字,id:为dom所用,dataIndex:为映射数据所用。
		<#assign formitemcount=0>
		<#list nonReferenceColumns as column>
			<#assign formitemcount=formitemcount+1>
			<#if column.primary>
				{name:'${javaName}.id',id:'id',xtype:'hidden'}<#if column_has_next>,</#if>
			<#elseif column.displayType=='输入框'>
				{name:'${javaName}.${column.javaName}',id:'${column.javaName}',fieldLabel:'${column.name}'<#if column.mandatory>,allowBlank:false</#if>}<#if column_has_next>,</#if>
			<#elseif column.displayType=='密码'>
				{name:'${javaName}.password',id:'${column.javaName}',fieldLabel:'密码',inputType:'password'<#if column.mandatory>,allowBlank:false</#if>}<#if column_has_next>,</#if>
				{name:'repassword',fieldLabel:'再次输入',inputType:'password',vtype: 'password',initialPassField:'${column.javaName}'<#if column.mandatory>,allowBlank:false</#if>}<#if column_has_next>,</#if>
			<#elseif column.displayType=='日期'>
				{name:'${javaName}.${column.javaName}',id:'${column.javaName}',format:<#if column.temporal=='DATE'>'Y-m-d'<#elseif column.temporal=='TIME'>'H:i:s'<#else>'Y-m-d H:i:s'</#if>,xtype:'datefield',fieldLabel:'${column.name}'<#if column.mandatory>,allowBlank:false</#if>}<#if column_has_next>,</#if>
			<#elseif column.displayType=='复选框'>
				{name:'${javaName}.${column.javaName}',value:1,id:'${column.javaName}',xtype:'checkbox',fieldLabel:'${column.name}'}<#if column_has_next>,</#if>
			<#elseif column.displayType=='下拉框'>
				{xtype:'combo',
				    typeAhead: true,
				    triggerAction: 'all',
				    hiddenName:'${javaName}.${column.javaName}',
				    id:'${column.javaName}',
				    lazyRender:true,
				    editable:false,
				    emptyText:'请选择${column.name}...',
				    mode: 'local',
				    store: new Ext.data.ArrayStore({id:0,fields: ['label','value'],
				        data: [<#list column.values as lv>['${lv.label}',${lv.value}]<#if lv_has_next>,</#if></#list>]
				    }),
				    valueField: 'value',
				    displayField: 'label',
				    fieldLabel:'${column.name}'<#if column.mandatory>,allowBlank:false</#if>
				}<#if column_has_next>,</#if>
			<#elseif column.displayType=='单选框'>
				{xtype:'radiogroup',fieldLabel:'${column.name}',id:'${column.javaName}',items:[
					<#list column.values as lv>
						{boxLabel:'${lv.label}',inputValue:${lv.value},name:'${javaName}.${column.javaName}'}<#if lv_has_next>,</#if>
					</#list>]}<#if column_has_next>,</#if>
			<#elseif column.displayType=='文本区'>
				{xtype:'textarea',fieldLabel:'${column.name}',id:'${column.javaName}',name:'${javaName}.${column.javaName}',flex:1<#if column.mandatory>,allowBlank:false</#if>}<#if column_has_next>,</#if>
			<#elseif column.displayType=='文件'>
				{xtype: 'fileuploadfield',id:'${column.javaName}',id:'${column.javaName}',name:'${column.javaName}',fieldLabel:'${column.name}',emptyText:'请选择文件...',buttonText: '',buttonCfg: {iconCls: 'upload-icon'}}<#if column_has_next>,</#if>
			</#if>
		</#list>
		],
		buttons:[
			{
				text: '保&nbsp;&nbsp;&nbsp;存',
				handler:function(){
					if(Ext.getCmp('${javaName}form').getForm().isValid()){
						Ext.getCmp('${javaName}form').getForm().submit({
							url:webRoot+'/${javaName}/save',
							waitMsg:'正在保存...',
							method:'post',
							success:function(form, action){
								Ext.MessageBox.alert('提示','保存成功');
								Ext.getCmp('${javaName}formwindow').close();
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
					Ext.getCmp('${javaName}formwindow').close();
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
		root:'data.${javaName}s',
		totalProperty:'data.total',
		idProperty:'id',
		fields:[
			<#list nonReferenceColumns as column>
			<#if column.primary>
			{name:'id',type:'int'}<#if column_has_next>,</#if>
			<#elseif column.javaType=='Date'>
			{name:'${column.javaName}',type:'date',dateFormat:<#if column.temporal=='DATE'>'Y-m-d'<#elseif column.temporal=='TIME'>'H:i:s'<#else>'Y-m-d H:i:s'</#if>}<#if column_has_next>,</#if>
			<#else>
			{name:'${column.javaName}'}<#if column_has_next>,</#if>
			</#if>
			</#list>
		],
		remoteSort:true,
        stripeRows: true,		
		proxy: new Ext.data.HttpProxy({
			method:'post',
			url:webRoot+'/${javaName}/list'
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
			<#list nonReferenceColumns as column>
			<#if column.javaType=='Date'>
				{id:'${column.javaName}',xtype:'datecolumn',header:'${column.name}',width:120,sortable:true,format:<#if column.temporal=='DATE'>'Y-m-d'<#elseif column.temporal=='TIME'>'H:i:s'<#else>'Y-m-d H:i:s'</#if>,dataIndex:'${column.javaName}'}<#if column_has_next>,</#if>
			<#elseif column.javaType=='Boolean'>
				{id:'${column.javaName}',header:'${column.name}',width:80,sortable:true,dataIndex:'${column.javaName}',renderer:function(v){return v?'是':'否';}}<#if column_has_next>,</#if>			
			<#elseif column.values??>
				{id:'${column.javaName}',header:'${column.name}',width:80,sortable:true,dataIndex:'${column.javaName}',renderer:function(v){
					<#list column.values as lv>
						if(v==${lv.value})
							return '${lv.label}';
					</#list>
					}
				}<#if column_has_next>,</#if>			
			<#elseif column.primary==false>
				{id:'${column.javaName}',header:'${column.name}',width:80,sortable:true,dataIndex:'${column.javaName}'}<#if column_has_next>,</#if>
			</#if>
			</#list>
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
		<#list searchableColumns as column>
			<#if column.displayType=='输入框' ||column.displayType=='文本区'>
				{xtype:'label',style:'padding:4px 3px 3px 0',width:${(12*column.name?length+10)},text:'${column.name+":"}'},
				{name:'searchForm.${column.javaName}',xtype:'textfield',width:150},
			<#elseif column.displayType=='日期'>
				{xtype:'label',style:'padding:4px 3px 3px 0',width:${12*column.name?length+10},text:'${column.name+":"}'},
				{name:'searchForm.${column.javaName}Start',xtype:'datefield',format:<#if column.temporal=='DATE'>'Y-m-d'<#elseif column.temporal=='TIME'>'H:i:s'<#else>'Y-m-d H:i:s'</#if>},
				{xtype:'label',width:8,style:'padding:4px 0 0 0',text:'-'},
				{name:'searchForm.${column.javaName}End',xtype:'datefield',format:<#if column.temporal=='DATE'>'Y-m-d'<#elseif column.temporal=='TIME'>'H:i:s'<#else>'Y-m-d H:i:s'</#if>},
			<#elseif column.displayType=='复选框'>
				{xtype:'label',style:'padding:4px 3px 3px 0',width:${12*column.name?length+10},text:'${column.name+":"}'},
				{name:'searchForm.${column.javaName}',width:60,xtype:'radiogroup',items:[
						{boxLabel:'是',inputValue:'true',name:'searchForm.${column.javaName}'},
						{boxLabel:'否',inputValue:'false',name:'searchForm.${column.javaName}'}
					]
				},
			<#elseif column.displayType=='下拉框'>
				{xtype:'label',style:'padding:4px 3px 3px 0',width:${12*column.name?length+10},text:'${column.name+":"}'},
				{xtype:'combo',
				    typeAhead: true,
				    hiddenName:'searchForm.${column.javaName}',
				    triggerAction: 'all',
				    lazyRender:true,
				    editable:false,
					width:60,
				    emptyText:'请选择${column.name}...',
				    mode: 'local',
				    store: new Ext.data.ArrayStore({id: 0,fields: ['label','value'],
				        data: [<#list column.values as lv>['${lv.label}',${lv.value}]<#if lv_has_next>,</#if></#list>]
				    }),
				    valueField: 'value',
				    displayField: 'label'
				},
			<#elseif column.displayType=='单选框'>
				{xtype:'radiogroup',items:[
					<#list column.values as lv>
						{boxLabel:'${lv.label}',inputValue:${lv.value},name:'searchForm.${column.javaName}'}<#if lv_has_next>,</#if>
					</#list>]},
			</#if>
		</#list>
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
					create${className}Form('创建新${name}');
				}
			},
			{
				text:'编辑',ref: '../editButton',tooltip:'编辑选中的${name}',iconCls:'edit-icon',disabled:true,
				handler:function(){
					create${className}Form('编辑${name}',sm.getSelected().data.id);
				}
			},			
			{
				text:'删除',ref: '../removeButton',tooltip:'删除选中的${name}',iconCls:'delete-icon',disabled:true,
				handler:function(){
					Ext.MessageBox.confirm('删除确认','你确定要删除所选中的${name}吗？',function(id){
						if(id=='yes'){
							var ids='';
							//删除${name}。
							sm.each(function(r){
								ids+=r.data.id;
								ids+=',';
							});
							Ext.Ajax.request({
								url:webRoot+'/${javaName}/delete/'+ids,
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

	function create${className}Form(title,id){
		var ${javaName}Form = new Ext.form.FormPanel(${javaName}FormConfig);
		var window = new Ext.Window({
			title:title,
			width:320,
			id:'${javaName}formwindow',
			height:${formitemcount*25+110},
			resizable : false,  			
			layout:'vbox',
			modal : true,
			border:false,
			items:${javaName}Form
		});
		if(id!=undefined){
			${javaName}Form.getForm().load({
				clientValidation: false,
				waitMsg:'加载中...', 
				url:webRoot+'/${javaName}/load/'+id,
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

