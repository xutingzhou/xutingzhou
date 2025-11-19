import glob from 'fast-glob'

interface Life {
    title: string
    description: string
    author: string
    date: string
    tags?: string[]
}

export interface LifeWithSlug extends Life {
    slug: string
}

async function importLife(
    lifeFilename: string,
): Promise<LifeWithSlug> {
    const { life } = (await import(`../app/life/${lifeFilename}`)) as {
        default: React.ComponentType
        life: Life
    }

    return {
        slug: lifeFilename.replace(/(\/page)?\.mdx$/, ''),
        ...life,
    }
}

export async function getAllLife({ tag }: { tag?: string }) {
    const articleFilenames = await glob('*/page.mdx', {
        cwd: './src/app/life',
    })
    const life = await Promise.all(articleFilenames.map(importLife))
    return life
        .filter((life) => (tag ? life?.tags?.includes(tag) : true))
        .sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
