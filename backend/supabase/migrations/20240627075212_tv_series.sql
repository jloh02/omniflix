alter type "public"."media_type" rename to "media_type__old_version_to_be_dropped";

create type "public"."media_type" as enum ('movie', 'tv_series');

create table "public"."tv_series" (
    "imdb_id" text not null,
    "created_at" timestamp with time zone,
    "title" text,
    "year" text,
    "rated" text,
    "released" date,
    "runtime" numeric,
    "genre" text[],
    "poster_url" text,
    "imdb_rating" numeric,
    "data" json,
    "media_type" media_type not null generated always as ('tv_series'::media_type) stored
);


alter table "public"."tv_series" enable row level security;

alter table "public"."media" alter column media_type type "public"."media_type" using media_type::text::"public"."media_type";

alter table "public"."movies" alter column media_type type "public"."media_type" using media_type::text::"public"."media_type";

drop type "public"."media_type__old_version_to_be_dropped";

CREATE UNIQUE INDEX tv_series_pkey ON public.tv_series USING btree (imdb_id, media_type);

alter table "public"."tv_series" add constraint "tv_series_pkey" PRIMARY KEY using index "tv_series_pkey";

alter table "public"."tv_series" add constraint "tv_series_media_fkey" FOREIGN KEY (media_type, imdb_id) REFERENCES media(media_type, media_specific_id) not valid;

alter table "public"."tv_series" validate constraint "tv_series_media_fkey";

grant delete on table "public"."tv_series" to "anon";

grant insert on table "public"."tv_series" to "anon";

grant references on table "public"."tv_series" to "anon";

grant select on table "public"."tv_series" to "anon";

grant trigger on table "public"."tv_series" to "anon";

grant truncate on table "public"."tv_series" to "anon";

grant update on table "public"."tv_series" to "anon";

grant delete on table "public"."tv_series" to "authenticated";

grant insert on table "public"."tv_series" to "authenticated";

grant references on table "public"."tv_series" to "authenticated";

grant select on table "public"."tv_series" to "authenticated";

grant trigger on table "public"."tv_series" to "authenticated";

grant truncate on table "public"."tv_series" to "authenticated";

grant update on table "public"."tv_series" to "authenticated";

grant delete on table "public"."tv_series" to "service_role";

grant insert on table "public"."tv_series" to "service_role";

grant references on table "public"."tv_series" to "service_role";

grant select on table "public"."tv_series" to "service_role";

grant trigger on table "public"."tv_series" to "service_role";

grant truncate on table "public"."tv_series" to "service_role";

grant update on table "public"."tv_series" to "service_role";

create policy "Allow authenticated users to read"
on "public"."tv_series"
as permissive
for select
to authenticated
using (true);


create policy "Allow service accounts to update"
on "public"."tv_series"
as permissive
for all
to service_role
using (true);



