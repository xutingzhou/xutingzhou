import Link from 'next/link'

export function SocialLinkWithText({
    href,
    children,
    icon: Icon,
}: {
    href: string
    icon: React.ComponentType<{ className?: string }>
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            target="_blank"
            className="group flex text-sm font-medium"
        >
            <Icon className="h-6 w-6 flex-none transition group-hover:fill-zinc-300 dark:group-hover:fill-zinc-500" />
            <span className="ml-4">{children}</span>
        </Link>
    )
}

export function SocialLink({
    icon: Icon,
    ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
    icon: React.ComponentType<{ className?: string }>
}) {
    return (
        <Link className="group -m-1 p-1" target="_blank" {...props}>
            <Icon className="h-6 w-6 transition group-hover:fill-zinc-300 dark:group-hover:fill-zinc-500" />
        </Link>
    )
}