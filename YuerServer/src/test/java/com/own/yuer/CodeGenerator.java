package com.own.yuer;

import java.io.FileReader;
import java.io.IOException;

import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.XMLReaderFactory;

import cn.quickj.codegen.DatabaseModel;
import cn.quickj.codegen.PDMHandler;

/**
 * 根据设计文件来进行代码生成，一般只有在项目初始化的时候才使用。
 * 
 * @author lbj
 * 
 */
public class CodeGenerator {

	/**
	 * @param args
	 * @throws IOException
	 * @throws SAXException
	 */
	public static void main(String[] args) throws SAXException, IOException {
		String pdmFile = "etc/数据库设计.pdm";
		String rootPackage = "com.own.yuer";
		String pluginId = "";
		// 读取分析pdm文件
		XMLReader xr = XMLReaderFactory.createXMLReader();
		PDMHandler handler = new PDMHandler();
		xr.setContentHandler(handler);
		FileReader reader = new FileReader(pdmFile);
		xr.parse(new InputSource(reader));
		DatabaseModel models = handler.getModels();
		if (!"".equals(pluginId))
			rootPackage += "." + pluginId;
		models.config(rootPackage, "src/main/java/", "");

		// 根据模版生成对应的文件。
		System.out.println("正在生成model文件");
		models.generate("model.ftl", ".model", "", ".java");
		System.out.println("正在生成Action文件");
		models.generate("action.ftl", ".action", "Action", ".java");
		System.out.println("正在生成Service文件");
		models.generate("service.ftl", ".service", "Service", ".java");
		System.out.println("正在生成javascript文件");
		if ("".equals(pluginId))
			models.config("", "src/main/webapp/scripts/app/", "");
		else
			models.config("", "src/main/webapp/scripts/app/v2" + pluginId + "/",
					"");
		models.generate("js.ftl", "", "", ".js", false);
	}

}
