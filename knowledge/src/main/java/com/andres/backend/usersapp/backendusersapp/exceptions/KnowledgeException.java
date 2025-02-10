package com.andres.backend.usersapp.backendusersapp.exceptions;

public class KnowledgeException extends RuntimeException{
	
	private Integer errorCode;
	
    public KnowledgeException(String message, Integer errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }

}
