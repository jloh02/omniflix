create table "public"."upcoming" (
  "media_type" media_type not null,
  "created_at" timestamp with time zone not null default now(),
  "upcoming" bigint [] not null
);

alter table
  "public"."upcoming" enable row level security;

CREATE UNIQUE INDEX upcoming_pkey ON public.upcoming USING btree (media_type);

alter table
  "public"."upcoming"
add
  constraint "upcoming_pkey" PRIMARY KEY using index "upcoming_pkey";

grant delete on table "public"."upcoming" to "anon";

grant
insert
  on table "public"."upcoming" to "anon";

grant references on table "public"."upcoming" to "anon";

grant
select
  on table "public"."upcoming" to "anon";

grant trigger on table "public"."upcoming" to "anon";

grant truncate on table "public"."upcoming" to "anon";

grant
update
  on table "public"."upcoming" to "anon";

grant delete on table "public"."upcoming" to "authenticated";

grant
insert
  on table "public"."upcoming" to "authenticated";

grant references on table "public"."upcoming" to "authenticated";

grant
select
  on table "public"."upcoming" to "authenticated";

grant trigger on table "public"."upcoming" to "authenticated";

grant truncate on table "public"."upcoming" to "authenticated";

grant
update
  on table "public"."upcoming" to "authenticated";

grant delete on table "public"."upcoming" to "service_role";

grant
insert
  on table "public"."upcoming" to "service_role";

grant references on table "public"."upcoming" to "service_role";

grant
select
  on table "public"."upcoming" to "service_role";

grant trigger on table "public"."upcoming" to "service_role";

grant truncate on table "public"."upcoming" to "service_role";

grant
update
  on table "public"."upcoming" to "service_role";