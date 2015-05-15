-- Table: public."UserDetail"

-- DROP TABLE public."UserDetail";

CREATE TABLE public."UserDetail"
(
  "User_id" integer NOT NULL,
  nickname character varying(255) NOT NULL,
  sex text NOT NULL,
  avatar character varying(255),
  self_description text,
  city integer,
  school integer,
  interest character varying(255),
  public_email character varying(255),
  photo_number character varying(255),
  qq character varying(255),
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT "UserDetail_pkey" PRIMARY KEY ("User_id"),
  CONSTRAINT userdetail_user_id_foreign FOREIGN KEY ("User_id")
      REFERENCES public."User" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT userdetail_nickname_unique UNIQUE (nickname),
  CONSTRAINT userdetail_user_id_unique UNIQUE ("User_id"),
  CONSTRAINT "UserDetail_sex_check" CHECK (sex = ANY (ARRAY['male'::text, 'female'::text, 'secert'::text]))
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."UserDetail"
  OWNER TO "Aero";

-- Index: public.userdetail_user_id_index

-- DROP INDEX public.userdetail_user_id_index;

CREATE INDEX userdetail_user_id_index
  ON public."UserDetail"
  USING btree
  ("User_id");
