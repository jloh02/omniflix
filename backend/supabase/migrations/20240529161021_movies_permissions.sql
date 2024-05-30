create policy "Allow authenticated users to read" on "public"."movies" as permissive for
select
  to authenticated using (true);

create policy "Allow service accounts to update" on "public"."movies" as permissive for all to service_role using (true);

drop policy "Enable all access for all users" on "public"."movies";

alter table
  "public"."movies"
alter column
  "year"
set
  data type text using "year" :: text;

alter table
  "public"."watchlist_entries" drop constraint "watchlist_entries_column_order_check";

alter table
  "public"."watchlist_entries"
add
  constraint "watchlist_entries_column_order_check" CHECK ((length(column_order) > 0)) not valid;

alter table
  "public"."watchlist_entries" validate constraint "watchlist_entries_column_order_check";

alter table
  "public"."favorites_entries"
add
  constraint "favorites_entries_media_id_fkey" FOREIGN KEY (media_id) REFERENCES movies(imdb_id) not valid;

alter table
  "public"."favorites_entries" validate constraint "favorites_entries_media_id_fkey";

alter table
  "public"."watchlist_entries"
add
  constraint "watchlist_entries_media_id_fkey" FOREIGN KEY (media_id) REFERENCES movies(imdb_id) not valid;

alter table
  "public"."watchlist_entries" validate constraint "watchlist_entries_media_id_fkey";