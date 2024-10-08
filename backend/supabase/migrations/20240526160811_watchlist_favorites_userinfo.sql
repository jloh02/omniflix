create type "public"."media_type" as enum ('movie');

create table "public"."favorites_entries" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "media_type" media_type not null,
    "media_id" text not null
);


alter table "public"."favorites_entries" enable row level security;

create table "public"."users_info" (
    "user_id" uuid not null,
    "name" text,
    "username" text not null,
    "bio" text
);


alter table "public"."users_info" enable row level security;

create table "public"."watchlist_entries" (
    "id" bigint generated always as identity not null,
    "user_id" uuid not null,
    "media_type" media_type not null,
    "media_id" text not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."watchlist_entries" enable row level security;

CREATE UNIQUE INDEX favorites_entries_id_key ON public.favorites_entries USING btree (id);

CREATE UNIQUE INDEX favorites_entries_pkey ON public.favorites_entries USING btree (id);

CREATE UNIQUE INDEX users_info_pkey ON public.users_info USING btree (user_id);

CREATE UNIQUE INDEX users_info_username_key ON public.users_info USING btree (username);

CREATE UNIQUE INDEX watchlist_entries_pkey ON public.watchlist_entries USING btree (id);

alter table "public"."favorites_entries" add constraint "favorites_entries_pkey" PRIMARY KEY using index "favorites_entries_pkey";

alter table "public"."users_info" add constraint "users_info_pkey" PRIMARY KEY using index "users_info_pkey";

alter table "public"."watchlist_entries" add constraint "watchlist_entries_pkey" PRIMARY KEY using index "watchlist_entries_pkey";

alter table "public"."favorites_entries" add constraint "favorites_entries_id_key" UNIQUE using index "favorites_entries_id_key";

alter table "public"."favorites_entries" add constraint "favorites_entries_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."favorites_entries" validate constraint "favorites_entries_user_id_fkey";

alter table "public"."users_info" add constraint "users_info_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users_info" validate constraint "users_info_user_id_fkey";

alter table "public"."users_info" add constraint "users_info_username_key" UNIQUE using index "users_info_username_key";

alter table "public"."watchlist_entries" add constraint "watchlist_entries_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."watchlist_entries" validate constraint "watchlist_entries_user_id_fkey";

grant delete on table "public"."favorites_entries" to "anon";

grant insert on table "public"."favorites_entries" to "anon";

grant references on table "public"."favorites_entries" to "anon";

grant select on table "public"."favorites_entries" to "anon";

grant trigger on table "public"."favorites_entries" to "anon";

grant truncate on table "public"."favorites_entries" to "anon";

grant update on table "public"."favorites_entries" to "anon";

grant delete on table "public"."favorites_entries" to "authenticated";

grant insert on table "public"."favorites_entries" to "authenticated";

grant references on table "public"."favorites_entries" to "authenticated";

grant select on table "public"."favorites_entries" to "authenticated";

grant trigger on table "public"."favorites_entries" to "authenticated";

grant truncate on table "public"."favorites_entries" to "authenticated";

grant update on table "public"."favorites_entries" to "authenticated";

grant delete on table "public"."favorites_entries" to "service_role";

grant insert on table "public"."favorites_entries" to "service_role";

grant references on table "public"."favorites_entries" to "service_role";

grant select on table "public"."favorites_entries" to "service_role";

grant trigger on table "public"."favorites_entries" to "service_role";

grant truncate on table "public"."favorites_entries" to "service_role";

grant update on table "public"."favorites_entries" to "service_role";

grant delete on table "public"."users_info" to "anon";

grant insert on table "public"."users_info" to "anon";

grant references on table "public"."users_info" to "anon";

grant select on table "public"."users_info" to "anon";

grant trigger on table "public"."users_info" to "anon";

grant truncate on table "public"."users_info" to "anon";

grant update on table "public"."users_info" to "anon";

grant delete on table "public"."users_info" to "authenticated";

grant insert on table "public"."users_info" to "authenticated";

grant references on table "public"."users_info" to "authenticated";

grant select on table "public"."users_info" to "authenticated";

grant trigger on table "public"."users_info" to "authenticated";

grant truncate on table "public"."users_info" to "authenticated";

grant update on table "public"."users_info" to "authenticated";

grant delete on table "public"."users_info" to "service_role";

grant insert on table "public"."users_info" to "service_role";

grant references on table "public"."users_info" to "service_role";

grant select on table "public"."users_info" to "service_role";

grant trigger on table "public"."users_info" to "service_role";

grant truncate on table "public"."users_info" to "service_role";

grant update on table "public"."users_info" to "service_role";

grant delete on table "public"."watchlist_entries" to "anon";

grant insert on table "public"."watchlist_entries" to "anon";

grant references on table "public"."watchlist_entries" to "anon";

grant select on table "public"."watchlist_entries" to "anon";

grant trigger on table "public"."watchlist_entries" to "anon";

grant truncate on table "public"."watchlist_entries" to "anon";

grant update on table "public"."watchlist_entries" to "anon";

grant delete on table "public"."watchlist_entries" to "authenticated";

grant insert on table "public"."watchlist_entries" to "authenticated";

grant references on table "public"."watchlist_entries" to "authenticated";

grant select on table "public"."watchlist_entries" to "authenticated";

grant trigger on table "public"."watchlist_entries" to "authenticated";

grant truncate on table "public"."watchlist_entries" to "authenticated";

grant update on table "public"."watchlist_entries" to "authenticated";

grant delete on table "public"."watchlist_entries" to "service_role";

grant insert on table "public"."watchlist_entries" to "service_role";

grant references on table "public"."watchlist_entries" to "service_role";

grant select on table "public"."watchlist_entries" to "service_role";

grant trigger on table "public"."watchlist_entries" to "service_role";

grant truncate on table "public"."watchlist_entries" to "service_role";

grant update on table "public"."watchlist_entries" to "service_role";

create policy "Enable select for users based on user_id"
on "public"."watchlist_entries"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = user_id));



