package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.ItemComment;
import com.own.yuer.service.ItemCommentService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class ItemCommentAction extends ExtBaseAction {
	@Inject
	private ItemCommentService itemCommentService;
	@Inject 
	private ItemComment itemComment;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<ItemComment> itemComments = itemCommentService.findItemCommentByExample(itemComment, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("itemComments", itemComments);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			itemComment = itemCommentService.getItemComment(Integer.parseInt(id));
		return toJson(itemComment);
	}

	public String save() {
		itemCommentService.save(itemComment);
		return toJson(null);
	}

	public String delete(String ids) {
		itemCommentService.delete(ids);
		return toJson(null);
	}

	
}
