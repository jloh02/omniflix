"use client";

import React from "react";
import { MediaType, MediaTypeToParam, OMDBType } from "@/utils/constants";
import SearchPage from "@/components/searchPage/searchPage";
import getLatestMovieTv from "@/utils/database/latest/getLatestMovieTv";
import searchOmdb from "@/utils/database/omdb/searchOmdb";
import { objectKeysSnakeCaseToCamelCase } from "@/utils/objectKeysSnakeCaseToCamelCase";
import IMovieTvSeries from "@/utils/types/IMovieTvSeries";

interface OmdbSearchPageProps {
  title: string;
  type: MediaType;
}

const OmdbSearchPage: React.FC<OmdbSearchPageProps> = ({ title, type }) => {
  return (
    <SearchPage
      title={title}
      type={type}
      getLatestMedia={getLatestMovieTv}
      searchCallback={async (
        type: MediaType,
        query: string,
        page: number | undefined,
        errorCallback: (error: string) => void,
      ) => {
        const { omdbType } = MediaTypeToParam[type];
        const response = await searchOmdb(query, omdbType as OMDBType, page);

        if (response["Error"]) {
          errorCallback(response["Error"]);
          return [[], 1];
        }

        if (!response["Search"]) return [[], page ?? 1]; // No results

        const processedRes = (response["Search"] as object[]).map(
          (mediaObj: object) =>
            objectKeysSnakeCaseToCamelCase(mediaObj) as IMovieTvSeries,
        );
        return [processedRes, (page ?? 1) + 1];
      }}
    />
  );
};

export default OmdbSearchPage;
