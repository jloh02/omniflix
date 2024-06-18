drop policy "Enable update for users based on user_id" on "public"."users_info";

alter table "public"."users_info" alter column "name" set not null;

create policy "Enable insert for authenticated users only based on user_id"
on "public"."users_info"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable update for authenticated users only based on user_id"
on "public"."users_info"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));



