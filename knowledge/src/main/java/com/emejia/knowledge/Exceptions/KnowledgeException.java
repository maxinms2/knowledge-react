package com.emejia.knowledge.Exceptions;

public class KnowledgeException extends Exception{
	
	private Integer errorCode;
	
    public KnowledgeException(String message, Integer errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }

}
