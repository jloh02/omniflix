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