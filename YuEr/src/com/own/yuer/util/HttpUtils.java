package com.own.yuer.util;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;

public class HttpUtils {

	/**
	 * ҳ���ض���
	 * 
	 * @param url
	 * @return
	 */
	public static String HttpRedirect(String url) {
		URL obj = null;
		HttpURLConnection conn = null;
		try {
			obj = new URL(url.trim());
			conn = (HttpURLConnection) obj.openConnection();
			conn.setReadTimeout(5000);
			conn.setRequestMethod("GET");
			boolean redirect = false;
			int status = conn.getResponseCode();
			if (status != HttpURLConnection.HTTP_OK
					|| status == HttpURLConnection.HTTP_MOVED_PERM
					|| status == HttpURLConnection.HTTP_SEE_OTHER) {
				redirect = true;
			}
			if (redirect) {
				if (status == 505) {
					url = conn.getURL().toString().replace(" ", "");
					conn = (HttpURLConnection) new URL(url).openConnection();
					String charset = conn.getContentType();
					System.out.println(charset);
				}
			}
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conn.getInputStream(), "GBK"));
			String inputLine;
			StringBuffer html = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				html.append(inputLine);
			}
			in.close();
			return html.toString();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * ͨ����վ����URL��ȡ����վ��Դ��
	 * 
	 * @param url
	 * @return String
	 * @throws Exception
	 */
	public static String getURLSource(String str) throws Exception {
		HttpClient client = new HttpClient();
		// ����Get����ʵ��
		GetMethod method = new GetMethod(str);
		client.executeMethod(method);
		InputStream inStream = method.getResponseBodyAsStream(); // ͨ����������ȡhtml����������
		byte[] data = readInputStream(inStream); // �Ѷ���������ת��Ϊbyte�ֽ�����
		String htmlSource = new String(data);
		method.releaseConnection();
		return htmlSource;
	}

	/**
	 * �Ѷ�������ת��Ϊbyte�ֽ�����
	 * 
	 * @param instream
	 * @return byte[]
	 * @throws Exception
	 */
	public static byte[] readInputStream(InputStream instream) throws Exception {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] buffer = new byte[1204];
		int len = 0;
		while ((len = instream.read(buffer)) != -1) {
			outStream.write(buffer, 0, len);
		}
		instream.close();
		return outStream.toByteArray();
	}

	public static void HttpClientPost(String uri, String host, Integer port,
			String json) {
		HttpClient client = new HttpClient();
		client.getHostConfiguration().setHost(host, port, "http");
		PostMethod post = new PostMethod(uri);
		NameValuePair simcard = new NameValuePair("json", json);
		post.setRequestBody(new NameValuePair[] { simcard });
		try {
			client.executeMethod(post);
			post.releaseConnection();
			System.out.println(post.getStatusLine()); // ��ӡ���ҳ��
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String HttpGetApache(String url, String name, String value) {
		try {
			BufferedReader in = null;
			StringBuffer result = new StringBuffer();
			HttpClient httpclient = new HttpClient();
			GetMethod getMethod = new GetMethod(url);
			NameValuePair[] pairs = new NameValuePair[1];
			pairs[0] = new NameValuePair(name,
					URLEncoder.encode(value, "UTF-8"));
			getMethod.setQueryString(pairs);
			httpclient.executeMethod(getMethod);
			InputStream input = getMethod.getResponseBodyAsStream();
			String line = "";
			in = new BufferedReader(new InputStreamReader(input));
			while ((line = in.readLine()) != null) {
				result.append(line);
			}
			getMethod.releaseConnection();
			input.close();
			//String json = URLEncoder.encode(result.toString(), "UTF-8");
			//return json;
			return result.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static String HttpGetApache(String url,NameValuePair[] pairs) {
		try {
			BufferedReader in = null;
			StringBuffer result = new StringBuffer();
			HttpClient httpclient = new HttpClient();
			GetMethod getMethod = new GetMethod(url);
			//NameValuePair[] pairs = new NameValuePair[1];
			//pairs[0] = new NameValuePair(name,
				//	URLEncoder.encode(value, "UTF-8"));
			getMethod.setQueryString(pairs);
			httpclient.executeMethod(getMethod);
			InputStream input = getMethod.getResponseBodyAsStream();
			String line = "";
			in = new BufferedReader(new InputStreamReader(input));
			while ((line = in.readLine()) != null) {
				result.append(line);
			}
			getMethod.releaseConnection();
			input.close();
			String json = URLEncoder.encode(result.toString(), "UTF-8");
			return json;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 
	 * @param urlStr
	 * @param params
	 *            ����������������Ӧ����name1=value1&name2=value2����ʽ��
	 * @return
	 */
	public static String sendUrl(String url, String params) {
		// urlStr = "http://127.0.0.1/cms/sycn/sycnPageData";
		// host = "127.0.0.1";
		// port = 80;
		PrintWriter out = null;
		BufferedReader in = null;
		StringBuffer result = new StringBuffer();
		try {
			URL realUrl = new URL(url);
			// �򿪺�URL֮�������
			URLConnection conn = realUrl.openConnection();
			// ����ͨ�õ���������
			// conn.setRequestProperty("Pragma:", "no-cache");
			// conn.setRequestProperty("Cache-Control", "no-cache");
			// conn.setRequestProperty("Content-Type", "text/xml");
			// conn.setRequestProperty("ContentType","text/xml;charset=utf-8");
			conn.setRequestProperty("charset", "UTF-8");
			conn.setRequestProperty("Accept-Language", "en-us,en;q=0.5");
			conn.setRequestProperty(
					"User-Agent",
					"Mozilla/5.0 (Windows NT //5.1)AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.46 Safari/535.11");
			// ����POST�������������������
			conn.setDoOutput(true);
			conn.setDoInput(true);
			if (params != null) {
				// ��ȡURLConnection�����Ӧ�������
				out = new PrintWriter(conn.getOutputStream());
				// �����������
				out.print(params);
				// flush������Ļ���
				out.flush();
			}
			in = new BufferedReader(
					new InputStreamReader(conn.getInputStream()));
			String line = "";
			while ((line = in.readLine()) != null) {
				result.append(line);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "�����쳣";
		} finally {
			try {
				if (out != null) {
					out.close();
					out = null;
				}
				if (in != null) {
					in.close();
					in = null;
				}
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		return result.toString();
	}


}
