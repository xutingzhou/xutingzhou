import glob from 'fast-glob'

interface Article {
    title: string
    description: string
    author: string
    date: string
    tags?: string[]
    private?: boolean
}

export interface ArticleWithSlug extends Article {
    slug: string
}

async function importArticle(
    { path, name }: { path: string, name: string }
): Promise<ArticleWithSlug> {
    const { article } = (await import(`../app/${path}/${name}`)) as {
        default: React.ComponentType
        article: Article
    }

    return {
        slug: `/${path}/${name.replace(/\/page\.mdx?$/, '')}`,
        ...article,
    }
}

export async function getAllMdx({ path, tag }: { path: string, tag?: string }) {
    const articleFilenames = await glob('*/page.mdx', {
        cwd: `./src/app/${path}`,
    })
    const articles = await Promise.all(articleFilenames.map(name => importArticle({ path, name })))
    return articles
        .filter((article) => !article.private)
        .filter((article) => (tag ? article?.tags?.includes(tag) : true))
        .sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

export async function getAllArticles({ tag }: { tag?: string }) {
    return getAllMdx({ path: 'articles', tag })
}

export async function getAllLife({ tag }: { tag?: string }) {
    return getAllMdx({ path: 'life', tag })
}