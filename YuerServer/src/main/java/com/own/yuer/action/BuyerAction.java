package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.Buyer;
import com.own.yuer.service.BuyerService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class BuyerAction extends ExtBaseAction {
	@Inject
	private BuyerService buyerService;
	@Inject 
	private Buyer buyer;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<Buyer> buyers = buyerService.findBuyerByExample(buyer, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("buyers", buyers);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			buyer = buyerService.getBuyer(Integer.parseInt(id));
		return toJson(buyer);
	}

	public String save() {
		buyerService.save(buyer);
		return toJson(null);
	}

	public String delete(String ids) {
		buyerService.delete(ids);
		return toJson(null);
	}

	
}
