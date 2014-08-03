function uploadPicPanel(apptitle) {

	var imgformConfig = {
		frame : true,
		labelWidth : 70,
		autoHeight : true,
		id : 'imgform',
		autoWidth : true,
		padding : '10 10 20 10',
		enctype : 'multipart/form-data',
		fileUpload : true,
		defaults : {
			anchor : '90%',
			xtype : 'textfield',
			selectOnFocus : true
		},
		items : [ new Ext.form.TextField({
			xtype : 'fileuploadfield',
			fieldLabel : '图片上传',
			anchor : '45%',
			name : 'imgFile',
			text : '添加图片',
			id : 'pic',
			inputType : 'file'
		}) ],
		buttons : [ {
			text : '上&nbsp;&nbsp;&nbsp;传',
			handler : function() {
				if (Ext.getCmp('imgform').getForm().isValid()) {
					Ext.getCmp('imgform').getForm().submit(
							{
								url : webRoot + '/cms/shopImg/uploadPic',
								waitMsg : '正在上传...',
								method : 'post',
								success : function(form, action) {
									Ext.MessageBox.alert('提示', '上传成功');
								},
								failure : function(form, action) {
									Ext.MessageBox.alert('提示', '上传失败,原因为:'
											+ action.result.msg);
								}
							});
				}
			}
		} ]
	};

	var imgform = new Ext.form.FormPanel(imgformConfig);

	var panel = new Ext.Panel({
		title : apptitle,
		tabTip : apptitle,
		closable : true,
		autoScroll : true,
		border : true,
		layout : {
			type : 'vbox',
			padding : 0,
			align : 'stretchmax'
		},
		defaults : {
			margins : '0 0 0 0'
		},
		items : [ imgform ]
	});

	return panel;
}
