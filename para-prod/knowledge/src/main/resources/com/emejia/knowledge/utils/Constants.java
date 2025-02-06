package com.emejia.knowledge.utils;

import java.nio.charset.StandardCharsets;
import java.security.Key;

public class Constants {
	public static final Integer ERR_EXIST_KNOWLEDGE=1;
	
	public static final Integer ERR_EXIST_MAIL=2;
	
	public static final Integer ERR_NO_EXIST_USER=3;
	
    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String TOKEN_BEARER_PREFIX = "Bearer ";

    public static final String SUPER_SECRET_KEY = "ZnJhc2VzbGFyZ2FzcGFyYWNvbG9jYXJjb21vY2xhdmVlbnVucHJvamVjdG9kZWVtZXBsb3BhcmF";
    public  static  final  long TOKEN_EXPIRATION_TIME = 1800000*3; //30 MINUTOS

}
