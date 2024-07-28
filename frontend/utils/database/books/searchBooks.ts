"use server";

import { createClient } from "@/utils/supabase/server";
import { FunctionNames } from "@/utils/constants";

async function searchBooks(query: string, index?: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    FunctionNames.SEARCH_BOOKS,
    {
      body: {
        query,
        index,
      },
    },
  );

  if (error) {
    const e = await error.context.json();
    console.error(e);
    return e;
  }

  return JSON.parse(data);
}

export default searchBooks;
