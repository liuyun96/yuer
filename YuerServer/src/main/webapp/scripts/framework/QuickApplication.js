QuickApplication = {};

Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return false;
        }
        if (field.startDateField) {
            var start = Ext.getCmp(field.startDateField);
            if (!start.maxValue || (date.getTime() != start.maxValue.getTime())) {
                start.setMaxValue(date);
                start.validate();
            }
        }
        else if (field.endDateField) {
            var end = Ext.getCmp(field.endDateField);
            if (!end.minValue || (date.getTime() != end.minValue.getTime())) {
                end.setMinValue(date);
                end.validate();
            }
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    },

    password : function(val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },
    passwordText : '两次输入密码不一致',
	emailText:'Email地址格式错误',
	urlText:'URL地址格式错误'	
});

Ext.override(Ext.data.Connection,{
    serail : 0,
    request : Ext.data.Connection.prototype.request.createSequence(function(){ 
        this.serail++;
		Ext.get('load-ing').update('处理中,请稍后......');
        Ext.get('load-ing').show();
    }),
    handleResponse : Ext.data.Connection.prototype.handleResponse.createSequence(function(){ 
        if(this.serail==1)
            Ext.get('load-ing').hide();
        this.serail--;
    }),
    doFormUpload : Ext.data.Connection.prototype.doFormUpload.createSequence(function(){ 
        if(this.serail==1)
            Ext.get('load-ing').hide();
        this.serail--;
    }),
    handleFailure : Ext.data.Connection.prototype.handleFailure.createSequence(function(){ 
        //Ext.get('load-ing').update('服务器出现问题或者网络故障，请稍后再试!');
		//this.serail=0;
    })
});
//这个通用header用于处理错误的时候返回特定的json错误描述，而不是一个500错误。
Ext.Ajax.defaultHeaders = {
    'resp-format': 'json'
};
Ext.onReady(function(){
    Ext.QuickTips.init();
	
/*
    var tpl = Ext.Template.from('preview-tpl', {
        compiled:true,
        getBody : function(v, all){
            return Ext.util.Format.stripScripts(v || all.description);
        }
    });
    QuickApplication.getTemplate = function(){
        return tpl;
    }*/

    var menus = new MenuPanel('导航菜单');
    var mainPanel = new MainPanel();
    menus.on('menuselect', function(menu){
		var p = mainPanel.getItem(menu.id);
		//如果已经存在，则激活tab
		if(p!=undefined){
			mainPanel.setActiveTab(p);
			return;
		}
		//否则创建这些tab相关的panel
		if(menu.url.indexOf('javascript:')==0){
			//如果是Javascript，则直接执行Javascript
			p = eval(menu.url);
			p.id = menu.id;
		}else{
			//否则如果是一个链接，则创建一个iframe的Panel，然后在这个iframe中打开链接。
			p = new Ext.Panel({
                id: menu.id,
                title: menu.text,
                tabTip:menu.text,
                closable:true,
                autoScroll:true,
                border:true,
                html: '<iframe width="100%" height="100%"  frameborder="0" src="'+menu.url+'" />',
                listeners: QuickApplication.LinkInterceptor
            });
		}
        mainPanel.openTab(menu.id,p);
    });
    
    var viewport = new Ext.Viewport({
        layout:'border',
        items:[
            new Ext.BoxComponent({ // raw element
                region:'north',
                el: 'header',
                height:42
            }),
            menus,
            mainPanel
         ]
    });

    Ext.get('header').on('click', function() {
        viewport.focus();
    });
    menus.getRootNode().expand();
    menus.collapseAll();
    menus.focus();
});

// This is a custom event handler passed to preview panels so link open in a new windw
QuickApplication.LinkInterceptor = {
    render: function(p){
        p.body.on({
            'mousedown': function(e, t){ // try to intercept the easy way
                t.target = '_blank';
            },
            'click': function(e, t){ // if they tab + enter a link, need to do it old fashioned way
                if(String(t.target).toLowerCase() != '_blank'){
                    e.stopEvent();
                    window.open(t.href);
                }
            },
            delegate:'a'
        });
    }
};