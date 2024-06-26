ALTER TABLE
  favorites_entries DROP CONSTRAINT favorites_entries_media_id_fkey;

ALTER TABLE
  reviews DROP CONSTRAINT reviews_media_id_fkey;

ALTER TABLE
  watchlist_entries DROP CONSTRAINT watchlist_entries_media_id_fkey;

CREATE TABLE "public".media (
  media_type media_type NOT NULL,
  media_id bigint generated always as identity not null UNIQUE,
  media_specific_id text NOT NULL,
  CONSTRAINT media_pair_unique UNIQUE (media_type, media_specific_id)
);

alter table
  "public"."media" enable row level security;

CREATE UNIQUE INDEX media_pkey ON public.media USING btree (media_id, media_type, media_specific_id);

CREATE UNIQUE INDEX media_items ON public.media USING btree (media_type, media_specific_id);

alter table
  "public".media
add
  constraint "media_pkey" PRIMARY KEY using index media_pkey;

INSERT INTO
  media (media_type, media_specific_id)
SELECT
  'movie',
  imdb_id
FROM
  movies;

-- For each of the tables
-- 1. Update media_id for movies
-- 2. Update column types for media_id
-- 3. Add foreign key to media table
-- 4. Remove media_type
UPDATE
  watchlist_entries
SET
  media_id = m.media_id
FROM
  watchlist_entries we
  JOIN media m ON we.media_id = m.media_specific_id;

ALTER TABLE
  watchlist_entries
ALTER COLUMN
  media_id type bigint USING media_id :: bigint;

ALTER TABLE
  watchlist_entries
ADD
  CONSTRAINT watchlist_entries_media_fkey FOREIGN KEY (media_id) REFERENCES media(media_id);

ALTER TABLE
  watchlist_entries DROP COLUMN media_type;

UPDATE
  favorites_entries
SET
  media_id = m.media_id
FROM
  favorites_entries we
  JOIN media m ON we.media_id = m.media_specific_id;

ALTER TABLE
  favorites_entries
ALTER COLUMN
  media_id type bigint USING media_id :: bigint;

ALTER TABLE
  favorites_entries
ADD
  CONSTRAINT favorites_entries_media_fkey FOREIGN KEY (media_id) REFERENCES media(media_id);

ALTER TABLE
  favorites_entries DROP COLUMN media_type;

UPDATE
  reviews
SET
  media_id = m.media_id
FROM
  reviews we
  JOIN media m ON we.media_id = m.media_specific_id;

ALTER TABLE
  reviews
ALTER COLUMN
  media_id type bigint USING media_id :: bigint;

ALTER TABLE
  reviews
ADD
  CONSTRAINT reviews_media_fkey FOREIGN KEY (media_id) REFERENCES media(media_id);

ALTER TABLE
  reviews DROP COLUMN media_type;

UPDATE
  likes_dislikes
SET
  media_id = m.media_id
FROM
  likes_dislikes we
  JOIN media m ON we.media_id = m.media_specific_id;

ALTER TABLE
  likes_dislikes
ALTER COLUMN
  media_id type bigint USING media_id :: bigint;

ALTER TABLE
  likes_dislikes
ADD
  CONSTRAINT likes_dislikes_media_fkey FOREIGN KEY (media_id) REFERENCES media(media_id);

ALTER TABLE
  likes_dislikes DROP COLUMN media_type;

-- Update movies table with media_type
ALTER TABLE
  movies
ADD
  COLUMN media_type media_type GENERATED ALWAYS AS ('movie') STORED;

ALTER TABLE
  movies DROP CONSTRAINT movies_pkey;

CREATE UNIQUE INDEX movies_pkey ON public.movies USING btree (imdb_id, media_type);

alter table
  movies
add
  constraint "movies_pkey" PRIMARY KEY using index "movies_pkey";

ALTER TABLE
  movies
ADD
  CONSTRAINT movies_media_fkey FOREIGN KEY (media_type, imdb_id) REFERENCES media(media_type, media_specific_id);

grant delete on table "public"."media" to "authenticated";

create policy "Enable read access for all users" on "public"."media" as permissive for
select
  to authenticated using (true);