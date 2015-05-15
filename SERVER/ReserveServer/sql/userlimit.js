-- Table: public."UserLimit"

-- DROP TABLE public."UserLimit";

CREATE TABLE public."UserLimit"
(
  "User_id" integer NOT NULL,
  "limitCode" integer DEFAULT 1,
  CONSTRAINT "UserLimit_pkey" PRIMARY KEY ("User_id"),
  CONSTRAINT userlimit_user_id_unique UNIQUE ("User_id")
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."UserLimit"
OWNER TO "Aero";
