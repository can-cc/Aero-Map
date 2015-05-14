-- Table: public."FriendRequest"

-- DROP TABLE public."FriendRequest";

CREATE TABLE public."FriendRequest"
(
  id integer NOT NULL DEFAULT nextval('"FriendRequest_id_seq"'::regclass),
  "RequestUser_id" integer NOT NULL,
  "TarUser_id" integer NOT NULL,
  status text DEFAULT '1'::text,
  message character varying(255),
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT "FriendRequest_pkey" PRIMARY KEY (id),
  CONSTRAINT friendrequest_requestuser_id_foreign FOREIGN KEY ("RequestUser_id")
      REFERENCES public."User" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT friendrequest_taruser_id_foreign FOREIGN KEY ("TarUser_id")
      REFERENCES public."User" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "FriendRequest_status_check" CHECK (status = ANY (ARRAY['1'::text, '2'::text, '3'::text]))
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."FriendRequest"
  OWNER TO "Aero";

-- Index: public.friendrequest_requestuser_id_index

-- DROP INDEX public.friendrequest_requestuser_id_index;

CREATE INDEX friendrequest_requestuser_id_index
  ON public."FriendRequest"
  USING btree
  ("RequestUser_id");

-- Index: public.friendrequest_taruser_id_index

-- DROP INDEX public.friendrequest_taruser_id_index;

CREATE INDEX friendrequest_taruser_id_index
  ON public."FriendRequest"
  USING btree
  ("TarUser_id");
