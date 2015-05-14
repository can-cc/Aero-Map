-- Table: public."UserSetting"

-- DROP TABLE public."UserSetting";

CREATE TABLE public."UserSetting"
(
  "User_id" integer NOT NULL,
  "defaultMapView" integer DEFAULT 1,
  "defaultMapZoom" character varying(255) DEFAULT '13'::character varying,
  "seePaperPlane" boolean DEFAULT true,
  "receiveFriendRequest" boolean DEFAULT true,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT "UserSetting_pkey" PRIMARY KEY ("User_id"),
  CONSTRAINT usersetting_user_id_foreign FOREIGN KEY ("User_id")
  REFERENCES public."User" (id) MATCH SIMPLE
  ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT usersetting_user_id_unique UNIQUE ("User_id")
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."UserSetting"
OWNER TO "Aero";

-- Index: public.usersetting_user_id_index

-- DROP INDEX public.usersetting_user_id_index;

CREATE INDEX usersetting_user_id_index
ON public."UserSetting"
USING btree
("User_id");

