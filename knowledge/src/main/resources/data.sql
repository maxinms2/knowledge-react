/*
CREATE TABLE knowledge
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    content text,
    created_at timestamp,
    title varchar(500) ,
    updated_at timestamp,
    parent_id bigint,
    CONSTRAINT knowledge_pkey PRIMARY KEY (id),
    CONSTRAINT fk_parent FOREIGN KEY (parent_id)
        REFERENCES knowledge (id)
);


CREATE INDEX idx_content
    ON knowledge(content);

CREATE INDEX idx_parent
    ON knowledge(parent_id);

CREATE INDEX idx_title
    ON knowledge(title);

INSERT INTO knowledge (id, content, created_at, title, updated_at)
VALUES (1, NULL, CURRENT_TIMESTAMP, 'root', CURRENT_TIMESTAMP);

UPDATE knowledge set parent_id=1,content = 'root' WHERE id = 1;

CREATE TABLE IF NOT EXISTS users
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    email character varying(255),
    password character varying(255),
    username character varying(8),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT u_idx_email UNIQUE (email),
    CONSTRAINT u_idx_username UNIQUE (username)
);

----------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS roles
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name character varying(255),
    CONSTRAINT roles_pkey PRIMARY KEY (id),
    CONSTRAINT u_idx_name UNIQUE (name)
);


------------------------------------------------------------------


CREATE TABLE IF NOT EXISTS public.users_roles
(
    user_id bigint NOT NULL,
    role_id bigint NOT NULL,
    CONSTRAINT u_idx_usr_rol UNIQUE (user_id, role_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_rol FOREIGN KEY (role_id)
        REFERENCES roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
insert into roles(name) values('ROLE_ADMIN');
insert into roles(name) values('ROLE_USER');

SELECT * FROM ROLES;

*/