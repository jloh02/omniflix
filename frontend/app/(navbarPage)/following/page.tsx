"use server";
import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import React from "react";
import TabbedView from "@/components/tabbedView/TabbedView";
import Following from "./following";
import Followers from "./followers";
import SearchTab from "./search";

export default async function FollowingPage() {
  return (
    <UserPageTemplate>
      <TabbedView tabLabels={["Following", "Followers", "Search"]}>
        <Following />
        <Followers />
        <SearchTab />
      </TabbedView>
    </UserPageTemplate>
  );
}
