"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaType, SEARCH_OMDB_FUNCTION } from "../../constants";

async function searchOmdb(
  mediaType: MediaType,
  query: string,
  page?: number,
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    SEARCH_OMDB_FUNCTION,
    {
      body: {
        query,
        type: mediaType,
        page,
      },
    },
  );

  if (error) {
    return await error.context.json();
  }

  console.log(data);

  return JSON.parse(data);
}

export default searchOmdb;
