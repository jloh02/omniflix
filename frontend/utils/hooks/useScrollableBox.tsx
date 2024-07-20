import {
  ChevronRight,
  KeyboardArrowDown,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  DependencyList,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Direction = "horizontal" | "vertical";

const MAX_SCROLL_THRESHOLD = 200;

// This hook is used to determine if a box is scrollable in a certain direction
const useScrollableBox = (direction: Direction, deps: DependencyList) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showScrollableBox, setShowScrollableBox] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    if (!divRef.current) return;
    divRef.current.onscroll = (ev) => {
      setScrollPosition(
        direction === "horizontal"
          ? (ev.target as HTMLDivElement).scrollLeft
          : (ev.target as HTMLDivElement).scrollTop,
      );
    };

    const updateScrollableBox = () => {
      if (divRef && divRef.current) {
        setShowScrollableBox(
          direction === "horizontal"
            ? divRef.current.clientWidth < divRef.current.scrollWidth
            : divRef.current.clientHeight < divRef.current.scrollHeight,
        );
      }
    };
    updateScrollableBox();
    window.addEventListener("resize", updateScrollableBox);
    return () => window.removeEventListener("resize", updateScrollableBox);
  }, [divRef, deps]);

  const scrollThreshold = useMemo(() => {
    if (!divRef.current) return MAX_SCROLL_THRESHOLD;
    return Math.min(
      direction === "horizontal"
        ? divRef.current.scrollWidth - divRef.current.clientWidth
        : divRef.current.scrollHeight - divRef.current.clientHeight,
      MAX_SCROLL_THRESHOLD,
    );
  }, [divRef]);

  const scrollableBox = useMemo(() => {
    if (!showScrollableBox) return;
    const positionProps =
      direction === "horizontal"
        ? {
            top: 0,
            bottom: 0,
            right: 0,
            pr: 1,
            width: "70px",
            flexDirection: "column",
          }
        : {
            left: 0,
            right: 0,
            bottom: 0,
            pb: 1,
            height: "70px",
          };
    const gradientAngle = direction === "horizontal" ? "90deg" : "180deg";
    return (
      <Box
        {...positionProps}
        position="absolute"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="10px"
        sx={{
          pointerEvents: "none",
          opacity: Math.max(1.0 - scrollPosition / scrollThreshold, 0.0),
          transition: "opacity 0.3s",
          background: `linear-gradient(${gradientAngle}, transparent, #000000BA, #000000FF)`,
        }}
      >
        {direction === "horizontal" ? (
          <KeyboardArrowRight fontSize="large" sx={{ color: "white" }} />
        ) : (
          <KeyboardArrowDown fontSize="large" sx={{ color: "white" }} />
        )}
      </Box>
    );
  }, [showScrollableBox, scrollPosition]);

  return { ref: divRef, scrollableBox };
};

export { useScrollableBox };
