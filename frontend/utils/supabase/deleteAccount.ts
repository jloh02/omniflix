"use server";

import { createClient } from "@/utils/supabase/server";
import { FunctionNames } from "../constants";

async function deleteAccount() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    FunctionNames.DELETE_ACCOUNT,
  );

  if (error) {
    console.error(error);
    return;
  }

  return error === null;
}

export default deleteAccount;
