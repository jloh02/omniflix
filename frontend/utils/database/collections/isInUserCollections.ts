"use client";

import { MediaType } from "../../constants";
import DebouncedSupabaseQuery from "../DebouncedSupabaseQuery";
import isInUserCollectionsBatch from "./isInUserCollectionsBatch";

const client = new DebouncedSupabaseQuery<boolean, number[]>(
  isInUserCollectionsBatch,
  (mediaId, results) => results.includes(mediaId),
);

async function isInUserCollections(mediaId: number): Promise<boolean> {
  return client.query(mediaId);
}

export default isInUserCollections;
