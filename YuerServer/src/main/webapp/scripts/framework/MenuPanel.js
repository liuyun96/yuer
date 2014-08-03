/*
 * ! Ext JS Library 3.3.1 Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com http://www.sencha.com/license
 */
MenuPanel = function(apptitle) {
	MenuPanel.superclass.constructor.call(this, {
		id : 'menu-tree',
		region : 'west',
		split : true,
		width : 225,
		minSize : 175,
		maxSize : 400,
		title : apptitle,
		collapsible : true,
		margins : '3 0 3 3',
		cmargins : '3 3 3 3',
		rootVisible : false,
		lines : false,
		autoScroll : true,
		dataUrl : 'menus.js',
		root : new Ext.tree.AsyncTreeNode({
					text : 'Ext JS',
					id : 'root',
					expanded : true,
					children : MenuPanel.menuData
				})
			/*
			 * tbar: [{ iconCls:'add-feed', text:'Add Feed', handler:
			 * this.showWindow, scope: this },{ id:'delete',
			 * iconCls:'delete-icon', text:'Remove', handler: function(){ var s =
			 * this.getSelectionModel().getSelectedNode(); if(s){
			 * this.removeFeed(s.attributes.url); } }, scope: this }]
			 */
		});

	this.getSelectionModel().on({
				'beforeselect' : function(sm, node) {
					return node.isLeaf();
				},
				'selectionchange' : function(sm, node) {
					if (node) {
						this.fireEvent('menuselect', node.attributes);
					}
				},
				scope : this
			});

	this.addEvents({
				menuselect : true
			});
};

Ext.extend(MenuPanel, Ext.tree.TreePanel, {
			selectMenu : function(url) {
				this.getNodeById(url).select();
			},

			addMenu : function(attrs, inactive, preventAnim) {
				var exists = this.getNodeById(attrs.url);
				if (exists) {
					if (!inactive) {
						exists.select();
						exists.ui.highlight();
					}
					return;
				}
				Ext.apply(attrs, {
							iconCls : 'feed-icon',
							leaf : true,
							cls : 'feed',
							id : attrs.url
						});
				var node = new Ext.tree.TreeNode(attrs);
				this.feeds.appendChild(node);
				if (!inactive) {
					if (!preventAnim) {
						Ext.fly(node.ui.elNode).slideIn('l', {
									callback : node.select,
									scope : node,
									duration : .4
								});
					} else {
						node.select();
					}
				}
				return node;
			}
		});

Ext.reg('appfeedpanel', MenuPanel);