package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 文章表 
*/

@Entity
@Table(name="ARTICLE")
public class Article implements Serializable {
	private static final long serialVersionUID = 15099865493L;

	/**
	*文章编号
	*/
	private Integer id;
	/**
	*文章标题
	*/
	private String title;
	/**
	*作者
	*/
	private String author;
	/**
	*文章正文
	*/
	private String content;
	/**
	*图片
	*/
	private String img;
	/**
	*创建时间
	*/
	private Date createTime;
	/**
	*修改时间
	*/
	private Date updateTime;
	/**
	*状态
	*/
	private Boolean status;
	/**
	*点击次数
	*/
	private Integer clickTimes;
	/**
	*分享次数
	*/
	private Integer shareTimes;
	/**
	*收藏次数
	*/
	private Integer favTimes;
	/**
	*大栏目
	*/
	private String bigColumn;
	/**
	*小栏目
	*/
	private String smallColumn;
	/**
	*关键字
	*/
	private String keyword;
	/**
	* 关联的我的收藏集合
	*/
	private Set<MyFavorite> myFavorites;
		
	public Article(){
	}
	/**
	* 获取文章编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="ARTICLE_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置文章编号
	*/	
	public void setId(Integer id){
		this.id = id;
	} 
	/**
	* 获取文章标题
	*/
	
	@Column(name="TITLE",length=60)
	public String getTitle(){
		return title;
	}
	/**
	* 设置文章标题
	*/	
	public void setTitle(String title){
		this.title = title;
	} 
	/**
	* 获取作者
	*/
	
	@Column(name="AUTHOR",length=15)
	public String getAuthor(){
		return author;
	}
	/**
	* 设置作者
	*/	
	public void setAuthor(String author){
		this.author = author;
	} 
	/**
	* 获取文章正文
	*/
	
	@Column(name="CONTENT")
	public String getContent(){
		return content;
	}
	/**
	* 设置文章正文
	*/	
	public void setContent(String content){
		this.content = content;
	} 
	/**
	* 获取图片
	*/
	
	@Column(name="IMG",length=100)
	public String getImg(){
		return img;
	}
	/**
	* 设置图片
	*/	
	public void setImg(String img){
		this.img = img;
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
	/**
	* 获取修改时间
	*/
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="UPDATE_TIME")
	public Date getUpdateTime(){
		return updateTime;
	}
	/**
	* 设置修改时间
	*/	
	public void setUpdateTime(Date updateTime){
		this.updateTime = updateTime;
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
	/**
	* 获取点击次数
	*/
	
	@Column(name="CLICK_TIMES")
	public Integer getClickTimes(){
		return clickTimes;
	}
	/**
	* 设置点击次数
	*/	
	public void setClickTimes(Integer clickTimes){
		this.clickTimes = clickTimes;
	} 
	/**
	* 获取分享次数
	*/
	
	@Column(name="SHARE_TIMES")
	public Integer getShareTimes(){
		return shareTimes;
	}
	/**
	* 设置分享次数
	*/	
	public void setShareTimes(Integer shareTimes){
		this.shareTimes = shareTimes;
	} 
	/**
	* 获取收藏次数
	*/
	
	@Column(name="FAV_TIMES")
	public Integer getFavTimes(){
		return favTimes;
	}
	/**
	* 设置收藏次数
	*/	
	public void setFavTimes(Integer favTimes){
		this.favTimes = favTimes;
	} 
	/**
	* 获取大栏目
	*/
	
	@Column(name="BIG_COLUMN",length=15)
	public String getBigColumn(){
		return bigColumn;
	}
	/**
	* 设置大栏目
	*/	
	public void setBigColumn(String bigColumn){
		this.bigColumn = bigColumn;
	} 
	/**
	* 获取小栏目
	*/
	
	@Column(name="SMALL_COLUMN",length=20)
	public String getSmallColumn(){
		return smallColumn;
	}
	/**
	* 设置小栏目
	*/	
	public void setSmallColumn(String smallColumn){
		this.smallColumn = smallColumn;
	} 
	/**
	* 获取关键字
	*/
	
	@Column(name="KEYWORD",length=100)
	public String getKeyword(){
		return keyword;
	}
	/**
	* 设置关键字
	*/	
	public void setKeyword(String keyword){
		this.keyword = keyword;
	} 
	
	@OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, targetEntity = MyFavorite.class, mappedBy = "article")
	public Set<MyFavorite> getMyFavorites(){
		return this.myFavorites;
	}
	public void setMyFavorites(Set<MyFavorite> myFavorites){
		this.myFavorites = myFavorites;
	}
}