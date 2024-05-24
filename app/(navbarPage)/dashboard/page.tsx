import React from "react";
import TabbedView from "@/components/tabbedView/TabbedView";

const Dashboard: React.FC = () => {
  return (
    <TabbedView tabLabels={["Item1", "Item2"]}>
      <div>Item1</div>
      <div>Item2</div>
    </TabbedView>
  );
};

export default Dashboard;
