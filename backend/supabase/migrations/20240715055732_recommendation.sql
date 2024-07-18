alter table
  "public"."favorites_entries" drop constraint "public_favorites_entries_user_id_fkey";

alter table
  "public"."likes_dislikes" drop constraint "public_likes_dislikes_user_id_fkey";

alter table
  "public"."reviews" drop constraint "public_reviews_user_id_fkey";

create table "public"."recommendations" (
  "user_id" uuid not null,
  "media_type" media_type not null,
  "recommendations" bigint []
);

alter table
  "public"."recommendations" enable row level security;

CREATE UNIQUE INDEX recommendations_pkey ON public.recommendations USING btree (user_id, media_type);

alter table
  "public"."recommendations"
add
  constraint "recommendations_pkey" PRIMARY KEY using index "recommendations_pkey";

alter table
  "public"."favorites_entries"
add
  constraint "favorites_entries_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table
  "public"."favorites_entries" validate constraint "favorites_entries_user_id_fkey";

alter table
  "public"."likes_dislikes"
add
  constraint "likes_dislikes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table
  "public"."likes_dislikes" validate constraint "likes_dislikes_user_id_fkey";

alter table
  "public"."recommendations"
add
  constraint "public_recommendations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table
  "public"."recommendations" validate constraint "public_recommendations_user_id_fkey";

alter table
  "public"."reviews"
add
  constraint "reviews_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES users_info(user_id) not valid;

alter table
  "public"."reviews" validate constraint "reviews_user_id_fkey1";

grant delete on table "public"."recommendations" to "anon";

grant
insert
  on table "public"."recommendations" to "anon";

grant references on table "public"."recommendations" to "anon";

grant
select
  on table "public"."recommendations" to "anon";

grant trigger on table "public"."recommendations" to "anon";

grant truncate on table "public"."recommendations" to "anon";

grant
update
  on table "public"."recommendations" to "anon";

grant delete on table "public"."recommendations" to "authenticated";

grant
insert
  on table "public"."recommendations" to "authenticated";

grant references on table "public"."recommendations" to "authenticated";

grant
select
  on table "public"."recommendations" to "authenticated";

grant trigger on table "public"."recommendations" to "authenticated";

grant truncate on table "public"."recommendations" to "authenticated";

grant
update
  on table "public"."recommendations" to "authenticated";

grant delete on table "public"."recommendations" to "service_role";

grant
insert
  on table "public"."recommendations" to "service_role";

grant references on table "public"."recommendations" to "service_role";

grant
select
  on table "public"."recommendations" to "service_role";

grant trigger on table "public"."recommendations" to "service_role";

grant truncate on table "public"."recommendations" to "service_role";

grant
update
  on table "public"."recommendations" to "service_role";