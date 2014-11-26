package com.own.yuer.beans;

import java.util.List;

public class SubjectBean {
	private Integer subjectId;
	private String subjectName;
	private List<Object[]> articles;

	public Integer getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Integer subjectId) {
		this.subjectId = subjectId;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	public List<Object[]> getArticles() {
		return articles;
	}

	public void setArticles(List<Object[]> articles) {
		this.articles = articles;
	}

}
