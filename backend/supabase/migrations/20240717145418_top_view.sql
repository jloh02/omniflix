create view top_likes as
select
  media.media_type,
  media.media_id,
  media.media_specific_id,
  sum(likes_dislikes.status) as likes
from
  media
  left join likes_dislikes on media.media_id = likes_dislikes.media_id
group by
  media.media_type,
  media.media_id
having
  sum(likes_dislikes.status) > 0
order by
  likes desc;

create view top_favorites as
select
  media.media_type,
  media.media_id,
  media.media_specific_id,
  count(favorites_entries) as favorites
from
  media
  left join favorites_entries on media.media_id = favorites_entries.media_id
group by
  media.media_type,
  media.media_id
having
  count(favorites_entries) > 0
order by
  favorites desc;

create view top_reviews as
select
  media.media_type,
  media.media_id,
  media.media_specific_id,
  avg(reviews.rating) as rating
from
  media
  left join reviews on media.media_id = reviews.media_id
group by
  media.media_type,
  media.media_id
having
  avg(reviews.rating) > 2
order by
  rating desc;

create view user_recommendations with(security_invoker = true) as
select
  media_type,
  M.media_id,
  media_specific_id
from
  media M
  join (
    select
      unnest(recommendations) as media_id
    from
      recommendations
  ) as R on M.media_id = R.media_id;

create policy "Allow users to read own recommendations" on "public"."recommendations" as permissive for
select
  to authenticated using (
    (
      (
        SELECT
          auth.uid() AS uid
      ) = user_id
    )
  );