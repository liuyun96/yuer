package com.own.yuer;

import java.util.ArrayList;
import java.util.Properties;

import cn.quickj.AbstractApplication;
import cn.quickj.annotation.Filter;

import com.google.inject.Module;

//AuthCheckFilter:page=index.html,ignore=/auth;
@Filter(name = "TimeFilter;StaticParamFilter;LoginCheckFilter:page=index,ignore=/index|/extui/user/listAll/login|/extui/verifycode|/extui/main/checkVerifyCode|/extui/main/login|/extui/main/logout|/autoUpdateFlow|/cms/index|/cms/flash/uploadImg|/wap")
public class Application extends AbstractApplication {

	@Override
	public void onHibernateConfig(Properties properties) {

	}

	@Override
	public void onInitGuiceModules(ArrayList<Module> modules) {
	}

	@Override
	public void init(String rootPath) throws Exception {
		super.init(rootPath);
	}
}
