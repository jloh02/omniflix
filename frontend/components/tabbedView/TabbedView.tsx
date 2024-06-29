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

  const childrenView = useMemo(
    () =>
      React.Children.toArray(children).map((child, index) => (
        <Box display={index === tab ? "block" : "none"}>{child}</Box>
      )),
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
        >
          {tabLabels.map((tabLabel, index) => (
            <Tab key={index} label={tabLabel} />
          ))}
        </Tabs>
      </Box>
      {childrenView}
    </Box>
  );
};

export default TabView;
