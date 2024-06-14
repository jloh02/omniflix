alter table "public"."users_info" add constraint "users_info_name_check" CHECK ((length(name) > 0)) not valid;

alter table "public"."users_info" validate constraint "users_info_name_check";

alter table "public"."users_info" add constraint "users_info_username_check" CHECK ((length(username) > 0)) not valid;

alter table "public"."users_info" validate constraint "users_info_username_check";


