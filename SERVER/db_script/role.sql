

CREATE ROLE "Aero-DBA"
  NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;


CREATE ROLE "AeroAdmin" LOGIN ENCRYPTED PASSWORD 'md52077741b32d275a5a1936807e96a0cbb'
   VALID UNTIL 'infinity';
GRANT "Aero-DBA" TO "AeroAdmin";