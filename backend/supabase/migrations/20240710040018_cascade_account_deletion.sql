alter table "public"."likes_dislikes" drop constraint "likes_dislikes_user_id_fkey";

alter table "public"."reviews" drop constraint "reviews_user_id_fkey1";

alter table "public"."likes_dislikes" add constraint "public_likes_dislikes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."likes_dislikes" validate constraint "public_likes_dislikes_user_id_fkey";

alter table "public"."reviews" add constraint "public_reviews_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users_info(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reviews" validate constraint "public_reviews_user_id_fkey";


