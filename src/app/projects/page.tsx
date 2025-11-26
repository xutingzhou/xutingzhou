import type { Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import goholidaytoday from '@/images/logos/goholidaytoday.png'
import { LinkIcon } from '@phosphor-icons/react/dist/ssr'

const projects = [
    {
        name: 'Go Holiday Today',
        description:
            '让每一段旅程，都值得被铭记。',
        link: { href: 'https://www.goholidaytoday.com/', label: 'goholidaytoday.com' },
        logo: goholidaytoday,
    },
]

export const metadata: Metadata = {
    title: 'Projects',
    description: '我的一些作品',
}

export default function Projects() {
    return (
        <SimpleLayout
            title="我的一些作品"
            intro="Some do it out of interest, some for fun, and some for money."
        >
            <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card as="li" key={project.name}>
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                            <Image
                                src={project.logo}
                                alt=""
                                className="h-8 w-8"
                                unoptimized
                            />
                        </div>
                        <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                            <Card.Link href={project.link.href} target="_blank">{project.name}</Card.Link>
                        </h2>
                        <Card.Description>{project.description}</Card.Description>
                        <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                            <LinkIcon className="h-6 w-6 flex-none" />
                            <span className="ml-2">{project.link.label}</span>
                        </p>
                    </Card>
                ))}
            </div>
        </SimpleLayout>
    )
}
