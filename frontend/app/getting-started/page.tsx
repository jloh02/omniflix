import React from "react";
import { createClient } from "@/utils/supabase/server";
import OnboardingForm from "./OnboardingForm";

const OnboardingPage: React.FC = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    throw new Error("User not authenticated. Middleware should've caught this");

  return <OnboardingForm email={user.email ?? "unknown"} />;
};

export default OnboardingPage;
