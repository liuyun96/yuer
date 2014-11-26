package com.own.yuer.util;

import org.json.JSONException;
import org.json.JSONObject;

public class JsonTools {

	
	public static Object[] analyticJson(String json){
		 try {
			JSONObject jsonObject = new JSONObject(json);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 return null;
	}
}
