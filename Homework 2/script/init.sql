-- Table: public.users

DROP TABLE public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    login character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    age integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

INSERT INTO public.users(
	id, login, password, age, "isDeleted", "createdAt", "updatedAt")
	VALUES ('1', 'user1', '1133', 12, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('2', 'user2', '1133', 22, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('3', 'user3', '1133', 32, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('4', 'user4', '1133', 42, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Table: public.groups

DROP TABLE public.groups;

CREATE TABLE IF NOT EXISTS public.groups
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    permissions character varying(255)[] COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT groups_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.groups
    OWNER to postgres;

INSERT INTO public.groups(
	id, name, permissions, "createdAt", "updatedAt")
	VALUES ('1', 'group1', ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('2', 'group2', ['READ', 'WRITE', 'DELETE', 'SHARE'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('3', 'group3', ['READ',  'SHARE'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('4', 'group4', ['READ'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
