-- Table: public."UserInfomation"

-- DROP TABLE public."UserInfomation";

CREATE TABLE public."UserInfomation"
(
  "User_id" integer NOT NULL,
  "isVIP" boolean DEFAULT false,
  lastlogin time without time zone,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT "UserInfomation_pkey" PRIMARY KEY ("User_id"),
  CONSTRAINT userinfomation_user_id_foreign FOREIGN KEY ("User_id")
  REFERENCES public."User" (id) MATCH SIMPLE
  ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT userinfomation_user_id_unique UNIQUE ("User_id")
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."UserInfomation"
OWNER TO "Aero";

-- Index: public.userinfomation_user_id_index

-- DROP INDEX public.userinfomation_user_id_index;

CREATE INDEX userinfomation_user_id_index
ON public."UserInfomation"
USING btree
("User_id");
