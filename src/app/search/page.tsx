import type { Metadata } from 'next'
import ClientSearch from "./ClientSearch"

export const metadata: Metadata = {
    title: 'Search',
    description:
        'Search articles and life posts on my blog.',
}

export default function SearchPage() {
    return <ClientSearch />
}
