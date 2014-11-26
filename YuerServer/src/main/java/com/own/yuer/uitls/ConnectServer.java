package com.own.yuer.uitls;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.own.yuer.beans.SubjectBean;

public class ConnectServer {
	public static String ip = "http://localhost/";
	//public static String ip = "http://121.40.150.11:9003/";
	public static String ip_app = ip + "app/";
	public static ObjectMapper jsonObjectMapper = new ObjectMapper();


	public static SubjectBean loadSubjectAndActicleByColumnId(String columnId) {
			String json = HttpUtils.HttpGetApache(ip_app
					+ "loadSubjectAndActicleByColumnId", "columnId", columnId);
			if (json != null) {
				try {
					SubjectBean  bean = jsonObjectMapper.readValue(json, SubjectBean.class);
					return bean;
				} catch (JsonParseException e) {
					e.printStackTrace();
				} catch (JsonMappingException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		
		return null;
	}
	
	public static void main(String[] args) {
		loadSubjectAndActicleByColumnId("1");
	}

}
