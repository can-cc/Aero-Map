-- Table: public."UserFriendsInfo"

-- DROP TABLE public."UserFriendsInfo";

CREATE TABLE public."UserFriendsInfo"
(
  id integer NOT NULL DEFAULT nextval('"UserFriendsInfo_id_seq"'::regclass),
  "User_id" integer NOT NULL,
  "friendsNumber" integer NOT NULL DEFAULT 0,
  "followNumber" integer NOT NULL DEFAULT 0,
  "beFollowNumber" integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT "UserFriendsInfo_pkey" PRIMARY KEY (id),
  CONSTRAINT userfriendsinfo_user_id_foreign FOREIGN KEY ("User_id")
  REFERENCES public."User" (id) MATCH SIMPLE
  ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."UserFriendsInfo"
OWNER TO "Aero";

-- Index: public.userfriendsinfo_user_id_index

-- DROP INDEX public.userfriendsinfo_user_id_index;

CREATE INDEX userfriendsinfo_user_id_index
ON public."UserFriendsInfo"
USING btree
("User_id");