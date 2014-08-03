MainPanel = function(){
    MainPanel.superclass.constructor.call(this, {
        id:'main-tabs',
        activeTab:0,
        region:'center',
        margins:'3 3 3 0',
        resizeTabs:true,
        tabWidth:150,
        minTabWidth: 120,
        enableTabScroll: true,
        plugins: new Ext.ux.TabCloseMenu()
    });
};

Ext.extend(MainPanel, Ext.TabPanel, {

    openTab : function(id,p){
        if(!this.getItem(id)){
            this.add(p);
        }
        this.setActiveTab(p);
    }
});

Ext.reg('appmainpanel', MainPanel);