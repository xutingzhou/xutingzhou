export function Tooltip({ children, tooltip }: { children: React.ReactNode; tooltip: string }) {
    return (
        <div className="relative group inline-block">
            {children}
            <div className="absolute left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-300 ease-out px-2 py-1 text-sm text-white bg-zinc-800 dark:text-zinc-800 dark:bg-zinc-100 rounded shadow-lg whitespace-nowrap z-10">
                {tooltip}
            </div>
        </div>

    )
}