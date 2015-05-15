-- Table: public."MarkPost"

-- DROP TABLE public."MarkPost";

CREATE TABLE public."MarkPost"
(
  id integer NOT NULL DEFAULT nextval('"MarkPost_id_seq"'::regclass),
  type integer,
  "User_id" integer NOT NULL,
  title character varying(255) NOT NULL,
  context text NOT NULL,
  images character varying(255),
  location geography(Point,4326) NOT NULL,
  longitude numeric(12,8) NOT NULL,
  latitude numeric(12,8) NOT NULL,
  accuracy numeric(8,2),
  valid boolean DEFAULT true,
  deadline timestamp with time zone,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT "MarkPost_pkey" PRIMARY KEY (id),
  CONSTRAINT markpost_user_id_foreign FOREIGN KEY ("User_id")
      REFERENCES public."User" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."MarkPost"
  OWNER TO "Aero";

-- Index: public.markpost_location_index

-- DROP INDEX public.markpost_location_index;

CREATE INDEX markpost_location_index
  ON public."MarkPost"
  USING btree
  (location);

-- Index: public.markpost_user_id_index

-- DROP INDEX public.markpost_user_id_index;

CREATE INDEX markpost_user_id_index
  ON public."MarkPost"
  USING btree
  ("User_id");
