package com.own.yuer;

import org.apache.commons.configuration.XMLConfiguration;

import cn.quickj.ApplicationConfig;

public class Config implements ApplicationConfig {
	public String webRoot;

	public void init(XMLConfiguration config) {
		webRoot = config.getString("path.webRoot");
	}

}
