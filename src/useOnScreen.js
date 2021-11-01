import { useEffect, useState } from "react";

function useOnScreen(ref, rootMargin = "0px", threshold = 0) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold,
      }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin, threshold]);

  return isIntersecting;
}

export default useOnScreen;
