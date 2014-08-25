package com.own.yuer.action;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;

import cn.quickj.AbstractApplication;
import cn.quickj.dict.model.Dictionary;
import cn.quickj.extui.action.bean.TreeBean;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;
import com.own.yuer.model.PageData;
import com.own.yuer.service.PageDataService;
import com.own.yuer.uitls.Constant;
import com.own.yuer.uitls.ImgUtil;

public class PageDataAction extends BaseAction {
	@Inject
	private PageDataService pageDataService;
	@Inject
	private PageData pageData;
	
	private File imgFile;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<PageData> pageDatas = pageDataService.findPageDataByExample(
				pageData, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("pageDatas", pageDatas);
		return toJson(data);
	}

	public String getTreeBean(String dictTypeName, String dictName) {
		List<TreeBean> beans = new ArrayList<TreeBean>();
		beans = findTree(dictTypeName, dictName);
		try {
			return AbstractApplication.jsonObjectMapper
					.writeValueAsString(beans);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	};

	public List<TreeBean> findTree(String dictTypeName, String dictName) {
		List<TreeBean> nodes = new ArrayList<TreeBean>();
		Collection<Dictionary> dictionary = pageDataService
				.findChildGroupByName(dictTypeName, dictName);
		if (dictionary != null && dictionary.size() > 0) {
			for (Dictionary g : dictionary) {
				TreeBean node = new TreeBean();
				node.setId(g.getId().toString());
				node.setText(g.getName());
				node.setChildren(findTree(dictTypeName, Constant.TREE_CHILDRENS
						+ g.getName()));
				if (node.getChildren() == null) {
					node.setLeaf(true);
				}
				nodes.add(node);
			}
			return nodes;
		}
		return null;
	}

	public String load(String id) {
		if (id != null)
			pageData = pageDataService.getPageData(Integer.parseInt(id));
		return toJson(pageData);
	}

	public String save() {
		if (imgFile != null) {
			String path = ImgUtil.upload(pageData.getImg(), imgFile,
					config.webRoot, Constant.path_data_img);
			pageData.setImg(path);
		}
		pageDataService.save(pageData);
		return toJson(null);
	}

	public String delete(String ids) {
		pageDataService.delete(ids);
		return toJson(null);
	}
	
	public File getImgFile() {
		return imgFile;
	}

}
