drop policy "Enable delete for users based on user_id" on "public"."favorites_entries";

drop policy "Enable insert for users based on user_id" on "public"."favorites_entries";

drop policy "Enable read access for all users" on "public"."favorites_entries";

drop policy "Allow users to edit based on user_id" on "public"."watchlist_entries";

create policy "Enable delete for users based on user_id" on "public"."favorites_entries" as permissive for delete to authenticated using (
  (
    (
      SELECT
        auth.uid() AS uid
    ) = user_id
  )
);

create policy "Enable insert for users based on user_id" on "public"."favorites_entries" as permissive for
insert
  to authenticated with check (
    (
      (
        SELECT
          auth.uid() AS uid
      ) = user_id
    )
  );

create policy "Enable read access for all users" on "public"."favorites_entries" as permissive for
select
  to authenticated using (true);

create policy "Allow users to edit based on user_id" on "public"."watchlist_entries" as permissive for all to authenticated using (
  (
    (
      SELECT
        auth.uid() AS uid
    ) = user_id
  )
);

alter table
  "public"."watchlist_entries"
alter column
  "created_at"
set
  not null;

DO $$
BEGIN
  IF (
    SELECT
      MAX(status_column)
    FROM
      watchlist_entries
    WHERE
      media_type = 'movie'
  ) = 1 THEN
    UPDATE
      watchlist_entries
    SET
      status_column = 2
    WHERE
      status_column = 1
      AND media_type = 'movie';
  END IF;
END $$;
