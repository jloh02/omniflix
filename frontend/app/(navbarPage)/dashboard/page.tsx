import React from "react";
import TabbedView from "@/components/tabbedView/TabbedView";
import Watchlist from "./watchlist";
import Favorites from "./favorites";

const Dashboard: React.FC = () => {
  return (
    <TabbedView
      tabLabels={[
        "Overview",
        "Favorites",
        // "Feed",
        // "Not Started",
        // "In Progress",
        // "Finished",
      ]}
    >
      <Watchlist />
      <Favorites />
      {/* <div>Feed Page WIP</div>
      <div>"To Watch" Page WIP</div>
      <div>"Watching" Page WIP</div>
      <div>"Watched" Page WIP</div> */}
    </TabbedView>
  );
};

export default Dashboard;
