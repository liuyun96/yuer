package com.own.yuer.uitls;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class YuerUtils {

	/**
	 * 上传内容里面的图片
	 */
	public static String uploadImgs(String content) {
		Document document = Jsoup.parse(content);
		Elements eles = document.select("img");
		for (Element ele : eles) {
			String src = ele.attr("src");
			System.out.println(src);
		}
		return content;
	}
}
