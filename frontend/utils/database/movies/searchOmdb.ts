"use server";

import { createClient } from "@/utils/supabase/server";
import { FunctionNames, OMDBType } from "../../constants";

async function searchOmdb(query: string, type: OMDBType, page?: number) {
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
        type,
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
