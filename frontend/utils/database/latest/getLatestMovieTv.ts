"use server";

import { createClient } from "@/utils/supabase/server";
import { FunctionNames, MediaType, MediaTypeToParam } from "@/utils/constants";

async function getLatestMovieTv(
  mediaType: MediaType,
): Promise<boolean | undefined> {
  const { omdbType: type } = MediaTypeToParam[mediaType];
  if (type == null) throw new Error("Invalid media type in getLatestMovieTv");

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    FunctionNames.UPCOMING_MOVIE_TV,
    { body: { type } },
  );

  if (error) {
    throw new Error(await error.context.text());
  }

  return Boolean(JSON.parse(data).success);
}

export default getLatestMovieTv;
