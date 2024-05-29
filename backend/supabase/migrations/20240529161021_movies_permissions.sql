create policy "Allow authenticated users to read" on "public"."movies" as permissive for
select
  to authenticated using (true);

create policy "Allow service accounts to update" on "public"."movies" as permissive for all to service_role using (true);