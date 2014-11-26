package com.own.yuer.ui;

import android.app.Activity;
import android.os.Bundle;
import android.view.GestureDetector;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.WebView;
import android.widget.ImageButton;

import com.own.yuer.R;
import com.own.yuer.util.ConnectServer;
import com.own.yuer.util.Constant;

public class ArticleActivity extends Activity {

	private ImageButton button;
	private String tag = "ArticleActivity";
	private GestureDetector mGestureDetector;
	private WebView webView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.article_detail);
		button = (ImageButton) findViewById(R.id.article_back);
		button.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				finish();
			}
		});
		Bundle bundle = getIntent().getExtras();
		int articleId = bundle.getInt(Constant.extra_article_id);
		initWeb(articleId);
	}

	// È±µã¼ÓÔØºÜÂý
	private void initWeb(int articleId) {
		webView = (WebView) findViewById(R.id.article_webview);
		webView.getSettings().setJavaScriptEnabled(true);
		webView.loadUrl(ConnectServer.ip + "web/article/" + articleId);
		/*
		 * webView.setWebViewClient(new WebViewClient() { public boolean
		 * shouldOverrideUrlLoading(WebView view, String url) {
		 * view.loadUrl(url); return true; } });
		 */
	}

}
