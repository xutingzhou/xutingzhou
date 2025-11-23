"use client";

import { Card } from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import type { ArticleWithSlug } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const [fuse, setFuse] = useState<Fuse<ArticleWithSlug> | null>(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<ArticleWithSlug[]>([]);

    useEffect(() => {
        // 加载搜索索引
        fetch("/searchIndex.json")
            .then(res => res.json())
            .then(docs => {
                const fuseInstance = new Fuse<ArticleWithSlug>(docs, {
                    keys: ["title", "description", "tags"],
                    threshold: 0.3,
                });
                setFuse(fuseInstance);
            });
    }, []);

    useEffect(() => {
        if (fuse && query.trim()) {
            const r = fuse.search(query);
            setResults(r.map(i => i.item));
        } else {
            setResults([]);
        }
    }, [query, fuse]);

    return (
        <SimpleLayout
            title="搜索"
            intro="搜索"
        >
            <div className="flex max-w-3xl flex-col space-y-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                <input
                    className="border px-3 py-2 w-full"
                    placeholder="搜索内容..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {results.map((res) => (
                    <article className="md:grid md:grid-cols-4 md:items-baseline" key={res.slug}>
                        <Card className="md:col-span-3" >
                            <Card.Title href={res.slug}>
                                {res.title}
                            </Card.Title>
                            <Card.Eyebrow
                                as="time"
                                dateTime={res.date}
                                className="md:hidden"
                                decorate
                            >
                                {formatDate(res.date)}
                            </Card.Eyebrow>
                            <Card.Description>{res.description}</Card.Description>
                            <Card.Cta>Read</Card.Cta>
                        </Card>
                        <Card.Eyebrow
                            as="time"
                            dateTime={res.date}
                            className="mt-1 max-md:hidden"
                        >
                            {formatDate(res.date)}
                        </Card.Eyebrow>
                    </article>
                ))}
            </div>
        </SimpleLayout>
    );
}
