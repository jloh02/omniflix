"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React, { useMemo, useState } from "react";

interface TabViewProps {
  tabLabels: string[];
  children: React.ReactNode;
}

const TabView: React.FC<TabViewProps> = ({
  tabLabels,
  children,
}: TabViewProps) => {
  const [tab, setTab] = useState(0);

  if (!children) throw new Error("TabView requires children");

  const numChild = React.Children.count(children);
  if (numChild !== tabLabels.length)
    throw new Error(
      `TabView requires ${tabLabels.length} children. Found ${numChild}`,
    );

  const childView = useMemo(
    () => React.Children.toArray(children)[tab],
    [tab, children],
  );

  return (
    <Box className="w-11/12 p-2.5">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          textColor="secondary"
          indicatorColor="secondary"
          onChange={(_, newValue) => setTab(newValue)}
          aria-label="basic tabs example"
        >
          {tabLabels.map((tabLabel, index) => (
            <Tab key={index} label={tabLabel} />
          ))}
        </Tabs>
      </Box>
      {childView}
    </Box>
  );
};

export default TabView;
