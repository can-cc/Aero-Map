
-- Table: public."Friends"

-- DROP TABLE public."Friends";

CREATE TABLE public."Friends"
(
  id integer NOT NULL DEFAULT nextval('"Friends_id_seq"'::regclass),
  "User_id" integer NOT NULL,
  "Friend_id" integer NOT NULL,
  friendliness integer DEFAULT 1,
  "isHidden" boolean DEFAULT false,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT "Friends_pkey" PRIMARY KEY (id),
  CONSTRAINT friends_friend_id_foreign FOREIGN KEY ("Friend_id")
      REFERENCES public."User" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT friends_user_id_foreign FOREIGN KEY ("User_id")
      REFERENCES public."User" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT friends_user_id_friend_id_unique UNIQUE ("User_id", "Friend_id")
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."Friends"
  OWNER TO "Aero";

-- Index: public.friends_friend_id_index

-- DROP INDEX public.friends_friend_id_index;

CREATE INDEX friends_friend_id_index
  ON public."Friends"
  USING btree
  ("Friend_id");

-- Index: public.friends_user_id_index

-- DROP INDEX public.friends_user_id_index;

CREATE INDEX friends_user_id_index
  ON public."Friends"
  USING btree
  ("User_id");
