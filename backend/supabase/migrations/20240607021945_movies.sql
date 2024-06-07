alter table "public"."movies" drop column "plot";

alter table "public"."movies" add column "data" json;

alter table "public"."movies" alter column "created_at" drop default;

alter table "public"."movies" alter column "created_at" drop not null;


