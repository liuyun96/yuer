package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 买家访问记录 
*/

@Entity
@Table(name="BUYER_BROWSE")
public class BuyerBrowse implements Serializable {
	private static final long serialVersionUID = 14034793924L;

	/**
	*浏览编号
	*/
	private Integer id;
	/**
	*买家编号
	*/
	private Buyer buyer;
	/**
	*页面分类
	*/
	private String pageType;
	/**
	*具体页面
	*/
	private String pageUri;
	/**
	*访问时间
	*/
	private Date createTime;
		
	public BuyerBrowse(){
	}
	/**
	* 获取浏览编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="BROW_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置浏览编号
	*/	
	public void setId(Integer id){
		this.id = id;
	} 
	/**
	* 获取买家编号
	*/
	@ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "BUYER_ID")
	public Buyer getBuyer(){
		return buyer;
	}
	/**
	* 设置买家编号
	*/	
	public void setBuyer(Buyer buyer){
		this.buyer = buyer;
	} 
	/**
	* 获取页面分类
	*/
	
	@Column(name="PAGE_TYPE",length=10)
	public String getPageType(){
		return pageType;
	}
	/**
	* 设置页面分类
	*/	
	public void setPageType(String pageType){
		this.pageType = pageType;
	} 
	/**
	* 获取具体页面
	*/
	
	@Column(name="PAGE_URI",length=100)
	public String getPageUri(){
		return pageUri;
	}
	/**
	* 设置具体页面
	*/	
	public void setPageUri(String pageUri){
		this.pageUri = pageUri;
	} 
	/**
	* 获取访问时间
	*/
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATE_TIME")
	public Date getCreateTime(){
		return createTime;
	}
	/**
	* 设置访问时间
	*/	
	public void setCreateTime(Date createTime){
		this.createTime = createTime;
	} 
	
}