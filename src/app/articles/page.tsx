import ClientArticles from '@/components/ClientArticles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Articles',
    description:
        'All of my thoughts on programming, learning, and more.',
}

export default function ArticlesPage() {
    return (
        <ClientArticles
            title="不患人之不能，而患己之不勉。"
            intro="All of my thoughts on programming, learning, and more."
            category="articles"
        />
    )
}
