"use server";

import { createClient } from "@/utils/supabase/server";
import { FunctionNames } from "@/utils/constants";
import IBook from "@/utils/types/IBook";
import { objectKeysSnakeCaseToCamelCase } from "@/utils/objectKeysSnakeCaseToCamelCase";

async function getBookDetails(mediaId: number): Promise<IBook | undefined> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    FunctionNames.BOOK_DETAILS,
    { body: { id: mediaId } },
  );

  if (error) {
    throw new Error(await error.context.text());
  }

  return objectKeysSnakeCaseToCamelCase(JSON.parse(data)) as IBook;
}

export default getBookDetails;
