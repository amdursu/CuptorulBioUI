import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<any>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
