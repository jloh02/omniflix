"use server";

import { createClient } from "@/utils/supabase/server";
import { FunctionNames, MediaType } from "../../constants";

async function searchOmdb(mediaType: MediaType, query: string, page?: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    FunctionNames.SEARCH_OMDB,
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

  return JSON.parse(data);
}

export default searchOmdb;
