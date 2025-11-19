import clsx from 'clsx'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { SocialLink } from '@/components/SocialLink'
import { Button } from '@/components/ui/button'
import { socialLinks } from '@/constant/socialLinks'
import { works, type Work } from '@/constant/works'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { getAllArticles, type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { IconBriefcase, IconMail } from '@tabler/icons-react'

function Article({ article }: { article: ArticleWithSlug }) {
    return (
        <Card as="article">
            <Card.Title href={`/articles/${article.slug}`}>
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

function Newsletter() {
    return (
        <form
            action="/thank-you"
            className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
        >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <IconMail className="h-6 w-6 flex-none" />
                <span className="ml-3">保持联系</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                当我发布新内容时收到通知，您可以随时取消订阅。
            </p>
            <div className="mt-6 flex items-center">
                <span className="flex min-w-0 flex-auto p-px">
                    <input
                        type="email"
                        placeholder="Email address"
                        aria-label="Email address"
                        required
                        className="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400"
                    />
                </span>
                <Button type="submit" className="ml-4 flex-none">
                    Join
                </Button>
            </div>
        </form>
    )
}

function Role({ work }: { work: Work }) {
    const startLabel =
        typeof work.start === 'string' ? work.start : work.start.label
    const startDate =
        typeof work.start === 'string' ? work.start : work.start.dateTime

    const endLabel = typeof work.end === 'string' ? work.end : work.end.label
    const endDate = typeof work.end === 'string' ? work.end : work.end.dateTime

    return (
        <li className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                {work.logo ? <Image src={work.logo} alt="" className="h-7 w-7" unoptimized /> : work.company.substring(0, 2).toUpperCase()}
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {work.company}
                </dd>
                <dt className="sr-only">Role</dt>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                    {work.title}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                    className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                >
                    <time dateTime={startDate}>{startLabel}</time>{' '}
                    <span aria-hidden="true">—</span>{' '}
                    <time dateTime={endDate}>{endLabel}</time>
                </dd>
            </dl>
        </li>
    )
}

function Resume() {
    return (
        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <IconBriefcase className="h-6 w-6 flex-none" />
                <span className="ml-3">Work</span>
            </h2>
            <ol className="mt-6 space-y-4">
                {works.map((work, workIndex) => (
                    <Role key={workIndex.toFixed()} work={work} />
                ))}
            </ol>

        </div>
    )
}

function Photos() {
    const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

    return (
        <div className="mt-16 sm:mt-20">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
                    <div
                        key={image.src}
                        className={clsx(
                            'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
                            rotations[imageIndex % rotations.length],
                        )}
                    >
                        <Image
                            src={image}
                            alt=""
                            sizes="(min-width: 640px) 18rem, 11rem"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default async function Home() {
    const articles = (await getAllArticles({})).slice(0, 4)

    return (
        <>
            <Container className="mt-9">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        👋 Welcome !
                    </h1>
                    <ul className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        <li>我是许汀洲，一名软件开发者。</li>
                        <li>Tech stack: Hono + React + Electron + React Native. All in js 😎.</li>
                        <li>玩乐高，喜欢机械组。厨艺尚可，享受做饭 🍔。</li>
                        <li>🏊 游泳只会蛙泳，努力减肥。</li>
                        <li>I’m learning English.</li>
                    </ul>
                    <div className="mt-6 flex gap-6">
                        {
                            socialLinks.map((link) => (
                                <SocialLink
                                    key={link.name}
                                    href={link.href}
                                    aria-label={link.name}
                                    icon={link.icon}
                                />
                            ))
                        }

                    </div>
                </div>
            </Container>
            <Photos />
            <Container className="mt-24 md:mt-28">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col gap-16">
                        {articles.map((article) => (
                            <Article key={article.slug} article={article} />
                        ))}
                    </div>
                    <div className="space-y-10 lg:pl-16 xl:pl-24">
                        <Newsletter />
                        <Resume />
                    </div>
                </div>
            </Container>
        </>
    )
}
