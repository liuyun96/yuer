package com.own.yuer;

public class RunServer {
	/**
	 * 这是用于你调试程序或者运行于Jetty模式下的入口地址
	 * 
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		Integer port = 80;
		if(args.length!=0){
			port = Integer.valueOf(args[0]);
		}
		cn.quickj.Main.runserver("/", port);
	}

}
