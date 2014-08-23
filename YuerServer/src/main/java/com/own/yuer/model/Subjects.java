package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 专题表 
*/

@Entity
@Table(name="SUBJECTS")
public class Subjects implements Serializable {
	private static final long serialVersionUID = 18258218014L;

	/**
	*专题编号
	*/
	private Integer id;
	/**
	*栏目编号
	*/
	private Columns columns;
	/**
	*专题名称
	*/
	private String subjectName;
	/**
	*状态
	*/
	private Boolean status;
	/**
	* 关联的文章表集合
	*/
	private Set<Article> articles;
		
	public Subjects(){
	}
	/**
	* 获取专题编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="SUBJECT_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置专题编号
	*/	
	public void setId(Integer id){
		this.id = id;
	} 
	/**
	* 获取栏目编号
	*/
	@ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "COLUMN_ID")
	public Columns getColumns(){
		return columns;
	}
	/**
	* 设置栏目编号
	*/	
	public void setColumns(Columns columns){
		this.columns = columns;
	} 
	/**
	* 获取专题名称
	*/
	
	@Column(name="SUBJECT_NAME",length=100)
	public String getSubjectName(){
		return subjectName;
	}
	/**
	* 设置专题名称
	*/	
	public void setSubjectName(String subjectName){
		this.subjectName = subjectName;
	} 
	/**
	* 获取状态
	*/
	
	@Column(name="STATUS")
	public Boolean getStatus(){
		return status;
	}
	/**
	* 设置状态
	*/	
	public void setStatus(Boolean status){
		this.status = status;
	} 
	
	@OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, targetEntity = Article.class, mappedBy = "subjects")
	public Set<Article> getArticles(){
		return this.articles;
	}
	public void setArticles(Set<Article> articles){
		this.articles = articles;
	}
}