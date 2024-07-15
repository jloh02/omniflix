import os
import pandas as pd
from dotenv import load_dotenv
from surprise import Reader, Dataset, SVD
from supabase import create_client, Client

if not os.environ.get("PRODUCTION") == "True":
    load_dotenv(".env.local")

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

response = (
    supabase.table("reviews")
    .select("user_id, media_id, rating, media(media_type)")
    .execute()
)

# Process response to group by media_type and store media_ids and user_ids for later use
grouped_by_media_type = {}
media_ids = {}
# Store media_ids that have been rated by a user so recommendations exclude them
user_ids = {}
for review in response.data:
    media_type = review["media"]["media_type"]
    if media_type not in grouped_by_media_type:
        grouped_by_media_type[media_type] = []
        media_ids[media_type] = set()
    if review["user_id"] not in user_ids:
        user_ids[review["user_id"]] = set()

    user_ids[review["user_id"]].add(review["media_id"])

    value = review.copy()
    del value["media"]

    media_ids[media_type].add(value["media_id"])
    grouped_by_media_type[media_type].append(value)

# For each media_type, train SVD model and predict top 5 recommendations for each user
results = []
for media_type in grouped_by_media_type.keys():
    # Train SVD model
    df = pd.DataFrame(grouped_by_media_type[media_type])
    reader = Reader(rating_scale=(0, 5.0))
    data = Dataset.load_from_df(df, reader)

    algo = SVD()
    trainset = data.build_full_trainset()
    algo.fit(trainset)

    # Create test dataframe from media_ids and user_ids and predict ratings
    media_id = list(media_ids[media_type])
    user_id = user_ids.keys()
    for uid in user_id:
        ratings = [
            algo.predict(uid, mid)
            for mid in filter(lambda x: not x in user_ids[uid], media_id)
        ]
        ratings.sort(reverse=True, key=lambda x: x.est)
        results.append(
            {
                "user_id": uid,
                "media_type": media_type,
                "recommendations": list(map(lambda x: x.iid, ratings[:10])),
            }
        )

# Store recommendations in supabase
supabase.table("recommendations").upsert(
    results, on_conflict="user_id,media_type", ignore_duplicates=False
).execute()
