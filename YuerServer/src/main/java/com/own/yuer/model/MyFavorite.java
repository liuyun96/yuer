package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 我的收藏 
*/

@Entity
@Table(name="MY_FAVORITE")
public class MyFavorite implements Serializable {
	private static final long serialVersionUID = 17918269067L;

	/**
	*编号
	*/
	private Integer id;
	/**
	*文章编号
	*/
	private Article article;
	/**
	*商品编号
	*/
	private Items items;
	/**
	*买家编号
	*/
	private Buyer buyer;
	/**
	*类型
	*/
	private String type;
	/**
	*来源
	*/
	private String source;
	/**
	*时间
	*/
	private Date createTime;
		
	public MyFavorite(){
	}
	/**
	* 获取编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="LOVE_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置编号
	*/	
	public void setId(Integer id){
		this.id = id;
	} 
	/**
	* 获取文章编号
	*/
	@ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "ARTICLE_ID")
	public Article getArticle(){
		return article;
	}
	/**
	* 设置文章编号
	*/	
	public void setArticle(Article article){
		this.article = article;
	} 
	/**
	* 获取商品编号
	*/
	@ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "ITEM_ID")
	public Items getItems(){
		return items;
	}
	/**
	* 设置商品编号
	*/	
	public void setItems(Items items){
		this.items = items;
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
	* 获取类型
	*/
	
	@Column(name="TYPE",length=10)
	public String getType(){
		return type;
	}
	/**
	* 设置类型
	*/	
	public void setType(String type){
		this.type = type;
	} 
	/**
	* 获取来源
	*/
	
	@Column(name="SOURCE",length=10)
	public String getSource(){
		return source;
	}
	/**
	* 设置来源
	*/	
	public void setSource(String source){
		this.source = source;
	} 
	/**
	* 获取时间
	*/
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATE_TIME")
	public Date getCreateTime(){
		return createTime;
	}
	/**
	* 设置时间
	*/	
	public void setCreateTime(Date createTime){
		this.createTime = createTime;
	} 
	
}