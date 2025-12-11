import type { Metadata } from 'next'
import ClientArticles from './ClientArticles'

export const metadata: Metadata = {
    title: 'Articles',
    description:
        'All of my thoughts on programming, learning, and more.',
}

export default function ArticlesPage() {
    return <ClientArticles />
}
