"use server";

import { createClient } from "@/utils/supabase/server";
import { FunctionNames, OMDBType } from "../../constants";

async function getLatestMovieTv(type: OMDBType): Promise<boolean | undefined> {
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
