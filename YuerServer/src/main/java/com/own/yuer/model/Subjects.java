package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
	
	private Integer position;
		
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
	
	@Column(name = "position")
	public Integer getPosition() {
		return position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}
}