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
    className,
    children = 'Previous',
    onClick
}: React.PropsWithChildren<{
    className?: string
    onClick?: () => void
}>) {
    return (
        <span className={cn(className, 'grow basis-0')}>
            <Button className="flex items-center" plain aria-label="Previous page" onClick={onClick} disabled={!onClick}>
                <CaretLeftIcon size={18} />
                {children}
            </Button>
        </span>
    )
}

export function PaginationNext({
    className,
    children = 'Next',
    onClick
}: React.PropsWithChildren<{
    className?: string
    onClick?: () => void
}>) {
    return (
        <span className={cn(className, 'flex grow basis-0 justify-end')}>
            <Button className="flex items-center" plain aria-label="Next page" onClick={onClick} disabled={!onClick}>
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
    className,
    current = false,
    children,
    onClick,
}: React.PropsWithChildren<{
    className?: string
    current?: boolean
    onClick?: () => void
}>) {
    return (
        <Button
            plain
            aria-label={`Page ${children}`}
            aria-current={current ? 'page' : undefined}
            className={cn(
                className,
                'min-w-9 before:absolute before:-inset-px before:rounded-lg',
                current && 'before:bg-zinc-950/5 dark:before:bg-white/10'
            )}
            disabled={current}
            onClick={onClick}
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
