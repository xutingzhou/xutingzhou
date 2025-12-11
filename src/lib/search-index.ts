import type { ArticleWithSlug } from "./articles";

let searchIndex: ArticleWithSlug[] = [];

export async function getSearchIndex() {
    if (searchIndex.length > 0) return searchIndex;

    const res = await fetch("/searchIndex.json");
    searchIndex = await res.json();

    return searchIndex;
}
