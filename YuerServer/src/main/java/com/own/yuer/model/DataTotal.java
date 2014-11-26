package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 数据分析表 
*/

@Entity
@Table(name="DATA_TOTAL")
public class DataTotal implements Serializable {
	private static final long serialVersionUID = 18168826520L;

	/**
	*数据编号
	*/
	private Integer id;
	/**
	*新增用户
	*/
	private Integer newUser;
	/**
	*老用户数
	*/
	private Integer oldUser;
	/**
	*今日pv数
	*/
	private Integer pv;
	/**
	*今日uv数
	*/
	private Integer uv;
	/**
	*周刊pv
	*/
	private Integer weeklyPv;
	/**
	*个人中心pv
	*/
	private Integer centerPv;
	/**
	*你问我答pv
	*/
	private Integer questionPv;
	/**
	*自助解答pv
	*/
	private Integer selfHelpPv;
	/**
	*辣妈pv
	*/
	private Integer mumPv;
	/**
	*萌宝pv
	*/
	private Integer babyPv;
	/**
	*设置pv
	*/
	private Integer settingPv;
	/**
	*会员试用pv
	*/
	private Integer vipPv;
	/**
	*创建时间
	*/
	private Date createTime;
		
	public DataTotal(){
	}
	/**
	* 获取数据编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="DATA_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置数据编号
	*/	
	public void setId(Integer id){
		this.id = id;
	} 
	/**
	* 获取新增用户
	*/
	
	@Column(name="NEW_USER")
	public Integer getNewUser(){
		return newUser;
	}
	/**
	* 设置新增用户
	*/	
	public void setNewUser(Integer newUser){
		this.newUser = newUser;
	} 
	/**
	* 获取老用户数
	*/
	
	@Column(name="OLD_USER")
	public Integer getOldUser(){
		return oldUser;
	}
	/**
	* 设置老用户数
	*/	
	public void setOldUser(Integer oldUser){
		this.oldUser = oldUser;
	} 
	/**
	* 获取今日pv数
	*/
	
	@Column(name="PV")
	public Integer getPv(){
		return pv;
	}
	/**
	* 设置今日pv数
	*/	
	public void setPv(Integer pv){
		this.pv = pv;
	} 
	/**
	* 获取今日uv数
	*/
	
	@Column(name="UV")
	public Integer getUv(){
		return uv;
	}
	/**
	* 设置今日uv数
	*/	
	public void setUv(Integer uv){
		this.uv = uv;
	} 
	/**
	* 获取周刊pv
	*/
	
	@Column(name="WEEKLY_PV")
	public Integer getWeeklyPv(){
		return weeklyPv;
	}
	/**
	* 设置周刊pv
	*/	
	public void setWeeklyPv(Integer weeklyPv){
		this.weeklyPv = weeklyPv;
	} 
	/**
	* 获取个人中心pv
	*/
	
	@Column(name="CENTER_PV")
	public Integer getCenterPv(){
		return centerPv;
	}
	/**
	* 设置个人中心pv
	*/	
	public void setCenterPv(Integer centerPv){
		this.centerPv = centerPv;
	} 
	/**
	* 获取你问我答pv
	*/
	
	@Column(name="QUESTION_PV")
	public Integer getQuestionPv(){
		return questionPv;
	}
	/**
	* 设置你问我答pv
	*/	
	public void setQuestionPv(Integer questionPv){
		this.questionPv = questionPv;
	} 
	/**
	* 获取自助解答pv
	*/
	
	@Column(name="SELF_HELP_PV")
	public Integer getSelfHelpPv(){
		return selfHelpPv;
	}
	/**
	* 设置自助解答pv
	*/	
	public void setSelfHelpPv(Integer selfHelpPv){
		this.selfHelpPv = selfHelpPv;
	} 
	/**
	* 获取辣妈pv
	*/
	
	@Column(name="MUM_PV")
	public Integer getMumPv(){
		return mumPv;
	}
	/**
	* 设置辣妈pv
	*/	
	public void setMumPv(Integer mumPv){
		this.mumPv = mumPv;
	} 
	/**
	* 获取萌宝pv
	*/
	
	@Column(name="BABY_PV")
	public Integer getBabyPv(){
		return babyPv;
	}
	/**
	* 设置萌宝pv
	*/	
	public void setBabyPv(Integer babyPv){
		this.babyPv = babyPv;
	} 
	/**
	* 获取设置pv
	*/
	
	@Column(name="SETTING_PV")
	public Integer getSettingPv(){
		return settingPv;
	}
	/**
	* 设置设置pv
	*/	
	public void setSettingPv(Integer settingPv){
		this.settingPv = settingPv;
	} 
	/**
	* 获取会员试用pv
	*/
	
	@Column(name="VIP_PV")
	public Integer getVipPv(){
		return vipPv;
	}
	/**
	* 设置会员试用pv
	*/	
	public void setVipPv(Integer vipPv){
		this.vipPv = vipPv;
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