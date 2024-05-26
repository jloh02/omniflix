create type media_type as enum (
  'movie'
);

create table watchlist_entries(
  id bigint primary key generated always as identity,
  user_id uuid references auth.users not null,
  media_type media_type not null,
  media_id text not null,
  created_at timestamptz default now()
);