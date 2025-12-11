"use client"

import { Article } from "@/components/Article"
import { EmptyState } from "@/components/EmptyState"
import { PaginationGroup } from "@/components/PaginationGroup"
import { SimpleLayout } from "@/components/SimpleLayout"
import type { ArticleWithSlug } from "@/lib/articles"
import { useEffect, useState } from "react"

export default function ClientArticles() {

    const pageSize = 10

    const [articles, setArticles] = useState<ArticleWithSlug[]>([])
    const [articlesPage, setArticlesPage] = useState<ArticleWithSlug[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetch("/searchIndex.json")
            .then(res => res.json())
            .then((docs: ArticleWithSlug[]) => {
                const articles = docs.filter(article => article.category === 'articles')
                setArticles(articles)
                setTotalPages(Math.ceil(articles.length / pageSize))
            })
    }, [])

    useEffect(() => {
        setArticlesPage(articles.slice((currentPage - 1) * pageSize, currentPage * pageSize))
    }, [articles, currentPage])


    return (
        <SimpleLayout
            title="不患人之不能，而患己之不勉。"
            intro="All of my thoughts on programming, learning, and more."
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
