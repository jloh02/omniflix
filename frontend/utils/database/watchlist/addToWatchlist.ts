"use server";

import { createClient } from "@/utils/supabase/server";
import {
  FunctionNames,
  MediaType,
  WatchlistFunctionAction,
} from "../../constants";

async function addToWatchlist(mediaType: MediaType, mediaId: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    FunctionNames.WATCHLIST,
    {
      body: {
        type: WatchlistFunctionAction.ADD,
        media_type: mediaType,
        media_id: mediaId,
      },
    },
  );

  if (error) {
    console.error(error);
    return;
  }

  return data && JSON.parse(data).success === true;
}

export default addToWatchlist;
