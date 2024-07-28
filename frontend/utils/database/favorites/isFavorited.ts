"use client";

import { MediaType } from "../../constants";
import DebouncedSupabaseQuery from "../DebouncedSupabaseQuery";
import getFavoritesBatch from "./getFavoritesBatch";

const client = new DebouncedSupabaseQuery<boolean, number[]>(
  getFavoritesBatch,
  (mediaId, results) => results.includes(mediaId),
);

async function isFavorited(
  mediaType: MediaType,
  mediaId: number,
): Promise<boolean> {
  return client.query(mediaId);
}

export default isFavorited;
