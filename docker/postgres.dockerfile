FROM postgres:9.5

COPY sql/init.sql /docker-entrypoint-initdb.d/1-init.sql
COPY sql/create_tables.sql /docker-entrypoint-initdb.d/2-create_tables.sql