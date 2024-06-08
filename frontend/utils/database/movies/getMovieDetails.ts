"use server";
import { createClient } from "@/utils/supabase/server";
import { FunctionNames, MediaType } from "../../constants";
import IMovieDetails from "../../types/IMovieDetails";

async function getMovieDetails(
  movieId: string,
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
        type: MediaType.MOVIE,
        id: movieId,
      },
    },
  );

  if (error) {
    throw new Error(await error.context.json());
  }

  return JSON.parse(data) as IMovieDetails;
}

export default getMovieDetails;
