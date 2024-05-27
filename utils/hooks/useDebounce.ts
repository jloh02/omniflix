import { useEffect, useState } from "react";

const useDebounce = <T>(stateValue: T, delayInMs: number) => {
  const [debounceValue, setDebounceValue] = useState(stateValue);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(stateValue), delayInMs);

    return () => clearTimeout(timer); //Cleanup debounce timeout on next state
  }, [stateValue, delayInMs]);

  return debounceValue;
};

export default useDebounce;
