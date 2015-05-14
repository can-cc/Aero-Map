-- Table: public."MarkPostComment"

-- DROP TABLE public."MarkPostComment";

CREATE TABLE public."MarkPostComment"
(
  id integer NOT NULL DEFAULT nextval('"MarkPostComment_id_seq"'::regclass),
  "MarkPost_id" integer NOT NULL,
  "User_id" integer NOT NULL,
  context text NOT NULL,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT "MarkPostComment_pkey" PRIMARY KEY (id),
  CONSTRAINT markpostcomment_markpost_id_foreign FOREIGN KEY ("MarkPost_id")
      REFERENCES public."MarkPost" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT markpostcomment_user_id_foreign FOREIGN KEY ("User_id")
      REFERENCES public."User" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."MarkPostComment"
  OWNER TO "Aero";

-- Index: public.markpostcomment_markpost_id_index

-- DROP INDEX public.markpostcomment_markpost_id_index;

CREATE INDEX markpostcomment_markpost_id_index
  ON public."MarkPostComment"
  USING btree
  ("MarkPost_id");