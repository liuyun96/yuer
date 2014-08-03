package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.BuyerSearch;
import com.own.yuer.service.BuyerSearchService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class BuyerSearchAction extends ExtBaseAction {
	@Inject
	private BuyerSearchService buyerSearchService;
	@Inject 
	private BuyerSearch buyerSearch;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<BuyerSearch> buyerSearchs = buyerSearchService.findBuyerSearchByExample(buyerSearch, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("buyerSearchs", buyerSearchs);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			buyerSearch = buyerSearchService.getBuyerSearch(Integer.parseInt(id));
		return toJson(buyerSearch);
	}

	public String save() {
		buyerSearchService.save(buyerSearch);
		return toJson(null);
	}

	public String delete(String ids) {
		buyerSearchService.delete(ids);
		return toJson(null);
	}

	
}
