import { useEffect, useState } from "react";

export default function useToggle(initialState = false) {
  const [visibleElement, setVisibleElement] = useState(initialState);

  const toggleElement = () => setVisibleElement(!visibleElement);

  useEffect(() => {
    const body = document.querySelector("body");
    const scrollProperty = visibleElement ? "hidden" : "auto";

    body.style.overflow = scrollProperty;
  }, [visibleElement]);

  return [visibleElement, toggleElement];
}
