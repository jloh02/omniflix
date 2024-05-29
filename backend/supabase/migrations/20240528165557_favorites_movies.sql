create table "public"."movies" (
    "imdb_id" text not null,
    "created_at" timestamp with time zone not null default now(),
    "title" text,
    "year" numeric,
    "rated" text,
    "released" date,
    "runtime" numeric,
    "genre" text[],
    "plot" text,
    "poster_url" text,
    "imdb_rating" numeric
);


alter table "public"."movies" enable row level security;

CREATE UNIQUE INDEX movies_pkey ON public.movies USING btree (imdb_id);

alter table "public"."movies" add constraint "movies_pkey" PRIMARY KEY using index "movies_pkey";

grant delete on table "public"."movies" to "anon";

grant insert on table "public"."movies" to "anon";

grant references on table "public"."movies" to "anon";

grant select on table "public"."movies" to "anon";

grant trigger on table "public"."movies" to "anon";

grant truncate on table "public"."movies" to "anon";

grant update on table "public"."movies" to "anon";

grant delete on table "public"."movies" to "authenticated";

grant insert on table "public"."movies" to "authenticated";

grant references on table "public"."movies" to "authenticated";

grant select on table "public"."movies" to "authenticated";

grant trigger on table "public"."movies" to "authenticated";

grant truncate on table "public"."movies" to "authenticated";

grant update on table "public"."movies" to "authenticated";

grant delete on table "public"."movies" to "service_role";

grant insert on table "public"."movies" to "service_role";

grant references on table "public"."movies" to "service_role";

grant select on table "public"."movies" to "service_role";

grant trigger on table "public"."movies" to "service_role";

grant truncate on table "public"."movies" to "service_role";

grant update on table "public"."movies" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."favorites_entries"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for users based on user_id"
on "public"."favorites_entries"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable read access for all users"
on "public"."favorites_entries"
as permissive
for select
to public
using (true);


create policy "Enable all access for all users"
on "public"."movies"
as permissive
for all
to public
using (true);



