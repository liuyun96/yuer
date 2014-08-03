function createAreaPanel(apptitle) {
	var aWidth = Ext.getBody().getWidth(); // 1024
	var aHeight = Ext.getBody().getHeight();
	var chartPanelH = aHeight - 150;
	var economyPanel = new Ext.Panel({
		width : aWidth - 240,
		border : false,
		height : chartPanelH,
		html : "<div id='economy_chart_div'></div>"
	});
	// 查询表单
	var economySearchForm = new Ext.form.FormPanel(
			{
				id : 'economy_search_form',
				height : 60,
				frame : true,
				style : 'border-bottom:1px solid #ddd',
				border : false,
				padding : '4 4 4 4',
				layout : {
					type : 'hbox',
					defaultMargins : '0 5 5 0',
					align : 'left'
				},
				items : [
						{
							xtype : 'label',
							style : 'padding:4px 3px 3px 0',
							width : 90,
							text : '访问时间:'
						},
						{
							id : 'startDate',
							name : 'startDate',
							xtype : 'datefield',
							format : 'Y-m-d'
						},
						{
							xtype : 'label',
							width : 8,
							style : 'padding:4px 0 0 0',
							text : '-'
						},
						{
							id : 'endDate',
							name : 'endDate',
							xtype : 'datefield',
							format : 'Y-m-d'
						},
						{
							xtype : 'button',
							width : 60,
							text : '统 计',
							handler : function() {
								if (Ext.getCmp('economy_search_form').getForm()
										.isValid()) {
									var start = Ext.getCmp('startDate')
											.getValue();
									if(start!=''){
										start = new Date(start).format('Y-m-d')
									}
									var end = Ext.getCmp('endDate').getValue();
									if(end!=''){
										end = new Date(end).format('Y-m-d')
									}
									Ext.Ajax
											.request({
												url : webRoot
														+ '/buyer/totalArea',
												params : 'buyer.startTime='
														+ start
														+ '&buyer.endTime='
														+ end,
												success : function(resp, opts) {
													var myChart = new FusionCharts(
															webRoot
																	+ "/swf/Pie3D.swf",
															"myChartId",
															aWidth - 240,
															"350", "0", "1");
													var json = '{ "chart": { "caption" : "用户地区分布" ,"xAxisName" : "年月", "yAxisName" : "数量"},';
													json += '"data":[';
													json += resp.responseText;
													json += ']}';
													myChart.setJSONData(json);
													myChart
															.render("economy_chart_div");
												}
											});
								}
							}
						}, {
							xtype : 'button',
							width : 60,
							text : '清空',
							handler : function() {
								economySearchForm.getForm().reset()
							}
						} ]
			});

	var descPanel = new Ext.Panel(
			{
				border : false,
				html : "<span style='color:red;'></span>",
				style : 'padding:10px;'
			});

	// 最后组装成的List界面。
	var panel = new Ext.Panel({
		title : apptitle,
		tabTip : apptitle,
		closable : true,
		autoScroll : true,
		border : true,
		items : [ economySearchForm, descPanel, economyPanel ]
	});
	return panel;
}