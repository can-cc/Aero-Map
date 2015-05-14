-- Table: public."User"

-- DROP TABLE public."User";

CREATE TABLE public."User"
(
id integer NOT NULL DEFAULT nextval('"User_id_seq"'::regclass),
username character varying(255) NOT NULL,
password character varying(255) NOT NULL,
email character varying(255) NOT NULL,
"limit" integer NOT NULL DEFAULT 1,
created_at timestamp with time zone,
updated_at timestamp with time zone,
CONSTRAINT "User_pkey" PRIMARY KEY (id),
CONSTRAINT user_email_unique UNIQUE (email),
CONSTRAINT user_username_unique UNIQUE (username)
)
WITH (
OIDS=FALSE
);
ALTER TABLE public."User"
OWNER TO "Aero";

-- Index: public.user_username_index

-- DROP INDEX public.user_username_index;

CREATE INDEX user_username_index
ON public."User"
USING btree
(username COLLATE pg_catalog."default");
