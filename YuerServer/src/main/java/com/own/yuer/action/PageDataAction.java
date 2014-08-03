package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.PageData;
import com.own.yuer.service.PageDataService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class PageDataAction extends ExtBaseAction {
	@Inject
	private PageDataService pageDataService;
	@Inject 
	private PageData pageData;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<PageData> pageDatas = pageDataService.findPageDataByExample(pageData, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("pageDatas", pageDatas);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			pageData = pageDataService.getPageData(Integer.parseInt(id));
		return toJson(pageData);
	}

	public String save() {
		pageDataService.save(pageData);
		return toJson(null);
	}

	public String delete(String ids) {
		pageDataService.delete(ids);
		return toJson(null);
	}

	
}
