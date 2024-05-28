drop policy "Enable select for users based on user_id" on "public"."watchlist_entries";

alter table "public"."watchlist_entries" add column "column_order" text not null default ''::text;

alter table "public"."watchlist_entries" add column "status_column" smallint not null default '0'::smallint;

alter table "public"."watchlist_entries" add constraint "watchlist_entries_column_order_check" CHECK ((length(column_order) > 1)) not valid;

alter table "public"."watchlist_entries" validate constraint "watchlist_entries_column_order_check";

create policy "Allow users to edit based on user_id"
on "public"."watchlist_entries"
as permissive
for all
to public
using ((( SELECT auth.uid() AS uid) = user_id));



