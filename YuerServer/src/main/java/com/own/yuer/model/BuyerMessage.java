package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 买家留言 
*/

@Entity
@Table(name="BUYER_MESSAGE")
public class BuyerMessage implements Serializable {
	private static final long serialVersionUID = 15925793372L;

	/**
	*留言编号
	*/
	private Integer id;
	/**
	*买家编号
	*/
	private Buyer buyer;
	/**
	*内容
	*/
	private String content;
	/**
	*创建时间
	*/
	private Date createTime;
		
	public BuyerMessage(){
	}
	/**
	* 获取留言编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="MESS_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置留言编号
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
	* 获取内容
	*/
	
	@Column(name="CONTENT",length=500)
	public String getContent(){
		return content;
	}
	/**
	* 设置内容
	*/	
	public void setContent(String content){
		this.content = content;
	} 
	/**
	* 获取创建时间
	*/
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATE_TIME")
	public Date getCreateTime(){
		return createTime;
	}
	/**
	* 设置创建时间
	*/	
	public void setCreateTime(Date createTime){
		this.createTime = createTime;
	} 
	
}