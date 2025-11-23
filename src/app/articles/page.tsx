import type { Metadata } from 'next'

import { Card } from '@/components/Card'
import { EmptyState } from '@/components/EmptyState'
import { PaginationGroup } from '@/components/PaginationGroup'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Article({ article }: { article: ArticleWithSlug }) {
    return (
        <article className="md:grid md:grid-cols-4 md:items-baseline">
            <Card className="md:col-span-3">
                <Card.Title href={`/articles/${article.slug}`}>
                    {article.title}
                </Card.Title>
                <Card.Eyebrow
                    as="time"
                    dateTime={article.date}
                    className="md:hidden"
                    decorate
                >
                    {formatDate(article.date)}
                </Card.Eyebrow>
                <Card.Description>{article.description}</Card.Description>
                <Card.Cta>Read article</Card.Cta>
            </Card>
            <Card.Eyebrow
                as="time"
                dateTime={article.date}
                className="mt-1 max-md:hidden"
            >
                {formatDate(article.date)}
            </Card.Eyebrow>
        </article>
    )
}

export const metadata: Metadata = {
    title: 'Articles',
    description:
        'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
}

export default async function ArticlesIndex({ searchParams }: { searchParams: Promise<{ tag?: string; page?: string }> }) {
    const { tag, page } = await searchParams
    const articles = await getAllArticles({ tag })

    const pageSize = 10
    const currentPage = Number(page || "1")
    const totalPages = Math.ceil(articles.length / pageSize)
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const paginatedArticles = articles.length > 0 ? articles.slice(start, end) : []

    return (
        <SimpleLayout
            title="不患人之不能，而患己之不勉。"
            intro="All of my long-form thoughts on programming, learning, and more, collected in chronological order."
        >
            <div className="flex flex-col min-h-[60vh]">
                <div className="flex-1">
                    <div className="flex max-w-3xl flex-col space-y-16  md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                        {paginatedArticles.length > 0 ? paginatedArticles.map((article) => (
                            <Article key={article.slug} article={article} />
                        )) : <EmptyState />}
                    </div>
                </div>
                <div className="Sticky bottom-0 mt-6">
                    <PaginationGroup currentPage={currentPage} totalPages={totalPages} />
                </div>
            </div>
        </SimpleLayout>
    )
}
