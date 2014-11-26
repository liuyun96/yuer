package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.BuyerMessage;
import com.own.yuer.service.BuyerMessageService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class BuyerMessageAction extends ExtBaseAction {
	@Inject
	private BuyerMessageService buyerMessageService;
	@Inject 
	private BuyerMessage buyerMessage;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<BuyerMessage> buyerMessages = buyerMessageService.findBuyerMessageByExample(buyerMessage, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("buyerMessages", buyerMessages);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			buyerMessage = buyerMessageService.getBuyerMessage(Integer.parseInt(id));
		return toJson(buyerMessage);
	}

	public String save() {
		buyerMessageService.save(buyerMessage);
		return toJson(null);
	}

	public String delete(String ids) {
		buyerMessageService.delete(ids);
		return toJson(null);
	}

	
}
