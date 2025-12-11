"use client"

import { Article } from "@/components/Article"
import { EmptyState } from "@/components/EmptyState"
import { PaginationGroup } from "@/components/PaginationGroup"
import { SimpleLayout } from "@/components/SimpleLayout"
import type { ArticleWithSlug } from "@/lib/articles"
import { getSearchIndex } from "@/lib/search-index"
import Fuse from "fuse.js"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ClientArticles({ title, intro, category }: {
    title: string
    intro: string
    category: string

}) {

    const pageSize = 10

    const searchParams = useSearchParams();
    const tag = searchParams.get("tag");
    const page = searchParams.get("page");

    const [fuse, setFuse] = useState<Fuse<ArticleWithSlug> | null>(null)
    const [query, setQuery] = useState<{ category: string, tags?: string }>({ category })
    const [articles, setArticles] = useState<ArticleWithSlug[]>([])
    const [articlesPage, setArticlesPage] = useState<ArticleWithSlug[]>([])
    const [currentPage, setCurrentPage] = useState(Number(page) || 1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        getSearchIndex()
            .then(docs => {
                const fuseInstance = new Fuse<ArticleWithSlug>(docs, {
                    keys: ["category", "tags"],
                    threshold: 0,
                })
                setFuse(fuseInstance)
            })
    }, [])

    useEffect(() => {
        if (fuse) {
            const r = fuse.search(query)
            const articles = r.map(i => i.item)
            setTotalPages(Math.ceil(articles.length / pageSize))
            setArticles(articles)
        }
    }, [query, fuse])

    useEffect(() => {
        setArticlesPage(articles.slice((currentPage - 1) * pageSize, currentPage * pageSize))
    }, [articles, currentPage])

    useEffect(() => {
        setQuery(prev => {
            const next = { ...prev }
            if (tag) {
                next.tags = tag
            } else {
                delete next.tags
            }
            return next
        })
    }, [tag])


    return (
        <SimpleLayout
            title={title}
            intro={intro}
        >
            <div className="flex flex-col min-h-[60vh]">
                <div className="flex-1">
                    <div className="flex max-w-3xl flex-col space-y-16  md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                        {articlesPage.length > 0 ? (
                            articlesPage.map((article) => (
                                <Article key={article.slug} article={article} />
                            ))
                        ) : (
                            <EmptyState />
                        )}
                    </div>
                </div>
                <div className="Sticky bottom-0 mt-6">
                    <PaginationGroup currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            </div>
        </SimpleLayout>
    )
}
