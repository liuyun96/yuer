package com.own.yuer.cms;

import java.util.Map;

import org.apache.commons.configuration.Configuration;

import cn.quickj.plugin.AbstractPlugin;

public class CmsPlugin extends AbstractPlugin {

	@Override
	public Map<String, Class<?>> depend() {
		return null;
	}

	@Override
	public String getId() {
		return "cms";
	}

	@Override
	public String getName() {
		return "育儿管理平台";
	}

	@Override
	public String getRootPackage() {
		return "com.own.yuer.cms";
	}

	@Override
	public void init(Configuration c) {
	}

}
