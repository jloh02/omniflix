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