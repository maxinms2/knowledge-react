package com.andres.backend.usersapp.backendusersapp.models.dto;

import java.util.Date;
import java.util.List;

public class KnowledgeDTO {
	private Long id;
	private String title;
	private String content;
	private Long parentId;
	private List<KnowledgeDTO> children;
	private Date createdAt;
	private Date updatedAt;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public List<KnowledgeDTO> getChildren() {
		return children;
	}
	public void setChildren(List<KnowledgeDTO> children) {
		this.children = children;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	@Override
	public String toString() {
		return "[id=" + id + ", title=" + title + ", parentId=" + parentId + "]";
	}
	
	
	
}
