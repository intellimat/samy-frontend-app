import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteScrollParams {
  hasNextPage: boolean | undefined;
  isLoading: boolean;
  fetchMore: (optionss: { variables: { after: string } }) => void;
  endCursor: string | null;
}

export function useInfiniteScroll({
  hasNextPage,
  isLoading,
  fetchMore,
  endCursor,
}: UseInfiniteScrollParams) {
  const bottomElementRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoading && endCursor) {
      fetchMore({ variables: { after: endCursor } });
    }
  }, [hasNextPage, isLoading, fetchMore, endCursor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null, // Viewport
        rootMargin: "0px",
        threshold: 1.0, // Trigger when the bottom element is fully visible
      }
    );

    const bottomElement = bottomElementRef.current;
    if (bottomElement) {
      observer.observe(bottomElement);
    }

    return () => {
      if (bottomElement) {
        observer.unobserve(bottomElement);
      }
    };
  }, [loadMore]);

  return { bottomElementRef };
}
