"use server";

import { createClient } from "@/utils/supabase/server";
import { FunctionNames, OMDBType } from "../../constants";
import IMovieDetails from "../../types/IMovieDetails";
import { objectKeysSnakeCaseToCamelCase } from "@/utils/objectKeysSnakeCaseToCamelCase";

async function getMovieDetails(
  mediaId: number,
  type: OMDBType,
): Promise<IMovieDetails | undefined> {
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

  return objectKeysSnakeCaseToCamelCase(JSON.parse(data)) as IMovieDetails;
}

export default getMovieDetails;
