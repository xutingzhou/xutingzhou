"use client"

import { Article } from "@/components/Article"
import { EmptyState } from "@/components/EmptyState"
import { PaginationGroup } from "@/components/PaginationGroup"
import { SimpleLayout } from "@/components/SimpleLayout"
import type { ArticleWithSlug } from "@/lib/articles"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ClientLife() {

    const pageSize = 10

    const searchParams = useSearchParams();
    const tag = searchParams.get("tag");
    const page = searchParams.get("page");

    const [articles, setArticles] = useState<ArticleWithSlug[]>([])
    const [articlesPage, setArticlesPage] = useState<ArticleWithSlug[]>([])
    const [currentPage, setCurrentPage] = useState(Number(page) || 1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetch("/searchIndex.json")
            .then(res => res.json())
            .then((docs: ArticleWithSlug[]) => {
                const articles = docs.filter(article => article.category === 'life')
                setArticles(articles)
                setTotalPages(Math.ceil(articles.length / pageSize))
            })
    }, [])

    useEffect(() => {
        setArticlesPage(articles.slice((currentPage - 1) * pageSize, currentPage * pageSize))
    }, [articles, currentPage])

    return (
        <SimpleLayout
            title="去一个普通的地方，过着普通的生活"
            intro="人生有三把钥匙：接受、改变、离开。不能接受就改变，改变不了就离开。少问别人为什么，多问自己凭什么。"
        >
            <div className="flex flex-col min-h-[60vh]">
                <div className="flex-1">
                    <div className="flex max-w-3xl flex-col space-y-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                        {articlesPage.length > 0 ? (
                            articlesPage.map((life) => (
                                <Article key={life.slug} article={life} />
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