import { useMemo } from "react";
import { ImageData } from "../types";

function useFilter(query: string, data: { node: ImageData }[] | undefined) {
  const filteredData = useMemo(() => {
    if (!data) return [] as { node: ImageData }[];
    if (!query) return data;
    return data.filter(
      (item) =>
        item.node.title.toUpperCase().includes(query.toUpperCase()) ||
        item.node.author.toUpperCase().includes(query.toUpperCase())
    );
  }, [query, data]);

  return filteredData;
}

export default useFilter;
