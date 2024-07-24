drop view if exists "public"."discover_latest";

drop view if exists "public"."top_favorites";

drop view if exists "public"."top_likes";

drop view if exists "public"."top_reviews";

drop view if exists "public"."user_recommendations";

ALTER TYPE "public"."media_type"
ADD
  VALUE 'book';

commit;

create table "public"."books" (
  "google_book_id" text not null,
  "created_at" timestamp with time zone,
  "title" text,
  "published_date" text,
  "image_link" text,
  "data" json,
  "media_type" media_type not null generated always as ('book' :: media_type) stored
);

alter table
  "public"."books" enable row level security;

CREATE UNIQUE INDEX books_pkey ON public.books USING btree (google_book_id, media_type);

alter table
  "public"."books"
add
  constraint "books_pkey" PRIMARY KEY using index "books_pkey";

alter table
  "public"."books"
add
  constraint "public_books_media_type_imdb_id_fkey" FOREIGN KEY (media_type, google_book_id) REFERENCES media(media_type, media_specific_id) not valid;

alter table
  "public"."books" validate constraint "public_books_media_type_imdb_id_fkey";

grant delete on table "public"."books" to "anon";

grant
insert
  on table "public"."books" to "anon";

grant references on table "public"."books" to "anon";

grant
select
  on table "public"."books" to "anon";

grant trigger on table "public"."books" to "anon";

grant truncate on table "public"."books" to "anon";

grant
update
  on table "public"."books" to "anon";

grant delete on table "public"."books" to "authenticated";

grant
insert
  on table "public"."books" to "authenticated";

grant references on table "public"."books" to "authenticated";

grant
select
  on table "public"."books" to "authenticated";

grant trigger on table "public"."books" to "authenticated";

grant truncate on table "public"."books" to "authenticated";

grant
update
  on table "public"."books" to "authenticated";

grant delete on table "public"."books" to "service_role";

grant
insert
  on table "public"."books" to "service_role";

grant references on table "public"."books" to "service_role";

grant
select
  on table "public"."books" to "service_role";

grant trigger on table "public"."books" to "service_role";

grant truncate on table "public"."books" to "service_role";

grant
update
  on table "public"."books" to "service_role";

create policy "Enable select for authenticated users only" on "public"."books" as permissive for
select
  to authenticated using (true);

create
or replace view top_likes as
select
  media.media_type,
  media.media_id,
  media.media_specific_id,
  sum(likes_dislikes.status) as likes
from
  media
  left join likes_dislikes on media.media_id = likes_dislikes.media_id
group by
  media.media_type,
  media.media_id
having
  sum(likes_dislikes.status) > 0
order by
  likes desc;

create
or replace view top_favorites as
select
  media.media_type,
  media.media_id,
  media.media_specific_id,
  count(favorites_entries) as favorites
from
  media
  left join favorites_entries on media.media_id = favorites_entries.media_id
group by
  media.media_type,
  media.media_id
having
  count(favorites_entries) > 0
order by
  favorites desc;

create
or replace view top_reviews as
select
  media.media_type,
  media.media_id,
  media.media_specific_id,
  avg(reviews.rating) as rating
from
  media
  left join reviews on media.media_id = reviews.media_id
group by
  media.media_type,
  media.media_id
having
  avg(reviews.rating) > 2
order by
  rating desc;

create
or replace view user_recommendations with(security_invoker = true) as
select
  media_type,
  M.media_id,
  media_specific_id
from
  media M
  join (
    select
      unnest(recommendations) as media_id
    from
      recommendations
  ) as R on M.media_id = R.media_id;

create
or replace view discover_latest as
select
  media_type,
  M.media_id,
  media_specific_id
from
  media M
  join (
    select
      unnest(upcoming) as media_id
    from
      upcoming
  ) as R on M.media_id = R.media_id;