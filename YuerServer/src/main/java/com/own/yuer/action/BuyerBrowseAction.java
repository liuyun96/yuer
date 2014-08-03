package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.BuyerBrowse;
import com.own.yuer.service.BuyerBrowseService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class BuyerBrowseAction extends ExtBaseAction {
	@Inject
	private BuyerBrowseService buyerBrowseService;
	@Inject 
	private BuyerBrowse buyerBrowse;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<BuyerBrowse> buyerBrowses = buyerBrowseService.findBuyerBrowseByExample(buyerBrowse, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("buyerBrowses", buyerBrowses);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			buyerBrowse = buyerBrowseService.getBuyerBrowse(Integer.parseInt(id));
		return toJson(buyerBrowse);
	}

	public String save() {
		buyerBrowseService.save(buyerBrowse);
		return toJson(null);
	}

	public String delete(String ids) {
		buyerBrowseService.delete(ids);
		return toJson(null);
	}

	
}
