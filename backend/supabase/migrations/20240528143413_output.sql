alter table "public"."favorites_entries" alter column "id" set default gen_random_uuid();

alter table "public"."favorites_entries" alter column "id" drop identity;

alter table "public"."favorites_entries" alter column "id" set data type uuid using "id"::uuid;

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



