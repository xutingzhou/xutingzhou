"use client"

import { Card } from "@/components/Card"
import type { ArticleWithSlug } from "@/lib/articles"
import { formatDate } from "@/lib/formatDate"
import { getSearchIndex } from "@/lib/search-index"
import { useEffect, useState } from "react"

export default function LastArticles() {

    const [articles, setArticles] = useState<ArticleWithSlug[]>([])

    useEffect(() => {
        getSearchIndex()
            .then(docs => {
                setArticles(docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4))
            })
    }, [])

    return (
        <>
            {articles.map((article) => (
                <Article key={article.slug} article={article} />
            ))}
        </>
    )
}

function Article({ article }: { article: ArticleWithSlug }) {
    return (
        <Card as="article">
            <Card.Title href={article.slug}>
                {article.title}
            </Card.Title>
            <Card.Eyebrow as="time" dateTime={article.date} decorate>
                {formatDate(article.date)}
            </Card.Eyebrow>
            <Card.Description>{article.description}</Card.Description>
            <Card.Cta>Read</Card.Cta>
        </Card>
    )
}