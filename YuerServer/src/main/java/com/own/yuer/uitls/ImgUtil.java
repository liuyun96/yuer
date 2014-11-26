package com.own.yuer.uitls;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.RandomStringUtils;

import cn.quickj.utils.StringUtil;

public class ImgUtil {
	/**
	 * 上传图片
	 * 
	 * @param img
	 *            以前的图片路径
	 * @param imgFile要上传的图片
	 * @param webRoot
	 *            服务器根路径
	 * @param path
	 *            上传图片的路径
	 * @return
	 */
	public static String upload(String img, File imgFile, String webRoot,
			String path) {
		if (imgFile != null) {
			String endTag = imgFile.getName().substring(
					imgFile.getName().lastIndexOf("."),
					imgFile.getName().length());// 获取文件属性
			endTag = endTag.toLowerCase();// 字母小写
			String regex = ".jpg|.png|.gif|.jpeg|.bmp";// 设置支持的文件格式或属性
			if (endTag != null && endTag.matches(regex)) {
				Date date = new Date();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
				String fileName = sdf.format(date)
						+ RandomStringUtils.randomAlphabetic(2) + endTag;
				File file = new File(webRoot + path + fileName);
				try {
					// 删除以前的图片
					if (StringUtil.isEmpty(img)) {
						if (!img.startsWith("images/tao")) {
							if (new File(webRoot + img).exists()) {
								delFile(new File(webRoot + img));
							}
						}
					}
					FileUtils.copyFile(imgFile, file);
					// 拷贝前台服务器
					return path + fileName;
				} catch (IOException e) {
					e.printStackTrace();
					return null;
				}
			}
		}
		return img;
	}

	/**
	 * 上传图片
	 * 
	 * @param imgFile
	 * @param path
	 * @return 文件名称 或 false
	 */
	public static String uploadimgFile(File imgFile, String path) {
		String endTag = imgFile.getName().substring(
				imgFile.getName().lastIndexOf("."), imgFile.getName().length());// 获取文件属性
		endTag = endTag.toLowerCase();// 字母小写
		String regex = ".jpg|.png|.gif|.jpeg";// 设置支持的文件格式或属性
		if (endTag != null && endTag.matches(regex)) {
			try {
				Date date = new Date();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
				String fileName = sdf.format(date)
						+ RandomStringUtils.randomAlphabetic(2) + "_" + endTag;
				File file = new File(path, fileName);
				FileUtils.moveFile(imgFile, file);
				return fileName;
			} catch (Exception e) {
				e.printStackTrace();
				return "false";
			}
		} else {
			return "false";
		}
	}

	/**
	 * 删除文件不删除文件夹
	 * 
	 * @param file
	 */
	public static void delFile(File file) {
		if (file.exists() && !file.isDirectory()) {
			FileUtils.deleteQuietly(file);
		}
	}
}
