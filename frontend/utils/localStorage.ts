"use client";

const getDefaultExpanded = (key: string, index: number) => {
  return (parseInt(localStorage.getItem(key) ?? "1") & (1 << index)) > 0;
};

const setDefaultExpanded = (key: string, index: number, expanded: boolean) => {
  let value = parseInt(localStorage.getItem(key) ?? "1");
  if (expanded) {
    value |= 1 << index;
  } else {
    value &= ~(1 << index);
  }
  localStorage.setItem(key, value.toString());
};

export { getDefaultExpanded, setDefaultExpanded };
