"use client";

import { LikeStatus, MediaType } from "@/utils/constants";
import DebouncedSupabaseQuery from "../DebouncedSupabaseQuery";
import getLikeDislikeBatch from "./getLikeDislikeBatch";

const client = new DebouncedSupabaseQuery<
  LikeStatus,
  { [mediaId: number]: LikeStatus }
>(
  getLikeDislikeBatch,
  (mediaId, results) => results[mediaId] ?? LikeStatus.NONE,
);

async function getLikeStatus(
  mediaType: MediaType,
  mediaId: number,
): Promise<LikeStatus> {
  return client.query(mediaId);
}

export default getLikeStatus;
