"use client"

import { Article } from "@/components/Article"
import { SimpleLayout } from "@/components/SimpleLayout"
import type { ArticleWithSlug } from "@/lib/articles"
import Fuse from "fuse.js"
import { useEffect, useState } from "react"

export default function SearchPage() {
    const [fuse, setFuse] = useState<Fuse<ArticleWithSlug> | null>(null)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<ArticleWithSlug[]>([])

    useEffect(() => {
        fetch("/searchIndex.json")
            .then(res => res.json())
            .then(docs => {
                const fuseInstance = new Fuse<ArticleWithSlug>(docs, {
                    keys: ["title", "description", "tags"],
                    threshold: 0.3,
                })
                setFuse(fuseInstance)
            })
    }, [])

    useEffect(() => {
        if (fuse && query.trim()) {
            const r = fuse.search(query)
            setResults(r.map(i => i.item))
        } else {
            setResults([])
        }
    }, [query, fuse])

    return (
        <SimpleLayout
            title="搜索"
            intro="搜索关键字：文章标题、描述和标签。"
        >
            <div className="flex max-w-3xl flex-col space-y-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                <input
                    type="search"
                    placeholder="搜索内容..."
                    aria-label="搜索内容"
                    required
                    className="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {results.map((res) => (
                    <Article key={res.slug} article={res} />
                ))}
            </div>
        </SimpleLayout>
    )
}
