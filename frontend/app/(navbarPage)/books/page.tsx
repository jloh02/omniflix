"use client";

import React from "react";
import { MediaType } from "@/utils/constants";
import SearchPage from "@/components/searchPage/searchPage";
import searchBooks from "@/utils/database/books/searchBooks";
import { objectKeysSnakeCaseToCamelCase } from "@/utils/objectKeysSnakeCaseToCamelCase";
import IBook from "@/utils/types/IBook";

const Books: React.FC = () => {
  return (
    <SearchPage
      title="Books"
      type={MediaType.BOOK}
      searchCallback={async (
        _,
        query: string,
        index: number | undefined,
        errorCallback: (error: string) => void,
      ) => {
        const response = await searchBooks(query, index);

        if (response.error) {
          console.error(response.error);
          errorCallback(response.error.message);
          return [[], 0];
        }

        if (!response.items) return [[], index ?? 0]; // No results

        const processedRes = (response.items as object[]).map(
          (mediaObj: object) =>
            objectKeysSnakeCaseToCamelCase(mediaObj) as IBook,
        );
        return [processedRes, index ?? 0 + response.items.length];
      }}
    />
  );
};

export default Books;
