package com.own.yuer.model;

// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
 * 文章表
 */

@Entity
@Table(name = "ARTICLE")
public class Article implements Serializable {
	private static final long serialVersionUID = 14009060472L;

	/**
	 * 文章编号
	 */
	private Integer id;
	/**
	 * 栏目名称
	 */
	private String columnName;
	/**
	 * 专题名称
	 */
	private String subjectName;
	/**
	 * 文章标题
	 */
	private String title;
	/**
	 * 作者
	 */
	private String author;
	/**
	 * 文章正文
	 */
	private String content;
	/**
	 * 图片
	 */
	private String img;
	/**
	 * 创建时间
	 */
	private Date createTime;
	/**
	 * 修改时间
	 */
	private Date updateTime;
	/**
	 * 状态
	 */
	private Integer status;
	/**
	 * 点击次数
	 */
	private Integer clickTimes;
	/**
	 * 分享次数
	 */
	private Integer shareTimes;
	/**
	 * 收藏次数
	 */
	private Integer favTimes;

	/**
	 * 点赞次数
	 */
	private Integer likeTimes;

	/**
	 * 关键字
	 */
	private String keyword;

	/**
	 * 来源
	 */
	private String source;

	/**
	 * 原文章链接
	 */
	private String url;

	/**
	 * 位置
	 */
	private String position;

	public Article() {
	}

	/**
	 * 获取文章编号
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ARTICLE_ID", nullable = false)
	public Integer getId() {
		return id;
	}

	/**
	 * 设置文章编号
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * 获取栏目名称
	 */
	@Column(name = "COLUMN_NAME")
	public String getColumnName() {
		return columnName;
	}

	/**
	 * 设置栏目名称
	 */
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	/**
	 * 获取专题编号
	 */
	@Column(name = "subject_name")
	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	/**
	 * 获取文章标题
	 */

	@Column(name = "TITLE", length = 60)
	public String getTitle() {
		return title;
	}

	/**
	 * 设置文章标题
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * 获取作者
	 */

	@Column(name = "AUTHOR", length = 15)
	public String getAuthor() {
		return author;
	}

	/**
	 * 设置作者
	 */
	public void setAuthor(String author) {
		this.author = author;
	}

	/**
	 * 获取文章正文
	 */

	@Column(name = "CONTENT")
	public String getContent() {
		return content;
	}

	/**
	 * 设置文章正文
	 */
	public void setContent(String content) {
		this.content = content;
	}

	/**
	 * 获取图片
	 */

	@Column(name = "IMG", length = 100)
	public String getImg() {
		return img;
	}

	/**
	 * 设置图片
	 */
	public void setImg(String img) {
		this.img = img;
	}

	/**
	 * 获取创建时间
	 */
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATE_TIME")
	public Date getCreateTime() {
		return createTime;
	}

	/**
	 * 设置创建时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * 获取修改时间
	 */
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UPDATE_TIME")
	public Date getUpdateTime() {
		return updateTime;
	}

	/**
	 * 设置修改时间
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	/**
	 * 获取状态
	 */

	@Column(name = "STATUS")
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


	/**
	 * 获取点击次数
	 */

	@Column(name = "CLICK_TIMES")
	public Integer getClickTimes() {
		return clickTimes;
	}


	/**
	 * 设置点击次数
	 */
	public void setClickTimes(Integer clickTimes) {
		this.clickTimes = clickTimes;
	}

	/**
	 * 获取分享次数
	 */

	@Column(name = "SHARE_TIMES")
	public Integer getShareTimes() {
		return shareTimes;
	}

	/**
	 * 设置分享次数
	 */
	public void setShareTimes(Integer shareTimes) {
		this.shareTimes = shareTimes;
	}

	/**
	 * 获取收藏次数
	 */

	@Column(name = "FAV_TIMES")
	public Integer getFavTimes() {
		return favTimes;
	}

	/**
	 * 设置收藏次数
	 */
	public void setFavTimes(Integer favTimes) {
		this.favTimes = favTimes;
	}

	@Column(name = "like_times")
	public Integer getLikeTimes() {
		return likeTimes;
	}

	public void setLikeTimes(Integer likeTimes) {
		this.likeTimes = likeTimes;
	}

	/**
	 * 获取关键字
	 */

	@Column(name = "KEYWORD", length = 100)
	public String getKeyword() {
		return keyword;
	}

	/**
	 * 设置关键字
	 */
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	@Column(name = "source")
	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	@Column(name = "url")
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "position")
	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

}