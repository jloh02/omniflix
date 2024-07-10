"use client";

import { MediaType } from "../../constants";
import DebouncedSupabaseQuery from "../DebouncedSupabaseQuery";
import getWatchlistBatch from "./getWatchlistBatch";

const client = new DebouncedSupabaseQuery<boolean, number[]>(
  getWatchlistBatch,
  (mediaId, results) => results.includes(mediaId),
);

async function isWatchlisted(
  mediaType: MediaType,
  mediaId: number,
): Promise<boolean> {
  return client.query(mediaId);
}

export default isWatchlisted;
