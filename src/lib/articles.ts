interface Article {
    title: string
    description: string
    author: string
    date: string
    category: string
    tags?: string[]
    private?: boolean
}

export interface ArticleWithSlug extends Article {
    slug: string
}