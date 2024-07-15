import os
import pandas as pd
from dotenv import load_dotenv
from surprise import Reader, Dataset, SVD, NMF
from surprise.model_selection import cross_validate
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
user_ids = set()
for review in response.data:
    media_type = review["media"]["media_type"]
    if media_type not in grouped_by_media_type:
        grouped_by_media_type[media_type] = []
        media_ids[media_type] = set()

    value = review.copy()
    del value["media"]

    user_ids.add(value["user_id"])
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
    user_id = list(user_ids)
    for i in range(len(user_ids)):
        ratings = [algo.predict(user_id[i], media_id[j]) for j in range(len(media_id))]
        ratings.sort(reverse=True, key=lambda x: x.est)
        results.append(
            {
                "user_id": user_id[i],
                "media_type": media_type,
                "recommendations": list(map(lambda x: x.iid, ratings[:10])),
            }
        )

# Store recommendations in supabase
supabase.table("recommendations").upsert(
    results, on_conflict="user_id,media_type", ignore_duplicates=False
).execute()
