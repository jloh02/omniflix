import React from "react";
import TabbedView from "@/components/tabbedView/TabbedView";
import Watchlist from "./watchlist";

const Dashboard: React.FC = () => {
  return (
    <TabbedView tabLabels={["Watchlist", "Favorites", "Feed", "Watched"]}>
      <Watchlist />
      <div>Favorites Page WIP</div>
      <div>Feed Page WIP</div>
      <div>Watched Page WIP</div>
    </TabbedView>
  );
};

export default Dashboard;
