CREATE DATABASE "Aero-Map"
  WITH OWNER = "Aero-DBA"
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'C.UTF-8'
       LC_CTYPE = 'C.UTF-8'
       CONNECTION LIMIT = -1;

ALTER DATABASE "Aero-Map"
  SET search_path = "$user", public, topology;
