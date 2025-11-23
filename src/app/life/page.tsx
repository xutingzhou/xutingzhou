import type { Metadata } from 'next'

import { Card } from '@/components/Card'
import { PaginationGroup } from '@/components/PaginationGroup'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllLife } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { EmptyState } from '../../components/EmptyState'

function Life({ life }: { life: ArticleWithSlug }) {
    return (
        <Card as="article">
            <Card.Title href={`/life/${life.slug}`}>
                {life.title}
            </Card.Title>
            <Card.Eyebrow as="time" dateTime={life.date} decorate>
                {formatDate(life.date)}
            </Card.Eyebrow>
            <Card.Description>{life.description}</Card.Description>
            <Card.Cta>Read</Card.Cta>
        </Card>
    )
}

export const metadata: Metadata = {
    title: 'Life',
    description:
        'My real life experiences and my dream for future life.',
}

export default async function LifeIndex({ searchParams }: { searchParams: Promise<{ tag?: string; page?: string }> }) {
    const { tag, page } = await searchParams
    const lifeList = await getAllLife({ tag })

    const pageSize = 10
    const currentPage = Number(page || "1")
    const totalPages = Math.ceil(lifeList.length / pageSize)
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const paginatedLife = lifeList.length > 0 ? lifeList.slice(start, end) : []

    return (
        <SimpleLayout
            title="去一个普通的地方，过着普通的生活"
            intro="人生有三把钥匙：接受、改变、离开。不能接受就改变，改变不了就离开。少问别人为什么，多问自己凭什么。"
        >
            <div className="flex flex-col min-h-[60vh]">
                <div className="flex-1">
                    <div className="flex max-w-3xl flex-col space-y-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                        {paginatedLife.length > 0 ? (
                            paginatedLife.map((life) => (
                                <Life key={life.slug} life={life} />
                            ))
                        ) : (
                            <EmptyState />
                        )}
                    </div>
                </div>

                <div className="Sticky bottom-0 mt-6">
                    <PaginationGroup currentPage={currentPage} totalPages={totalPages} />
                </div>
            </div>
        </SimpleLayout>
    )
}