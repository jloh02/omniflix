create policy "Enable read access for authenticated users only"
on "public"."users_info"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for users based on user_id"
on "public"."users_info"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));



