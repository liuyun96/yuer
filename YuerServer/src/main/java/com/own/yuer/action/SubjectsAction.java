package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.Subjects;
import com.own.yuer.service.SubjectsService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class SubjectsAction extends ExtBaseAction {
	@Inject
	private SubjectsService subjectsService;
	@Inject 
	private Subjects subjects;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<Subjects> subjectss = subjectsService.findSubjectsByExample(subjects, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("subjectss", subjectss);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			subjects = subjectsService.getSubjects(Integer.parseInt(id));
		return toJson(subjects);
	}

	public String save() {
		subjectsService.save(subjects);
		return toJson(null);
	}

	public String delete(String ids) {
		subjectsService.delete(ids);
		return toJson(null);
	}

	
}
