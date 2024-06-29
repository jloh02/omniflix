"use server";

import { createClient } from "@/utils/supabase/server";
import { FunctionNames, OMDBType } from "../../constants";
import IMovieTvSeriesDetails from "../../types/IMovieTvSeriesDetails";
import { objectKeysSnakeCaseToCamelCase } from "@/utils/objectKeysSnakeCaseToCamelCase";

async function getOmdbDetails(
  mediaId: number,
  type: OMDBType,
): Promise<IMovieTvSeriesDetails | undefined> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    FunctionNames.OMDB_DETAILS,
    {
      body: {
        type,
        id: mediaId,
      },
    },
  );

  if (error) {
    throw new Error(await error.context.text());
  }

  return objectKeysSnakeCaseToCamelCase(
    JSON.parse(data),
  ) as IMovieTvSeriesDetails;
}

export default getOmdbDetails;
