import { cn } from '@/lib/cn'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/ssr'
import type React from 'react'
import { Button } from './button'

export function Pagination({
    'aria-label': ariaLabel = 'Page navigation',
    className,
    ...props
}: React.ComponentPropsWithoutRef<'nav'>) {
    return <nav aria-label={ariaLabel} {...props} className={cn(className, 'flex gap-x-2')} />
}

export function PaginationPrevious({
    href = null,
    className,
    children = 'Previous',
}: React.PropsWithChildren<{
    href?: string | null
    className?: string
}>) {
    return (
        <span className={cn(className, 'grow basis-0')}>
            <Button className="flex items-center" {...(href === null ? { disabled: true } : { href })} plain aria-label="Previous page">
                <CaretLeftIcon size={18} />
                {children}
            </Button>
        </span>
    )
}

export function PaginationNext({
    href = null,
    className,
    children = 'Next',
}: React.PropsWithChildren<{
    href?: string | null
    className?: string
}>) {
    return (
        <span className={cn(className, 'flex grow basis-0 justify-end')}>
            <Button className="flex items-center" {...(href === null ? { disabled: true } : { href })} plain aria-label="Next page">
                {children}
                <CaretRightIcon size={18} />
            </Button>
        </span>
    )
}

export function PaginationList({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
    return <span {...props} className={cn(className, 'hidden items-baseline gap-x-2 sm:flex')} />
}

export function PaginationPage({
    href,
    className,
    current = false,
    children,
}: React.PropsWithChildren<{
    href: string
    className?: string
    current?: boolean
}>) {
    return (
        <Button
            href={href}
            plain
            aria-label={`Page ${children}`}
            aria-current={current ? 'page' : undefined}
            className={cn(
                className,
                'min-w-9 before:absolute before:-inset-px before:rounded-lg',
                current && 'before:bg-zinc-950/5 dark:before:bg-white/10'
            )}
        >
            <span className="-mx-0.5">{children}</span>
        </Button>
    )
}

export function PaginationGap({
    className,
    children = <>&hellip</>,
    ...props
}: React.ComponentPropsWithoutRef<'span'>) {
    return (
        <span
            aria-hidden="true"
            {...props}
            className={cn(className, 'w-9 text-center text-sm/6 font-semibold text-zinc-950 select-none dark:text-white')}
        >
            {children}
        </span>
    )
}
