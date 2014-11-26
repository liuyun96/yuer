package com.own.yuer;

import org.apache.commons.configuration.XMLConfiguration;

import cn.quickj.ApplicationConfig;

public class Config implements ApplicationConfig {
	public String webRoot;
	/**
	 * 正式环境的ip地址
	 */
	public String ipNomal;

	public void init(XMLConfiguration config) {
		webRoot = config.getString("path.webRoot");
		ipNomal = config.getString("ip.nomal");
	}

}
