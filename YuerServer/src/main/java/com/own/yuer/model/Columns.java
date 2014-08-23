package com.own.yuer.model;

// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * 栏目表
 */

@Entity
@Table(name = "COLUMNS")
public class Columns implements Serializable {
	private static final long serialVersionUID = 15318082393L;

	/**
	 * 栏目编号
	 */
	private Integer id;
	/**
	 * 状态
	 */
	private Boolean status;
	/**
	 * 关联的文章表集合
	 */
	private Set<Article> articles;
	/**
	 * 关联的专题表集合
	 */
	private Set<Subjects> subjectss;

	public Columns() {
	}

	/**
	 * 获取栏目编号
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "COLUMN_ID", nullable = false)
	public Integer getId() {
		return id;
	}

	/**
	 * 设置栏目编号
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * 获取状态
	 */

	@Column(name = "STATUS")
	public Boolean getStatus() {
		return status;
	}

	/**
	 * 设置状态
	 */
	public void setStatus(Boolean status) {
		this.status = status;
	}

	@OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, targetEntity = Article.class, mappedBy = "columns")
	public Set<Article> getArticles() {
		return this.articles;
	}

	public void setArticles(Set<Article> articles) {
		this.articles = articles;
	}

	@OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, targetEntity = Subjects.class, mappedBy = "columns")
	public Set<Subjects> getSubjectss() {
		return this.subjectss;
	}

	public void setSubjectss(Set<Subjects> subjectss) {
		this.subjectss = subjectss;
	}
}